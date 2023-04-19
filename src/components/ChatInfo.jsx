import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { BiBlock } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { ChatContext } from "../contexts/ChatContext";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import ModalImage from "./ModalImage";

const ChatInfo = ({ isOpenedInfo }) => {
  const [images, setImages] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

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
      className={
        "border-lightBorders dark:border-darkBorders h-[calc(100vh-70px)] max-w-[350px] w-full border-l-[1px] flex transition-all p-3 z-20 relative"
      }
    >
      {!isOpened ? (
        <div
          className={"flex-col items-center w-full h-auto flex overflow-hidden"}
        >
          <img
            src={data.user?.photoURL}
            alt={"avatar"}
            className={"rounded-full object-cover w-[150px] h-[150px]"}
          />
          <h1 className={"font-bold text-2xl my-[10px]"}>
            {data.user?.displayName}
          </h1>
          <button
            onClick={() => setIsOpened(true)}
            className={
              "hover:bg-lightHover dark:hover:bg-darkHover flex rounded-[10px] p-[10px] items-center justify-between w-full transition-all"
            }
          >
            Фото
          </button>
          <button
            className={
              "hover:bg-lightHover dark:hover:bg-darkHover flex rounded-[10px] p-[10px] items-center justify-between w-full transition-all"
            }
          >
            Действия
            <IoIosArrowDown />
          </button>
        </div>
      ) : (
        <div className={"w-full"}>
          <div className={"flex items-center justify-between"}>
            <IoIosArrowBack
              onClick={() => setIsOpened(false)}
              className={
                "hover:bg-lightHover dark:hover:bg-darkHover w-[30px] h-[30px] rounded-full transition-all cursor-pointer"
              }
            />
            <h1 className={"font-bold text-2xl"}>Фото</h1>
          </div>
          <div
            className={
              "flex flex-wrap mt-1 p-2 max-h-[800px] overflow-auto scrollbar-thin scrollbar-thumb-[#888888] scrollbar-track-[#DDDDDD]"
            }
          >
            {images.map(
              (image) =>
                image && (
                  <ModalImage
                    src={image}
                    alt={image}
                    key={image}
                    width={100}
                    height={100}
                    scale={true}
                    rounded={false}
                    isMessage={false}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInfo;
