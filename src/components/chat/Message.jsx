import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { AuthContext } from "../../contexts/AuthContext";
import ModalImage from "../ModalImage";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`mx-[10px] my-[5px] flex ${
        message.senderId === currentUser.uid && "justify-end"
      }`}
    >
      <div
        className={`flex items-start gap-3 ${
          message.senderId === currentUser.uid && "flex-row-reverse"
        }`}
      >
        <div
          className={`flex flex-col ${
            message.senderId === currentUser.uid && "items-end"
          }`}
        >
          {message.text && (
            <p
              className={`max-w-[300px] overflow-hidden break-words rounded-b-md p-2 ${
                message.senderId === currentUser.uid
                  ? "rounded-l-md bg-lightSelfMessage dark:bg-darkSelfMessage"
                  : "rounded-r-md bg-lightMessage dark:bg-darkMessage"
              }`}
            >
              {message.text}
            </p>
          )}
          {message.image && (
            <ModalImage
              src={message.image}
              className={`max-w-[500px] rounded-[10px] object-cover ${
                message.text && " mt-2"
              }`}
              width={250}
              height={250}
              rounded={true}
              scale={false}
              inMessage={true}
              alt={"image"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
