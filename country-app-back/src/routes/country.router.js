const express = require("express");
const router = express.Router();
const {
  getCountries,
  getCountryBorderList,
  getCountryPopulation,
  getCountryFlagImg,
} = require("../controllers/country.controller");

router
  .get("/countries", getCountries)
  .get(
    "/country/:country/:countryCode/info",
    getCountryBorderList,
    getCountryPopulation,
    getCountryFlagImg
  );

module.exports = router;
