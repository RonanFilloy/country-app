import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCountries } from "../services/countryservices";
import "../styles/CountryList.scss";

function CountryList() {
  const [countryList, setCountryList] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await getCountries();
        setCountryList(countries);
      } catch (error) {
        setError("Failed to fetch countries.");
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCountries = countryList.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="country-list">
      <h1>Find your country!</h1>
      <div className="countries__filter">
        <label htmlFor="filter">Search by name</label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className="countries">
        {filteredCountries.length > 0 ? (
          <ul className="countries__list">
            {filteredCountries.map((country) => (
              <li key={country.countryCode}>
                <Link to={`/${country.name}/${country.countryCode}`}>
                  {country.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </section>
  );
}

export default CountryList;
