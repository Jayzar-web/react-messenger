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
        className={"" + (scale ? "transition-all hover:scale-110" : "")}
      />
      {isOpened && (
        <div
          onClick={() => setIsOpened(false)}
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
        >
          <div className="max-w-3xl mx-auto rounded-md overflow-hidden">
            <img src={src} alt={alt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalImage;
