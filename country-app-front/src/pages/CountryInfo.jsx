import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryInfo } from "../services/countryservices";
import PopulationChart from "../components/PopulationChart";
import "../styles/CountryInfo.scss";

function CountryInfo() {
  const { country, countryCode } = useParams();
  const [error, setError] = useState(null);
  const [borders, setBorders] = useState([]);
  const [flag, setFlag] = useState("");
  const [population, setPopulation] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const countryInfo = await getCountryInfo(country, countryCode);
        setBorders(countryInfo.borders);
        setFlag(countryInfo.flag);
        setPopulation(countryInfo.population);
      } catch (error) {
        setError("Failed to fetch info.");
        console.error(error);
      }
    };

    fetchCountryInfo();
  }, [country, countryCode]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="country__info">
      <div className="country__title">
        <h1>{country}</h1>
        <img src={flag} alt="country flag" />
      </div>
      <div className="country__borders">
        <h2>{country} has the following bordering countries:</h2>
        <ul>
          {borders.map((border, i) => (
            <li key={i}>
              <Link key={i} to={`/${border.commonName}/${border.countryCode}`}>
                {border.commonName}
              </Link>
            </li>
          ))}
          <h4>Click on them to learn more!</h4>
        </ul>
      </div>
      <div className="country__chart">
        <h4>
          Here you can see a chart showing population changes between 1961 and
          2018
        </h4>
        <PopulationChart data={population} />
      </div>
    </section>
  );
}

export default CountryInfo;
