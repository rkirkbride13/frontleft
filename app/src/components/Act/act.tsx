import { FormEvent } from "react";
import serverURL from "../../serverURL";

// Define the expected props for the Act component
interface ActInt {
  act: any;
  token: string | null;
  setActs: React.Dispatch<React.SetStateAction<any[]>>;
}

const Act = ({ act, token, setActs }: ActInt) => {
  // Define the function to handle the delete button click
  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send a DELETE request to the server
    const response = await fetch(serverURL() + "/acts", {
      method: "DELETE",
      // Include the bearer token in the Authorization header and the act ID
      headers: {
        Authorization: `Bearer ${token}`,
        act_id: act._id,
      },
    });

    if (response.status !== 200) {
      console.log("act NOT deleted");
    } else {
      console.log("act deleted");
      // If a token was passed, send a request to fetch the updated list of acts
      if (token) {
        fetch(serverURL() + "/acts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then(async (data) => {
            // Update the state of the parent component with the updated list of acts
            setActs(data.acts);
          });
      }
    }
  };
  // Render the act information and a delete button
  return (
    <>
      <p className="day-acts" data-cy="act">
        <form onSubmit={handleDelete}>
          <input data-cy="delete-button" type="submit" value="X" />
        </form>
        {act.name}: {act.start}-{act.end}
      </p>
    </>
  );
};

export default Act;
