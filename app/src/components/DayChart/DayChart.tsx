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
  const chartData = acts.map((act) => {
    let duration;
    (act.end - act.start) % 100 === 0
      ? (duration = act.end - act.start)
      : (duration = ((act.end - act.start) * 1.5) / 1.3);
    return {
      stage: act.stage,
      start: act.start,
      duration: duration,
      name: act.name,
    };
  });

  return (
    <>
      <div className="fixed-logo" style={{ padding: 2155 / 2 - 340 / 2 }}>
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
              <th></th>
              {[...Array(25)].map((_, i) => (
                <th key={i}>{i + 0}00</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stages.map((stage) => (
              <tr key={stage}>
                <th className="stage-cell">{stage}</th>
                {[...Array(25)].map((_, i) => (
                  <td key={i} className="cell">
                    {chartData.map((data) => {
                      if (data.stage === stage && data.start === i * 100) {
                        const left = 50 + "%";
                        const width = data.duration + "%";
                        return (
                          <div
                            className="act"
                            style={{ left: left, width: width }}
                            key={data.name}
                          >
                            {data.name}
                          </div>
                        );
                      } else if (
                        data.stage === stage &&
                        data.start === (i + 0.3) * 100
                      ) {
                        const left = 100 + "%";
                        const width = data.duration + "%";
                        return (
                          <div
                            className="act"
                            style={{ left: left, width: width }}
                            key={data.name}
                          >
                            {data.name}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </td>
                ))}
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
