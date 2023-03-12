import React, { useEffect, useState } from "react";
import { IAct } from "../../../../api/src/models/acts";
import { NavigateFunction } from "react-router";

interface DayInt {
  navigate: NavigateFunction;
}

const Friday = ({ navigate }: DayInt) => {
  const [acts, setActs] = useState<Array<IAct>>([]);
  const [token] = useState<string | null>(window.localStorage.getItem("token"));
  const [stages, setStages] = useState<Array<string>>([]);
  const [actsData, setActsData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (token) {
      fetch("/acts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data.acts)
          setActs(filterByDay(data.acts));
          setStages(mapStages(data.acts));
          console.log(stages);
          console.log(acts)
          // acts.forEach((act) => {
          //   const start = act.start;
          //   const end = act.end;
          //   const startPosition = (start - 0) * 50;
          //   const width = (end - start) * 50;
          //   data[act.id] = {
          //     start,
          //     end,
          //     startPosition,
          //     width,
          //   };
          // });
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

  const mapStages = (acts: Array<IAct>): Array<string> => {
    return Array.from(new Set(acts.map((act) => act.stage)));
  };

  const chartData = acts.map((act) => {
    const duration = act.end - act.start;
    return {
      stage: act.stage,
      start: act.start,
      duration: duration,
      name: act.name,
    };
  });

  // const setChartActs = () => {
  //   return stages.map((stage) => {
  //     return (
  //       <tr>
  //         <th>{stage}</th>
  //       </tr>
  //     );
  //   });
  // };

  return (
    <div className="act-chart">
      <table>
        <thead>
          <tr>
            <th></th>
            {[...Array(24)].map((_, i) => (
              <th key={i}>{i + 0}:00</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stages.map((stage) => (
            <tr key={stage}>
              <th>{stage}</th>
              {[...Array(24)].map((_, i) => (
                <td key={i} className="cell">
                  {chartData.map((data) => {
                    if (data.stage === stage && data.start === i) {
                      const left = (data.start / 24) * 100 + "%";
                      const width = (data.duration / 24) * 100 + "%";
                      return (
                        <div
                          className="act"
                          style={{ left: left, width: width }}
                        >
                          {data.name}
                        </div>
                        
                      );
                    }
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Friday;
