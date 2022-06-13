import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  getAllCountries,
  getAllCountryIds,
  getCountry,
  IData,
} from "../../lib/countries";
import Layout from "../../components/layout";
import { useStore } from "../../store";
import { numberWithCommas } from "../../utils/helpers/numberWithCommas";
import { useEffect, useState } from "react";
import { COUNTRIES_ROUTES } from "../../utils/constants/countries.constants";

const Country = ({
  countryData,
  countryNames,
}: {
  countryData: IData;
  countryNames: { countryName: string; cca3: string }[];
}) => {
  const isDark = useStore((state) => state.isDark);

  return (
    <Layout>
      <Head>
        <title>Countries - {countryData.name.common}</title>
        <meta name="description" content="Countries API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-9">
        <Link href={"/"}>
          <button className="w-32 px-5 py-2 bg-white dark:bg-dark-blue rounded-md shadow-lg flex mb-20">
            <span className="flex w-4 ml-2 mr-6">
              <Image
                src={isDark ? "/images/left-dark.svg" : "/images/left.svg"}
                width={16}
                height={16}
                alt="Go back"
              />
            </span>
            <span>Back</span>
          </button>
        </Link>
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
          <div>
            <Image
              src={countryData.flags.svg}
              width={560}
              height={400}
              alt="Flag"
            />
          </div>
          <div className="px-8 py-11 col-span-2 lg:col-span-1">
            <table cellPadding={3} className={"border-separate"}>
              <caption className="text-3xl font-extrabold mb-6 text-left">
                {countryData.name.common}
              </caption>
              <tbody>
                <tr>
                  <td>
                    <span className="font-extrabold">Native Name: </span>
                    {/* {countryData.name.nativeName.nld.common} */}
                  </td>
                  <td className="">
                    <span className="font-extrabold">Top Level Domain: </span>
                    {countryData.tld.map((item) => item + " ")}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="font-extrabold">Population: </span>
                    {numberWithCommas(countryData.population)}
                  </td>
                  <td className="">
                    <span className="font-extrabold">Currencies: </span>
                    {/* {countryData.currencies} */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="font-extrabold">Region: </span>
                    {countryData.region}
                  </td>
                  <td className="">
                    <span className="font-extrabold">Languages: </span>
                    {/* {countryData.languages} */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="font-extrabold">Subregion: </span>
                    {countryData.subregion}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="font-extrabold">Capital: </span>
                    {countryData.capital}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mt-16 flex flex-wrap">
              {countryNames !== [] && (
                <span className="font-extrabold ">Border Countries:</span>
              )}
              {countryNames !== [] &&
                countryNames &&
                countryNames.map((item) => {
                  return (
                    <Link
                      key={item.cca3}
                      href={`/countries/${item.cca3.toLowerCase()}`}
                    >
                      <span
                        className={
                          "ml-2 p-3 bg-white dark:bg-dark-blue shadow-md rounded-md cursor-pointer"
                        }
                      >
                        {item.countryName}
                      </span>
                    </Link>
                  );
                })}
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getAllCountryIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const countryData = await getCountry(params.id);
  const countries = await getAllCountries(COUNTRIES_ROUTES.NAME_CCA3);

  const getCountryNamesByCca3 = (countries: IData[], { borders }: IData) => {
    let countryNames: {}[] = [];
    if (borders === undefined) return [];
    countries.filter((country) => {
      borders.forEach((borderCountry) => {
        if (country.cca3 === borderCountry) {
          countryNames.push({
            countryName: country.name.common,
            cca3: country.cca3,
          });
        }
      });
    });
    return countryNames;
  };

  const countryNames = getCountryNamesByCca3(countries, countryData);

  return {
    props: {
      countryData,
      countryNames,
    },
  };
}

export default Country;
