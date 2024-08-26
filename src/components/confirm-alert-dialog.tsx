import React, { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

type ConfirmAlertDialogProps = {
  children: ReactNode;
  asChild?: boolean;
  title?: string;
  description?: string;
  onContinue?: () => void;
};

export default function ConfirmAlertDialog({
  children,
  asChild = true,
  title,
  description,
  onContinue,
}: ConfirmAlertDialogProps) {
  const t = useTranslations();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={asChild}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? t("Common.areYouSure")}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? t("Common.areYouSureDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("Common.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>
            {t("Common.continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
