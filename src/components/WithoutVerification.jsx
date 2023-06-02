import { sendEmailVerification } from "@firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const WithoutVerification = () => {
  const { currentUser } = useContext(AuthContext);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isTimerActive) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerActive]);

  const handleSend = async () => {
    try {
      await sendEmailVerification(currentUser);
      setIsTimerActive(true);
      setTimer(60);
      console.log("Письмо отправлено");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      setIsTimerActive(false);
    }
  }, [timer]);

  return (
    <div
      className={
        "flex h-[calc(100vh-70px)] w-full flex-col items-center justify-center gap-3 text-center"
      }
    >
      <p className={"text-2xl"}>Подтвердите почту</p>
      <button
        disabled={isTimerActive}
        onClick={handleSend}
        className={
          "w-44 cursor-pointer rounded-[10px] bg-lightHover p-2 transition-all disabled:cursor-default disabled:text-red-500 active:scale-95"
        }
      >
        {isTimerActive ? `${timer}` : `Отправить письмо`}
      </button>
      <p className={"text-[14px]"}>
        После подтверждения необходимо перезагрузить страницу
      </p>
    </div>
  );
};

export default WithoutVerification;
