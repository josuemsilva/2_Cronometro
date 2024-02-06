const LapHistory = ({ lapsHistory, resetHistory, historyOn }) => {
  return (
    <div className="lap-history">
      {historyOn && <button onClick={resetHistory}>Limpar Histórico</button>}
      <ul>
        {lapsHistory.map((lap, index) => (
          <li key={index}>
            Volta {index + 1}: {lap}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LapHistory;
