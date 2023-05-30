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
        "flex h-[calc(100vh-70px)] w-full flex-col items-center justify-center gap-3"
      }
    >
      <p>Подтвердите почту для дальнейшего использования</p>
      <button
        disabled={isTimerActive}
        onClick={handleSend}
        className={"cursor-pointer transition-all disabled:text-red-500"}
      >
        {isTimerActive ? `${timer}` : `Отправить письмо еще раз`}
      </button>
    </div>
  );
};

export default WithoutVerification;
