import React, { useEffect, useState, useRef } from "react";

const TableStocks = ({ data, prev }) => {
  const chng = (last, previous) => {
    const result = (100 * (last - previous)) / previous;

    if (result >= 0) return "+" + result.toFixed(1);
    else return result.toFixed(1);
  };

  const chng1 = (last, previous) => {
    const result = last - previous;

    if (result >= 0) return "+" + result.toFixed(1);
    else return result.toFixed(1);
  };

  function volume(vol) {
    const result = vol.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      notation: "compact",
      compactDisplay: "short",
    });

    return result;
  }

  const blink = (name, param1, param2) => {
    if (prev.current.length !== 0 && name !== "") {
      const prev_data = prev.current;

      const data_set1 = prev_data.filter((prev1) => prev1.name === name);
      const data_set2 = data.filter((prev1) => prev1.name === name);

      if (
        data_set1.length > 0 &&
        data_set2.length > 0 &&
        (data_set1[0][param1] === data_set2[0][param1] ||
          data_set1[0][param2] === data_set2[0][param2])
      ) {
        return true;
      }
      return false;
    }
  };

  return (
    <div className="h-full w-full flex overflow-y-auto text-cta ">
      {data.length !== 0 && prev.current.length !== 0 && (
        <div className="grid grid-cols-1 w-full">
          {data?.map((stock, index) => (
            <div
              key={index}
              className={` grid grid-cols-5 pt-1 border-b-[2px] border-gray-200 w-full px-2 `}
            >
              <div className="flex flex-col w-fit">
                <label className="">{stock.name}</label>
                <label>{stock.stockcode}</label>
              </div>
              <div
                className={`${
                  blink(stock.name, "last", "volume") &&
                  "bg-blink text-blinkColor"
                } flex flex-col text-end`}
              >
                <label>{stock.last.toFixed(3)}</label>
                <label>{volume(stock.volume)}</label>
              </div>
              <div
                className={`${
                  blink(stock.name, "last", "previous") &&
                  "bg-blink text-blinkColor"
                } flex flex-col text-end`}
              >
                <label
                  className={`${
                    chng1(stock.last, stock.previous).includes("-")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {chng1(stock.last, stock.previous)}
                </label>
                <label
                  className={`${
                    chng(stock.last, stock.previous).includes("-")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {chng(stock.last, stock.previous)}%
                </label>
              </div>
              <div
                className={`${
                  blink(stock.name, "buy_price", "buy_volume") &&
                  "bg-blink text-blinkColor"
                } flex flex-col text-end`}
              >
                <label>{stock.buy_price.toFixed(3)}</label>
                <label>{volume(stock.buy_volume)}</label>
              </div>
              <div
                className={`${
                  blink(stock.name, "sell_price", "sell_volume") &&
                  "bg-blink text-blinkColor"
                } flex flex-col text-end`}
              >
                <label>{stock.sell_price.toFixed(3)}</label>
                <label>{stock.sell_volume}</label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableStocks;