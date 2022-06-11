import axios from "axios";
import {
  BASE_URL,
  COUNTRIES_ROUTES,
} from "../utils/constants/countries.constants";

const clientApi = axios.create({
  baseURL: BASE_URL,
});

export const getAllCountries = async () => {
  let countries;
  await clientApi
    .get(COUNTRIES_ROUTES.ALL)
    .then((res) => res.data)
    .then((data) => {
      countries = data;
    });
  return countries;
};

export const getAllCountryIds = async () => {
  let paths;
  await clientApi
    .get(COUNTRIES_ROUTES.ALL)
    .then((res) => res.data)
    .then((data) => {
      paths = data.map((country: any) => {
        return { params: { id: country.cca2.toLowerCase() } };
      });
    });
  return paths;
};

export const getCountry = async (cca2: string) => {
  let country;
  await clientApi
    .get(`${COUNTRIES_ROUTES.ALPHA}/${cca2}`)
    .then((res) => res.data)
    .then((data) => {
      country = data[0];
    });
  return country;
};
