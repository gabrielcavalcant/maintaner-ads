/**
 * @file CreationModal.tsx
 *
 * @description Este componente React fornece uma interface de usuário para um modal de criação, permitindo que os usuários carreguem imagens, preencham formulários e capturem imagens via webcam. Utiliza várias bibliotecas e componentes para validação de formulários, manipulação de imagens e interface de usuário.
 *
 * @author [Jonathan OLiveira Bergamo]
 *
 *
 * @license MIT
 *
 * @dependencies
 * - react, react-webcam
 * - next-intl
 * - react-hook-form
 * - zod
 * - @hookform/resolvers
 * - Vários componentes personalizados da pasta "/ui"
 */

"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Field, ImageType } from "@/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Skeleton } from "../ui/skeleton";

type FormOutput = {
  images?: ImageType[];
} & Record<string, string>;

interface Props {
  fields: Field[];
  onSubmit: (formValues: FormOutput) => { success: boolean };
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  validationSchema: z.ZodObject<any>;
  title?: string;
  description?: string;
  preValues?: Record<string, any>;
  asChild?: boolean;
  isPending?: boolean;
}

export default function CreationModal({
  fields,
  onSubmit,
  onOpenChange,
  validationSchema,
  children,
  title,
  description,
  preValues,
  asChild = true,
  isPending = false,
}: Readonly<Props>) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const getFieldDefault = (type?: string) => {
    switch (type) {
      case "number":
        return 0;
      case "text":
        return "";
      case "object":
        return {};
      case "array":
        return [];
      default:
        return "";
    }
  };

  const form = useForm<z.infer<any>>({
    resolver: zodResolver(validationSchema as any),
    defaultValues:
      preValues ||
      (fields
        ? fields.reduce(
            (acc, field) => ({
              ...acc,
              [field.dbName]: getFieldDefault(field?.type),
            }),
            {}
          )
        : {}),
  });

  useEffect(() => {
    if (preValues) {
      Object.entries(preValues).forEach(([key, value]) => {
        const field = fields.find((f) => f.dbName == key);
        if (field?.maskFn) {
          form.setValue(key, field?.maskFn(value));
        } else {
          form.setValue(key, value);
        }
      });
    }
  }, [preValues, fields, form]);

  const handleSubmit = async (values: z.infer<any>) => {
    const result = await onSubmit(values);
    if (result.success) {
      setOpen(false);
      form.reset();
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        onOpenChange?.(open);
        setOpen(open);
        if (open === false && !isPending) {
          form.reset();
        }
      }}
      open={open}
    >
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      {
        <DialogContent className="flex flex-col max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col flex-grow overflow-y-auto p-4">
            <Form {...form}>
              {form.formState.errors.root && (
                <p>{form.formState.errors.root.message}</p>
              )}

              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col space-y-4"
              >
                <div className="flex w-full flex-col">
                  <div className="w-full flex-col gap-4  p-1">
                    <div className="flex w-full flex-wrap gap-6">
                      {!isPending ? (
                        fields?.map((fieldInfo) => {
                          if (!fieldInfo.render) {
                            return (
                              <FormField
                                key={fieldInfo.dbName}
                                control={form.control}
                                name={fieldInfo.dbName}
                                render={({ field: { onChange, value } }) => (
                                  <FormItem
                                    style={{
                                      width:
                                        fieldInfo.flexWidth === "100%"
                                          ? fieldInfo.flexWidth
                                          : `calc(${fieldInfo.flexWidth} - 1rem)`,
                                    }}
                                    className="relative"
                                  >
                                    <FormLabel>
                                      {fieldInfo.label}
                                      {"  "}
                                      <Label className="font-bold text-primary">
                                        {fieldInfo.required && "*"}
                                      </Label>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type={
                                          typeof fieldInfo.type === "string" ||
                                          typeof fieldInfo.type === "number"
                                            ? fieldInfo.type
                                            : "text"
                                        }
                                        onChange={(e) => {
                                          const newValue = fieldInfo?.maskFn
                                            ? fieldInfo.maskFn(e.target.value)
                                            : e.target.value;
                                          onChange(
                                            fieldInfo.type === "number"
                                              ? parseInt(newValue)
                                              : newValue
                                          );
                                        }}
                                        value={value}
                                      />
                                    </FormControl>
                                    <FormMessage className="" />
                                  </FormItem>
                                )}
                              />
                            );
                          } else {
                            return (
                              <FormField
                                key={fieldInfo.dbName}
                                control={form.control}
                                name={fieldInfo.dbName}
                                render={({ field: { onChange, value } }) => (
                                  <FormItem
                                    key={fieldInfo.dbName}
                                    className="relative"
                                    style={{
                                      width:
                                        fieldInfo.flexWidth === "100%"
                                          ? fieldInfo.flexWidth
                                          : `calc(${fieldInfo.flexWidth} - 1rem)`,
                                    }}
                                  >
                                    <FormLabel>
                                      {fieldInfo.label}
                                      {"  "}
                                      <Label className="font-bold text-primary">
                                        {fieldInfo.required && "*"}
                                      </Label>
                                    </FormLabel>
                                    <FormControl>
                                      {fieldInfo?.render?.({
                                        onChange,
                                        value,
                                        form: form,
                                      })}
                                    </FormControl>
                                    <FormMessage className="" />
                                  </FormItem>
                                )}
                              />
                            );
                          }
                        })
                      ) : (
                        <div className="w-full gap-4 p-1 space-y-6">
                          <div className="flex gap-6">
                            <div className="flex flex-col gap-2 w-full">
                              <Skeleton className="w-1/2 h-4" />
                              <Skeleton className="w-full h-9" />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                              <Skeleton className="w-1/2 h-4" />
                              <Skeleton className="w-full h-9" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Skeleton className="w-1/2 h-4" />
                            <Skeleton className="w-full h-9" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter className="mt-auto flex justify-between pt-5 gap-y-2">
                  <Button type="submit">{t("Common.createButton")}</Button>
                  <DialogClose asChild>
                    <Button variant="secondary">{t("Common.cancel")}</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      }
    </Dialog>
  );
}
