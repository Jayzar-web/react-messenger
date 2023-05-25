import { useContext, useState } from "react";
import Messages from "./Messages";
import ChatHeader from "./ChatHeader";
import ChatInfo from "./ChatInfo";
import Input from "./Input";
import { ChatContext } from "../../contexts/ChatContext";

const Chat = ({ isOpenedSidebar, setIsOpenedSidebar }) => {
  const { data } = useContext(ChatContext);
  const [isOpenedInfo, setIsOpenedInfo] = useState(false);

  return (
    <div
      className={`${
        isOpenedSidebar ? "hidden" : "block"
      } w-full overflow-hidden md:flex`}
    >
      {data.user?.uid ? (
        <div
          className={`${
            isOpenedInfo && "hidden"
          } w-full flex-col justify-between md:flex`}
        >
          <ChatHeader
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
          setIsOpenedSidebar={setIsOpenedSidebar}
          isOpenedInfo={isOpenedInfo}
          setIsOpenedInfo={setIsOpenedInfo}
        />
      )}
    </div>
  );
};

export default Chat;
