import React, { useEffect, useState } from "react";
import { IAct } from "../../../../api/src/models/acts";
import { NavigateFunction } from "react-router";

interface DayInt {
  navigate: NavigateFunction;
}

const Sunday = ({ navigate }: DayInt) => {
  const [acts, setActs] = useState<Array<IAct>>([]);
  const [token] = useState<string | null>(window.localStorage.getItem("token"));
  const [stages, setStages] = useState<Array<string>>([]);
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
          console.log(data.acts);
          setActs(filterByDay(data.acts));
          setStages(mapStages(data.acts));
        });
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSceenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
    return acts.filter((acts) => convertDateToDay(acts.date) === "Sunday");
  };

  const mapStages = (acts: Array<IAct>): Array<string> => {
    return Array.from(new Set(acts.map((act) => act.stage)));
  };

  const chartData = acts.map((act) => {
    let duration;
    if ((act.end - act.start) % 100 === 0) {
      duration = act.end - act.start;
    } else if ((act.end - act.start - 30) % 100 === 0) {
      duration = ((act.end - act.start) * 1.5) / 1.3;
    } else {
      duration = ((act.end - act.start) * 1.5) / 1.7;
    }

    return {
      stage: act.stage,
      start: act.start,
      duration: duration,
      name: act.name,
    };
  });

  return (
    <>
      <div className="chart-container">
        <div className="logo" style={{ padding: 2155 / 2 - 340 / 2 }}>
          <img
            src="https://see.fontimg.com/api/renderfont4/ARpL/eyJyIjoiZnMiLCJoIjo3MSwidyI6MTAwMCwiZnMiOjcxLCJmZ2MiOiIjOTYxNUM4IiwiYmdjIjoiI0ZERkRGRCIsInQiOjF9/ZnJvbnRsZWZ0/inner-flasher.png"
            alt="Lightning fonts"
          ></img>
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
                          console.log(data.name, data.duration, width);
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
                          console.log(data.name, data.duration, width);

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
      </div>
    </>
  );
};

export default Sunday;
