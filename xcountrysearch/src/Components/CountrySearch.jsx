import React, { useState, useEffect } from "react";
import styles from "./CountrySearch.module.css";

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
    <div className={styles.main}>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <div className={styles.container}>
        {filteredCountries.map((country) => (
          <div key={country.cca2} className={styles.card}>
            <img
              className={styles.flag}
              src={country.flags.svg}
              alt={country.name.common}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountrySearch;
