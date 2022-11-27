import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useState, useEffect } from "react";
import { socket } from "../App";
import { snp500 } from "./snp500";

export const Add = () => {
  const [input, setInput] = useState();
  const [error, setError] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const filter = () => {
    return snp500
      .filter((ticket) => {
        return ticket.toUpperCase().includes(input.toUpperCase());
      })
      .map((ticket) => {
        return (
          <li key={ticket} className="filtered_item">
            <button
              onClick={() => {
                onSubmit(ticket);
              }}
            >
              {ticket}
            </button>
          </li>
        );
      });
  };

  const onSubmit = (name) => {
    socket.emit("addTicker", name.toUpperCase());
  };

  socket.on("exist", (data) => {
    setError(data);
  });

  useEffect(() => {
    error && Notify.failure(`${error} is already in you watch list!`);
  }, [error]);

  return (
    <div>
      <p>Find a ticker to add this to your watch list</p>
      <input
        type="text"
        placeholder="Type tickers name"
        value={input}
        data-testid="input"
        onChange={onChange}
      />

      {input && (
        <div>
          <h3>We have found:</h3>

          <ul className="filtered_list">
            {filter().length > 0 ? (
              filter()
            ) : (
              <p className="error_message">
                Sorry, We did not find any tickers under your request...
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
