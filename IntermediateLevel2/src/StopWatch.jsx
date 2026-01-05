import { useState, useEffect } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0); // milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [mode, setMode] = useState("stopwatch"); // "stopwatch" | "countdown"
  const [duration, setDuration] = useState(0); // seconds

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (mode === "countdown") {
            if (prev <= 0) {
              clearInterval(interval);
              setIsRunning(false);
              return 0;
            }
            return prev - 10;
          }
          return prev + 10;
        });
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  // ⏱ Format time MM:SS.ms
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(milliseconds).padStart(2, "0")}`;
  };

  // ▶ Start / Stop
  const toggleTimer = () => {
    if (mode === "countdown" && time === 0) return;
    setIsRunning((prev) => !prev);
  };

  // 🔄 Reset (BACK TO STOPWATCH MODE)
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setMode("stopwatch"); // ✅ critical fix
  };

  // 🏷 Lap
  const recordLap = () => {
    if (!isRunning || mode !== "stopwatch") return;
    setLaps((prev) => [...prev, formatTime(time)]);
  };

  // ⏳ Set Countdown
  const setCountdown = () => {
    if (duration <= 0) return;
    setIsRunning(false);
    setTime(duration * 1000);
    setLaps([]);
    setMode("countdown");
  };

  return (
    <div style={{ width: "300px", margin: "40px auto", textAlign: "center" }}>
      <h2>{formatTime(time)}</h2>

      <div>
        <button onClick={toggleTimer}>
          {isRunning ? "Stop" : "Start"}
        </button>

        <button onClick={resetTimer}>Reset</button>

        {mode === "stopwatch" && (
          <button onClick={recordLap} disabled={!isRunning}>
            Lap
          </button>
        )}
      </div>

      <hr />

      <div>
        <input
          type="number"
          placeholder="Seconds"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <button onClick={setCountdown}>Set Countdown</button>
      </div>

      {laps.length > 0 && (
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <h3>Laps</h3>
          {laps.map((lap, index) => (
            <p key={index}>
              Lap {index + 1}: {lap}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
