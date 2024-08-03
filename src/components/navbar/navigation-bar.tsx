"use client";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons/lib";
import { useMediaQuery } from "@/helper/hooks/use-media-query";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import NavbarContent from "./navigation-bar-content";

type NavItem = {
  title: string;
  Icon: IconType;
  href: string;
  subpages?: NavItem[];
};

export default function NavigationBar() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  if (isSmallDevice)
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-2 left-[50vw] "
          >
            <IoMenu className="text-4xl" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <NavbarContent />
        </SheetContent>
      </Sheet>
    );
  else
    return (
      <aside
        id="sidebar"
        className="z-40 h-screen w-64 transition-transform"
        aria-label="Sidebar"
      >
        <NavbarContent />
      </aside>
    );
}

