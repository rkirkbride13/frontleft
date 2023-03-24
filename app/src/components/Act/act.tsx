const Act = ({ act }: any) => {
  return (
    <>
      <p className="day-acts" data-cy="act">
        {act.name} - {act.start} to {act.end}
      </p>
    </>
  );
};

export default Act;
