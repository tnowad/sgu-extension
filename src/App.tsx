import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="schedule" element={<Schedule />} />
    </Routes>
  );
}

export default App;
