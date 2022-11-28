import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { socket } from "../App";

export const Screen = () => {
  const [tickers, setTickers] = useState([]);

  const deleteTicket = (name) => {
    socket.emit("delete", name);
  };

  const tickersFromRedux = useSelector((state) => state);

  useEffect(() => {
    tickersFromRedux.length > 0 &&
      setTickers((prevState) => {
        return tickersFromRedux.map((newItem) => {
          const prevItem = prevState.find(
            (item) => item.ticker === newItem.ticker
          );
          let price_change = "no";
          if (prevItem?.price < newItem.price) price_change = "up";
          if (prevItem?.price > newItem.price) price_change = "down";
          return {
            ...newItem,
            price_change,
          };
        });
      });
  }, [tickersFromRedux]);

  const getColorByPriceChanged = (data) => {
    switch (data) {
      case "up":
        return "#EA4C4C";
      case "down":
        return "#4CEA4C";
      default:
        return "white";
    }
  };

  return (
    // tickers.length > 0 &&    (
    <table className="tickers_table" data-testid="dashboard">
      <thead>
        <tr className="ticker_row">
          <th>Ticker</th>
          <th className="ticker_price">Price</th>
          <th className="ticker_change">Change:</th>
          <th className="ticker_change_percent">Change percent</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickers &&
          tickers.map((ticker) => {
            return (
              <tr className="ticker_row" key={ticker.ticker}>
                <td className="ticker_name"> {ticker.ticker} </td>
                {/* <td className="ticker_exchange">{ticker.exchange}</td> */}
                <td
                  className="ticker_price"
                  style={{
                    backgroundColor: getColorByPriceChanged(
                      ticker.price_change
                    ),
                  }}
                >
                  {ticker.price}
                </td>
                <td className="ticker_change">{ticker.change}</td>
                <td className="ticker_change_percent">
                  {ticker.change_percent}
                </td>
                <td className="ticker_del--item">
                  <button
                    className="ticker_del--btn"
                    onClick={() => {
                      deleteTicket(ticker.ticker);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
    // )
  );
};
