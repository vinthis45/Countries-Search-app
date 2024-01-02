import React, { useState, useEffect } from "react";

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries data");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        margin: "20px",
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "850px",
          fontSize: "16px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div
              key={country.cca2}
              style={{
                width: "200px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                margin: "10px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                className="flag"
                src={country.flags.svg}
                alt={country.name.common}
                style={{ width: "100px", height: "60px" }}
              />
              <h2>{country.name.common}</h2>
            </div>
          ))
        ) : (
          <p>No matching countries found</p>
        )}
      </div>
    </div>
  );
};

export default CountrySearch;
