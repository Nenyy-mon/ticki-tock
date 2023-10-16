import { useState } from "react"
import TimeCrementing from "./TimeCrementing";


function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60)
  const [breakTime, setBreakTime] = useState(5*60)
  const [sessionTime, setSessionTime] = useState(25 * 60)
  const [timerOn, setTimerOn] = useState(false)
  const [onBreak, setOnBreak] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [breakSound, setBreakSound] = useState(new Audio("./src/sound/Game Over sound effect.mp3"))

  const playBreakSound = () => {
    breakSound.currentTime = 0;
    breakSound.play();
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
  }

  const changeTimer = (amount, type) => {
    if(type === "break") {
      if(breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime(prev => prev + amount)
    } else {
    if(type === "session") {
      if(sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime(prev => prev + amount)
        if(!timerOn) {
        setDisplayTime(sessionTime + amount)
      }
    }
    }
  }

  const controlTime = () => {
    if (!timerOn) {
      // Timer is starting
      let interval = setInterval(() => {
        setDisplayTime((prev) => {
          if (prev <= 0) {
            playBreakSound();
            if (onBreak) {
              // Transition from break to session
              setOnBreak(false);
              return sessionTime;
            } else {
              // Transition from session to break
              setOnBreak(true);
              return breakTime;
            }
          }
          return prev - 1;
        });
      }, 1000);

      localStorage.clear();
      localStorage.setItem("intervalId", interval);
    } else {
      // Timer is pausing
      clearInterval(localStorage.getItem("intervalId"));
    }
    setTimerOn(!timerOn);
  };
  const resetTime = () => {
    setDisplayTime(25*60)
    setBreakTime(5*60)
    setSessionTime(25*60)
  }


  return (
    <div className="app">

      <h1>Pomodoriiiii</h1>
      
      <div 
      className="crementatiom">
        <TimeCrementing
          title={"Break length"}
          changeTimer={changeTimer}
          time={breakTime}
          type={"break"}
          formatTime={formatTime} />
        <TimeCrementing
          title={"Session length"}
          changeTimer={changeTimer}
          time={sessionTime}
          type={"session"}
          formatTime={formatTime} />
      </div>
    
      <h3>{onBreak ? "Break" : "Session"}</h3>
      <h2>{formatTime(displayTime)}</h2>
   
    <button
    onClick={controlTime}>
      {!timerOn ? "▶" : "||"}
    </button>

    <button
    onClick={resetTime}>
      ⮌
    </button>
    
    </div>
  )
}

export default App
