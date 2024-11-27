"use client";
import React, { ChangeEvent, useRef } from "react";
import { useTranslations } from "next-intl";
import { Label } from "./ui/label";
import { MdOutlineUploadFile } from "react-icons/md";

interface Props {
  imageSend: (images: FileList) => void;
  className?: string;
  isMax: boolean;
  errorMessage?: string;
}

export default function ImageUpload({
  imageSend,
  className,
  isMax,
  errorMessage,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations();
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      imageSend(files);
    }
  };

  return (
    <div className="relative w-full items-center justify-center">
      <div
        className={`${className} flex w-full items-center justify-center ${
          !isMax ? "text-primary" : "text-muted-foreground"
        } border-2 border-dashed p-3 ${
          !isMax ? "border-primary" : "border-muted-foreground"
        } rounded-md`}
      >
        <input
          multiple
          ref={fileInputRef}
          type="file"
          title={""}
          className={`absolute left-0 top-0 h-full w-full opacity-0 ${
            !isMax ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onChange={handleImageChange}
          disabled={isMax}
        />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className=" ">
            <MdOutlineUploadFile />
          </div>
          <p className="mt-1 text-sm">
            {!isMax ? t("Common.imageUploadLabel") : t("maxReached")}
          </p>
        </div>
      </div>
      <Label className="b-0 py-2 absolute text-center text-destructive">
        {errorMessage}
      </Label>
    </div>
  );
}
