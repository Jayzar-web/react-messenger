import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../contexts/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className={"flex flex-col gap-1"}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            onClick={() => handleSelect(chat[1].userInfo)}
            key={chat[0]}
            className={`bg-light hover:bg-lightHover dark:bg-dark dark:hover:bg-darkHover 
              p-[10px] rounded-[10px] flex items-center gap-4 cursor-pointer transition-all`}
          >
            <img
              src={chat[1].userInfo.photoURL}
              alt={"avatar"}
              className={"rounded-full w-[50px] h-[50px] object-cover"}
            />
            <div className={"w-full flex justify-between items-end"}>
              <div>
                <span>{chat[1].userInfo.displayName}</span>
                <p
                  className={
                    "text-lightText/75 dark:text-darkText/75 max-w-[200px] whitespace-nowrap overflow-hidden overflow-ellipsis"
                  }
                >
                  {chat[1].lastMessage?.text}
                </p>
              </div>
              {/*<p className={"lastMessageTime"}></p>*/}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
