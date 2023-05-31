import { useContext, useEffect, useState } from "react";
import Chat from "../components/chat/Chat";
import Sidebar from "../components/sidebar/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import WithoutVerification from "../components/WithoutVerification";
import Loading from "../components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [isOpenedSidebar, setIsOpenedSidebar] = useState(true);
  const [verified, setVerified] = useState(currentUser.emailVerified);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log("Проверка почты");
      if (user && user.emailVerified) {
        console.log("Почта подтверждена");
        setVerified(true);
      }
    });

    return () => unSub();
  }, []);

  if (verified === undefined) {
    return <Loading />; // Или другая пустая разметка, чтобы ничего не показывалось на короткое время
  }

  return (
    <div
      className={
        "bg-light font-bold text-lightText dark:bg-dark dark:text-darkText"
      }
    >
      {verified ? (
        <div className={"flex"}>
          <Sidebar
            isOpenedSidebar={isOpenedSidebar}
            setIsOpenedSidebar={setIsOpenedSidebar}
          />
          <Chat
            isOpenedSidebar={isOpenedSidebar}
            setIsOpenedSidebar={setIsOpenedSidebar}
          />
        </div>
      ) : (
        <WithoutVerification />
      )}
    </div>
  );
};

export default Home;
