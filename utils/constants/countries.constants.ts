export const BASE_URL = "https://restcountries.com/v3.1/";
export const COUNTRIES_ROUTES = {
  ALL: "/all?fields=name,cca3,capital,flags,population,region,subregion,tld,currencies,languages,borders",
  ALPHA: "/alpha",
  CCA3: "/all?fields=cca3",
  NAME_CCA3: "/all?fields=cca3,name",
};
export const COUNTRIES_REGIONS = [
  "Asia",
  "Americas",
  "Africa",
  "Oceania",
  "Europe",
  "Antarctic",
];
