import React, { useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
import { IAct } from "../../../../api/src/models/acts";

interface ActsInt {
  navigate: NavigateFunction;
}

const Acts = ({ navigate }: ActsInt) => {
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
          setActs(data.acts);
          const uniqueStages = Array.from(
            new Set(acts.map((act) => act.stage))
          );
          setStages(uniqueStages);
        });
    } else {
      navigate("/signin");
    }
  }, []);

  const sortByDate = (acts: Array<IAct>): Array<IAct> => {
    return acts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const sortedActs = sortByDate(acts);

  const printStages = () => {
    return (
      <>
        {stages.map((stage) => {
          return (
            <>
              <div className="stageContainer">
                {stage}
                <div className="actsContainer">
                  {sortedActs
                    .filter((acts) => acts.stage === stage)
                    .map((act) => {
                      return (
                        <>
                          <div className="act">
                            {act.name} - {act.start} to {act.end}
                          </div>
                        </>
                      );
                    })}
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
      <main id="main-container">
      <div className="logo">
        <a href ="/"><img
          src="https://see.fontimg.com/api/renderfont4/ARpL/eyJyIjoiZnMiLCJoIjo3MSwidyI6MTAwMCwiZnMiOjcxLCJmZ2MiOiIjOTYxNUM4IiwiYmdjIjoiI0ZERkRGRCIsInQiOjF9/ZnJvbnRsZWZ0/inner-flasher.png"
          alt="Lightning fonts"
        ></img></a>
      </div>
        <div>{printStages()}</div>
      </main>
    </>
  );
};

export default Acts;
