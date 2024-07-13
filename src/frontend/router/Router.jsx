import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Stock from ".././components/Stock";

const Router = () => {
  return (
    <Suspense fallback={"Loading.."}>
      <Routes>
        <Route path={"/"} element={<Stock />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
