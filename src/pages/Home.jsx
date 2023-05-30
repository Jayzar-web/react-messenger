import { useContext, useEffect, useState } from "react";
import Chat from "../components/chat/Chat";
import Sidebar from "../components/sidebar/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import WithoutVerification from "../components/WithoutVerification";
import Loading from "../components/Loading";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [isOpenedSidebar, setIsOpenedSidebar] = useState(true);
  const [verified, setVerified] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const storedVerified = localStorage.getItem("verified");
      if (storedVerified !== null) {
        setVerified(storedVerified === "true");
      } else {
        if (currentUser && currentUser.emailVerified) {
          setVerified(true);
          localStorage.setItem("verified", true);
        } else {
          setVerified(false);
          localStorage.setItem("verified", false);
        }
      }
      setIsLoaded(true);
    };

    verifyEmail();
  }, [currentUser]);

  console.log(verified);

  if (!isLoaded) return <Loading />;

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
