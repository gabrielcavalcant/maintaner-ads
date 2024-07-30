"use client";
import NavigationBar from "@/components/navigation-bar";
import { ReactNode } from "react";
import withAuth from "../withAuth";

interface PrivateLayoutProps {
  children: ReactNode;
}

function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="h-screen w-screen flex text-dark-color-1 overflow-hidden">
      <NavigationBar />
      <main className="h-screen w-full pt-3 px-5 overflow-y-scroll">
        {children}
      </main>
    </div>
  );
}
export default withAuth(PrivateLayout);
