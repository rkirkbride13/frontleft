import React, {
  useState,
  FormEvent,
  ChangeEvent,
  ReactElement,
  useEffect,
} from "react";
import { NavigateFunction } from "react-router";
import serverURL from "../../serverURL";

// Define the expected props for the ActForm component
interface SignInFormInt {
  navigate: NavigateFunction;
}

const SignInForm = ({ navigate }: SignInFormInt): ReactElement => {
  // Define a function to handle changes to an input field
  const handleChange = (
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setUserFound(true);
      setFunction(event.target.value);
    };
  };
  // Define state variables for the input fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userFound, setUserFound] = useState<boolean>(true);
  const [emptyField, setEmptyField] = useState<string>("");
  const [screenWidth, setSceenWidth] = useState(window.innerWidth);
  // Define a function to handle form submission
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    // Send a POST request to the server to create a new token
    let response = await fetch(serverURL() + "/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status === 200) {
      console.log("Success");
      let data = await response.json();
      // Set the token and User ID in the local storage if successful and navigate to /acts
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user_id", data.user_id);
      navigate("/acts");
      // Else give error message depending on empty inputs or unfound user
    } else if (email === "" || password === "") {
      setEmptyField("All fields are required");
    } else {
      setUserFound(false);
      console.log("No luck");
    }
  };
  // Error handler function for unfound user or empty input fields
  const handleError = () => {
    if (!userFound) {
      return <div className="invalid-details">This user was not found</div>;
    } else if (emptyField) {
      return <div className="invalid-details">{emptyField}</div>;
    } else {
      return <></>;
    }
  };
  // Add event listener to update screen width state on window resize
  useEffect(() => {
    const handleResize = () => {
      setSceenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Render the SignInForm
  return (
    <>
      <div className="logo" style={{ padding: screenWidth / 2 - 340 / 2 }}>
        <a href="/acts">
          <img
            src="https://see.fontimg.com/api/renderfont4/ARpL/eyJyIjoiZnMiLCJoIjo3MSwidyI6MTAwMCwiZnMiOjcxLCJmZ2MiOiIjOTYxNUM4IiwiYmdjIjoiI0ZERkRGRCIsInQiOjF9/ZnJvbnRsZWZ0/inner-flasher.png"
            alt="Lightning fonts"
          ></img>
        </a>
      </div>
      <div className="main-container">
        <div
          className="flanking-block-left"
          style={{ width: screenWidth / 2 - 400 / 2 }}
        ></div>
        <div className="form-page">
          <br></br>
          <div className="header">
            Please sign in below<br></br>or sign up via link
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="email">Email: </label>
              <input
                className="input"
                placeholder="Your email"
                id="email"
                data-cy="email"
                type="text"
                style={{ width: "120px" }}
                value={email}
                onChange={handleChange(setEmail)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="password">Password: </label>
              <input
                className="input"
                placeholder="Your password"
                id="password"
                data-cy="password"
                type="password"
                value={password}
                onChange={handleChange(setPassword)}
              />
            </div>
            {handleError()}
            <br></br>
            <div className="submit-with-link">
              <input
                className="submit"
                id="submit"
                data-cy="signin-submit"
                type="submit"
                value="Sign In"
              />
              <a href="/signup">Or sign up</a>
            </div>
          </form>
          <br></br>
          <div className="header">Click logo to go home</div>
        </div>
        <div
          className="flanking-block-right"
          style={{ width: screenWidth / 2 - 400 / 2 }}
        ></div>
      </div>
    </>
  );
};

export default SignInForm;
