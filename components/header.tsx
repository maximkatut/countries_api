import DarkModeToggle from "./darkModeToggle";
import Link from "next/link";

const Header = ({ home }: { home: boolean }) => {
  return (
    <header className="transition flex bg-white dark:bg-dark-blue justify-between font-extrabold h-20 items-center px-10 md:px-20 shadow-md mb-11 -mx-10 md:-mx-20">
      <Link passHref href={home ? "#" : "/"}>
        <a className={`${home && "cursor-default"}`}>
          <h1 className={`font-extrabold text-lg md:text-2xl ${!home && "hover:underline"}`}>Where in the world?</h1>
        </a>
      </Link>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
