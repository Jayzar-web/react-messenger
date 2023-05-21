import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { ChatContext } from "../../contexts/ChatContext";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import PhotoList from "./PhotoList";

const ChatInfo = ({ setIsOpenedInfo }) => {
  const [images, setImages] = useState([]);

  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const loadImages = async () => {
      const docRef = await getDoc(doc(db, "chats", data.chatId));
      setImages(docRef.data().messages.map((message) => message.image));
    };
    currentUser.uid && loadImages();
  }, [data.chatId, images]);

  return (
    <div
      className={`relative z-20 flex h-[calc(100vh-70px)] w-full border-l-[1px] border-lightBorders p-3 transition-all 
        dark:border-darkBorders md:max-w-[250px] lg:max-w-[350px]`}
    >
      <div
        className={
          "relative flex h-auto w-full flex-col items-center overflow-hidden"
        }
      >
        <IoIosArrowBack
          onClick={() => setIsOpenedInfo(false)}
          className={
            "absolute left-0 block h-[30px] w-[30px] rounded-full transition-all active:scale-95 md:hidden "
          }
        />
        <img
          src={data.user?.photoURL}
          alt={"avatar"}
          className={"h-[150px] w-[150px] rounded-full object-cover"}
        />
        <h1 className={"my-[10px] text-2xl font-bold"}>
          {data.user?.displayName}
        </h1>

        <PhotoList images={images} />
      </div>
    </div>
  );
};

export default ChatInfo;
