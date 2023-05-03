import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid";
import Menu from "../components/Menu";

const Register = () => {
  const errors = {
    wrongName:
      "Имя должно состоять из латинских букв, цифр и знака подчеркивания",
    wrongPassword: "Пароль должен быть не менее 6 символов",
    wrongFile: "Загрузите аватар",
    wrongEmail: "Пользователь с такой почтой уже существует",
    wrongUser: "Не удалось создать пользователя",
    wrongFileUpload: "Не удалось загрузить файл",
  };
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  const regex = /^[a-zA-Z0-9_]{3,20}$/;

  const handleClick = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value.trim();
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // Проверка имени
    if (!regex.test(displayName)) {
      setError(errors.wrongName);
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    // Проверка длины пароля
    if (password.length < 6) {
      setError(errors.wrongPassword);
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    // Проверка наличия файла
    if (!file || !file.size) {
      setError(errors.wrongFile);
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    // Проверка почты
    const method = await fetchSignInMethodsForEmail(auth, email);
    if (method.length) {
      setError(errors.wrongEmail);
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    // Создание пользователя
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setUploadProgress(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        () => {
          setError(errors.wrongFileUpload);
          setTimeout(() => {
            setError(null);
          }, 5000);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              online: true,
            });
            await setDoc(doc(db, "userChat", res.user.uid), {});
            await navigate("/");
          });
        }
      );
    } catch (error) {
      setError(errors.wrongUser);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div
      className={
        "bg-light dark:bg-dark text-lightText dark:text-darkText h-screen w-screen flex items-center flex-col font-bold relative"
      }
    >
      <Menu />

      {uploadProgress > 0 && (
        <Line
          percent={uploadProgress}
          strokeWidth={0.3}
          strokeLinecap={"square"}
          strokeColor={"#314461"}
          trailColor={"#bbdefb"}
          className={"w-full absolute top-[70px]"}
        />
      )}

      <div
        className={`flex rounded-[10px] w-96 h-[450px] bg-blue-50 flex-col justify-center items-center shadow-2xl absolute top-0 translate-y-[50%]`}
      >
        <h1 className={"mb-[25px] text-gray-400 text-1xl"}>
          Регистрация нового аккаунта
        </h1>
        {}
        <form
          onSubmit={handleClick}
          className={"flex flex-col items-center gap-4 w-3/4"}
        >
          <input
            type="text"
            placeholder="Имя"
            className={`text-lightText focus:outline-lightPrimary dark:focus:outline-darkPrimary 
              shadow border-b-2 rounded-[10px] w-full p-[10px] focus:outline-2`}
          />
          <input
            type="email"
            placeholder="Почта"
            className={`text-lightText focus:outline-lightPrimary dark:focus:outline-darkPrimary 
              shadow border-b-2 rounded-[10px] w-full p-[10px] focus:outline-2`}
          />
          <input
            type="password"
            placeholder="Пароль"
            className={`text-lightText focus:outline-lightPrimary dark:focus:outline-darkPrimary 
              shadow border-b-2 rounded-[10px] w-full p-[10px] focus:outline-2`}
          />
          <label className={"cursor-pointer flex text-lightText"}>
            <input type="file" className={"hidden"} />
            <FiPaperclip className={"w-[32px] h-[32px] mx-2"} />
            <span>Загрузить аватар</span>
          </label>
          <button
            className={`bg-lightPrimary hover:bg-lightHover dark:bg-darkPrimary dark:hover:bg-darkHover 
              w-fit rounded-[10px] p-[15px] transition active:scale-95`}
          >
            Зарегистрироваться
          </button>
          {error && (
            <span
              className={
                "bg-red-500/30 text-red-500 border-red-500 border-b border-t rounded p-2 absolute top-[-100px]"
              }
            >
              {error}
            </span>
          )}
        </form>
        <p className={"text-[15px] mt-[15px] text-gray-400"}>
          У вас уже есть аккаунт?
          <Link
            to={"/login"}
            className={
              "hover:text-lightHover dark:hover:text-darkHover mx-[5px] transition-all hover:underline"
            }
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
