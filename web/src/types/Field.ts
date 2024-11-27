import { ReactNode } from "react";
import { PathValue, UseFormReturn } from "react-hook-form";

export type Field = {
  label: string;
  dbName: string;
  type?: "number" | "text" | "array" | "object";
  required: boolean;
  flexWidth?: string;
  render?: (props: RenderType) => ReactNode;
  maskFn?: (input: string) => string;
};

type RenderType = {
  onChange: (value: any) => void;
  value: any;
  form: UseFormReturn<any, any, undefined>;
};
