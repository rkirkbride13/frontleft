import { FormEvent } from "react";
// import { IAct } from "../../../../api/src/models/acts";
import serverURL from "../../serverURL";

interface ActInt {
  act: any;
  token: string | null;
  setActs: React.Dispatch<React.SetStateAction<any[]>>;
}

const Act = ({ act, token, setActs }: ActInt) => {
  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(serverURL() + "/acts", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        act_id: act._id,
      },
    });

    if (response.status !== 200) {
      console.log("act NOT deleted");
    } else {
      console.log("act deleted");

      if (token) {
        fetch(serverURL() + "/acts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then(async (data) => {
            setActs(data.acts);
          });
      }
    }
  };

  return (
    <>
      <p className="day-acts" data-cy="act">
        <form onSubmit={handleDelete}>
          <input data-cy="delete-button" type="submit" value="X" />
        </form>
        - {act.name} - {act.start} to {act.end}
      </p>
    </>
  );
};

export default Act;
