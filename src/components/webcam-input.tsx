"use client";
import React, { useCallback, useRef, useState } from "react";
import { Button } from "./ui/button";
import Webcam from "react-webcam";
import { PiWebcamFill, PiWebcamSlashBold } from "react-icons/pi";
import Gallery from "./gallery";
import { CiImageOff } from "react-icons/ci";
import { Label } from "./ui/label";
import { useTranslations } from "next-intl";
import ImageUpload from "./image-upload";
import { Disc } from "lucide-react";

type WebcamInputProps = {
  onChange: (images: { url: string; file: File }[]) => void;
  value: { url: string; file: File }[];
};

export default function WebcamInput({
  onChange,
  value,
}: Readonly<WebcamInputProps>) {
  const t = useTranslations();
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleImageSend = (newImages: FileList) => {
    const imageObjects = Array.from(newImages).map((file) => ({
      url: URL.createObjectURL(file),
      file,
      id: `${file.name}-${Date.now()}-${Math.random()}`,
    }));
    onChange([...value, ...imageObjects]);
  };

  const handleRemoveImage = (imageObjectToRemove: {
    url: string;
    file: File;
  }) => {
    URL.revokeObjectURL(imageObjectToRemove.url);
    onChange(
      value.filter(
        (imageObject) => imageObject.file !== imageObjectToRemove.file
      )
    );
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "webcam.jpg", { type: "image/jpeg" });
            onChange([...value, { url: URL.createObjectURL(file), file }]);
          });
      }
    }
  }, [webcamRef, onChange, value]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-1 mt-1">
        <Button
          variant="ghost"
          type="button"
          className="flex items-center justify-center gap-2"
          onClick={() => setShowWebcam(!showWebcam)}
          disabled={value.length >= 10}
        >
          {!showWebcam ? (
            <>
              <PiWebcamFill />
              <p>{t("Common.openWebcam")}</p>
            </>
          ) : (
            <>
              <PiWebcamSlashBold />
              <p>{t("Common.closeWebcam")}</p>
            </>
          )}

          {showWebcam && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="gap-2 w-4/5 flex flex-col items-center justify-center">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="w-1/2 h-1/2 object-cover aspect-square"
                />
                <Button size="icon" onClick={capture} className=" bg-primary">
                  <div className="text-4xl text-white hover:brightness-90">
                    <Disc />
                  </div>
                </Button>
              </div>
            </div>
          )}
        </Button>
        <ImageUpload
          imageSend={handleImageSend}
          className="w-full"
          isMax={value.length >= 10}
        />
      </div>

      <div className="flex h-32 min-h-[300px] w-full flex-grow flex-col p-5">
        {value.length > 0 ? (
          <Gallery images={value} onRemove={handleRemoveImage} />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
            <CiImageOff className="text-5xl text-primary" />
            <Label>{t("Common.noImageText")}</Label>
            <Label>{t("Common.maxImageText")} 10</Label>
          </div>
        )}
      </div>
    </div>
  );
}
