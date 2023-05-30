import { filter } from "cypress/types/bluebird";
import React, { useState, FormEvent, ChangeEvent, ReactElement } from "react";
import { NavigateFunction } from "react-router";
import serverURL from "../../serverURL";
import { lineup } from "./lineup";
import { stages } from "./stages";

// Define the expected props for the ActForm component
interface ActFormInt {
  navigate: NavigateFunction;
  token: string | null;
  setActs: React.Dispatch<React.SetStateAction<any[]>>;
}

const ActForm = ({ navigate, token, setActs }: ActFormInt): ReactElement => {
  // Define a function to handle changes to an input field
  const handleChange = (
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setFunction(event.target.value);
    };
  };
  // Define state variables for the input fields
  const [name, setName] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  // Define a function to handle form submission
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!token) {
      // If the user is not authenticated, navigate to the home page
      navigate("/");
    } else {
      // Else send a POST request to the server to create a new act
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
          // Fetch the updated list of acts from the server
          fetch(serverURL() + "/acts", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then(async (data) => {
              // Update the state of the parent component with the updated list of acts

              setActs(data.acts);
            });
        } else {
          console.log("No luck");
        }
      });
    }
  };

  const stageOptions = () => {
    return stages.map((stage) => (
      <option key={stage} value={stage}>
        {stage}
      </option>
    ));
  };

  const performerOptions = () => {
    return lineup.map((act) => (
      <option value={act.performer}>{act.performer}</option>
    ));
  };

  const startOptions = () => {
    const filteredLineup = lineup.filter((act) => act.performer === name);
    return filteredLineup.map((act) => (
      <option value={act.start.replace(":", "")}>
        {act.start.replace(":", "")}
      </option>
    ));
  };

  const endOptions = () => {
    const filteredLineup = lineup.filter((act) => act.performer === name);
    return filteredLineup.map((act) => (
      <option value={act.end.replace(":", "")}>
        {act.end.replace(":", "")}
      </option>
    ));
  };

  // Render a form for creating a new act
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
              list="performers"
              style={{ width: "120px" }}
              value={name}
              onChange={handleChange(setName)}
            />
            <datalist id="performers">{performerOptions()}</datalist>
          </div>
          <div className="form-row">
            <label htmlFor="stage">Stage: </label>
            <input
              className="input"
              placeholder="Where are they"
              id="stage"
              data-cy="stage"
              type="text"
              list="stages"
              style={{ width: "120px" }}
              value={stage}
              onChange={handleChange(setStage)}
            />
            <datalist id="stages">{stageOptions()}</datalist>
          </div>
          <div className="form-row">
            <label htmlFor="date">Date: </label>
            <input
              className="input"
              placeholder="Date"
              id="date"
              data-cy="date"
              type="datetime-local"
              min="2023-06-22T12:00"
              max="2023-06-26T06:00"
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
              list="starts"
              data-cy="start"
              value={start}
              onChange={handleChange(setStart)}
            />
            <datalist id="starts">{startOptions()}</datalist>
          </div>
          <div className="form-row">
            <label htmlFor="end">End: </label>
            <input
              className="input"
              placeholder="Until when"
              id="end"
              list="ends"
              data-cy="end"
              value={end}
              onChange={handleChange(setEnd)}
            />
            <datalist id="ends">{endOptions()}</datalist>
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
