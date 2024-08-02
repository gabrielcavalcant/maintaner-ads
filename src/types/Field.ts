import { ReactNode } from "react";
import { PathValue, UseFormReturn } from "react-hook-form";

export type Field = {
  label: string;
  dbName: string;
  type?: "text" | "checkbox" | "node";
  required: boolean;
  flexWidth?: string;
  render?: (props: RenderType) => ReactNode;
  formatInput?: (input: string) => string;
  formatOutput?: (output: string) => string;
};

type RenderType = {
  onChange: (value: string) => void;
  value: string;
  form: UseFormReturn<any, any, undefined>;
};
