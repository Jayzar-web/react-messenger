import React from "react";

const Loading = () => {
  return (
    <div
      className={
        "flex h-[calc(100vh-70px)] items-center justify-center bg-light dark:bg-dark"
      }
    >
      <span
        className={
          "mx-auto block h-[150px] w-[150px] animate-spin rounded-full border-[10px] border-lightHover border-b-darkBorders"
        }
      ></span>
    </div>
  );
};

export default Loading;
