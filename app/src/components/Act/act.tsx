import React from "react";
import { IAct } from "../../../../api/src/models/acts";

interface ActProps {
  act: IAct;
  token: string | null;
  setActs: React.Dispatch<React.SetStateAction<IAct[]>>;
}

const Act = ({ act, token, setActs }: ActProps) => {
  return (
    <>
      <div className="act">
        <p>
          {act.name} - {act.start} to {act.end}
        </p>
      </div>
    </>
  );
};

export default Act;
