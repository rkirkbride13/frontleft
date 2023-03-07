import React, { useState, FormEvent, ChangeEvent, ReactElement } from "react";

const ActForm = (): ReactElement => {
  const handleChange = (
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setFunction(event.target.value);
    };
  };
  
  const [token] = useState(window.localStorage.getItem("token"))
  const [name, setName] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    fetch("/acts", {
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
      if (response.status === 201) {
        console.log("Success");
      } else {
        console.log("No luck");
      }
    });
  };

  return (
    <>
      <div className="logo">
        <img
          src="https://see.fontimg.com/api/renderfont4/ARpL/eyJyIjoiZnMiLCJoIjo3MSwidyI6MTAwMCwiZnMiOjcxLCJmZ2MiOiIjOTYxNUM4IiwiYmdjIjoiI0ZERkRGRCIsInQiOjF9/ZnJvbnRsZWZ0/inner-flasher.png"
          alt="Lightning fonts"
        ></img>
      </div>
      <div className="formPage">
        <br></br>
        <div className="header">Who would you like to see?</div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            className="input"
            placeholder="Band, DJ etc.."
            id="name"
            type="text"
            style={{ width: "120px" }}
            value={name}
            onChange={handleChange(setName)}
          />
          <br></br>
          <label htmlFor="stage">Stage: </label>
          <input
            className="input"
            placeholder="Where are they"
            id="stage"
            type="text"
            style={{ width: "120px" }}
            value={stage}
            onChange={handleChange(setStage)}
          />
          <br></br>
          <label htmlFor="date">Date: </label>
          <input
            className="input"
            placeholder="Date"
            id="date"
            type="datetime-local"
            value={date}
            onChange={handleChange(setDate)}
          />
          <br></br>
          <label htmlFor="start">Start: </label>
          <input
            className="input"
            placeholder="When are they on"
            id="start"
            type="number"
            value={start}
            onChange={handleChange(setStart)}
          />
          <br></br>
          <label htmlFor="end">End: </label>
          <input
            className="input"
            placeholder="Until what time"
            id="end"
            type="number"
            value={end}
            onChange={handleChange(setEnd)}
          />
          <br></br>
          <br></br>
          <input
            className="submit"
            id="submit"
            type="submit"
            value="Save this act"
          />
        </form><br></br>
        <a href='/acts'>Go to saved</a>
      </div>
    </>
  );
};

export default ActForm;
