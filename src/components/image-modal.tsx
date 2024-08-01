import Image from "next/image";
import { SyntheticEvent } from "react";
import Magnifier from "./magnifier";

type ImageModalProps = {
  imageUrl: string;
  onClose: () => void;
  width?: number;
  height?: number;
};

export default function ImageModal({
  imageUrl,
  onClose,
  height,
  width,
}: ImageModalProps) {
  const handleBackdropClick = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      // Verifica se o clique foi no backdrop e não no conteúdo
      onClose();
    }
  };

  return (
    <button
      className="fixed inset-0 z-50 flex cursor-zoom-out select-none items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="relative">
        <Magnifier
          src={imageUrl}
          className={`max-h-[${height ? height + "px" : "80vh"}] max-w-[${
            width ? width + "px" : "90vw"
          }] cursor-default select-none object-contain`}
          width={width ?? 500}
        />
      </div>
    </button>
  );
}
