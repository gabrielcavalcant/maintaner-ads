"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ImageUpload from "./image-upload";
import CheckboxInput from "./checkbox-input";
import { Field, ImageType } from "@/types";
import Gallery from "./gallery";
import Webcam from "react-webcam";
import { PiWebcamFill, PiWebcamSlashBold } from "react-icons/pi";
import { BsRecordCircle } from "react-icons/bs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CiImageOff } from "react-icons/ci";
import { useTranslations } from "next-intl";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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

type FormOutput = {
  images?: ImageType[];
} & Record<string, string>;
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "./ui/checkbox";

interface Props {
  fields: Field[];
  onSubmit: (
    formValues: FormOutput,
    images: { url: string; file: File }[] | ImageType[]
  ) => void;
  maxImages?: number;
  imageOptional?: boolean;
  imageRequired?: boolean;
  children: ReactNode;
  validationSchema: z.ZodObject<any>;
  title?: string;
  description?: string;
}

export default function CreationModalButton({
  fields,
  onSubmit,
  maxImages = 1,
  imageRequired = true,
  imageOptional = false,
  validationSchema,
  children,
  title,
  description,
}: Readonly<Props>) {
  const t = useTranslations();
  const [imageError, setImageError] = useState<string | undefined>("");

  const form = useForm<z.infer<any>>({
    resolver: zodResolver(validationSchema as any),
    defaultValues: fields
      ? fields.reduce(
          (acc, field) => ({
            ...acc,
            [field.dbName]: field.type === "checkbox" ? "false" : "",
          }),
          {}
        )
      : {},
  });
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
    const formattedFormValues = Object.keys(values).reduce((acc, key) => {
      const field = fields.find((f) => f.dbName === key);
      return {
        ...acc,
        [key]: field?.formatOutput
          ? field.formatOutput(values[key])
          : values[key],
      };
    }, {});
    if (!imageOptional && images.length === 0) {
      setImageError("Imagem é obrigatória.");
      return;
    }
    console.log(formattedFormValues, images);
    onSubmit(formattedFormValues, images);
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open === false) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent className="min-w-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col items-center justify-start">
          <Form {...form}>
            {form.formState.errors.root && (
              <p>{form.formState.errors.root.message}</p>
            )}

            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex w-full flex-wrap items-center justify-center space-y-4"
            >
              <div className="flex w-full flex-wrap lg:flex-nowrap">
                <div className="w-full max-w-[600px] flex-col gap-4  p-1">
                  <div className="flex w-full flex-wrap gap-6">
                    {fields?.map((fieldInfo) => {
                      if (fieldInfo.type === "text") {
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
                                    onChange={(e) => {
                                      const newValue = fieldInfo?.formatInput
                                        ? fieldInfo.formatInput(e.target.value)
                                        : e.target.value;
                                      onChange(newValue);
                                    }}
                                    value={value}
                                  />
                                </FormControl>
                                <FormMessage className="" />
                              </FormItem>
                            )}
                          />
                        );
                      } else if (fieldInfo.type === "checkbox") {
                        return (
                          <FormField
                            key={fieldInfo.dbName}
                            control={form.control}
                            name={fieldInfo.dbName}
                            render={({ field: { onChange, value } }) => (
                              <FormItem
                                className="flex flex-col items-center justify-center gap-2"
                                style={{
                                  width:
                                    fieldInfo.flexWidth === "100%"
                                      ? fieldInfo.flexWidth
                                      : `calc(${fieldInfo.flexWidth} - 1rem)`,
                                }}
                              >
                                <FormLabel>
                                  {fieldInfo.label}
                                  <Label className="font-bold text-primary">
                                    {fieldInfo.required && "*"}
                                  </Label>
                                </FormLabel>
                                <FormControl>
                                  <Checkbox onChange={onChange} value={value} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        );
                      }
                    })}
                  </div>
                  {imageRequired && (
                    <div className="relative mt-2 flex w-full flex-col items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        type="button"
                        className="flex items-center justify-center gap-2"
                        onClick={() => {
                          setShowWebcam(!showWebcam);
                        }}
                        disabled={maxImages == images.length}
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
                          <button
                            className="fixed inset-0 z-50 flex cursor-zoom-out select-none items-center justify-center bg-black bg-opacity-50"
                            onClick={() => {
                              setShowWebcam(false);
                            }}
                          >
                            <div className="relative flex flex-col items-center gap-2">
                              <Webcam ref={webcamRef} />
                              <Button
                                onClick={() => {
                                  capture();
                                }}
                                className="bg-primary"
                              >
                                <div className="text-4xl text-white hover:brightness-90">
                                  <BsRecordCircle />
                                </div>
                              </Button>
                            </div>
                          </button>
                        )}
                      </Button>
                      <ImageUpload
                        imageSend={handleImageSend}
                        className="w-full"
                        isMax={maxImages == images.length}
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
              <DialogFooter className="pt-5">
                <Button type="submit">{t("Common.createButton")}</Button>
                <DialogClose asChild>
                  <Button variant="secondary">
                    {t("Common.cancel")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
