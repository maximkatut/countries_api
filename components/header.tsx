import DarkModeToggle from "./darkModeToggle";
import Link from "next/link";

const Header = ({ home }: { home: boolean }) => {
  return (
    <header className="transition flex bg-white dark:bg-dark-blue justify-between font-extrabold h-20 items-center px-20 shadow-md mb-11 -mx-20">
      <Link href={"/"} className={home ? "pointer-events-none" : ""}>
        <h1 className={`font-extrabold text-2xl ${!home && "cursor-pointer"}`}>
          Where in the world?
        </h1>
      </Link>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
