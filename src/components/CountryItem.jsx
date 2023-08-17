// import { useEffect } from "react";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  // useEffect(() => console.log("called"));
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
