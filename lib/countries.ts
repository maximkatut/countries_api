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

export const getAllCountries = async (url?: string): Promise<IData[]> => {
  let countries: IData[] = [];
  let route = COUNTRIES_ROUTES.ALL;
  if (url) {
    route = url;
  }
  await clientApi
    .get(route)
    .then((res) => res.data)
    .then((data) => {
      countries = data;
    });
  return countries;
};

export const getAllCountryIds = async (): Promise<
  {
    params: { id: string };
  }[]
> => {
  let paths: [] = [];
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

export const getCountry = async (cca3: string): Promise<IData> => {
  let country: any;
  await clientApi
    .get(`${COUNTRIES_ROUTES.ALPHA}/${cca3}`)
    .then((res) => res.data)
    .then((data) => {
      country = data[0];
    });
  return country;
};

export const getCountryNameByCca3 = async (
  countries: string[]
): Promise<string[]> => {
  let countryNames: string[] = [];
  const makeReq = async (cca3: string) => {
    await clientApi
      .get(`${COUNTRIES_ROUTES.ALPHA}/${cca3}`)
      .then((res) => res.data)
      .then((data) => {
        countryNames.push(data[0].name.common);
      });
  };
  countries.forEach((cca3) => makeReq(cca3));
  return countryNames;
};
