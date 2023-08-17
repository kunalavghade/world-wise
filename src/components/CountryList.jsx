import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first Country by clicking on a city on the map"}
      />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.city).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  //   console.log("called", countries, cities);
  return (
    <ul className={styles.countryList}>
      {countries.map((country, id) => (
        // console.log(country, id);
        <CountryItem country={country} key={id} />
      ))}
    </ul>
  );
}

export default CountryList;
