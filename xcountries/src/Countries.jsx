import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch("https://restcountries.com/v3.1/all")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCountries(data);
  //       setLoading(false); // Set loading to false after data is fetched
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data: ", error);
  //       setError(error.message || "Unknown error occurred");
  //       setLoading(false); // Set loading to false even if there's an error
  //     });
  // }, []);

  useEffect(()=>{
    const fetchData = async()=>{

      try {
       const res  = await fetch("https://restcountries.com/v3.1/all")
       if(res.status === 200){
        const data = await JSON(res);
        setCountries(data)
        setLoading(false)
       }else{
        console.log('Response status is not 200')
       }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message || "Unknown error occurred");
        setLoading(false);
      }
    }
    fetchData();
  },[])

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

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (error) {
    return <div>Error fetching data: {error}. Please try again later.</div>; // Display error message if there's an error
  }

  return (
    <div style={containerStyle}>
      {countries.map((country) => (
        <div key={country.cca3} style={cardStyle}>
          {country.flags && country.flags.png ? (
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={imageStyle}
            />
          ) : (
            <div>No flag available</div>
          )}
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
