import axios from "axios";
import { BASE_URL, COUNTRIES_ROUTES } from "../utils/constants/countries.constants";
import { numberWithCommas } from "../utils/helpers/numberWithCommas";
import { toast } from "react-toastify";

export type IData = {
  name: { common: string; nativeName: {} };
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

clientApi.interceptors.request.use(
  (config) => config,
  (error) => {
    let message = typeof error.response !== "undefined" ? error.response.data.message : error.message;
    toast(message);
  }
);

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

export const getCountryNamesByCca3 = (countries: IData[], { borders }: IData) => {
  let countryNames: {}[] = [];
  if (borders === undefined) return [];
  countries.filter((country) => {
    borders.forEach((borderCountry) => {
      if (country.cca3 === borderCountry) {
        countryNames.push({
          countryName: country.name.common,
          cca3: country.cca3.toLowerCase(),
        });
      }
    });
  });
  return countryNames;
};

export const countryAdapter = async (country: IData) => {
  const nativeNames = country.name.nativeName
    ? (Object.values(country.name.nativeName) as {
        common: string;
      }[])
    : [];

  const nativeName = nativeNames[0]?.common || "";
  const name = country.name.common || "";
  const flag = country.flags.svg || "";
  const population = numberWithCommas(country.population) || "";
  const currencies = country.currencies ? Object.values(country.currencies) : [];
  const languages = country.languages ? Object.values(country.languages) : [];
  const leftSideInfo = [
    { title: "Native Name", value: nativeName },
    { title: "Population", value: population },
    { title: "Region", value: country.region || "" },
    { title: "Subregion", value: country.subregion || "" },
    { title: "Capital", value: country.capital || "" },
  ];
  const rightSideInfo = [
    { title: "Top Level Domain", value: country.tld || [] },
    {
      title: "Currencies",
      value: currencies.map((item) => item.name || ""),
    },
    { title: "Languages", value: languages },
  ];

  const countries = await getAllCountries(COUNTRIES_ROUTES.NAME_CCA3);
  const countryBorderNames = getCountryNamesByCca3(countries, country);

  return {
    name,
    flag,
    leftSideInfo,
    rightSideInfo,
    countryBorderNames,
  };
};
