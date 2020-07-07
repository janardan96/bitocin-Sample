import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Chart from "./chart";




const useStyles = makeStyles(theme => ({
  chartContainer: {
    height: 400
  }

}));

const App = () => {
  const classes = useStyles();
  const [label, setLabel] = useState([]);
  const [valueData, setData] = useState([])
  const [high, setHigh] = useState([]);
  const [low, setLow] = useState([]);

  useEffect(() => {
    const subscribe = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: ["BTC-USD"]
        }
      ]
    };

    let ws = new WebSocket("wss://ws-feed.gdax.com");
    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };

    ws.onmessage = e => {
      const value = JSON.parse(e.data);
      if (value.type !== "ticker") {
        return;
      }


      setLabel([...label, new Date().toLocaleTimeString()])
      setData([...valueData, value.price])
      setHigh([...high, value.high_24h])
      setLow([...low, value.low_24h])


    }

    return () => {
      ws.close()
    }
  })



  return (
    <div className={classes.chartContainer}>
      <Chart
        data={valueData}
        label={label}
        high={high}
        low={low}
      />
    </div>
  );

}

export default App;