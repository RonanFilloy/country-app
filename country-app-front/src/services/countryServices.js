import axios from "axios";

const ApiUrl = import.meta.env.VITE_API_URL;

const getCountries = async () => {
  try {
    const countriesList = await axios.get(`${ApiUrl}/countries`);
    return countriesList.data;
  } catch (error) {
    console.error("Error fetching country list: ", error);
    throw error;
  }
};

const getCountryInfo = async (country, countryCode) => {
  try {
    const countryInfo = await axios.get(
      `${ApiUrl}/country/${country}/${countryCode}/info`
    );
    return countryInfo.data;
  } catch (error) {
    console.error("Error retrieving country info: ", error);
    throw error;
  }
};

export { getCountries, getCountryInfo };
