import Head from "next/head";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import type { NextPage } from "next";

import "react-toastify/dist/ReactToastify.css";

import { useStore } from "../store";
import { getAllCountries, IData } from "../lib/countries";
import Layout from "../components/layout";
import SearchForm from "../components/searchForm";
import Card from "../components/card";
import { LocalStorage } from "../services/LocalStorage/LocalStorage.service";
import DropDown from "../components/dropDown";

// TODO add infinite scroll

const Home: NextPage = () => {
  const countries = useStore((state) => state.countries);
  const setCountries = useStore((state) => state.setCountries);
  const setIsDark = useStore((state) => state.setIsDark);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setIsDark(LocalStorage.get("theme") === "dark");
    LocalStorage.update();
    getAllCountries().then((data) => {
      setCountries(data);
    });
  }, [setCountries, setIsDark]);

  return (
    <Layout home>
      <Head>
        <title>Countries</title>
        <meta name="description" content="Countries API" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
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
        <div className="flex justify-between mb-12">
          <SearchForm />
          <DropDown setFilter={setFilter} filter={filter} />
        </div>
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-20">
          {countries &&
            countries
              .filter((item) =>
                filter === "all" ? item : item.region === filter
              )
              .slice(0, 10)
              .map((country, index) => {
                return <Card key={index} country={country} />;
              })}
        </ul>
      </main>
    </Layout>
  );
};

export default Home;
