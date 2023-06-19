import { useContext, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { ChatContext } from "../../contexts/ChatContext";

const Chats = ({ setIsOpenedSidebar }) => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

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
  }, [currentUser, data]);

  const handleSelect = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();

    setIsOpenedSidebar(false);
    dispatch({ type: "CHANGE_USER", payload: docData });
  };

  return (
    <div className={"flex flex-col gap-1"}>
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              onClick={() => handleSelect(chat[1].userInfo)}
              key={chat[0]}
              className={`flex cursor-pointer items-center gap-4 
              rounded-[10px] bg-light p-[10px] transition-all hover:bg-lightHover dark:bg-dark dark:hover:bg-darkHover`}
            >
              <img
                src={chat[1].userInfo.photoURL}
                alt={"avatar"}
                className={"h-[50px] w-[50px] rounded-full object-cover"}
              />
              <div className={"flex w-full items-end justify-between"}>
                <div>
                  <span>{chat[1].userInfo.displayName}</span>
                  <p
                    className={
                      "max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-lightText/75 dark:text-darkText/75"
                    }
                  >
                    {chat[1].lastMessage?.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
