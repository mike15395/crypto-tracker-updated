import { CChart } from "@coreui/react-chartjs";
import React, { useEffect } from "react";
import { HistoricalChart, TrendingCoins } from "../API";
import { useParams } from "react-router-dom";
import { GetCryptoValues } from "../CryptoContext";
import axios from "axios";
import { useState } from "react";

export default function Chart() {
  const [chartPrices, setChartPrice] = useState([]);
  const [chartMarketCap, setChartMarketCap] = useState([]);

  const { id } = useParams();
  const { currency } = GetCryptoValues();

  useEffect(() => {
    fetchChartData();
  }, [currency]);

  async function fetchChartData() {
    const { data } = await axios.get(HistoricalChart(id, 365, currency));
    console.log(data);
    setChartPrice(data.prices);
    setChartMarketCap(data.market_caps);
  }

  console.log(chartMarketCap);
  function displayMarketCaps() {
    let market = [];
    for (let i = 0; i < chartMarketCap.length; i++) {
      market.push(chartMarketCap[i][1]);
    }
    return market;
  }
  function displayPrices() {
    let prices = [];
    for (let i = 0; i < chartPrices.length; i++) {
      prices.push(chartPrices[i][1]);
    }
    return prices;
  }

  function displayDays() {
    let arr = [];
    for (let i = 0; i < 367; i++) {
      arr[i] = i;
    }
    return arr;
  }

  return (
    <div>
      <CChart
        type="line"
        data={{
          labels: displayDays(),
          datasets: [
            {
              label: "Market Prices",
              backgroundColor: "rgba(220, 220, 220, 0.2)",
              borderColor: "gold",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "black",
              data: displayPrices(),
            },
            {
              label: "Market Cap",
              backgroundColor: "rgba(220, 220, 220, 0.2)",
              borderColor: "gold",
              pointBackgroundColor: "rgba(210, 210, 210, 1)",
              pointBorderColor: "black",
              data: displayMarketCaps(),
            },
          ],
        }}
      />
    </div>
  );
}
