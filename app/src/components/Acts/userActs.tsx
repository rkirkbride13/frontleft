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
  const [chunks, setChunks] = useState<Array<number>>([]);
  const [screenWidth, setSceenWidth] = useState(window.innerWidth);

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
    return days[date.getDay()];
  };

  const convertDateToChunk = (date: Date) => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const chunkStart = new Date(dayStart);
    if (date.getHours() >= 12) {
      chunkStart.setDate(dayStart.getDate() + 1);
      chunkStart.setHours(6, 0, 0, 0);
    } else {
      chunkStart.setHours(12, 0, 0, 0);
    }

    return chunkStart;
  };

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

    const handleResize = () => {
      setSceenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const uniqueChunks = Array.from(
      new Set(
        acts.map((act) => convertDateToChunk(new Date(act.date)).getTime())
      )
    );
    setChunks(uniqueChunks);
  }, [acts]);

  const sortByDate = (acts: Array<any>): Array<any> => {
    return acts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const sortedActs = sortByDate(acts);

  const mapDays = () => {
    return (
      <>
        {chunks.map((chunkTime) => {
          const chunkStart = new Date(chunkTime);
          const day = convertDateToDay(chunkStart);
          return (
            <>
              <div key={chunkTime} className="day-block">
                <p className="stage">
                  <Link onClick={() => setDayChart(day)} to={`/day/${day}`}>
                    {day}
                  </Link>
                </p>
                <div data-cy="acts">
                  {sortedActs
                    .filter((act) => {
                      const actDate = new Date(act.date);
                      const actChunkStart =
                        convertDateToChunk(actDate).getTime();
                      return actChunkStart === chunkTime;
                    })
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
