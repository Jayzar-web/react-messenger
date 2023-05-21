import { useState } from "react";
import Chat from "../components/chat/Chat";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  const [isOpenedSidebar, setIsOpenedSidebar] = useState(true);

  return (
    <div
      className={
        "bg-light font-bold text-lightText dark:bg-dark dark:text-darkText"
      }
    >
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
    </div>
  );
};

export default Home;
