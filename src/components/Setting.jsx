import { useContext, useEffect, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";

const Setting = ({ isShowSetting, setIsShowSetting }) => {
  const { currentUser } = useContext(AuthContext);
  const [isOpened, setIsOpened] = useState(false);
  const [image, setImage] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [error, setError] = useState(null);
  const regex = /^[a-zA-Z0-9_]{3,20}$/;

  const handleSave = async (e) => {
    e.preventDefault();
    setImage(e.target[0].files[0]);

    // Проверка имени
    if (!regex.test(newDisplayName)) {
      setError(
        "Имя должно содержать латинские буквы, цифры или знак подчеркивания"
      );
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    // await updateProfile(auth.currentUser, {
    //   displayName: newDisplayName,
    // });
    //
    // await updateDoc(doc(db, "users", currentUser.uid), {
    //   displayName: newDisplayName,
    // });

    console.log(currentUser);

    setNewDisplayName("");
    setImage(null);
  };

  const handleClose = () => {
    setIsShowSetting(false);
    setImage(null);
  };

  return (
    <div>
      {isShowSetting && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-30">
          {error && (
            <span
              className={
                "bg-red-500/30 text-red-500 border-red-500 border-b border-t rounded p-2 absolute top-24"
              }
            >
              {error}
            </span>
          )}
          <div
            className={"bg-light text-lightText rounded-[10px] p-3 w-1/2 h-1/2"}
          >
            <div className={"flex gap-3 h-full"}>
              {/* sidebar в котором пока 2 параметра такие как настройка профиля(Изменить аватар, имя) и о программе */}
              <div className={"w-1/4"}>
                <ul>
                  <li>
                    <button
                      onClick={() => setIsOpened(false)}
                      className={`hover:bg-lightHover dark:hover:bg-darkHover 
                        flex rounded-[10px] p-[10px] items-center justify-between w-full transition-all`}
                    >
                      Профиль
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsOpened(true)}
                      className={`hover:bg-lightHover dark:hover:bg-darkHover 
                        flex rounded-[10px] p-[10px] items-center justify-between w-full transition-all`}
                    >
                      О программе
                    </button>
                  </li>
                </ul>
              </div>
              <div className={"w-full p-3 shadow rounded-[10px]"}>
                {!isOpened ? (
                  <form
                    onSubmit={handleSave}
                    className={"flex flex-col justify-between h-full"}
                  >
                    <div>
                      <h1>{`Профиль ${currentUser.displayName}`}</h1>
                      <div>
                        <h2>Сменить аватар</h2>
                        <div className={"flex gap-4 items-center p-3"}>
                          <div>
                            <img
                              src={currentUser.photoURL}
                              alt={"avatar"}
                              className={
                                "rounded-full w-[50px] h-[50px] object-cover"
                              }
                            />
                          </div>
                          <div className={"relative"}>
                            {image && (
                              <span
                                onClick={() => setImage(null)}
                                className={`text-lightText hover:bg-lightHover dark:hover:bg-darkHover 
                          absolute top-[-55px] left-[-35px] shadow bg-light rounded-[10px] p-2 cursor-pointer 
                          max-w-[100px] whitespace-nowrap overflow-hidden overflow-ellipsis`}
                              >
                                {image.name}
                              </span>
                            )}
                            <label className={"cursor-pointer"}>
                              <FiPaperclip
                                className={`text-lightText hover:text-lightHover dark:hover:text-darkHover 
                          w-[20px] h-[20px] transition-all`}
                              />
                              <input
                                onChange={(e) => setImage(e.target.files[0])}
                                accept={"image/*"}
                                type={"file"}
                                className={"hidden"}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2>Сменить имя профиля</h2>
                        <input
                          onChange={(e) =>
                            setNewDisplayName(e.target.value.trim())
                          }
                          value={newDisplayName}
                          type="text"
                          placeholder="Введите новое имя"
                          className={`text-lightText focus:outline-lightPrimary dark:focus:outline-darkPrimary 
                          shadow border-b-2 rounded-[10px] w-full max-w-[250px] p-[10px] focus:outline-2 my-2`}
                        />
                      </div>
                    </div>
                    <div className={"mx-auto my-0"}>
                      <button
                        className={`bg-green-500 hover:bg-green-400 active:scale-95
                        flex rounded-[10px] p-[10px] items-center justify-between w-full transition-all`}
                      >
                        Применить
                      </button>
                    </div>
                  </form>
                ) : (
                  <h1>О программе</h1>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="absolute top-[6px] right-[11px] p-2 text-white bg-red-600 rounded-full w-[52px] h-[52px] hover:bg-red-500 active:scale-95"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Setting;
