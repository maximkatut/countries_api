import Image from "next/image";

const SearchForm = () => {
  return (
    <form>
      <label className="relative">
        <span className="absolute left-8 top-0">
          <Image
            src={"/images/magni.svg"}
            width={16}
            height={16}
            alt="Search input"
          />
        </span>
        <input
          type="text"
          placeholder="Search for a country..."
          className="p-5 w-[485px] pl-20 shadow-md text-sm rounded-md"
        />
      </label>
    </form>
  );
};

export default SearchForm;
