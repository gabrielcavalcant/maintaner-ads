"use client";
import { useRouter } from "@/navigation";
import React, { useEffect } from "react";
import DotsLoader from "./DotsLoader";
import { useTranslations } from "next-intl";

export default function LoadingPage() {
  const t = useTranslations("Common");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.refresh();
    }, 400);
  }, [router]);

  return (
    <div className="text-primary h-screen w-screen flex flex-col gap-5 justify-center items-center">
      <DotsLoader />
      {t("loading")}
    </div>
  );
}
