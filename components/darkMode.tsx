import Image from "next/image";

const DarkModeToggle = () => {
  return (
    <button className="flex items-center text-base font-semibold">
      <span className="mr-2 flex">
        <Image
          src={"/images/light.svg"}
          width={16}
          height={16}
          alt="Dark mode"
        />
      </span>
      Dark Mode
    </button>
  );
};

export default DarkModeToggle;
