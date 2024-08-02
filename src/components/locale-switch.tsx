"use client";
import { useRouter, usePathname } from "@/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { locales } from "../../locales";

const LanguageSwitcher = ({ locale }: { locale?: string }) => {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<string>(locale ?? "pt");
  const pathname = usePathname();

  useEffect(() => {
    setCurrentLocale(locale ?? "pt");
  }, [locale]);

  const changeLanguage = (locale: string) => {
    router.push(pathname, { locale });
  };

  return (
    <div className="absolute  right-4 top-2 z-50 flex items-center gap-2 rounded bg-background p-1 text-sm">
      <Select
        onValueChange={(value) => {
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
