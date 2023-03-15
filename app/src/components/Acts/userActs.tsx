import React, { useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
import { IAct } from "../../../../api/src/models/acts";
import Act from "../Act/act";

interface ActsInt {
  navigate: NavigateFunction;
}

const Acts = ({ navigate }: ActsInt) => {
  const [acts, setActs] = useState<Array<IAct>>([]);
  const [token] = useState<string | null>(window.localStorage.getItem("token"));
  const [days, setDays] = useState<Array<string>>([]);
  const [screenWidth, setSceenWidth] = useState(window.innerWidth);

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
          const uniqueDays = Array.from(
            new Set(acts.map((act) => convertDateToDay(act.date)))
          );
          setDays(uniqueDays);
        });
    } else {
      navigate("/");
    }

    const handleResize = () => {
      setSceenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sortByDate = (acts: Array<IAct>): Array<IAct> => {
    return acts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const sortedActs = sortByDate(acts);

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

  const mapDays = () => {
    return (
      <>
        {days.map((day) => {
          const href = `/day/${day.toLowerCase()}`;
          return (
            <>
              <div className="day-block">
                <a href={href} className="stage">
                  {day}
                </a>
                <div className="dayContainer">
                  <div className="actsContainer">
                    {sortedActs
                      .filter((acts) => convertDateToDay(acts.date) === day)
                      .map((act) => (
                        <Act act={act} token={token} setActs={setActs} />
                      ))}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="logo" style={{ padding: screenWidth / 2 - 340 / 2 }}>
        <a href="/act">
          <img
            src="https://see.fontimg.com/api/renderfont4/ARpL/eyJyIjoiZnMiLCJoIjo3MSwidyI6MTAwMCwiZnMiOjcxLCJmZ2MiOiIjOTYxNUM4IiwiYmdjIjoiI0ZERkRGRCIsInQiOjF9/ZnJvbnRsZWZ0/inner-flasher.png"
            alt="Lightning fonts"
          ></img>
        </a>
      </div>
      <div className="main-container">
        <div
          className="flanking-block-left"
          style={{ width: screenWidth / 2 - 400 / 2 }}
        ></div>
        <div className="days-container">{mapDays()}</div>
        <div
          className="flanking-block-right"
          style={{ width: screenWidth / 2 - 400 / 2 }}
        ></div>
      </div>
    </>
  );
};

export default Acts;
