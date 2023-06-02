import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import ModalImage from "../ModalImage";
import { SiGmail } from "react-icons/si";

const About = ({ user, isShowAbout, setIsShowAbout }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <>
      {isShowAbout && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div
            className={
              "h-full max-h-[450px] min-h-[350px] w-[35%] overflow-hidden rounded-[10px] bg-light text-[10px] text-lightText md:text-[16px]"
            }
          >
            <div className={"flex h-full w-full flex-col gap-3 sm:flex-row"}>
              <div
                className={
                  "flex h-[60%] flex-col gap-2 p-3 sm:h-full sm:w-[70%]"
                }
              >
                <h1 className={"text-2xl"}>Основная информация</h1>
                <p>Имя пользователя: {user.displayName}</p>
                {user.email && <p>Почта: {user.email}</p>}
                <div className={"flex items-center gap-3"}>
                  <p>Аватар:</p>
                  <ModalImage
                    src={user.photoURL}
                    alt={"user avatar"}
                    rounded={true}
                  />
                </div>
              </div>
              <div
                className={
                  "flex h-[30%] flex-col justify-between bg-lightPrimary p-3 sm:h-full sm:w-[40%]"
                }
              >
                <h1 className={"text-2xl"}>Поддержка</h1>
                <div className={"mt-4"}>
                  <p>
                    Если у вас возникли вопросы, предложения или проблемы, вы
                    можете обратиться по следующим источникам:
                  </p>
                  <div className={"flex flex-row gap-3"}>
                    <SiGmail className={"text-[25px]"} />
                    roflanblch@gmail.com
                  </div>
                </div>
                <p className={"text-[10px]"}>
                  Проект был разработан с использованием следующих технологий: -
                  Фронтенд: HTML, CSS, JavaScript (с использованием библиотеки
                  React) <br /> - Бэкенд: Firebase (включая Firebase
                  Authentication для аутентификации пользователей) <br /> - База
                  данных: Firebase Firestore для хранения данных
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsShowAbout(false)}
            className="absolute right-[11px] top-[6px] h-[52px] w-[52px] rounded-full bg-red-600 p-2 text-white hover:bg-red-500 active:scale-95"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default About;
