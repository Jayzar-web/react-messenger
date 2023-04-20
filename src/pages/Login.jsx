import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import logo from "../../public/Logo_without_back.svg";
import Menu from "../components/Menu";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError("Введены неправильные учетные данные.");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div
      className={
        "bg-light dark:bg-dark text-lightText dark:text-darkText font-bold h-screen w-screen flex flex-col items-center"
      }
    >
      <Menu />
      <div
        className={
          "flex rounded-[10px] w-96 h-80 bg-blue-50 flex-col justify-center items-center translate-y-1/2 shadow-2xl"
        }
      >
        <h1 className={"mb-[25px] text-gray-400 text-1xl"}>Вход в аккаунт</h1>
        <form
          onSubmit={handleSubmit}
          className={"flex flex-col items-center gap-4 w-3/4"}
        >
          <input
            type="email"
            placeholder="Почта"
            className={`focus:outline-lightPrimary dark:focus:outline-darkPrimary text-lightText
              shadow border-b-2 rounded-[10px] w-full p-[10px] focus:outline-2`}
          />
          <input
            type="password"
            placeholder="Пароль"
            className={`focus:outline-lightPrimary dark:focus:outline-darkPrimary text-lightText
              shadow border-b-2 rounded-[10px] w-full p-[10px] focus:outline-2`}
          />
          <button
            className={`bg-lightPrimary hover:bg-lightHover dark:bg-darkPrimary dark:hover:bg-darkHover 
              w-fit rounded-[10px] p-[15px] active:scale-95 transition`}
          >
            Войти
          </button>
          {error && (
            <span
              className={
                "bg-red-500/30 text-red-500 border-red-500 border-b border-t rounded p-2 absolute top-[-100px] "
              }
            >
              {error}
            </span>
          )}
        </form>
        <p className={"text-[15px] mt-[15px] text-gray-400"}>
          Нет аккаунта?
          <Link
            to={"/register"}
            className={
              "hover:text-lightHover dark:hover:text-darkHover mx-[5px] transition-all hover:underline"
            }
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
