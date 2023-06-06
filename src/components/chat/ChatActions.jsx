import React, { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { ChatContext } from "../../contexts/ChatContext";
import { AuthContext } from "../../contexts/AuthContext";
import {
  doc,
  deleteDoc,
  getDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const ChatActions = ({ closeInfo, setIsOpenedSidebar }) => {
  const [showWarning, setShowWarning] = useState(false);

  const { data, dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const chatterID = data.user.uid;
  const currentUserID = currentUser.uid;

  const chatId =
    currentUserID > chatterID
      ? currentUserID + chatterID
      : chatterID + currentUserID;

  const handleClick = () => {
    setShowWarning(true);
  };

  const handleConfirm = async () => {
    // Обработчик подтверждения удаления переписки
    setShowWarning(false);

    // Коллекция currentUser и документ currentUserID + data.user.uid
    try {
      await updateDoc(doc(db, "userChat", currentUserID), {
        [chatId]: deleteField(),
      });
      await updateDoc(doc(db, "userChat", chatterID), {
        [chatId]: deleteField(),
      });
      await deleteDoc(doc(db, "chats", chatId));
      await dispatch({ type: "DELETE_CHAT" });
      closeInfo(false);
      setIsOpenedSidebar(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    // Обработчик отмены удаления переписки
    setShowWarning(false);
  };

  return (
    <>
      {showWarning ? (
        <div className="flex w-full flex-col items-center justify-center gap-2 bg-red-500 pt-2 text-center text-white ">
          <span className={"text-[14px]"}>
            Вы уверены, что хотите удалить переписку?
          </span>
          <div className={"flex w-full justify-between text-[14px]"}>
            <button
              onClick={handleConfirm}
              className="w-1/2 py-2 transition-all hover:bg-red-400"
            >
              Да
            </button>
            <button
              onClick={handleCancel}
              className="w-1/2 transition-all hover:bg-red-400"
            >
              Нет
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex w-full cursor-pointer items-center justify-center gap-2 py-2 text-center transition-all hover:bg-red-500 dark:bg-dark dark:hover:bg-red-500"
          onClick={handleClick}
        >
          <MdDeleteForever className="h-[25px] w-[25px]" />
          Удалить переписку
        </div>
      )}
    </>
  );
};

export default ChatActions;
