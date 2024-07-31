import React from "react";

type HeaderProps = {
  title?: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <div className="flex h-14 md:h-auto items-center justify-between py-3">
      <h2 className="font-semibold text-lg md:text-2xl">{title}</h2>
    </div>
  );
}
