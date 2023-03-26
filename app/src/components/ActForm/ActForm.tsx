import React, { useState, FormEvent, ChangeEvent, ReactElement } from "react";
import { NavigateFunction } from "react-router";
// import { IAct } from "../../../../api/src/models/acts";
import serverURL from "../../serverURL";

interface ActFormInt {
  navigate: NavigateFunction;
  token: string | null;
  setActs: React.Dispatch<React.SetStateAction<any[]>>;
}

const ActForm = ({ navigate, token, setActs }: ActFormInt): ReactElement => {
  const handleChange = (
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setFunction(event.target.value);
    };
  };

  const [name, setName] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!token) {
      navigate("/");
    } else {
      fetch(serverURL() + "/acts", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          stage: stage,
          date: date,
          start: start,
          end: end,
        }),
      }).then((response) => {
        if (response.status === 200) {
          console.log("Success");
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
          console.log("No luck");
        }
      });
    }
  };

  return (
    <>
      <div className="form-page">
        <br></br>
        <div className="header">Who would you like to see?</div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Name: </label>
            <input
              className="input"
              placeholder="Band, DJ etc.."
              id="name"
              data-cy="name"
              type="text"
              style={{ width: "120px" }}
              value={name}
              onChange={handleChange(setName)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="stage">Stage: </label>
            <input
              className="input"
              placeholder="Where are they"
              id="stage"
              data-cy="stage"
              type="text"
              style={{ width: "120px" }}
              value={stage}
              onChange={handleChange(setStage)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="date">Time: </label>
            <input
              className="input"
              placeholder="Date"
              id="date"
              data-cy="date"
              type="datetime-local"
              value={date}
              onChange={handleChange(setDate)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="start">Start: </label>
            <input
              className="input"
              placeholder="E.g. 2030"
              id="start"
              data-cy="start"
              type="number"
              value={start}
              onChange={handleChange(setStart)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="end">End: </label>
            <input
              className="input"
              placeholder="Until when"
              id="end"
              data-cy="end"
              type="number"
              value={end}
              onChange={handleChange(setEnd)}
            />
          </div>
          <input
            className="save"
            id="submit"
            data-cy="submit-act"
            type="submit"
            value="Save"
            style={{ marginLeft: 125 }}
          />
        </form>
      </div>
    </>
  );
};

export default ActForm;
