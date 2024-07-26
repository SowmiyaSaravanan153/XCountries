import React, { useEffect, useState } from "react";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Perform the API call
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        // Check if response status is 200
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
    height: "100vh"
  };

  const imageStyle = {
    width: "100px",
    height: "100px"
  };

  if (isLoading) {
    return <p>Loading...</p>; // Show loading message if isLoading is true
  }

  if (isError) {
    return <p>Error fetching data. Please try again later.</p>; // Show error message if isError is true
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
