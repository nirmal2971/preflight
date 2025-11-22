import React from "react";
import ChecklistPage from "./ChecklistPage";
import FlightHeader from "./FlightHeader";
import "./index.css";
import "./App.css";
import "./checklist.css";

export default function App() {
  return (
    <div className="page">
      <div className="paper">
        <FlightHeader />

        <ChecklistPage />
      </div>
    </div>
  );
}
