import axios from "axios";
import {
  BASE_URL,
  COUNTRIES_ROUTES,
} from "../utils/constants/countries.constants";

export type IData = {
  name: { common: string };
  cca3: string;
  capital: string[];
  flags: { svg: string };
  population: number;
  region: string;
  subregion: string;
  tld: string[];
  currencies: object;
  languages: object;
  borders: string[];
};

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
  return countries as unknown | IData[];
};

export const getAllCountryIds = async () => {
  let paths;
  await clientApi
    .get(COUNTRIES_ROUTES.CCA3)
    .then((res) => res.data)
    .then((data) => {
      paths = data.map((country: any) => {
        return { params: { id: country.cca3.toLowerCase() } };
      });
    });
  return paths;
};

export const getCountry = async (cca3: string) => {
  let country;
  await clientApi
    .get(`${COUNTRIES_ROUTES.ALPHA}/${cca3}`)
    .then((res) => res.data)
    .then((data) => {
      country = data[0];
    });
  return country as unknown | IData;
};
