import React from "react";
import toast from "react-hot-toast";
import { BiCopy } from "react-icons/bi";
import { Row } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

interface TableCopyProps<TData> {
  row: Row<any>;
  accessorKey: string;
  title: string;
}

export default function TableCopy<TData>({
  row,
  accessorKey,
  title,
}: TableCopyProps<TData>) {
  const t = useTranslations("Common");

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          title={`${t("copyTitle")} ${title}`}
          className="text-[15px]"
          onClick={() => {
            navigator.clipboard.writeText(row.original[accessorKey]);
            toast.success(`${title} ${t("copySuccess")}`);
          }}
        >
          <div className="text-primary">
            <BiCopy />
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="py-1 px-2" sideOffset={-2}>
        <p className="text-primary-foreground text-[12px]">
          {t("copyTitle")} {title}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
