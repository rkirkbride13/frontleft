import { ReactElement } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ActForm from '../ActForm/ActForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from "../SignInForm/SignInForm";

const App = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<ActForm/>} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()}/>} />
      <Route path="/signin" element={<SignInForm navigate={useNavigate()}/>} />
    </Routes>
  );
};

export default App;
