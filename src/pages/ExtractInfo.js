import React, { useState } from "react";
import axios from "axios";
import "./hello.css"; // Include your CSS file

const VehicleDetails = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      setVehicleDetails(null);

      const response = await axios.get(
        `http://localhost:5000/get_vehicle_details?license_plate=${licensePlate}`
      );

      if (response.data) {
        setVehicleDetails(response.data);
      }
    } catch (err) {
      setError("Error fetching vehicle details. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Vehicle Details</h2>
      <div className="search-bar">
        <span className="country-icon">
          <img
            src="path_to_flag_icon.png"
            alt="Country"
            className="flag-icon"
          />
        </span>
        <input
          type="text"
          placeholder="Enter License Plate (e.g., MH 01 CL 4486)"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSubmit} className="search-button">
          🔍
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {vehicleDetails && (
        <div className="details-container">
          <h3>Vehicle Information:</h3>
          <p>
            <strong>Number:</strong> {vehicleDetails.number}
          </p>
          <p>
            <strong>Registered RTO:</strong> {vehicleDetails.registered_rto}
          </p>
          <p>
            <strong>RTO Phone Number:</strong> {vehicleDetails.rto_phone}
          </p>
          <p>
            <strong>Name:</strong> {vehicleDetails.name}
          </p>
          <p>
            <strong>Vehicle:</strong> {vehicleDetails.vehicle}
          </p>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
