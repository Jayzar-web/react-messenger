import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid";

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
            });
            await setDoc(doc(db, "userChat", res.user.uid), {});
            await sendEmailVerification(auth.currentUser);
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
        "relative flex h-[calc(100vh-70px)] w-screen flex-col items-center bg-light font-bold text-lightText dark:bg-dark dark:text-darkText"
      }
    >
      {uploadProgress > 0 && (
        <Line
          percent={uploadProgress}
          strokeWidth={0.3}
          strokeLinecap={"square"}
          strokeColor={"#314461"}
          trailColor={"#bbdefb"}
          className={"w-full"}
        />
      )}

      <div
        className={`relative top-[50%] flex h-[450px] w-96 translate-y-[-50%] flex-col items-center justify-center rounded-[10px] bg-blue-50 shadow-2xl`}
      >
        <h1 className={"text-1xl mb-[25px] text-gray-400"}>
          Регистрация нового аккаунта
        </h1>
        <form
          onSubmit={handleClick}
          className={"flex w-3/4 flex-col items-center gap-4"}
        >
          <input
            type="text"
            placeholder="Имя"
            className={`w-full rounded-[10px] border-b-2 
              p-[10px] text-lightText shadow focus:outline-2 focus:outline-lightPrimary dark:focus:outline-darkPrimary`}
          />
          <input
            type="email"
            placeholder="Почта"
            className={`w-full rounded-[10px] border-b-2 
              p-[10px] text-lightText shadow focus:outline-2 focus:outline-lightPrimary dark:focus:outline-darkPrimary`}
          />
          <input
            type="password"
            placeholder="Пароль"
            className={`w-full rounded-[10px] border-b-2 
              p-[10px] text-lightText shadow focus:outline-2 focus:outline-lightPrimary dark:focus:outline-darkPrimary`}
          />
          <label className={"flex cursor-pointer text-lightText"}>
            <input type="file" className={"hidden"} />
            <FiPaperclip className={"mx-2 h-[32px] w-[32px]"} />
            <span>Загрузить аватар</span>
          </label>
          <button
            className={`w-fit rounded-[10px] bg-lightPrimary p-[15px] 
              transition hover:bg-lightHover active:scale-95 dark:bg-darkPrimary dark:hover:bg-darkHover`}
          >
            Зарегистрироваться
          </button>
          {error && (
            <span
              className={
                "absolute top-[-100px] rounded border-b border-t border-red-500 bg-red-500/30 p-2 text-red-500"
              }
            >
              {error}
            </span>
          )}
        </form>
        <p className={"mt-[15px] text-[15px] text-gray-400"}>
          У вас уже есть аккаунт?
          <Link
            to={"/login"}
            className={
              "mx-[5px] transition-all hover:text-lightHover hover:underline dark:hover:text-darkHover"
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
