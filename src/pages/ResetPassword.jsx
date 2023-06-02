import { useState } from "react";
import { auth } from "../firebase";
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";

const ResetPassword = () => {
  const errors = {
    invalidEmail: "Аккаунт с указанной почтой не существует.",
    alert: "Письмо отправлено на указанную почту.",
  };
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    try {
      // Проверка существования аккаунта
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length === 0) {
        setError(errors.invalidEmail);
        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }

      // Отправка письма для сброса пароля
      await sendPasswordResetEmail(auth, email);
      setError(errors.alert);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } catch (error) {
      console.log(error.message);
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
          "relative top-[50%] flex h-52 w-96 translate-y-[-50%] flex-col items-center justify-center rounded-[10px] bg-blue-50  shadow-2xl"
        }
      >
        <h1 className={"text-1xl mb-[25px] text-gray-400"}>
          Восстановление пароля
        </h1>
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
          <button
            className={`w-fit rounded-[10px] bg-lightPrimary p-[15px] 
              transition hover:bg-lightHover active:scale-95 dark:bg-darkPrimary dark:hover:bg-darkHover`}
          >
            Отправить письмо
          </button>
          {error && (
            <span
              className={`${
                error === errors.alert
                  ? "border-green-500 bg-green-500/30 text-green-500"
                  : "border-red-500 bg-red-500/30 text-red-500"
              } absolute top-[-100px] rounded border-b border-t p-2 `}
            >
              {error}
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
