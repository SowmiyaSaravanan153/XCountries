import React from "react";
import useCountries from "./useCountries";

const cardStyle = {
  width: "200px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  margin: "10px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const imageStyle = {
  width: "100px",
  height: "100px",
};

function Countries() {
  const { countries, error } = useCountries();

  if (error) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  return (
    <div style={containerStyle}>
      {countries.map((country) => (
        <div key={country.cca3} style={cardStyle}>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            style={imageStyle}
          />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
  );
}

export default Countries;
