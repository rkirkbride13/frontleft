import { ReactElement } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ActForm from '../ActForm/ActForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from "../SignInForm/SignInForm";
import Acts from '../Acts/userActs'
import Day from '../Day/day'

const App = (): ReactElement => {
  return (
    <Routes>
      <Route path="/act" element={<ActForm navigate={useNavigate()}/>} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()}/>} />
      <Route path="/" element={<SignInForm navigate={useNavigate()}/>} />
      <Route path="/acts" element={<Acts navigate={useNavigate()}/>} />
      <Route path="/day/friday" element={<Day navigate={useNavigate()}/>} />
    </Routes>
  );
};

export default App;
