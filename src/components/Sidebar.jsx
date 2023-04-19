import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div
      className={`border-lightBorders dark:border-darkBorders w-3/12 overflow-auto border-r-[1px] 
      h-[calc(100vh-70px)] p-[9px] scrollbar-thin scrollbar-thumb-[#888888] scrollbar-track-[#DDDDDD]`}
    >
      <h1 className={"text-2xl text-center m-[20px]"}>Сообщения</h1>
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
