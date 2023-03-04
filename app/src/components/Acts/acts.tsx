import React, { useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
import {IAct} from '../../../../api/src/models/acts'

interface ActsInt {
  navigate: NavigateFunction;
}

const Acts = ({ navigate }: ActsInt) => {
  const [acts, setActs] = useState<Array<IAct>>([]);
  const [token] = useState<string | null>(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch("/acts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          setActs(data.acts);
          console.log(acts)
        });
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <main id="main-container">
        <div></div>
      </main>
    </>
  );
};

export default Acts;
