import { useEffect, useState } from "react";

export default function useCountries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }, []);

  return { countries, error };
}
