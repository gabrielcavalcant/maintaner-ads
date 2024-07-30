"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { GiGearHammer } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { BsTools } from "react-icons/bs";
import { PiWashingMachineFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function NavigationBar() {
  const [open, setOpen] = useState<number | null>(null);

  const navigation = [
    {
      title: "Dashboard",
      Icon: MdDashboard,
      href: "/",
    },
    {
      title: "Ambientes",
      Icon: FiBox,
      href: "/",
      subpages: [
        {
          title: "Inicio",
          Icon: MdDashboard,
          href: "/",
        },
      ],
    },
    {
      title: "Equipamentos",
      Icon: PiWashingMachineFill,
      href: "/",
      subpages: [
        {
          title: "Inicio",
          Icon: MdDashboard,
          href: "/",
        },
      ],
    },
    {
      title: "Manutenções",
      Icon: BsTools,
      href: "/",
      subpages: [
        {
          title: "Inicio",
          Icon: MdDashboard,
          href: "/",
        },
      ],
    },
    {
      title: "Usuário",
      Icon: FaUserCircle,
      href: "/",
      subpages: [
        {
          title: "Inicio",
          Icon: MdDashboard,
          href: "/",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="h-screen w-screen bg-white dark:bg-slate-900">
        <aside
          id="sidebar"
          className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform"
          aria-label="Sidebar"
        >
          <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
            <Link
              href="#"
              className="mb-10 text-primary flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              prefetch={false}
            >
              <GiGearHammer className="text-4xl" />
              <span className="ml-3 text-base font-semibold">Maintainer</span>
            </Link>
            <div className="flex flex-col w-full text-sm font-medium">
              {navigation?.map((item, index) => {
                const { Icon, title, href, subpages } = item;
                return (
                  <Tooltip
                    key={index}
                    delayDuration={0}
                    open={open === index}
                    onOpenChange={() => {
                      setOpen(index);
                    }}
                  >
                    <TooltipTrigger asChild>
                      <Link href={href} onMouseLeave={() => setOpen(null)}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start items-center gap-4"
                        >
                          <Icon className="text-2xl" />
                          <span className="whitespace-nowrap w-full text-start">
                            {title}
                          </span>
                          <span
                            className={`flex justify-end items-center  transition-all ${
                              open === index ? "-rotate-90" : ""
                            }`}
                          >
                            {subpages && <MdKeyboardArrowDown />}
                          </span>
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    {subpages && (
                      <TooltipContent
                        side="right"
                        align="start"
                        className="flex flex-col w-[200px] items-start rounded bg-background p-0 text-start text-background-foreground shadow-lg"
                      >
                        {subpages?.map((subpage, index) => {
                          const { Icon, title, href } = subpage;
                          return (
                            <Link href={href} key={index} className="w-full">
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
              <div className="flex w-full justify-between">
                <span className="text-sm font-medium text-black dark:text-white">
                  email@example.com
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  aria-roledescription="more menu"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5 text-black dark:text-white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={19} cy={12} r={1} />
                  <circle cx={5} cy={12} r={1} />
                </svg>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
