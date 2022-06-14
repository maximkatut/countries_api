import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllCountryIds, getCountry, countryAdapter } from "../../lib/countries";
import Layout from "../../components/layout";
import { useStore } from "../../store";

type ICountry = {
  country: {
    name: string;
    flag: string;
    leftSideInfo: {
      title: string;
      value: any;
    }[];
    rightSideInfo: {
      title: string;
      value: any[];
    }[];
    countryBorderNames: {
      countryName: string;
      cca3: string;
    }[];
  };
};

const Country = ({ country }: ICountry) => {
  const isDark = useStore((state) => state.isDark);

  return (
    <Layout>
      <Head>
        <title>Countries - {country.name}</title>
        <meta name="description" content="Countries API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-9">
        <Link href={"/"}>
          <button className="w-32 px-5 py-2 bg-white dark:bg-dark-blue rounded-md shadow-lg flex mb-20">
            <span className="flex w-4 ml-2 mr-6">
              <Image src={isDark ? "/images/left-dark.svg" : "/images/left.svg"} width={16} height={16} alt="Go back" />
            </span>
            <span>Back</span>
          </button>
        </Link>
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
          <div>
            <Image src={country.flag} width={560} height={400} alt="Flag" />
          </div>
          <div className="md:px-8 py-11 col-span-2 lg:col-span-1 grid grid-cols-2">
            <h2 className="text-3xl font-extrabold mb-8 col-span-2">{country.name}</h2>
            <ul className="mb-6 md:mb-0  col-span-2 md:col-span-1">
              {country.leftSideInfo.map((item) => {
                return (
                  <li className="mb-2" key={item.title}>
                    <span className="font-extrabold">{item.title}: </span>
                    {item.value}
                  </li>
                );
              })}
            </ul>
            <ul className="md:ml-16 col-span-2 md:col-span-1">
              {country.rightSideInfo.map((item) => {
                return (
                  <li className="mb-2" key={item.title}>
                    <span className="font-extrabold">{item.title}: </span>
                    {item.value.map((item) => item + " ")}
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 md:mt-16 flex flex-wrap col-span-2">
              {country.countryBorderNames.length !== 0 && (
                <span className="font-extrabold p-1 mb-2">Border Countries:</span>
              )}
              {country.countryBorderNames.map((item, index) => (
                <Link key={index} href={`/countries/${item.cca3}`}>
                  <span className={"ml-2 p-1 mb-2 bg-white dark:bg-dark-blue shadow-md rounded-md cursor-pointer"}>
                    {item.countryName}
                  </span>
                </Link>
              ))}
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
  const country = await countryAdapter(countryData);

  return {
    props: {
      country,
    },
  };
}

export default Country;
