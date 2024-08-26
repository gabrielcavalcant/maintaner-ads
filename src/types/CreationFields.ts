import { Field } from "./Field";
import { z } from "zod";

export type CreationFields = {
  fields: Field[];
  options?: { maxImages?: number; imageOptional?: boolean };
  validationSchema: z.ZodObject<any>;
};
