"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ImageUpload from "../image-upload";
import { Field, ImageType } from "@/types";
import Gallery from "../gallery";
import Webcam from "react-webcam";
import { PiWebcamFill, PiWebcamSlashBold } from "react-icons/pi";
import { BsRecordCircle } from "react-icons/bs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CiImageOff } from "react-icons/ci";
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
import { Checkbox } from "../ui/checkbox";
import DotsLoader from "../loaders/DotsLoader";
import { Skeleton } from "../ui/skeleton";
type FormOutput = {
  images?: ImageType[];
} & Record<string, string>;
interface Props {
  fields: Field[];
  onSubmit: (
    formValues: FormOutput,
    images: { url: string; file: File }[] | ImageType[]
  ) => void;
  onOpenChange?: (open: boolean) => void;
  maxImages?: number;
  imageOptional?: boolean;
  imageRequired?: boolean;
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
  maxImages = 1,
  imageRequired = false,
  imageOptional = false,
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
  const [imageError, setImageError] = useState<string | undefined>("");

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

  const [images, setImages] = useState<{ url: string; file: File }[]>([]);
  const [showWebcam, setShowWebcam] = useState(false);

  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "webcam.jpg", { type: "image/jpeg" });
            setImages((prevImages) => [
              ...prevImages,
              { url: URL.createObjectURL(file), file },
            ]);
          })
          .catch((error) => console.error("Erro na captura da imagem:", error));
      }
    }
  }, [webcamRef, setImages]);

  const handleImageSend = (newImages: FileList) => {
    setImageError("");
    const imageObjects = Array.from(newImages).map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    if (images.length + imageObjects.length <= maxImages) {
      setImages((prevImages) => [...prevImages, ...imageObjects]);
    } else {
      console.log(`Não pode enviar mais do que ${maxImages} imagens.`);
      // Você pode mostrar um aviso ao usuário aqui, se quiser
    }
  };

  const handleRemoveImage = (imageObjectToRemove: {
    url: string;
    file: File;
  }) => {
    setImages((prevImages) => {
      // Revoga o URL do objeto para liberar memória
      URL.revokeObjectURL(imageObjectToRemove.url);
      return prevImages.filter(
        (imageObject) => imageObject.file !== imageObjectToRemove.file
      );
    });
  };

  const handleSubmit = async (values: z.infer<any>) => {
    console.log(values);

    if (!imageOptional && images.length === 0) {
      setImageError("Imagem é obrigatória.");
      return;
    }
    console.log(values, images);
    onSubmit(values, images);
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        onOpenChange?.(open);
        if (open === false && !isPending) {
          form.reset();
        }
      }}
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
                    {imageRequired && (
                      <div className="flex flex-col items-center justify-center gap-1 mt-1">
                        <Button
                          variant="ghost"
                          type="button"
                          className="flex items-center justify-center gap-2"
                          onClick={() => {
                            setShowWebcam(!showWebcam);
                          }}
                          disabled={maxImages === images.length}
                        >
                          {!showWebcam ? (
                            <>
                              <PiWebcamFill />
                              <p>{t("Common.openWebcam")}</p>
                            </>
                          ) : (
                            <>
                              <PiWebcamSlashBold />
                              <p>{t("Common.closeWebcam")}</p>
                            </>
                          )}

                          {showWebcam && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                              <div className="relative w-4/5 flex flex-col items-center justify-center">
                                <Webcam
                                  ref={webcamRef}
                                  audio={false}
                                  screenshotFormat="image/jpeg"
                                  className="w-full h-full object-cover aspect-square"
                                />
                                <Button
                                  onClick={() => capture()}
                                  className="absolute bottom-10 bg-primary"
                                >
                                  <div className="text-4xl text-white hover:brightness-90">
                                    <BsRecordCircle />
                                  </div>
                                </Button>
                              </div>
                            </div>
                          )}
                        </Button>
                        <ImageUpload
                          imageSend={handleImageSend}
                          className="w-full"
                          isMax={maxImages === images.length}
                          errorMessage={imageError}
                        />
                      </div>
                    )}
                  </div>
                  {imageRequired && (
                    <div className="flex h-32 min-h-[300px] w-full flex-grow flex-col p-5">
                      {images.length > 0 ? (
                        <Gallery images={images} onRemove={handleRemoveImage} />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                          <CiImageOff className="text-5xl text-primary" />
                          <Label>{t("Common.noImageText")}</Label>
                          <Label>
                            {t("Common.maxImageText")} {maxImages}
                          </Label>
                        </div>
                      )}
                    </div>
                  )}
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
