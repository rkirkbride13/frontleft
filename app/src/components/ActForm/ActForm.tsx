import React, {
  useState,
  FormEvent,
  ChangeEvent,
  ReactElement,
  useEffect,
} from "react";
import { NavigateFunction } from "react-router";

interface ActFormInt {
  navigate: NavigateFunction;
}

const ActForm = ({ navigate }: ActFormInt): ReactElement => {
  const handleChange = (
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setFunction(event.target.value);
    };
  };

  const [token] = useState(window.localStorage.getItem("token"));
  const [name, setName] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [screenWidth, setSceenWidth] = useState(window.innerWidth);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!token) {
      navigate("/");
    } else {
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
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSceenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                type="datetime-local"
                value={date}
                onChange={handleChange(setDate)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="start">Start: </label>
              <input
                className="input"
                placeholder="When are they on"
                id="start"
                type="number"
                value={start}
                onChange={handleChange(setStart)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="end">End: </label>
              <input
                className="input"
                placeholder="Until what time"
                id="end"
                type="number"
                value={end}
                onChange={handleChange(setEnd)}
              />
            </div>
            <br></br>
            <div className="submit-with-link">
              <input
                className="submit"
                id="submit"
                type="submit"
                value="Save"
              />
              <a href="/acts">Go to saved</a>
            </div>
          </form>
          <br></br>
        </div>
        <div
          className="flanking-block-right"
          style={{ width: screenWidth / 2 - 400 / 2 }}
        ></div>
      </div>
    </>
  );
};

export default ActForm;
