import Image from "next/image";
import { useStore } from "../store";
const SearchForm = () => {
  const isDark = useStore((state) => state.isDark);
  return (
    <form className="mb-10">
      <label className="relative">
        <span className="absolute left-8 top-0">
          <Image
            src={isDark ? "/images/magni-dark.svg" : "/images/magni.svg"}
            width={16}
            height={16}
            alt="Search input"
          />
        </span>
        <input
          type="text"
          placeholder="Search for a country..."
          className="dark:bg-dark-blue p-5 w-[300px] md:w-[485px] pl-20 shadow-md text-sm rounded-md"
        />
      </label>
    </form>
  );
};

export default SearchForm;
