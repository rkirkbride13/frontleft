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
        navigate("/signin");
      } else {
        setEmailExists(true);
        console.log("No luck");
      }
    });
  };

  const checkEmailExists = () => {
    if (emailExists) {
      return <div className="invalidDetails">Email already exists</div>;
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
      <div className="formPage">
        <br></br>
        <div className="header">Please sign up below</div>
        <br></br>
        <form onSubmit={handleSubmit}>
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
          <br></br>
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
          <br></br>
          <label htmlFor="password">Password: </label>
          <input
            className="input"
            placeholder="Your password"
            id="password"
            type="password"
            value={password}
            onChange={handleChange(setPassword)}
          />
          <br></br>
          {checkEmailExists()}
          <br></br>
          <input className="submit" id="submit" type="submit" value="Sign Up" />
          <br></br>
          <br></br>
          <a href="/signin">Already have an account?</a>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
