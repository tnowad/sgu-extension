import React from "react";
import { Route, Routes } from "react-router";
import Popup from "./pages/Popup";
import Schedule from "./pages/Schedule";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Popup />} />
      <Route path="schedule" element={<Schedule />} />
    </Routes>
  );
}

export default App;
