import { useState } from "react";

const ModalImage = ({ src, alt, width, height, scale, rounded, inMessage }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className={"relative"}>
      <img
        onClick={() => setIsOpened(true)}
        src={src}
        alt={alt}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          cursor: "pointer",
          borderRadius: rounded ? "10px" : "0px",
          objectFit: "cover",
          marginTop: inMessage ? "5px" : "0px",
        }}
        className={`h-[115px] w-[115px] md:h-[100px] md:w-[100px] ${
          scale ? "transition-all hover:scale-110" : ""
        }`}
      />
      {isOpened && (
        <div
          onClick={() => setIsOpened(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
        >
          <div className="mx-auto max-w-[250px] overflow-hidden rounded-md md:max-w-[350px] lg:max-w-3xl">
            <img src={src} alt={alt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalImage;
