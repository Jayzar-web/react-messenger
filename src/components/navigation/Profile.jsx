import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { ChatContext } from "../../contexts/ChatContext";
import About from "./About";

const Profile = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const [isShow, setIsShow] = useState(false);
  const [isShowAbout, setIsShowAbout] = useState(false);

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
    <div className={"flex items-center justify-center gap-4"}>
      <div className={"relative"} ref={menuRef}>
        <div>
          <button onClick={handleShow}>
            <img
              src={currentUser.photoURL}
              alt={"avatar"}
              className={"h-[50px] w-[50px] rounded-full object-cover"}
            />
          </button>
        </div>
        <About isShowAbout={isShowAbout} setIsShowAbout={setIsShowAbout} />
        {isShow && (
          <div
            className={
              "top-15 absolute right-0 z-30 overflow-hidden rounded-[10px] bg-light shadow dark:bg-dark"
            }
          >
            <ul className={"text-center "}>
              <li
                className={
                  "w-full cursor-pointer px-[10px] transition-all hover:bg-lightHover dark:hover:bg-darkHover"
                }
              >
                <button
                  onClick={() => {
                    setIsShowAbout(true);
                    setIsShow(false);
                  }}
                >
                  Информация
                </button>
              </li>
              <li
                className={
                  "w-full cursor-pointer px-[10px] transition-all hover:bg-lightHover dark:hover:bg-darkHover"
                }
              >
                <button
                  onClick={() => {
                    signOut(auth);
                    data.user.uid = null;
                    localStorage.removeItem("verified");
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
