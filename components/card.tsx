import Link from "next/link";
import Image from "next/image";

const Card = ({ country }) => {
  return (
    <li className="w-[300px] md:w-[264px] bg-white dark:bg-dark-blue shadow-sm rounded-lg">
      <Link href={`countries/${country.cca3.toLowerCase()}`}>
        <div className="cursor-pointer">
          <Image
            className="rounded-t-md"
            src={country.flags.png}
            alt="flag"
            width={264}
            height={160}
          ></Image>
          <div className="px-6 py-4">
            <h2 className="text-lg mb-3 font-extrabold">
              {country.name.common}
            </h2>
            <p className="text-sm mb-1">
              <strong className="font-semibold">Population: </strong>
              {country.population}
            </p>
            <p className="text-sm mb-1">
              <strong className="font-semibold">Region: </strong>
              {country.region}
            </p>
            <p className="text-sm mb-7">
              <strong className="font-semibold">Capital: </strong>
              {country.capital}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Card;
