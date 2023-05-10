import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpenedSidebar, setIsOpenedSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={
        "bg-light font-bold text-lightText dark:bg-dark dark:text-darkText"
      }
    >
      <div className={"flex"}>
        <Sidebar
          isMobile={isMobile}
          isOpenedSidebar={isOpenedSidebar}
          setIsOpenedSidebar={setIsOpenedSidebar}
        />
        <Chat
          isMobile={isMobile}
          isOpenedSidebar={isOpenedSidebar}
          setIsOpenedSidebar={setIsOpenedSidebar}
        />
      </div>
    </div>
  );
};

export default Home;
