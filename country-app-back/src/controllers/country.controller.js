require("dotenv").config();
const axios = require("axios");

const countriesApi = process.env.COUNTRIES_API;
const bordersApi = process.env.BORDERS_API;
const populationApi = process.env.POPULATION_API;
const flagsApi = process.env.FLAGS_API;

const getCountries = async (req, res) => {
  try {
    const countryList = await axios.get(`${countriesApi}`);
    res.status(200).json(countryList.data);
  } catch (error) {
    console.error("Error fetching countries: ", error);
    res.status(500).json({ error: "Failed to retrieve countries" });
  }
};

const getCountryBorderList = async (req, res, next) => {
  const { countryCode } = req.params;
  try {
    const borderList = await axios.get(`${bordersApi}/${countryCode}`);
    req.borderList = borderList.data.borders;
    next();
  } catch (error) {
    console.error("Error fetching bordering countries");
    res.status(500).json({ error: "Failed to retrieve bordering countries" });
  }
};

const getCountryPopulation = async (req, res, next) => {
  const { country } = req.params;
  try {
    const countryPopulationList = await axios.get(`${populationApi}`);
    const countryPopulation = countryPopulationList.data.data.find(
      (c) => c.country === country
    );
    if (countryPopulation) {
      req.population = countryPopulation.populationCounts;
      next();
    } else {
      res.status(404).json("Country population not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve population data" });
  }
};

const getCountryFlagImg = async (req, res) => {
  const { country } = req.params;
  try {
    const countryFlagsList = await axios.get(`${flagsApi}`);
    const countryFlag = countryFlagsList.data.data.find(
      (c) => c.name === country
    );
    if (countryFlag) {
      res.status(200).json({
        borders: req.borderList,
        population: req.population,
        flag: countryFlag.flag,
      });
    } else {
      res.status(404).json("Country flag not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve country flag" });
  }
};

module.exports = {
  getCountries,
  getCountryBorderList,
  getCountryPopulation,
  getCountryFlagImg,
};
