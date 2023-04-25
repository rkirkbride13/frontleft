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
interface SignUpFormInt {
  navigate: NavigateFunction;
}

const SignUpForm = ({ navigate }: SignUpFormInt): ReactElement => {
  // Define a function to handle changes to an input field
  const handleChange = (
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setEmailExists(false);
      setFunction(event.target.value);
    };
  };
  // Define state variables for the input fields
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [emptyField, setEmptyField] = useState<string>("");
  const [screenWidth, setSceenWidth] = useState(window.innerWidth);
  // Define a function to handle form submission
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    // Send a POST request to the server to create a new user
    fetch(serverURL() + "/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((response) => {
      // If successful, navigate to the login page
      if (response.status === 200) {
        console.log("Success");
        navigate("/");
        // Else give error message depending on empty inputs or email existing already
      } else if (email === "" || password === "" || name === "") {
        setEmptyField("All fields are required");
      } else {
        setEmailExists(true);
        console.log("No luck");
      }
    });
  };
  // Error handler function for existing user or empty input fields
  const handleError = () => {
    if (emailExists) {
      return <div className="invalid-details">Email already exists</div>;
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
  // Render the SignUpForm
  return (
    <>
      <div className="logo" style={{ padding: screenWidth / 2 - 340 / 2 }}>
        <img
          src="https://see.fontimg.com/api/renderfont4/ARpL/eyJyIjoiZnMiLCJoIjo3MSwidyI6MTAwMCwiZnMiOjcxLCJmZ2MiOiIjOTYxNUM4IiwiYmdjIjoiI0ZERkRGRCIsInQiOjF9/ZnJvbnRsZWZ0/inner-flasher.png"
          alt="Lightning fonts"
        ></img>
      </div>
      <div className="main-container">
        <div
          className="flanking-block-left"
          style={{ width: screenWidth / 2 - 400 / 2 }}
        ></div>
        <div className="form-page">
          <br></br>
          <div className="header">Please sign up below</div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Name: </label>
              <input
                className="input"
                placeholder="Your username"
                id="name"
                data-cy="name"
                type="text"
                style={{ width: "120px" }}
                value={name}
                onChange={handleChange(setName)}
              />
            </div>
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
                data-cy="signup-submit"
                type="submit"
                value="Sign Up"
              />
              <a href="/">Or sign in</a>
            </div>
          </form>
        </div>
        <div
          className="flanking-block-right"
          style={{ width: screenWidth / 2 - 400 / 2 }}
        ></div>
      </div>
    </>
  );
};

export default SignUpForm;
