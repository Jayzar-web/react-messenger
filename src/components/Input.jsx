import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiPaperclip } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { ChatContext } from "../contexts/ChatContext";
import { AuthContext } from "../contexts/AuthContext";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
    if (!image) {
      if (text.trim().length > 0) {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuidv4(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
    } else {
      const storageRef = ref(storage, uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setUploadProgress(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            }).catch((error) => {
              console.log(error);
            });
          });
        }
      );
    }
    const getLastMessageDate = () => {};

    await updateDoc(doc(db, "userChat", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChat", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className={"h-[50px] w-full flex justify-between items-center p-2 "}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        type={"text"}
        placeholder={"Aa"}
        className={
          "p-[10px] bg-lightSecondary/25 focus:outline-none rounded-[10px] w-full mx-3"
        }
      />
      <div className={"flex gap-2 text-primary relative"}>
        {image && (
          <span
            onClick={() => setImage(null)}
            className={`text-lightText hover:bg-lightHover dark:hover:bg-darkHover 
              absolute top-[-55px] left-[-25px] shadow-xl bg-light rounded-[10px] p-2 cursor-pointer max-w-[100px] 
              whitespace-nowrap overflow-hidden overflow-ellipsis`}
          >
            {image.name}
          </span>
        )}
        <label htmlFor={"sendFile"} className={"cursor-pointer"}>
          <FiPaperclip
            className={`text-lightText hover:text-lightHover dark:hover:text-darkHover 
          w-[30px] h-[30px] transition-all`}
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          accept={"image/*"}
          type={"file"}
          className={"hidden"}
          id={"sendFile"}
        />
        <button onClick={handleSend}>
          <IoSend
            className={`text-lightText hover:text-lightHover dark:text-darkText dark:hover:text-darkHover
             w-[30px] h-[30px] transition-all`}
          />
        </button>
      </div>
    </div>
  );
};

export default Input;
