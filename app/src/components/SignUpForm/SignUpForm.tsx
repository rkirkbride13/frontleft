import React, { useState, FormEvent, ChangeEvent, ReactElement } from "react";
import { NavigateFunction } from "react-router";

interface SignUpFormInt {
  navigate: NavigateFunction;
}

const SignUpForm = ({ navigate }: SignUpFormInt): ReactElement => {
  const handleChange = (
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setEmailExists(false);
      setFunction(event.target.value);
    };
  };

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [emptyField, setEmptyField] = useState<string>("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    fetch("/users", {
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
      if (response.status === 201) {
        console.log("Success");
        navigate("/");
      } else if (email === "" || password === "" || name === "") {
        setEmptyField("All fields are required");
      } else {
        setEmailExists(true);
        console.log("No luck");
      }
    });
  };

  const handleError = () => {
    if (emailExists) {
      return <div className="invalid-details">Email already exists</div>;
    } else if (emptyField) {
      return <div className="invalid-details">{emptyField}</div>;
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="logo">
        <img
          src="https://see.fontimg.com/api/renderfont4/ARpL/eyJyIjoiZnMiLCJoIjo3MSwidyI6MTAwMCwiZnMiOjcxLCJmZ2MiOiIjOTYxNUM4IiwiYmdjIjoiI0ZERkRGRCIsInQiOjF9/ZnJvbnRsZWZ0/inner-flasher.png"
          alt="Lightning fonts"
        ></img>
      </div>
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
              type="submit"
              value="Sign Up"
            />
            <a href="/signin">Or sign in</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
