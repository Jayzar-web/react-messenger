const About = ({ isShowAbout, setIsShowAbout }) => {
  return (
    <div>
      {isShowAbout && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div
            className={
              "h-1/2 w-5/6 rounded-[10px] bg-light p-3 text-[10px] text-lightText md:w-3/4 md:text-[16px] lg:w-1/2"
            }
          ></div>

          <button
            onClick={() => setIsShowAbout(false)}
            className="absolute right-[11px] top-[6px] h-[52px] w-[52px] rounded-full bg-red-600 p-2 text-white hover:bg-red-500 active:scale-95"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default About;
