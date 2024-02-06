const LapList = ({ laps }) => {
  return (
    <div className="timer-laps">
      {laps.length > 0 && <h3>Voltas:</h3>}
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>
            Volta {index + 1}: {lap}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LapList;
