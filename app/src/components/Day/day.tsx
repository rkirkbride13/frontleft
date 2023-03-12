import React, { useEffect, useState } from "react";
import { IAct } from "../../../../api/src/models/acts";
import { NavigateFunction } from "react-router";

interface DayInt {
  navigate: NavigateFunction;
}

const Day = ({ navigate }: DayInt) => {
  const [acts, setActs] = useState<Array<IAct>>([]);
  const [token] = useState<string | null>(window.localStorage.getItem("token"));
  const [stages, setStages] = useState<Array<string>>([]);

  useEffect(() => {
    if (token) {
      fetch("/acts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          setActs(filterByDay(data.acts));
        });
    } else {
      navigate("/");
    }
  }, []);

  const convertDateToDay = (date: Date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date(date).getDay()];
  };

  const filterByDay = (acts: Array<IAct>): Array<IAct> => {
    return acts.filter((acts) => convertDateToDay(acts.date) === "Friday");
  };


  return (
    <>
      <div className="act">
        <p></p>
      </div>
    </>
  );
};

export default Day;
