"use client";
import { Button } from "@/components/ui/button";
import { GiGearHammer } from "react-icons/gi";
import { MdDashboard, MdKeyboardArrowDown } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { BsTools } from "react-icons/bs";
import { PiWashingMachineFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import DotDropdown from "./dot-dropdown";
import { IconType } from "react-icons/lib";
import { Link } from "@/navigation";
import { useAuth } from "@/context/authContext";
import { Badge } from "./ui/badge";

type NavItem = {
  title: string;
  Icon: IconType;
  href: string;
  subpages?: NavItem[];
};

export default function NavigationBar() {
  const [open, setOpen] = useState<number | null>(null);
  const [hoveredSubpage, setHoveredSubpage] = useState<number | null>(null);
  const { user, signOut } = useAuth();
  const navigation: NavItem[] = [
    {
      title: "Dashboard",
      Icon: MdDashboard,
      href: "/",
    },
    {
      title: "Ambientes",
      Icon: FiBox,
      href: "/environments",
    },
    {
      title: "Equipamentos",
      Icon: PiWashingMachineFill,
      href: "/equipments",
    },
    {
      title: "Manutenções",
      Icon: BsTools,
      href: "/maintenances",
    },
    {
      title: "Usuário",
      Icon: FaUserCircle,
      href: "/user",
    },
  ];

  return (
    <div>
      <div className="">
        <aside
          id="sidebar"
          className="z-40 h-screen w-64 transition-transform"
          aria-label="Sidebar"
        >
          <div className="flex h-full flex-col overflow-y-auto border-r p-3">
            <Link
              href="#"
              className="mb-10 text-4xl flex items-center rounded-lg px-3 py-2 "
              prefetch={false}
            >
              <GiGearHammer className="text-4xl text-primary" />
              <span className="ml-3 text-2xl font-semibold text-primary">
                Maintainer
              </span>
            </Link>
            <div className="flex flex-col w-full text-sm font-medium">
              {navigation?.map((item, index) => {
                const { Icon, title, href, subpages } = item;
                return (
                  <Tooltip
                    key={index}
                    delayDuration={0}
                    open={open === index || hoveredSubpage === index}
                    onOpenChange={() => {
                      setOpen(index);
                    }}
                  >
                    <TooltipTrigger asChild>
                      <Link
                        href={href}
                        onMouseLeave={(e) => {
                          if (hoveredSubpage !== index) {
                            setOpen(null);
                          }
                        }}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start items-center gap-4"
                        >
                          <Icon className="text-2xl" />
                          <span className="whitespace-nowrap w-full text-start">
                            {title}
                          </span>
                          <span
                            className={`flex justify-end items-center transition-all ${
                              open === index || hoveredSubpage === index
                                ? "-rotate-90"
                                : ""
                            }`}
                          >
                            {subpages && <MdKeyboardArrowDown />}
                          </span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    {subpages && (
                      <TooltipContent
                        sideOffset={-2}
                        side="right"
                        align="start"
                        className="flex flex-col w-[200px] items-start rounded bg-background p-0 text-start text-background-foreground shadow-lg"
                        onMouseEnter={() => setHoveredSubpage(index)}
                        onMouseLeave={() => {
                          setHoveredSubpage(null);
                          setOpen(null);
                        }}
                      >
                        {subpages?.map((subpage, subIndex) => {
                          const { Icon, title, href } = subpage;
                          return (
                            <Link href={href} key={subIndex} className="w-full">
                              <Button
                                variant="ghost"
                                className="w-full justify-start gap-3 rounded-none px-3 pr-10 text-start"
                              >
                                <Icon className="text-xl" />
                                <span className="whitespace-nowrap">
                                  {title}
                                </span>
                              </Button>
                            </Link>
                          );
                        })}
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>
            <div className="mt-auto flex">
              <div className="flex w-full justify-between items-center">
                <div>
                  <Label className="text-sm font-medium ">
                    {user?.fullName}
                  </Label>
                  <Badge className="flex w-full items-center justify-center truncate rounded-sm px-1">
                    {user?.email}
                  </Badge>
                </div>
                <DotDropdown onSignOut={signOut} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
