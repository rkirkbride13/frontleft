import { ReactElement, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUpForm from "../SignUpForm/SignUpForm";
import SignInForm from "../SignInForm/SignInForm";
import Acts from "../Acts/userActs";
import DayChart from "../DayChart/DayChart";

const App = (): ReactElement => {
  const [dayChart, setDayChart] = useState<string>();

  return (
    <Routes>
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      <Route path="/" element={<SignInForm navigate={useNavigate()} />} />
      <Route
        path="/acts"
        element={
          <Acts
            navigate={useNavigate()}
            setDayChart={setDayChart}
          />
        }
      />
      <Route
        path="/day/friday"
        element={<DayChart navigate={useNavigate()} dayChart={dayChart} />}
      />
      <Route
        path="/day/saturday"
        element={<DayChart navigate={useNavigate()} dayChart={dayChart} />}
      />
      <Route
        path="/day/sunday"
        element={<DayChart navigate={useNavigate()} dayChart={dayChart} />}
      />
    </Routes>
  );
};

export default App;
