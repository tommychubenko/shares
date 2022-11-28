import { useState, useEffect } from "react";
import { socket } from "../App";

export const SpeedControl = () => {
  const [speed, setSpeed] = useState([]);
  useEffect(() => {
    socket.on("speedInfo", (resp) => {
      setSpeed(resp);
    });

    return () => {
      socket.off("speedInfo");
    };
  }, []);

  const speedStep = 500;

  const increaseSpeed = () => {
    socket.emit("clearInterval");
    socket.emit("increaseSpeed", speedStep);
    socket.emit("start");
  };

  const decreaseSpeed = () => {
    socket.emit("clearInterval");
    socket.emit("decreaseSpeed", speedStep);
    socket.emit("start");
  };

  return (
    <div data-testid="speed-control">
      <div className="speed_control">
        <button
          className="speed_control--btn"
          onClick={() => {
            speed > 1000 && increaseSpeed();
          }}
        >
          Increase speed
        </button>
        <button
          className="speed_control--btn"
          onClick={() => {
            speed < 5000 && decreaseSpeed();
          }}
        >
          Decrease speed
        </button>
      </div>
      <p>Actual speed of fetching data is: </p>
      <p>
        <b>{speed && speed / 1000}</b> seconds for request
      </p>
    </div>
  );
};
