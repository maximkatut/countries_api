import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllCountryIds, getCoutry } from "../../lib/countries";

const Coutry = ({ countryData }: any) => {
  return (
    <div className="">
      <Head>
        <title>Countries - {countryData.name.common}</title>
        <meta name="description" content="Countries API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className=""></header>
      <main className="">
        {countryData.name.common} <br />
        <Image src={countryData.flags.png} width={100} height={60} alt="Flag" />
      </main>
      <Link href={"/"}>Go back</Link>
      <footer className=""></footer>
    </div>
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
  const countryData = await getCoutry(params.id);
  return {
    props: {
      countryData,
    },
  };
}

export default Coutry;
