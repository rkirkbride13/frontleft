import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
import serverURL from "../../serverURL";

// Define the expected props for the Acts component
interface DayInt {
  navigate: NavigateFunction;
  dayChart: string | undefined;
}

const DayChart = ({ navigate, dayChart }: DayInt) => {
  // Define state variables for the component
  const [acts, setActs] = useState<Array<any>>([]);
  const [token] = useState<string | null>(window.localStorage.getItem("token"));
  const [stages, setStages] = useState<Array<string>>([]);
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
          setActs(filterByDay(data.acts, dayChart));
          setStages(mapStages(data.acts));
        });
    } else {
      navigate("/");
    }
  }, []);
  // Convert date object to day string
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
  // Filter acts based on selected day
  const filterByDay = (
    acts: Array<any>,
    selectedDay: string | undefined
  ): Array<any> => {
    return acts.filter((acts) => convertDateToDay(acts.date) === selectedDay);
  };
  // Map unique stages from all acts
  const mapStages = (acts: Array<any>): Array<string> => {
    return Array.from(new Set(acts.map((act) => act.stage)));
  };
  // Map chart data for each act
  const calculateDuration = (start: number, end: number) => {
    // Adjust for the case where music ends after midnight
    if (end < start) {
      end += 2400;
    }
    const startHour = Math.floor(start / 100);
    const startMinute = start % 100;
    const endHour = Math.floor(end / 100);
    const endMinute = end % 100;
    const difference =
      endHour * 60 + endMinute - (startHour * 60 + startMinute);
    const duration = (difference / 60) * 100;
    return Math.round(duration);
  };

  const chartData = acts.map((act) => {
    let duration;
    (act.end - act.start) % 100 === 0
      ? (duration = act.end - act.start)
      : (duration = calculateDuration(act.start, act.end));
    return {
      stage: act.stage,
      start: act.start,
      duration: duration,
      name: act.name,
    };
  });

  const setTimeHeader = [
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6,
  ];

  return (
    <>
      <div className="fixed-logo" style={{ padding: 2229 / 2 - 340 / 2 }}>
        <a href="/acts">
          <img
            src="https://see.fontimg.com/api/renderfont4/ARpL/eyJyIjoiZnMiLCJoIjo3MSwidyI6MTAwMCwiZnMiOjcxLCJmZ2MiOiIjOTYxNUM4IiwiYmdjIjoiI0ZERkRGRCIsInQiOjF9/ZnJvbnRsZWZ0/inner-flasher.png"
            alt="Lightning fonts"
          ></img>
        </a>
      </div>

      <div className="act-chart">
        <table>
          <thead>
            <tr>
              <th className="stage-header"></th>
              {setTimeHeader.map((time) => (
                <th className="cell-header" key={time}>
                  {time}00
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stages.map((stage) => (
              <tr key={stage}>
                <th className="stage-cell">{stage}</th>
                {[...Array(setTimeHeader.length)].map((_, i) => {
                  const headerStart = setTimeHeader[i] * 100;
                  const act = chartData.find((data) => {
                    const startInRange =
                      data.start >= headerStart &&
                      data.start < headerStart + 100;
                    return data.stage === stage && startInRange;
                  });
                  if (act) {
                    let width;
                    act.duration < 0
                      ? (width = act.duration + 2400 + "%")
                      : (width = act.duration + "%");
                    let left;
                    if (act.start === headerStart) {
                      left = 50 + "%";
                    } else if (act.start === headerStart + 5) {
                      left = 50 + 25 / 3.0 + "%";
                    } else if (act.start === headerStart + 10) {
                      left = 50 + 25 / 1.5 + "%";
                    } else if (act.start === headerStart + 15) {
                      left = 75 + "%";
                    } else if (act.start === headerStart + 20) {
                      left = 75 + 25 / 3.0 + "%";
                    } else if (act.start === headerStart + 25) {
                      left = 75 + 25 / 1.5 + "%";
                    } else if (act.start === headerStart + 30) {
                      left = 100 + "%";
                    } else if (act.start === headerStart + 35) {
                      left = 100 + 25 / 3.0 + "%";
                    } else if (act.start === headerStart + 40) {
                      left = 100 + 25 / 1.5 + "%";
                    } else if (act.start === headerStart + 45) {
                      left = 125 + "%";
                    } else if (act.start === headerStart + 50) {
                      left = 125 + 25 / 3.0 + "%";
                    } else if (act.start === headerStart + 55) {
                      left = 125 + 25 / 1.5 + "%";
                    }
                    return (
                      <td key={i} className="cell">
                        <div
                          className="act"
                          style={{ left: left, width: width }}
                          key={act.name}
                        >
                          {act.name}
                        </div>
                      </td>
                    );
                  } else {
                    return <td key={i} className="cell"></td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="base-block"></div>
    </>
  );
};

export default DayChart;
