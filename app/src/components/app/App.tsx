import { ReactElement } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from "../SignInForm/SignInForm";
import Acts from '../Acts/userActs'
import Friday from '../DayCharts/friday'
import Saturday from '../DayCharts/saturday'
import Sunday from '../DayCharts/sunday'

const App = (): ReactElement => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()}/>} />
      <Route path="/" element={<SignInForm navigate={useNavigate()}/>} />
      <Route path="/acts" element={<Acts navigate={useNavigate()}/>} />
      <Route path="/day/friday" element={<Friday navigate={useNavigate()}/>} />
      <Route path="/day/saturday" element={<Saturday navigate={useNavigate()}/>} />
      <Route path="/day/sunday" element={<Sunday navigate={useNavigate()}/>} />
    </Routes>
  );
};

export default App;
