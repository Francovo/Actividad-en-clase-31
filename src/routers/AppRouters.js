import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "../components/List";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<List />} />
      </Routes>
    </Router>
  );
};
