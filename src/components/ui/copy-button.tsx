import { Details } from "@/types";
import React from "react";
import toast from "react-hot-toast";
import { BiCopy } from "react-icons/bi";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { useTranslations } from "next-intl";
import { Button } from "./button";

type CopyButtonProps = {
  column: Details | undefined;
  copyText: string;
};

export default function CopyButton({ column, copyText }: CopyButtonProps) {
  const commonText = useTranslations("Common");
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          title={commonText("copyTitle")}
          className="text-[5px]"
          onClick={() => {
            toast.promise(navigator.clipboard.writeText(copyText), {
              loading: commonText("copyLoading"),
              success: (
                <p>
                  {column?.label}{" "}
                  {column?.formatInput
                    ? column.formatInput(copyText)
                    : copyText}{" "}
                  {commonText("copySuccess")}
                </p>
              ),
              error: commonText("copyError"),
            });
          }}
        >
          <div className="text-primary">
            <BiCopy />
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="py-1 px-2" sideOffset={-2}>
        <p className="text-primary-foreground text-[12px]">{`${commonText(
          "copyTitle"
        )} ${column?.label}`}</p>
      </TooltipContent>
    </Tooltip>
  );
}
