"use client";

import { useRouter, usePathname } from "@/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { locales } from "../../locales";
import { useAuth } from "@/context/authContext";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TbAlertCircleFilled } from "react-icons/tb";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Skeleton } from "./ui/skeleton";

const LanguageSwitcher = ({ locale }: { locale?: string }) => {
  const router = useRouter();
  const [sessionExpTime, setSessionExpTime] = useState<Date | null>(null);
  const { user, signOut } = useAuth();
  const [currentLocale, setCurrentLocale] = useState<string>(locale ?? "pt");
  const pathname = usePathname();
  const t = useTranslations();

  useEffect(() => {
    setCurrentLocale(locale ?? "pt");
  }, [locale]);

  const changeLanguage = (locale: string) => {
    router.push(pathname, { locale });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const timeLeft = (date.getTime() - now.getTime()) / 1000;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);
    return {
      formatted:
        timeLeft > 0
          ? `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          : "00:00",
      timeLeft,
    };
  };

  let formattedTime = "";
  let timeLeft = 0;

  if (sessionExpTime) {
    const { formatted, timeLeft: remainingTime } = formatTime(sessionExpTime);
    formattedTime = formatted;
    timeLeft = remainingTime;
  }

  useEffect(() => {
    if (!user) return;

    const updateToast = () => {
      const expirationDate = new Date(user.exp * 1000);
      const timeLeft = expirationDate.getTime() - Date.now();

      if (timeLeft > 0) {
        setSessionExpTime(expirationDate);
      } else {
        setSessionExpTime(null);
        signOut();
        toast("Sua sessão expirou, tente logar novamente.", {
          duration: Infinity,
        });
      }
    };

    updateToast();

    const intervalId = setInterval(updateToast, 1000);
    return () => clearInterval(intervalId);
  }, [user, signOut]);

  return (
    <div className="absolute right-3 top-2 z-50 flex items-center gap-2 rounded bg-background p-1 text-sm">
      {sessionExpTime ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Label
              className={`font-normal ${timeLeft <= 300 ? "text-red-500" : ""} w-14 text-center`}
            >
              {formattedTime}
            </Label>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="center"
            className="flex items-center gap-2 rounded bg-card px-2 py-2 text-start text-card-foreground shadow-lg"
          >
            <div className="justify-cente flex flex-col items-center gap-1">
              <TbAlertCircleFilled className="text-lg text-muted-foreground" />
              <Label className="text-center text-xs font-medium text-gray-500">
                {t("Common.remainingSessionTime")}
              </Label>
              {timeLeft <= 300 && (
                <Label className="text-xs font-medium text-destructive">
                  {t("Common.fiveMinutesLeft")}
                </Label>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      ) : (
        user && <Skeleton className="h-4 w-10 bg-card" />
      )}
      <Select
        onValueChange={value => {
          changeLanguage(value);
        }}
        value={currentLocale}
      >
        <SelectTrigger className="h-[20px] w-[60px] rounded border-none shadow-none">
          <span className="text-[14px]">{currentLocale.toUpperCase()}</span>
        </SelectTrigger>
        <SelectContent className="w-[50px]">
          {locales.map((local, index) => (
            <SelectItem value={local} key={index}>
              {local.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
