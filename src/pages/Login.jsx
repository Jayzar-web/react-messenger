import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const errors = {
    wrongData: "Введены неправильные учетные данные.",
  };
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
      setError(errors.wrongData);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div
      className={
        "flex h-[calc(100vh-70px)] w-screen flex-col items-center bg-light font-bold text-lightText dark:bg-dark dark:text-darkText"
      }
    >
      <div
        className={
          "relative top-[50%] flex h-80 w-96 translate-y-[-50%] flex-col items-center justify-center rounded-[10px] bg-blue-50  shadow-2xl"
        }
      >
        <h1 className={"text-1xl mb-[25px] text-gray-400"}>Вход в аккаунт</h1>
        <form
          onSubmit={handleSubmit}
          className={"flex w-3/4 flex-col items-center gap-4"}
        >
          <input
            type="email"
            placeholder="Почта"
            className={`w-full rounded-[10px] border-b-2
              p-[10px] text-lightText shadow focus:outline-2 focus:outline-lightPrimary dark:focus:outline-darkPrimary`}
          />
          <input
            type="password"
            placeholder="Пароль"
            className={`w-full rounded-[10px] border-b-2
              p-[10px] text-lightText shadow focus:outline-2 focus:outline-lightPrimary dark:focus:outline-darkPrimary`}
          />
          <button
            className={`w-fit rounded-[10px] bg-lightPrimary p-[15px] 
              transition hover:bg-lightHover active:scale-95 dark:bg-darkPrimary dark:hover:bg-darkHover`}
          >
            Войти
          </button>
          {error && (
            <span
              className={
                "absolute top-[-100px] rounded border-b border-t border-red-500 bg-red-500/30 p-2 text-red-500 "
              }
            >
              {error}
            </span>
          )}
        </form>
        <p className={"mt-[15px] text-[15px] text-gray-400"}>
          Нет аккаунта?
          <Link
            to={"/register"}
            className={
              "mx-[5px] transition-all hover:text-lightHover hover:underline dark:hover:text-darkHover"
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
