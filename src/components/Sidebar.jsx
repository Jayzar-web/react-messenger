import Search from "./Search";
import Chats from "./Chats";

const Sidebar = ({ isOpenedSidebar, setIsOpenedSidebar, isMobile }) => {
  return (
    <div
      className={`${
        isOpenedSidebar ? "block" : "hidden"
      } h-[calc(100vh-70px)] w-full overflow-auto border-r-[1px] border-lightBorders p-[9px] scrollbar-thin 
      scrollbar-track-[#DDDDDD] scrollbar-thumb-[#888888] dark:border-darkBorders md:block md:w-4/12 lg:w-3/12`}
    >
      <h1 className={"mb-[20px] text-center text-2xl"}>Контакты</h1>
      <Search />
      <Chats
        isMobile={isMobile}
        isOpenedSidebar={isOpenedSidebar}
        setIsOpenedSidebar={setIsOpenedSidebar}
      />
    </div>
  );
};

export default Sidebar;
