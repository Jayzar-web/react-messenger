import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import Profile from "./Profile";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";
import logoLight from "../assets/menuLight.svg";
import logoDark from "../assets/menuDark.svg";

const Menu = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);

  const isDark = () => theme === "dark";

  const handleChange = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <>
      <div
        className={`flex h-[70px] w-full items-center justify-between border-b-[1px] border-lightBorders 
        bg-light px-3 font-bold text-lightText dark:border-darkBorders dark:bg-dark dark:text-darkText`}
      >
        <div>
          <img
            src={theme === "light" ? logoLight : logoDark}
            alt={"logo"}
            className={"w-[200px]"}
          />
        </div>
        <div className={"flex items-center gap-4"}>
          <label className={"z-40 cursor-pointer select-none active:scale-95"}>
            <input
              checked={isDark()}
              onChange={handleChange}
              type={"checkbox"}
              className={"hidden"}
            />
            {isDark() ? (
              <BsFillSunFill className={"h-6 w-6"} />
            ) : (
              <BsFillMoonFill className={"h-5 w-5"} />
            )}
          </label>
          {currentUser && <Profile />}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Menu;
