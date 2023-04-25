import React, {
  useState,
  FormEvent,
  ChangeEvent,
  ReactElement,
  useEffect,
} from "react";
import { NavigateFunction } from "react-router";
import serverURL from "../../serverURL";

// Define the expected props for the Picture component
interface PictureFormInt {
  navigate: NavigateFunction;
  token: string | null;
}

const PictureForm = ({ navigate, token }: PictureFormInt): ReactElement => {
  // Define a function to handle changes to the field
  const handlePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPicture(event.target.files[0]);
    }
  };
  // Define state for the selected picture file and the image URL
  const [picture, setPicture] = useState<File | string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  // Get the user ID from local storage
  const user_id: any = window.localStorage.getItem("user_id");
  // Define a function to handle the form submission
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!token) {
      navigate("/");
    }
    // Create a FormData object and append the selected picture file and user ID
    let formData = new FormData();
    if (picture !== "") {
      formData.append("picture", picture);
    }
    formData.append("user_id", user_id);
    // Send a POST request to the server with the FormData and authentication headers
    let response = await fetch(serverURL() + "/pictures", {
      method: "post",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    await response;
    // If the request was successful, update the image URL
    if (response.status !== 200) {
      console.log("picture NOT added");
    } else {
      console.log("picture added");
      const form = event.target as HTMLFormElement;
      form.picture.value = "";
      const fetchPicture = async () => {
        const response = await fetch(`${serverURL()}/pictures/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setImageUrl(imageUrl);
        }
      };
      fetchPicture();
    }
  };
  // Fetch the image URL when the component mounts
  useEffect(() => {
    const fetchPicture = async () => {
      const response = await fetch(`${serverURL()}/pictures/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      }
    };
    fetchPicture();
  }, []);

  // Render the picture form and the image, if one has been uploaded
  return (
    <>
      <div className="picture-div">
        <br></br>
        {imageUrl !== "" && (
          <img className="prof-pic" src={imageUrl} alt="Profile Picture" />
        )}
        <br></br>
        <form
          className="upload-image"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="file-upload" className="custom-file-upload">
            <i className="fa fa-cloud-upload"></i> Upload image?
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".png, •jpg,
          jpeg"
            name="picture"
            onChange={handlePictureChange}
          />
          <input
            className="save-image"
            id="submit"
            type="submit"
            value="Save"
          />
        </form>
      </div>
    </>
  );
};

export default PictureForm;
