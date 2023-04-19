import { AiFillInfoCircle } from "react-icons/ai";
import { ChatContext } from "../contexts/ChatContext";
import { useContext } from "react";

const ChatHeader = ({ isOpenedInfo, setIsOpenedInfo }) => {
  const { data } = useContext(ChatContext);

  return (
    <>
      <div
        className={
          "h-[50px] w-full border-borders px-[10px] flex items-center shadow-md"
        }
      >
        <div className={"flex justify-between items-center w-full"}>
          <div className={"flex items-center gap-4"}>
            {data.user?.photoURL && (
              <img
                src={data.user?.photoURL}
                alt={"avatar"}
                className={"rounded-full w-[40px] h-[40px] object-cover"}
              />
            )}
            <span>{data.user?.displayName}</span>
          </div>
          {/*<span className={"text-[#3AE841]"}>Онлайн</span>*/}
          <AiFillInfoCircle
            onClick={() => {
              setIsOpenedInfo(!isOpenedInfo);
            }}
            className={`text-lightText hover:text-lightHover dark:text-darkText dark:hover:text-darkHover 
              w-[30px] h-[30px] rounded-full transition-all cursor-pointer`}
          />
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
