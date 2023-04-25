import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import Act from "../Act/act";
import ActForm from "../ActForm/ActForm";
import serverURL from "../../serverURL";
import PictureForm from "../PictureForm/PictureForm";

// Define the expected props for the Acts component
interface ActsInt {
  navigate: NavigateFunction;
  setDayChart: Dispatch<SetStateAction<string | undefined>>;
}

const Acts = ({ navigate, setDayChart }: ActsInt) => {
  // Define state variables for the component
  const [acts, setActs] = useState<Array<any>>([]);
  const [token] = useState<string | null>(window.localStorage.getItem("token"));
  const [days, setDays] = useState<Array<string>>([]);
  const [screenWidth, setSceenWidth] = useState(window.innerWidth);
  // Fetch the acts and set the state when the component mounts
  useEffect(() => {
    if (token) {
      fetch(serverURL() + "/acts", {
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
    // Add event listener to update screen width state on window resize
    const handleResize = () => {
      setSceenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Create a list of days with acts to facilitate grouping of acts
  useEffect(() => {
    const uniqueDays = Array.from(
      new Set(acts.map((act) => convertDateToDay(act.date)))
    );
    setDays(uniqueDays);
  }, [acts]);
  // Sort acts by date
  const sortByDate = (acts: Array<any>): Array<any> => {
    return acts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const sortedActs = sortByDate(acts);
  // Convert a date to a day of the week
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
  // Map each day to a block of acts, each with a link to the DayChart component
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
                      <Act
                        key={act._id}
                        act={act}
                        token={token}
                        setActs={setActs}
                      />
                    ))}
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  // Render the userActs, along with the PictureForm and ActForm components
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
          <PictureForm navigate={navigate} token={token} />
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
