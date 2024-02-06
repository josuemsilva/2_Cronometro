import LapList from "./LapList";
import LapHistory from "./LapHistory";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import "./Timer.css";
import "react-toastify/dist/ReactToastify.css";

import redCircleImg from "../../public/1f534.png";

const Timer = () => {
  useEffect(() => {
    const recoveredLaps =
      JSON.parse(localStorage.getItem("lapsHistory")) || undefined;
    setLapsHistory(recoveredLaps || []);
    if (recoveredLaps.length > 0) {
      setHistoryOn(true);
    }
  }, []);

  const [milliseconds, setMilliseconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [historyOn, setHistoryOn] = useState(false);
  const [laps, setLaps] = useState([]);
  const [lapsHistory, setLapsHistory] = useState([]);

  const formatTime = () => {
    const minutes = ("0" + (Math.floor(milliseconds / 60000) % 60)).slice(-2);
    const seconds = ("0" + (Math.floor(milliseconds / 1000) % 60)).slice(-2);
    const centiseconds = ("0" + (Math.floor(milliseconds / 10) % 100)).slice(
      -2
    );
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  const startTimer = (interval) => {
    return setInterval(() => {
      setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);
    }, 10);
  };

  const stopTimer = (interval) => {
    clearInterval(interval);
    return interval;
  };

  const resetTimer = () => {
    setMilliseconds(0);
    setTimerOn(false);
    setLaps([]);
  };

  const addLap = () => {
    if (lapsHistory.length >= 21) {
      toast.error("Limite atingido");
    } else {
      setLaps((prevLaps) => [...prevLaps, formatTime()]);
      setLapsHistory((prevHistory) => [...prevHistory, formatTime()]);
      setHistoryOn(true);
    }
  };

  const resetHistory = () => {
    localStorage.clear("lapsHistory");
    setLapsHistory([]);
    setHistoryOn(false);
  };

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = startTimer(interval);
    } else {
      interval = stopTimer(interval);
    }

    return () => stopTimer(interval);
  }, [timerOn]);

  useEffect(() => {
    localStorage.setItem("lapsHistory", JSON.stringify(lapsHistory));
  }, [lapsHistory]);

  return (
    <>
      <div className="timer-container">
        <img className="redCircleImg" src={redCircleImg} />
        <TimerDisplay time={formatTime()} />

        <TimerControls
          timerOn={timerOn}
          onStart={() => setTimerOn(true)}
          onStop={() => setTimerOn(false)}
          onReset={resetTimer}
          onLap={addLap}
        />
        <LapList laps={laps} />
      </div>
      <LapHistory
        lapsHistory={lapsHistory}
        resetHistory={resetHistory}
        historyOn={historyOn}
      />
    </>
  );
};

export default Timer;
