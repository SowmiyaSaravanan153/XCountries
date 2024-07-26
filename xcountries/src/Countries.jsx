import React, { useEffect, useState } from "react";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Perform the API call when the component mounts
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON if status is OK
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`); // Throw error if status is not OK
        }
      })
      .then((data) => {
        setCountries(data); // Set data to state
        setIsLoading(false); // Set loading to false after successful data fetch
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsError(true); // Set error state to true if there's an error
        setIsLoading(false); // Set loading to false when there is an error
      });
  }, []);

  // Style definitions
  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "20px" // Added padding for better spacing
  };

  const imageStyle = {
    width: "100px",
    height: "100px"
  };

  // Return appropriate content based on the state
  if (isLoading) {
    return (
      <div style={containerStyle}>
        <p>Loading...</p> {/* Display loading message */}
      </div>
    );
  }

  if (isError) {
    return (
      <div style={containerStyle}>
        <p>Error fetching data. Please try again later.</p> {/* Display error message */}
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div style={containerStyle}>
        <p>No countries found.</p> {/* Display message when no countries are found */}
      </div>
    );
  }

  // Display countries data
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
