import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  getAllCountries,
  getAllCountryIds,
  getCountryNamesByCca3,
  getCountry,
  IData,
} from "../../lib/countries";
import Layout from "../../components/layout";
import { useStore } from "../../store";
import { numberWithCommas } from "../../utils/helpers/numberWithCommas";
import { COUNTRIES_ROUTES } from "../../utils/constants/countries.constants";

const Country = ({
  countryData,
  countryNames,
}: {
  countryData: IData;
  countryNames: { countryName: string; cca3: string }[];
}) => {
  const isDark = useStore((state) => state.isDark);
  const nativeNames = Object.values(countryData.name.nativeName) as {
    common: string;
  }[];
  const nativeName = nativeNames[0].common;

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
            <h2 className="text-3xl font-extrabold mb-6 text-left">
              {countryData.name.common}
            </h2>
            <ul>
              <li>
                <span className="font-extrabold">Native Name: </span>
                {nativeName}
              </li>
              <li>
                <span className="font-extrabold">Population: </span>
                {numberWithCommas(countryData.population)}
              </li>
              <li>
                <span className="font-extrabold">Region: </span>
                {countryData.region}
              </li>
              <li>
                <span className="font-extrabold">Subregion: </span>
                {countryData.subregion}
              </li>
              <li>
                <span className="font-extrabold">Capital: </span>
                {countryData.capital}
              </li>
            </ul>
            <ul>
              <li className="">
                <span className="font-extrabold">Top Level Domain: </span>
                {countryData.tld.map((item) => item + " ")}
              </li>

              <li className="">
                <span className="font-extrabold">Currencies: </span>
                {Object.values(countryData.currencies).map((item) => {
                  return <>{item.name}</>;
                })}
              </li>

              <li className="">
                <span className="font-extrabold">Languages: </span>
                {Object.values(countryData.languages).map((item) => {
                  return <>{item} </>;
                })}
              </li>
            </ul>
            <div className="mt-16 flex flex-wrap">
              {countryNames !== [] && (
                <span className="font-extrabold p-1 mb-2">
                  Border Countries:
                </span>
              )}
              {countryNames !== [] &&
                countryNames.map((item) => {
                  return (
                    <Link
                      key={item.cca3}
                      href={`/countries/${item.cca3.toLowerCase()}`}
                    >
                      <span
                        className={
                          "ml-2 p-1 mb-2 bg-white dark:bg-dark-blue shadow-md rounded-md cursor-pointer"
                        }
                      >
                        {item.countryName}
                      </span>
                    </Link>
                  );
                })}
            </div>
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

  const countryNames = getCountryNamesByCca3(countries, countryData);

  return {
    props: {
      countryData,
      countryNames,
    },
  };
}

export default Country;
