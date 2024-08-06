import React, { MouseEventHandler, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { IconType } from "react-icons/lib";

type TooltipButtonProps = {
  Icon: IconType | any;
  message: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  buttonVariant?:
    | "secondary"
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
};

export default function TooltipButton({
  children,
  Icon,
  message,
  onClick,
  buttonVariant = "secondary",
}: TooltipButtonProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button onClick={onClick} variant={buttonVariant} size="icon">
          <Icon className="text-lg " />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="py-1 px-2 bg-card" sideOffset={-2}>
        <p className="text-card-foreground text-[12px]">
          {children || message}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
