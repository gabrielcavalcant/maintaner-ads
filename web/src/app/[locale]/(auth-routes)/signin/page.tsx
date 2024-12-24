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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import Logo from "@/components/logo";

export default function Login() {
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState<string | null>("");
  const router = useRouter();
  const t = useTranslations();

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("Login.emailRequired") })
      .email({ message: t("Login.emailInvalid") }),
    password: z.string().min(3, { message: t("Login.passMinimal") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignin(values: z.infer<typeof formSchema>) {
    toast.remove();
    const response = await toast.promise(
      signIn(values),
      {
        loading: t("Login.loading"),
        error: (error) => {
          form.setError("root", error.message);
          return `${error.message}`;
        },
        success: t("Login.success"),
      },
      { duration: 1000 }
    );
    if (response.success) {
      router.replace("/");
    } else if (response.message) {
      toast.error(response.message);
      console.error(response.error);
    } else {
      toast.error(t("Login.unknownError"));
    }
  }

  return !isLoading ? (
    <div className="flex items-center justify-center min-h-screen w-full ">
      <Card className="flex w-fit items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex gap-2 pb-5 items-center justify-center">
            <Logo />
            </div>
            <Label className="text-3xl text-accent-foreground font-bold">
              {t("Login.loginTitle")}
            </Label>
            <Label className="text-muted-foreground dark:text-gray-400">
              {t("Login.loginSubtitle")}
            </Label>
          </div>
          <Form {...form}>
            {form.formState.errors.root && (
              <p>{form.formState.errors.root.message}</p>
            )}

            <form
              onSubmit={form.handleSubmit(handleSignin)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Login.email")}</FormLabel>
                    <FormControl>
                      <Input placeholder="seuemail@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Login.password")}</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{t("Login.enter")}</Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  ) : (
    <LoadingPage />
  );
}
