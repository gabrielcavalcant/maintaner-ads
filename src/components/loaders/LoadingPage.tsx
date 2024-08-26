
import React from "react";
import DotsLoader from "./DotsLoader";

export default function LoadingPage() {


  return (
    <div className="text-primary h-screen w-screen flex flex-col gap-5 justify-center items-center">
      <DotsLoader />
    </div>
  );
}
