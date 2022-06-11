import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllCountryIds, getCountry } from "../../lib/countries";
import Layout from "../../components/layout";

const Country = ({ countryData }: any) => {
  return (
    <Layout>
      <Head>
        <title>Countries - {countryData.name.common}</title>
        <meta name="description" content="Countries API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        {countryData.name.common} <br />
        <Image src={countryData.flags.png} width={100} height={60} alt="Flag" />
      </main>
      <Link href={"/"}>Go back</Link>
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
  return {
    props: {
      countryData,
    },
  };
}

export default Country;
