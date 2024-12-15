import { useRouter } from "@/navigation";
import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <Button
      size="icon"
      className="p-1"
      variant="ghost"
      onClick={() => {
        router.back();
      }}
    >
      <div className="text-4xl text-primary hover:brightness-90">
        <ArrowLeft />
      </div>
    </Button>
  );
}
