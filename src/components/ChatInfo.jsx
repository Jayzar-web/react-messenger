import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { ChatContext } from "../contexts/ChatContext";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import ModalImage from "./ModalImage";

const ChatInfo = ({ isMobile, setIsOpenedInfo }) => {
  const [images, setImages] = useState([]);
  const [isPhotoOpened, setIsPhotoOpened] = useState(false);

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
      className={`relative z-20 flex h-[calc(100vh-70px)] w-full border-l-[1px] border-lightBorders p-3 
        transition-all dark:border-darkBorders md:max-w-[250px] lg:max-w-[350px]`}
    >
      {!isPhotoOpened ? (
        <div
          className={
            "relative flex h-auto w-full flex-col items-center overflow-hidden"
          }
        >
          {isMobile && (
            <IoIosArrowBack
              onClick={() => setIsOpenedInfo(false)}
              className={
                "absolute left-0 h-[30px] w-[30px] rounded-full transition-all  active:scale-95 "
              }
            />
          )}
          <img
            src={data.user?.photoURL}
            alt={"avatar"}
            className={"h-[150px] w-[150px] rounded-full object-cover"}
          />
          <h1 className={"my-[10px] text-2xl font-bold"}>
            {data.user?.displayName}
          </h1>
          <button
            onClick={() => setIsPhotoOpened(true)}
            className={
              "flex w-full items-center justify-between rounded-[10px] p-[10px] transition-all hover:bg-lightHover dark:hover:bg-darkHover"
            }
          >
            Фото
          </button>
          <button
            className={
              "flex w-full items-center justify-between rounded-[10px] p-[10px] transition-all hover:bg-lightHover dark:hover:bg-darkHover"
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
              onClick={() => setIsPhotoOpened(false)}
              className={
                "h-[30px] w-[30px] cursor-pointer rounded-full transition-all hover:bg-lightHover dark:hover:bg-darkHover"
              }
            />
            <h1 className={"text-2xl font-bold"}>Фото</h1>
          </div>
          <div
            className={
              "mt-1 flex max-h-[800px] flex-wrap overflow-auto p-2 scrollbar-thin scrollbar-track-[#DDDDDD] scrollbar-thumb-[#888888]"
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
