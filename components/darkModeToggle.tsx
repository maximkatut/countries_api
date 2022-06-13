import { LocalStorage } from "../services/LocalStorage/LocalStorage.service";
import Image from "next/image";
import { useStore } from "../store";
import { useEffect } from "react";

const DarkModeToggle = () => {
  const isDark = useStore((state) => state.isDark);
  const setIsDark = useStore((state) => state.setIsDark);

  useEffect(() => {
    setIsDark(LocalStorage.get("theme") === "dark");
    LocalStorage.update();
  }, [setIsDark]);

  const toggleDarkMode = () => {
    if (isDark) {
      LocalStorage.setDarkModeOff();
    } else {
      LocalStorage.setDarkModeOn();
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center text-base font-semibold"
    >
      <span className="md:mr-2 flex">
        <Image
          src={isDark ? "/images/dark.svg" : "/images/light.svg"}
          width={16}
          height={16}
          alt="Dark mode"
        />
      </span>
      <span className="hidden md:inline">Dark Mode</span>
    </button>
  );
};

export default DarkModeToggle;
