import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div
      className={
        "bg-light text-lightText dark:bg-dark dark:text-darkText font-bold"
      }
    >
      <div className={"flex h-auto"}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
