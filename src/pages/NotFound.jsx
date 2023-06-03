import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      className={
        "flex h-[calc(100vh-70px)] flex-col items-center justify-center bg-light font-bold text-lightText dark:bg-dark dark:text-darkText"
      }
    >
      <h1 className={"text-[200px]"}>404</h1>
      <button
        className={
          "rounded-[10px] px-1 py-2 transition-all hover:bg-lightHover dark:hover:bg-darkHover"
        }
        onClick={handleClick}
      >
        Назад
      </button>
    </div>
  );
};

export default NotFound;
