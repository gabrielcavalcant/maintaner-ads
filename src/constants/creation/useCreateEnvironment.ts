import { CreationFields } from "@/types";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateEnvironment = (): CreationFields => {
  const t = useTranslations();

  // Defina o esquema de validação com zod
  const environmentSchema = z.object({
    name: z.string().min(1, t("Zod.environmentName")),
    location: z.string().min(1, t("Zod.environmentLocation")),
    company_name: z.string().min(1, t("Zod.environmentCompanyName")),
  });

  return {
    fields: [
      {
        label: t("Table.name"),
        dbName: "name",
        required: true,
        type: "text",
        flexWidth: "50%",
      },
      {
        label: t("Table.companyName"),
        dbName: "company_name",
        required: true,
        type: "text",
        flexWidth: "50%",
      },
      {
        label: t("Table.location"),
        dbName: "location",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
    ],
    options: {
      imageOptional: true,
      maxImages: 1,
    },
    validationSchema: environmentSchema,
  };
};
