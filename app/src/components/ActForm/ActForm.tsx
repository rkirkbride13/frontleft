import React, { useState, FormEvent, ChangeEvent, ReactElement } from "react";

const ActForm = (): ReactElement => {
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

    fetch("/acts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
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
      <div className="actForm">
        <div className="header">Who would you like to see?</div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            placeholder="Name"
            id="name"
            type="text"
            value={name}
            onChange={handleChange(setName)}
          />
          <br></br>
          <br></br>
          <label htmlFor="name">Stage: </label>
          <input
            placeholder="Stage"
            id="stage"
            type="text"
            value={stage}
            onChange={handleChange(setStage)}
          />
          <br></br>
          <br></br>
          <label htmlFor="name">Date: </label>
          <input
            placeholder="Date"
            id="date"
            type="date"
            value={date}
            onChange={handleChange(setDate)}
          />
          <br></br>
          <br></br>
          <label htmlFor="name">Start: </label>
          <input
            placeholder="Start"
            id="start"
            type="number"
            value={start}
            onChange={handleChange(setStart)}
          />
          <br></br>
          <br></br>
          <label htmlFor="name">End: </label>
          <input
            placeholder="End"
            id="end"
            type="number"
            value={end}
            onChange={handleChange(setEnd)}
          />
          <br></br>
          <br></br>
          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default ActForm;
