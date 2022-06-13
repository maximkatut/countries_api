import Link from "next/link";
import Image from "next/image";
import { IData } from "../lib/countries";

const Card = ({ country }: { country: IData }) => {
  return (
    <li className="w-[330px] md:w-[264px] bg-white dark:bg-dark-blue shadow-sm rounded-lg mb-10 md:mb-0">
      <Link href={`countries/${country.cca3.toLowerCase()}`}>
        <div className="cursor-pointer">
          <Image
            className="rounded-t-md"
            src={country.flags.svg}
            alt="flag"
            width={330}
            height={200}
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
