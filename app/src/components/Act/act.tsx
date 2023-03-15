import { IAct } from "../../../../api/src/models/acts";

interface ActProps {
  act: IAct;
}

const Act = ({ act }: ActProps) => {
  return (
    <>
      <p className="day-acts">
        {act.name} - {act.start} to {act.end}
      </p>
    </>
  );
};

export default Act;
