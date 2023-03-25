import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { IAct } from "../../../../api/src/models/acts";
import Act from "../Act/act";
import ActForm from "../ActForm/ActForm";

interface ActsInt {
  navigate: NavigateFunction;
  setDayChart: Dispatch<SetStateAction<string | undefined>>;
}

const Acts = ({ navigate, setDayChart }: ActsInt) => {
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

  useEffect(() => {
    const uniqueDays = Array.from(
      new Set(acts.map((act) => convertDateToDay(act.date)))
    );
    setDays(uniqueDays);
    console.log(days);
  }, [acts]);

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
          return (
            <>
              <div key={day} className="day-block">
                <p className="stage">
                  <Link onClick={() => setDayChart(day)} to={`/day/${day}`}>
                    {day}
                  </Link>
                </p>
                <div data-cy="acts">
                  {sortedActs
                    .filter((acts) => convertDateToDay(acts.date) === day)
                    .map((act) => (
                      <Act key={act._id} act={act} token={token} setActs={setActs} />
                    ))}
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
        <a href="/">
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
        <div className="acts-container">
          <ActForm navigate={navigate} setActs={setActs} token={token} />
          <div className="days-container">{mapDays()}</div>
        </div>
        <div
          className="flanking-block-right"
          style={{ width: screenWidth / 2 - 400 / 2 }}
        ></div>
      </div>
    </>
  );
};

export default Acts;
