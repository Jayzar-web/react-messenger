import { FaTelegram } from "react-icons/fa";


const TelegramLink = ({ username }) => {
  const telegram = `https://t.me/${username}`;

  return (
    <>
      <a
        className={
          "flex w-fit gap-2 rounded-[10px] px-1 py-2 transition-all hover:bg-lightHover dark:hover:bg-darkHover"
        }
        href={telegram}
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        <p>Написать в телеграмм: {username}</p>
        <FaTelegram className="cursor-pointer text-[25px]" />
      </a>
    </>
  );
};

export default TelegramLink;
