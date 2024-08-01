import React, { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DotsLoader from "./loaders/DotsLoader";
import Details from "./details";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { Details as DetailsType } from "@/types";

type CreationDialogProps = {
  areAllRequiredFieldsFilled: boolean;
  isPending: boolean;
  data: Record<string, any>;
  error?: any;
  isError?: boolean;
  index?: string;
  redirectIndex?: string;
  redirectPath?: string;
  options?: DetailsType[];
  open?: boolean;
  onClose?: () => void;
};

export default function CreationResponse({
  areAllRequiredFieldsFilled,
  isPending,
  data,
  error,
  isError,
  index = "",
  redirectIndex,
  redirectPath = "",
  options,
  open = false,
  onClose,
}: CreationDialogProps) {
  const t = useTranslations();

  const getDataAtIndex = (data: Record<string, any>, index: string) => {
    if (index.length > 0) {
      const keys = index.split(".");
      let currentData: Record<string, any> | null = data;
      for (let key of keys) {
        if (currentData && typeof currentData === "object") {
          currentData = currentData[key];
        } else {
          return null; // Retorna null se não puder acessar a propriedade
        }
      }
      return currentData;
    }
    return data;
  };

  const indexedData = getDataAtIndex(data, index);

  const redirectLink = (() => {
    if (redirectIndex) {
      if (indexedData && redirectIndex in indexedData) {
        return `${redirectPath}/${indexedData[redirectIndex]}`;
      } else if (data && redirectIndex in data) {
        return `${redirectPath}/${data[redirectIndex]}`;
      } else {
        return "";
      }
    } else {
      return "";
    }
  })();

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open && onClose) onClose();
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg" disabled={!areAllRequiredFieldsFilled} type="submit">
          {t("Common.createButton")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {isPending ? (
          <DotsLoader />
        ) : isError ? (
          // Exibe mensagem de erro caso isError seja verdadeiro
          <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-lg font-semibold text-red-600">
              {t("Common.unknownError")}
            </h2>
            <p className="text-red-500">
              {error?.message || t("Common.unknownError")}
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("Common.createSuccess")}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Details
                data={indexedData}
                showAllAttributes={!options}
                options={options}
              />
            </DialogDescription>
            <DialogFooter>
              {redirectLink && (
                <Link href={redirectLink}>
                  <Button>{t("Common.createDetailsButton")}</Button>
                </Link>
              )}
              <DialogClose asChild onClick={onClose}>
                <Button type="button" variant="secondary">
                  {t("Common.createAnotherResquestButton")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
