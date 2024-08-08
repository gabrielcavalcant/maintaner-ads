import React from "react";
import GoBackButton from "./go-back-button";

type HeaderProps = {
  title?: string;
  goBack?: boolean;
};

export default function Header({ title, goBack = false }: HeaderProps) {
  return (
    <div className="flex h-14 md:h-auto items-center justify-start py-3 gap-2">
      {goBack && <GoBackButton />}
      <h2 className="font-semibold text-lg md:text-2xl">{title}</h2>
    </div>
  );
}
