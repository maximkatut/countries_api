import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import type { NextPage } from "next";

import "react-toastify/dist/ReactToastify.css";

import { useStore } from "../store";
import { getAllCountries } from "../lib/countries";
import Layout from "../components/layout";
import SearchForm from "../components/searchForm";

// TODO add infinite scroll

const Home: NextPage = () => {
  const countries = useStore((state) => state.countries);
  const setCountries = useStore((state) => state.setCountries);

  useEffect(() => {
    getAllCountries().then((data) => {
      setCountries(data);
    });
  });

  return (
    <Layout>
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
      <main className="">
        <SearchForm />
        {countries &&
          countries.slice(0, 10).map((country, index) => {
            return (
              <span key={index} className="m-4">
                <Link href={`countries/${country.cca2.toLowerCase()}`}>
                  {country.name.common}
                </Link>
              </span>
            );
          })}
      </main>
    </Layout>
  );
};

export default Home;
