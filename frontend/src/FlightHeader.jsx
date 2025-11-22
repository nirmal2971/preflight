import React from "react";

export default function FlightHeader() {
  return (
    <header className="header-block">
      <h1 className="title">PRE-FLIGHT CHECKLIST:</h1>

      <div className="flight-row">
        <div className="flight-left">
          <strong>FLIGHT NUMBER:</strong> Outbound F_____ L 01
        </div>
        <div className="flight-right">
          <strong>DATE:</strong> ____/____/2023
        </div>
      </div>

      <table className="flight-table">
        <tbody>
          <tr>
            <td>Filed By</td>
            <td></td>
            <td>Filing Time</td>
            <td></td>
          </tr>
          <tr>
            <td>Departure Location</td>
            <td></td>
            <td>Departure Time</td>
            <td></td>
          </tr>
          <tr>
            <td>Arrival Location</td>
            <td></td>
            <td>Est. Arrival Time</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </header>
  );
}
