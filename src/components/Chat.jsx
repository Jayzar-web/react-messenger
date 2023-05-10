import { useContext, useState } from "react";
import Messages from "./Messages";
import ChatHeader from "./ChatHeader";
import ChatInfo from "./ChatInfo";
import Input from "./Input";
import { ChatContext } from "../contexts/ChatContext";

const Chat = ({ isOpenedSidebar, setIsOpenedSidebar, isMobile }) => {
  const { data } = useContext(ChatContext);
  const [isOpenedInfo, setIsOpenedInfo] = useState(false);

  return (
    <div
      className={`${
        isOpenedSidebar ? "hidden" : "flex"
      } w-full overflow-hidden md:flex md:w-full`}
    >
      {data.user?.uid ? (
        <div
          className={`${
            isMobile ? (isOpenedInfo ? "hidden" : "flex-1") : "flex-1"
          } flex-col justify-between md:flex`}
        >
          <ChatHeader
            isMobile={isMobile}
            setIsOpenedSidebar={setIsOpenedSidebar}
            isOpenedInfo={isOpenedInfo}
            setIsOpenedInfo={setIsOpenedInfo}
          />
          <Messages />
          <Input />
        </div>
      ) : (
        <div
          className={"hidden h-full w-full items-center justify-center md:flex"}
        >
          <span className={"bg-primary rounded-[10px] p-2"}>Выберите чат</span>
        </div>
      )}
      {isOpenedInfo && (
        <ChatInfo
          isMobile={isMobile}
          isOpenedInfo={isOpenedInfo}
          setIsOpenedInfo={setIsOpenedInfo}
        />
      )}
    </div>
  );
};

export default Chat;
