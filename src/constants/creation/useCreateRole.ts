import { CreationFields } from "@/types";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateRole = (): CreationFields => {
  const t = useTranslations();

  // Defina o esquema de validação com zod
  const customerSchema = z.object({
    name: z.string().min(1, t("Zod.roleName")),
  });

  return {
    fields: [
      {
        label: t("Table.name"),
        dbName: "name",
        required: false,
        type: "text",
        flexWidth: "100%",
      },
    ],
    options: {
      imageOptional: true,
      maxImages: 1,
    },
    validationSchema: customerSchema,
  };
};
