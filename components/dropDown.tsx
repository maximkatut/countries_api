import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../store";
import { COUNTRIES_REGIONS } from "../utils/constants/countries.constants";

interface IProps {
  setFilter: (filter: string) => void;
  filter: string;
}

const DropDown = ({ setFilter, filter }: IProps) => {
  const isDark = useStore((state) => state.isDark);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const refDropDown = useRef<HTMLDivElement>();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = ({ target }: MouseEvent): void => {
      if (
        refDropDown.current &&
        !refDropDown.current.contains(target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      role={"button"}
      onClick={handleClick}
      ref={refDropDown as React.RefObject<HTMLDivElement>}
      className="text-sm relative "
    >
      <p className="w-[200px] py-5 px-6 cursor-pointer bg-white dark:bg-dark-blue flex justify-center items-center shadow-md rounded-md">
        {filter === "all" ? "Filter by Region" : filter}
        <span
          className={`transition translate-y-[2px] ml-9 font-extrabold ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <Image
            alt="dropdown"
            width={14}
            height={14}
            src={isDark ? "/images/right-dark.svg" : "/images/right.svg"}
          ></Image>
        </span>
      </p>
      {isOpen && (
        <ul className="absolute w-[200px] top-16 rounded-md shadow-md bg-white dark:bg-dark-blue py-2 px-6 z-10">
          {COUNTRIES_REGIONS.sort().map((item, index) => {
            return (
              <li
                onClick={() => setFilter(item)}
                className="py-1 cursor-pointer"
                key={index}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
