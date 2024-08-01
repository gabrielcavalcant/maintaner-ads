"use client";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";
import LoadingPage from "@/components/loaders/LoadingPage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { GiGearHammer } from "react-icons/gi";

export default function Login() {
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState<string | null>("");
  const router = useRouter();
  const t = useTranslations();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    toast.remove();
    await toast.promise(signIn(event), {
      loading: t("Login.loading"),
      success: () => {
        router.replace("/");
        return t("Login.success");
      },
      error: (error) => {
        setError(error.message);
        return `${error.message}`; // Exemplo, você pode personalizar a mensagem de erro conforme necessário
      },
    });
  }

  return !isLoading ? (
    <div className="flex items-center justify-center min-h-screen w-full ">
      <Card className="flex w-fit items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex gap-2 pb-5 items-center justify-center">
              <GiGearHammer className="text-[50px] text-primary" />
              <span className="ml-3 text-3xl font-semibold text-primary">
                Maintainer
              </span>
            </div>
            <Label className="text-3xl text-accent-foreground font-bold">
              {t("Login.loginTitle")}
            </Label>
            <Label className="text-muted-foreground dark:text-gray-400">
              {t("Login.loginSubtitle")}
            </Label>
          </div>
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            onChange={() => setError("")}
          >
            <div className="space-y-2">
              <Label htmlFor="email" className={error ? "text-red-500" : ""}>
                {t("Login.email")}
              </Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                className={error ? "border-spacing-5 border-red-500" : ""}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className={error ? "text-red-500" : ""}
                >
                  {t("Login.password")}
                </Label>
              </div>
              <Input
                id="password"
                required
                type="password"
                className={error ? "border-spacing-5 border-red-500" : ""}
              />
            </div>
            <Button className="w-full" type="submit">
              {t("Login.enter")}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  ) : (
    <LoadingPage />
  );
}
