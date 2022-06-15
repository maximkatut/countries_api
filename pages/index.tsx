import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { getAllCountries, IData } from "../lib/countries";
import Layout from "../components/layout";
import SearchForm from "../components/searchForm";
import DropDown from "../components/dropDown";
import { COUNTRIES_ROUTES } from "../utils/constants/countries.constants";
import InfiniteCards from "../components/infiniteCards";

type IProps = {
  countries: IData[];
};

const Home = ({ countries }: IProps) => {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<IData[]>(countries);

  const filterCountries = useCallback(
    (countries: IData[]) => {
      const filteredCountries = countries
        .filter((item) => (filter === "All" ? item : item.region === filter))
        .filter((item) => {
          if (query === "") {
            return item;
          }
          return item.name.common.toLowerCase().includes(query) ? true : false;
        });
      setFilteredCountries(filteredCountries);
    },
    [query, filter]
  );

  useEffect(() => {
    filterCountries(countries);
  }, [countries, filterCountries, query, filter]);

  return (
    <Layout home>
      <Head>
        <title>Countries</title>
        <meta name="description" content="Countries API" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
      <main className="pb-20">
        <div className="flex justify-between mb-12 flex-wrap">
          <SearchForm setQuery={setQuery} query={query} />
          <DropDown setFilter={setFilter} filter={filter} />
        </div>
        <InfiniteCards {...{ filteredCountries }} />
      </main>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const countries = await getAllCountries(COUNTRIES_ROUTES.ALL);

  return {
    props: {
      countries,
    },
  };
}
