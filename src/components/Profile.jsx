import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ChatContext } from "../contexts/ChatContext";
import Setting from "./Setting";

const Profile = () => {
  const { data, dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const [isShow, setIsShow] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);

  const menuRef = useRef(null);

  const handleShow = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsShow(false);
    }
  };

  return (
    <div className={"flex gap-4 items-center justify-center"}>
      <div className={"relative"} ref={menuRef}>
        <div>
          <button onClick={handleShow}>
            <img
              src={currentUser.photoURL}
              alt={"avatar"}
              className={"rounded-full w-[50px] h-[50px] object-cover"}
            />
          </button>
        </div>
        <Setting
          isShowSetting={isShowSetting}
          setIsShowSetting={setIsShowSetting}
        />
        {isShow && (
          <div
            className={
              "bg-light dark:bg-dark absolute top-15 right-0 overflow-hidden rounded-[10px] shadow z-30"
            }
          >
            <ul className={"text-center "}>
              <li
                className={
                  "hover:bg-lightHover dark:hover:bg-darkHover transition-all w-full px-[10px] cursor-pointer"
                }
              >
                <button
                  onClick={() => {
                    setIsShowSetting(true);
                    setIsShow(false);
                  }}
                >
                  Настройки
                </button>
              </li>
              <li
                className={
                  "hover:bg-lightHover dark:hover:bg-darkHover transition-all w-full px-[10px] cursor-pointer"
                }
              >
                <button
                  onClick={() => {
                    signOut(auth);
                    data.user.uid = null;
                  }}
                >
                  Выйти
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
