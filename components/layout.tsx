import React from "react";
import Header from "./header";
const Layout = ({ children, home = false }: { children: React.ReactNode; home?: boolean }) => {
  return (
    <div className="transition bg-light-grey min-h-screen max-w-[1440px] mx-auto dark:bg-very-dark-blue text-text dark:text-white px-10 md:px-20">
      <Header home={home} />
      {children}
    </div>
  );
};

export default Layout;
