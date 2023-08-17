import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = `http://localhost:9000`;

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentCity, setCurrnetCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // await console.log(typeof data);

        setCities(data);
        // console.log(cities);
      } catch (error) {
        alert("there was an error loading data");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrnetCity(data);
    } catch (error) {
      alert("there was an error loading data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("CitiesContext used outsizde");
  return context;
}

export { CitiesProvider, useCities };
