import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Profile from "./Profile";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/Logo_without_back.svg";

const Menu = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);

  const isDark = () => theme === "dark";

  const handleChange = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <div
      className={`border-lightBorders dark:border-darkBorders 
        w-full h-[70px] border-b-[1px] flex justify-between items-center px-3`}
    >
      <div>
        <img src={logo} alt={"logo"} className={"w-[150px]"} />
      </div>
      <div className={"flex items-center gap-4"}>
        <label className={"cursor-pointer select-none active:scale-95 z-40"}>
          <input
            checked={isDark()}
            onChange={handleChange}
            type={"checkbox"}
            className={"hidden"}
          />
          {isDark() ? (
            <BsFillSunFill className={"w-6 h-6"} />
          ) : (
            <BsFillMoonFill className={"w-5 h-5"} />
          )}
        </label>
        {currentUser && <Profile />}
      </div>
    </div>
  );
};

export default Menu;
