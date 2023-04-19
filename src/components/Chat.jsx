import { useContext, useState } from "react";
import Messages from "./Messages";
import ChatHeader from "./ChatHeader";
import ChatInfo from "./ChatInfo";
import Input from "./Input";
import { ChatContext } from "../contexts/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [isOpenedInfo, setIsOpenedInfo] = useState(false);

  return (
    <div className={"w-full overflow-hidden flex"}>
      {data.user?.uid ? (
        <div className={"flex flex-1 flex-col justify-between"}>
          <ChatHeader
            isOpenedInfo={isOpenedInfo}
            setIsOpenedInfo={setIsOpenedInfo}
          />
          <Messages />
          <Input />
        </div>
      ) : (
        <div className={"flex w-full h-full justify-center items-center"}>
          <span className={"bg-primary p-2 rounded-[10px]"}>Выберите чат</span>
        </div>
      )}
      {isOpenedInfo && <ChatInfo isOpenedInfo={isOpenedInfo} />}
    </div>
  );
};

export default Chat;
