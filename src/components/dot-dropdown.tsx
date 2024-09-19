"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { useTheme } from "next-themes";
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
import { Button } from "./ui/button";
import { capitalizeFirstLetter } from "@/helper/capitalize";
import { ScrollArea } from "./ui/scroll-area";
import { useTranslations } from "next-intl";

type DotDropdownProps = {
  onSignOut?: () => void;
};

export default function DotDropdown({ onSignOut }: DotDropdownProps) {
  const { themes, theme, setTheme } = useTheme();
  const t = useTranslations();

  return (
    <div className="z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-md p-1 hover:scale-105">
            <div className="text-primary">
              <HiDotsVertical className="text-lg" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem>{t("Navbar.settings")}</DropdownMenuItem>
          <DropdownMenuItem>{t("Navbar.myProfile")}</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="">
              {t("Navbar.themes")}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="" asChild>
                <ScrollArea className="h-[50vh]">
                  {themes.map((actual) => {
                    function capitalizeTheme(theme: string): string {
                      // Separar o nome e sobrenome e capitalizar
                      const parts = theme.split("-");
                      const capitalizedParts = parts.map((part) =>
                        capitalizeFirstLetter(part)
                      );
                      return capitalizedParts.join(" ");
                    }
                    return (
                      <DropdownMenuItem
                        onClick={() => {
                          setTheme(actual);
                        }}
                        key={actual}
                        className={
                          actual === theme
                            ? "border-r-[4px] border-primary mr-1"
                            : "mr-1"
                        }
                      >
                        {capitalizeTheme(actual)}
                      </DropdownMenuItem>
                    );
                  })}
                </ScrollArea>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 hover:text-primary focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              {t("Navbar.logout")}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t("Navbar.confirmLogoutTitle")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t("Navbar.confirmLogoutSubtitle")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {t("Navbar.cancelLogout")}
                </AlertDialogCancel>
                <AlertDialogAction onClick={onSignOut}>
                  {t("Navbar.logout")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

  