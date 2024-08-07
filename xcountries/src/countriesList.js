import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://xcountries-backend.azurewebsites.net/all');
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchCountries();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="country-list">
      {countries.map((country) => (
        <div key={country.name} className="country">
          <img src={country.flag} alt={`Flag of ${country.name}`} />
          <span>{country.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CountryList;