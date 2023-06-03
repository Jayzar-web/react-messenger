import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ModalImage from "../ModalImage";
import { SiGmail } from "react-icons/si";
import TelegramLink from "../TelegramLink";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const About = ({ user, isShowAbout, setIsShowAbout }) => {
  const [isUser, setIsUser] = useState(false);
  const [telegram, setTelegram] = useState("");
  const [success, setSuccess] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const checkUser = async () => {
      if (user.uid === currentUser.uid) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    };

    checkUser();
  }, [user, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        telegram,
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }

    setTelegram("");
  };

  return (
    <>
      {isShowAbout && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div
            className={
              "relative m-3 h-full max-h-[450px] min-h-[350px] w-full rounded-[10px] bg-light text-[10px] text-lightText sm:w-[75%] md:w-[55%] md:text-[16px] lg:w-[35%]"
            }
          >
            <div className={"flex h-full w-full flex-col gap-3 sm:flex-row"}>
              <h1 className={"w-full p-3 text-2xl sm:hidden"}>
                Основная информация
              </h1>
              <div
                className={
                  "relative flex h-[50%] flex-row items-center gap-2 p-3 sm:h-full sm:w-[70%] sm:flex-col sm:items-start"
                }
              >
                <div>
                  <h1 className={"hidden w-full text-2xl sm:block"}>
                    Основная информация
                  </h1>
                  <p>Имя пользователя: {user.displayName}</p>
                  {isUser && <p>Почта: {user.email}</p>}
                  <div className={"flex items-center gap-3"}>
                    <p>Аватар:</p>
                    <ModalImage
                      src={user.photoURL}
                      alt={"user avatar"}
                      rounded={true}
                    />
                  </div>
                </div>
                {isUser ? (
                  <form
                    onSubmit={handleSubmit}
                    className={"flex max-w-[250px] flex-col gap-2"}
                  >
                    <p>Добавить телеграмм: </p>
                    <input
                      placeholder={"введите username без @"}
                      type={"text"}
                      className={
                        "rounded bg-lightPrimary p-1 placeholder:text-lightText focus:outline-none"
                      }
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                    />
                    <button className={"rounded-[10px] bg-lightPrimary p-2"}>
                      Применить
                    </button>
                  </form>
                ) : (
                  user.telegram && <TelegramLink username={user.telegram} />
                )}
              </div>
              <div
                className={
                  "flex h-[50%] flex-col justify-between rounded-b-[10px] bg-lightPrimary p-3 sm:h-full sm:w-[40%] sm:rounded-r-[10px]"
                }
              >
                <h1 className={"text-2xl"}>Поддержка</h1>
                <div className={"sm:mt-4"}>
                  <p>
                    Если у вас возникли вопросы, предложения или проблемы, вы
                    можете обратиться по следующим источникам:
                  </p>
                  <div className={"flex flex-row items-center gap-3"}>
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
            {success && (
              <span
                className={
                  "absolute left-[50%] top-[-100px] translate-x-[-50%] rounded border-b border-t border-green-500 bg-green-500/30 p-2 text-green-500"
                }
              >
                Телеграмм успешно добавлен
              </span>
            )}
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
