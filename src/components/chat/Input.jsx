import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiPaperclip } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { ChatContext } from "../../contexts/ChatContext";
import { AuthContext } from "../../contexts/AuthContext";
import { db, storage } from "../../firebase";

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
    <div className={"flex h-[50px] w-full items-center justify-between p-2 "}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        type={"text"}
        placeholder={"Aa"}
        className={
          "mx-3 w-full rounded-[10px] bg-lightSecondary/25 p-[10px] focus:outline-none"
        }
      />
      <div className={"text-primary l relative flex gap-2 leading-[13px]"}>
        {image && (
          <span
            onClick={() => setImage(null)}
            className={`absolute left-[-25px] top-[-55px] max-w-[100px] 
              cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap rounded-[10px] bg-light p-2 text-lightText shadow-xl 
              hover:bg-lightHover dark:hover:bg-darkHover`}
          >
            {image.name}
          </span>
        )}
        <label htmlFor={"sendFile"} className={"cursor-pointer"}>
          <FiPaperclip
            className={`h-[30px] w-[30px] text-lightText transition-all 
          hover:text-lightHover dark:text-darkText dark:hover:text-darkHover`}
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
            className={`h-[30px] w-[30px] text-lightText transition-all
             hover:text-lightHover dark:text-darkText dark:hover:text-darkHover`}
          />
        </button>
      </div>
    </div>
  );
};

export default Input;
