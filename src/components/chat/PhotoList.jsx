import React from "react";
import ModalImage from "../ModalImage";

const PhotoList = ({ images }) => {
  return (
    <div className={"w-full"}>
      <div
        className={`mt-1 flex max-h-[800px] flex-wrap overflow-auto border-t-[2px] 
          border-t-lightBorders p-2 scrollbar-thin scrollbar-track-[#DDDDDD] scrollbar-thumb-[#888888] dark:border-t-darkBorders`}
      >
        {images.map(
          (image) =>
            image && (
              <ModalImage
                src={image}
                alt={image}
                key={image}
                scale={true}
                rounded={false}
                isMessage={false}
              />
            )
        )}
      </div>
    </div>
  );
};

export default PhotoList;
