import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import ActForm from '../ActForm/ActForm';
import SignUpForm from '../SignUpForm/SignUpForm';

const App = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<ActForm/>} />
      <Route path="/signup" element={<SignUpForm/>} />
    </Routes>
  );
};

export default App;
