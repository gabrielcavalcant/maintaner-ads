"use client";
import React, { ReactNode } from "react";
import CreationModal from "./creation-modal";
import TooltipButton from "../tooltip-button";
import { Field, ImageType } from "@/types";
import { z } from "zod";
import { MutationFunction, useMutation } from "@tanstack/react-query";

type FormOutput = {
  images?: ImageType[];
} & Record<string, string>;

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
  asChild?: boolean;
  mutationFn: () => Promise<any>;
  mutationKey?: string[];
}

export default function EditModal({
  validationSchema,
  title,
  description,
  asChild,
  children,
  fields,
  onSubmit,
  mutationFn,
  mutationKey = [],
}: Props) {
  const { data, mutate } = useMutation({
    mutationKey: mutationKey,
    mutationFn: mutationFn,
  });

  return (
    <CreationModal
      onOpenChange={(open) => {
        if (open) mutate();
      }}
      onSubmit={onSubmit}
      fields={fields}
      preValues={data}
      isPending={!data}
      title={title}
      description={description}
      validationSchema={validationSchema}
      asChild={asChild}
    >
      {children}
    </CreationModal>
  );
}
