import DarkModeToggle from "./darkMode";

const Header = () => {
  return (
    <header className="flex bg-light-grey dark:bg-very-dark-blue justify-between font-extrabold h-20 items-center px-20 shadow-md mb-11 -mx-20">
      <h1 className="font-extrabold text-2xl">Where in the world?</h1>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
