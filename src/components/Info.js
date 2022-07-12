import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../API";
import { GetCryptoValues } from "../CryptoContext";
import Chart from "./Chart";

export default function Info() {
  const [coins, setCoins] = useState([]);
  const { id } = useParams();
  const { currency, symbol } = GetCryptoValues();
  async function fetchCoinData() {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    setCoins(data);
  }
  console.log(coins);
  useEffect(() => {
    (async () => {
      fetchCoinData();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const temp = coins?.market_cap_rank;

  function checkPrice() {
    if (currency === "INR")
      return coins?.market_data?.current_price[
        currency.toLowerCase()
      ].toLocaleString("en-IN", { style: "currency", currency: "INR" });
    else if (currency === "USD")
      return coins?.market_data?.current_price[
        currency.toLowerCase()
      ].toLocaleString("en-US", { style: "currency", currency: "USD" });
  }

  function checkMarketCap() {
    if (currency === "INR")
      return coins?.market_data?.market_cap[currency.toLowerCase()]
        .toLocaleString("en-IN", { style: "currency", currency: "INR" })
        .slice(0, -7);
    else if (currency === "USD")
      return coins?.market_data?.market_cap[currency.toLowerCase()]
        .toLocaleString("en-US", { style: "currency", currency: "USD" })
        .slice(0, -7);
  }
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-3">
          <img
            src={coins?.image?.large}
            alt="image_crypto"
            style={{ padding: "8px" }}
          />
          <h1 className="text-center" style={{ fontSize: "50px" }}>
            {coins?.name}
          </h1>
          <p>{coins?.description?.en.split(".")[0]}</p>
          <br />
          <p>
            <strong>Rank:</strong>
            {"  "}
            {temp}
          </p>
          <p>
            <strong>Current Price:</strong>
            {"  "}
            {checkPrice()}
          </p>
          <p>
            <strong>Market Cap:</strong> {checkMarketCap()}M
          </p>
        </div>

        <div
          className="col-9"
          style={{ borderLeft: "3px solid white", height: "100vh" }}
        >
          <Chart coins={coins} />
        </div>
      </div>
    </div>
  );
}
