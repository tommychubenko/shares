import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import io from "socket.io-client";

import { Add } from "./components/addTicker";
import { setTickers } from "./components/redux/slice";
import { Screen } from "./components/screen";
import { SpeedControl } from "./components/speedControl";

export const socket = io("http://localhost:4000");

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("start");
    socket.on("connection", () => {});
    socket.on("disconnect", () => {});
    socket.on("ticker", (response) => {
      dispatch(setTickers(response));
    });

    return () => {
      socket.off("connection");
      socket.off("disconnect");
      socket.off("ticker");
    };
  }, []);
  return (
    <div>
      <Screen />
      <Add />
      <SpeedControl />
    </div>
  );
};

export default App;
