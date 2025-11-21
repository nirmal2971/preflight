import React from "react";
// import ChecklistItem from "./ChecklistItem";
import ChecklistPage from "./ChecklistPage";
import FlightDialog from "./FlightDialog";
import "./index.css";
import "./app.css";
import "./checklist.css";

export default function App() {
  return (
    <div className="page">
      <div className="paper">
        {/* Flight Information Section */}
        {/* <ChecklistItem /> */}
        <FlightDialog/>

        {/* Pre-flight Checklist Table Section */}
        <ChecklistPage />
      </div>
    </div>
  );
}
