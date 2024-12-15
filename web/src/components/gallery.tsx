"use client";
import { useState } from "react";
import ImageModal from "./image-modal";
import Image from "next/image";
import { BiSolidTrashAlt } from "react-icons/bi";
import { Button } from "./ui/button";

type GalleryProps = {
  images: { url: string; file: File }[];
  onRemove: (imageObjectToRemove: { url: string; file: File }) => void;
};

export default function Gallery({ images, onRemove }: Readonly<GalleryProps>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="align-content-start flex h-72 flex-grow flex-wrap gap-2 overflow-y-auto pr-2 pt-2">
        {images.map((imageObject, index) => {
          return (
            <div key={imageObject.url.slice(2) + index} className="p-2">
              <div className="group relative">
                <Image
                  src={imageObject.url}
                  alt={`Imagem ${index + 1}`}
                  height={112}
                  width={112}
                  className="h-28 w-28 cursor-zoom-in rounded-md object-cover"
                  onClick={() => handleImageClick(imageObject.url)}
                />
                <Button
                  variant="destructive"
                  className="absolute right-[-15px] top-[-15px] hidden h-9 w-9 items-center justify-center  p-1 text-2xl opacity-0  group-hover:flex group-hover:opacity-100"
                  onClick={() => {
                    onRemove(imageObject);
                  }}
                >
                  <BiSolidTrashAlt />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && currentImage && (
        <ImageModal
          imageUrl={currentImage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
