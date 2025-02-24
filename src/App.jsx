import { useEffect, useRef, useState } from "react";
import "./App.css";
import Country from "./components/Country";
import NewCountry from "./components/NewCountry";
import axios from "axios";

function App() {
  const apiEndpoint =
    "https://om-assignment-7-gec4d5hfdrgkh0dn.northcentralus-01.azurewebsites.net/api/";

  const [countries, setCountries] = useState([
    // { id: 1, name: "United States", gold: 2, silver: 2, bronze: 3 },
    // { id: 2, name: "China", gold: 3, silver: 1, bronze: 0 },
    // { id: 3, name: "France", gold: 0, silver: 2, bronze: 2 }
  ]);

  const medals = useRef([
    { id: 1, name: "gold" },
    { id: 2, name: "silver" },
    { id: 3, name: "bronze" }
  ]);

  function incrementMedal(countryId, medal) {
    setCountries((prevCountries) => {
      const updatedCountries = prevCountries.map((country) => {
        if (country.id === countryId) {
          return { ...country, [medal]: country[medal] + 1 };
        }
        return country;
      });

      return updatedCountries;
    });
  }

  function decrementMedal(countryId, medal) {
    setCountries((prevCountries) => {
      const updatedCountries = prevCountries.map((country) => {
        if (country.id === countryId && country[medal] != 0) {
          return { ...country, [medal]: country[medal] - 1 };
        }
        return country;
      });

      return updatedCountries;
    });
  }

  function countMedals() {
    return (
      countries.reduce((a, b) => a + b.gold, 0) +
      countries.reduce((a, b) => a + b.silver, 0) +
      countries.reduce((a, b) => a + b.bronze, 0)
    );
  }

  async function removeCountry(countryId) {
    const originalCountries = countries;
    setCountries(countries.filter((c) => c.id !== countryId));

    try {
      await axios.delete(`${apiEndpoint}/country/${countryId}`);
    } catch (e) {
      if (ex.response && ex.response.status === 404) {
        // word already deleted
        console.log(
          "The country does not exist - it may have already been deleted"
        );
      } else {
        alert("An error occurred while deleting a word");
        setCountries(originalCountries);
      }
    }
  }

  async function handleNewCountry(name) {
    const { data: post } = await axios.post(apiEndpoint + "country", {
      name: name,
      gold: 0,
      silver: 0,
      bronze: 0
    });
    setCountries(countries.concat(post));
  }

  useEffect(() => {
    async function fetchData() {
      const { data: fetchedCountries } = await axios.get(
        apiEndpoint + "country"
      );
      setCountries(fetchedCountries);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Olympic Countries - {countMedals()} Medals</h1>
      {countries.map((country) => (
        <Country
          key={country.id}
          country={country}
          medals={medals}
          removeCountry={removeCountry}
          incrementMedal={incrementMedal}
          decrementMedal={decrementMedal}
        />
      ))}
      <NewCountry addCountry={handleNewCountry} />
    </>
  );
}

export default App;
