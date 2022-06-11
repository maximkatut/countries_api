import React from "react";
import Header from "./header";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-light-grey dark:bg-very-dark-blue text-text dark:text-white px-20">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
