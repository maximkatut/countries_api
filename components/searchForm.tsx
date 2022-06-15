import Image from "next/image";
import { useRef } from "react";
import { useStore } from "../store";

interface IProps {
  setQuery: (x: string) => void;
  query: string;
}

const SearchForm = ({ setQuery, query }: IProps) => {
  const isDark = useStore((state) => state.isDark);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeEvent = ({ target }: React.ChangeEvent<HTMLFormElement>) => {
    setQuery(target.value);
  };
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuery("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form className="mb-10" onChange={handleChangeEvent}>
      <label className="relative">
        <span className="absolute left-8 top-0">
          <Image
            src={isDark ? "/images/magni-dark.svg" : "/images/magni.svg"}
            width={16}
            height={16}
            alt="Search input"
          />
        </span>
        <button className={`absolute right-8 top-0 ${query === "" && "hidden"}`} onClick={handleButtonClick}>
          <Image
            className="opacity-50"
            src={isDark ? "/images/xmark-dark.svg" : "/images/xmark.svg"}
            width={16}
            height={16}
            alt="Search input"
          />
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a country..."
          className="dark:bg-dark-blue p-5 w-[300px] md:w-[485px] pl-20 shadow-md text-sm rounded-md"
        />
      </label>
    </form>
  );
};

export default SearchForm;
