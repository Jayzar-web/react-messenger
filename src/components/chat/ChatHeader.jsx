import { AiFillInfoCircle } from "react-icons/ai";
import { ChatContext } from "../../contexts/ChatContext";
import { useContext } from "react";
import { IoIosArrowBack } from "react-icons/io";

const ChatHeader = ({ setIsOpenedInfo, setIsOpenedSidebar }) => {
  const { data } = useContext(ChatContext);

  return (
    <>
      <div
        className={
          "border-borders flex h-[50px] w-full items-center px-[10px] shadow-md"
        }
      >
        <div className={"flex w-full items-center justify-between"}>
          <IoIosArrowBack
            onClick={() => setIsOpenedSidebar(true)}
            className={
              "block h-[30px] w-[30px] cursor-pointer rounded-full transition-all hover:bg-lightHover active:scale-95 dark:hover:bg-darkHover md:hidden"
            }
          />
          <div className={"flex items-center gap-4"}>
            {data.user?.photoURL && (
              <img
                src={data.user?.photoURL}
                alt={"avatar"}
                className={"h-[40px] w-[40px] rounded-full object-cover"}
              />
            )}
            <span>{data.user?.displayName}</span>
          </div>
          <AiFillInfoCircle
            onClick={() => {
              setIsOpenedInfo((prev) => !prev);
            }}
            className={`h-[30px] w-[30px] cursor-pointer rounded-full 
              text-lightText transition-all hover:text-lightHover dark:text-darkText dark:hover:text-darkHover`}
          />
        </div>
      </div>
    </>
  );
};

export default ChatHeader;