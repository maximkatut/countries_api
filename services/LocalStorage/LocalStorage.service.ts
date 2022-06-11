export const LocalStorage = {
  get(key: string) {
    return localStorage.getItem(key);
  },
  setDarkModeOn() {
    localStorage["theme"] = "dark";
    this.update();
  },
  setDarkModeOff() {
    localStorage.removeItem("theme");
    this.update();
  },
  update() {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
};
