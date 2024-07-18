import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import api from "../utils/api";
import TableStocks from "./table/TableStocks";
import { useSearchParams } from "react-router-dom";
import Switch from "react-switch";

const Stock = () => {
  const [stock_data, setstock_data] = useState([]);
  const [theme, setTheme] = useState();

  const [searchParams, setsearchParams] = useSearchParams({
    market_id: "0",
    list_id: "0",
  });

  const prevState = useRef("");
  const select = searchParams.get("market_id");
  const topselect = searchParams.get("list_id");
  const preferedTheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? true
    : false;

  useLayoutEffect(() => {
    LoadThemeColor();
    const fetch = async (market_id, list_id) => {
      setstock_data(await api(market_id, list_id));
    };
    fetch(select, topselect);

    const intervalId = setInterval(() => {
      fetch(select, topselect);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [searchParams]);

  useEffect(() => {
    prevState.current = stock_data;
  }, [stock_data]);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const LoadThemeColor = () => {
    // light = false && dark = true

    const themeColor = localStorage.getItem("theme");
    if (themeColor === null) {
      setTheme(preferedTheme);
      return localStorage.setItem("theme", preferedTheme);
    }
    setTheme(JSON.parse(themeColor));
  };

  return (
    <div
      className={`${
        !theme ? "light" : "dark"
      } bg-background h-full w-full items-center justify-center flex`}
    >
      <div className="w-[800px]  h-full flex flex-col p-2">
        <div className="w-full flex justify-between items-end text-cta">
          <>DELAYED QUOTES</>
          <div className="flex gap-2">
            <select
              className="text-black"
              onClick={(e) =>
                setsearchParams((prev) => {
                  prev.set("market_id", e.target.value);
                  return prev;
                })
              }
            >
              <option value="0">SGX</option>
              <option value="2">Bursa</option>
              <option value="3">Nasdaq</option>
            </select>
            <div className="flex text-cta items-center gap-2">
              THEME {theme ? "LIGHT" : "DARK"}MODE
              <Switch
                onChange={() => setTheme(!theme)}
                checked={theme}
                checkedIcon={false}
                uncheckedIcon={false}
                offColor={"#0f172a"}
                onColor={"#f1f5f9"}
                offHandleColor={"#f1f5f9"}
                onHandleColor={"#0f172a"}
              />
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-5 mt-10  h-fit text-end bg-blink-color">
          <div
            onClick={() =>
              setsearchParams((prev) => {
                prev.set("list_id", "0");
                return prev;
              })
            }
            className={`${
              topselect === "0"
                ? "border-r-[3px] border-b-[3px] border-blue-500 text-blue-500 text-md"
                : "border-r-[1px] border-b-2 border-gray-500 text-gray-500"
            } py-1 px-2 cursor-pointer`}
          >
            Top Volume
          </div>
          <div
            onClick={() =>
              setsearchParams((prev) => {
                prev.set("list_id", "1");
                return prev;
              })
            }
            className={`${
              topselect === "1"
                ? "border-r-[3px] border-b-[3px] border-blue-500 text-blue-500 text-md"
                : "border-r-[1px] border-b-2 border-gray-500 text-gray-500"
            } py-1 px-2 cursor-pointer`}
          >
            Top Gainers
          </div>
          <div
            onClick={() =>
              setsearchParams((prev) => {
                prev.set("list_id", "2");
                return prev;
              })
            }
            className={`${
              topselect === "2"
                ? "border-r-[3px] border-b-[3px] border-blue-500 text-blue-500 text-md"
                : "border-r-[1px] border-b-2 border-gray-500 text-gray-500"
            } py-1 px-2 cursor-pointer`}
          >
            Top Losers
          </div>
          <div className="border-r-[1px] border-b-2 border-gray-500 text-gray-500 py-1 px-2">
            Top % Gainer
          </div>
          <div className="border-r-[1px] border-b-2 border-gray-500 text-gray-500 py-1 px-2">
            Top % Loser
          </div>
        </div>
        <div className="grid grid-cols-5 justify-start w-full text-end text-gray-500 border-b-2 border-slate-300">
          <div className="py-2">Stock Code</div>
          <div className="py-2">Last Vol</div>
          <div className="py-2">+/- &Chng</div>
          <div className="py-2">Buy Buy Vol</div>
          <div className="py-2">Sell Sell Vol</div>
        </div>
        <TableStocks data={stock_data} prev={prevState} />
      </div>
    </div>
  );
};

export default Stock;
