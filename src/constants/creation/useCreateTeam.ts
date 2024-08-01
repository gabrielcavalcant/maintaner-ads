import { CreationFields } from "@/types";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateTeam = (): CreationFields => {
  const t = useTranslations();

  // Defina o esquema de validação com zod
  const customerSchema = z.object({
    fullname: z.string().min(1, t('Zod.teamName')),
  });

  return {
    fields: [
      {
        label: t("Table.name"),
        dbName: "fullname",
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
