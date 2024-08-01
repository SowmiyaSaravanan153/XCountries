import { useEffect, useState } from "react";

export default function useCountries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://xcountries-backend.azurewebsites.net/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }, []);

  return { countries, error };
}
