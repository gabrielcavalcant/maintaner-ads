import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { IconType } from "react-icons/lib";

type TooltipButtonProps = {
  Icon: IconType;
  message: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function TooltipButton({
  children,
  Icon,
  message,
  onClick,
}: TooltipButtonProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          variant="ghost"
          size="icon"
          className="text-card-foreground hover:bg-primary hover:text-primary-foreground"
        >
          <Icon className="text-lg" />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="py-1 px-2 bg-card"
        sideOffset={-2}
      >
        <p className="text-card-foreground text-[12px]">
          {children || message}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
