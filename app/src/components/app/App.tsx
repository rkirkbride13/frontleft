import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import ActForm from '../ActForm/ActForm';

const App = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<ActForm/>} />
    </Routes>
  );
};

export default App;
