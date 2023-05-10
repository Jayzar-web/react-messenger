import { useContext, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";

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
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-800 bg-opacity-75">
          {error && (
            <span
              className={
                "absolute top-24 rounded border-b border-t border-red-500 bg-red-500/30 p-2 text-red-500"
              }
            >
              {error}
            </span>
          )}
          <div
            className={
              "h-1/2 w-5/6 rounded-[10px] bg-light p-3 text-[10px] text-lightText md:w-3/4 md:text-[16px] lg:w-1/2"
            }
          >
            <div className={"flex h-full gap-3"}>
              <div className={"w-2/4"}>
                <ul>
                  <li>
                    <button
                      onClick={() => setIsOpened(false)}
                      className={`flex w-full 
                        items-center justify-between rounded-[10px] p-[10px] transition-all hover:bg-lightHover dark:hover:bg-darkHover`}
                    >
                      Профиль
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsOpened(true)}
                      className={`flex w-full 
                        items-center justify-between rounded-[10px] p-[10px] transition-all hover:bg-lightHover dark:hover:bg-darkHover`}
                    >
                      О программе
                    </button>
                  </li>
                </ul>
              </div>
              <div className={"w-full rounded-[10px] p-3 shadow"}>
                {!isOpened ? (
                  <form
                    onSubmit={handleSave}
                    className={"flex h-full flex-col justify-between"}
                  >
                    <div>
                      <h1>{`Профиль ${currentUser.displayName}`}</h1>
                      <div>
                        <h2>Сменить аватар</h2>
                        <div className={"flex items-center gap-4 p-3"}>
                          <div>
                            <img
                              src={currentUser.photoURL}
                              alt={"avatar"}
                              className={
                                "h-[50px] w-[50px] rounded-full object-cover"
                              }
                            />
                          </div>
                          <div className={"relative"}>
                            {image && (
                              <span
                                onClick={() => setImage(null)}
                                className={`absolute left-[-35px] top-[-55px] 
                          max-w-[100px] cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap rounded-[10px] bg-light p-2 
                          text-lightText shadow hover:bg-lightHover dark:hover:bg-darkHover`}
                              >
                                {image.name}
                              </span>
                            )}
                            <label className={"cursor-pointer"}>
                              <FiPaperclip
                                className={`h-[20px] w-[20px] text-lightText 
                          transition-all hover:text-lightHover dark:hover:text-darkHover`}
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
                          className={`my-2 w-full max-w-[250px] 
                          rounded-[10px] border-b-2 p-[10px] text-lightText shadow focus:outline-2 focus:outline-lightPrimary dark:focus:outline-darkPrimary`}
                        />
                      </div>
                    </div>
                    <div className={"mx-auto my-0"}>
                      <button
                        className={`flex w-full items-center
                        justify-between rounded-[10px] bg-green-500 p-[10px] transition-all hover:bg-green-400 active:scale-95`}
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
            className="absolute right-[11px] top-[6px] h-[52px] w-[52px] rounded-full bg-red-600 p-2 text-white hover:bg-red-500 active:scale-95"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Setting;
