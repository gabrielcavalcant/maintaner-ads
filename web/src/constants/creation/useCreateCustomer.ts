import { CreationFields } from "@/types";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateCustomer = (): CreationFields => {
  const t = useTranslations();

  const customerSchema = z.object({
    name: z.string().min(1, t("Zod.name")),
    telephone: z
      .string()
      .min(11, t("Zod.telephoneLength"))
      .max(11, t("Zod.telephoneLength")),
    cpf: z.string().length(11, t("Zod.cpfLength")),
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
        label: t("Table.telephone"),
        dbName: "telephone",
        required: true,
        type: "text",
        flexWidth: "50%",
      },
      {
        label: "CPF",
        dbName: "cpf",
        required: true,
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
