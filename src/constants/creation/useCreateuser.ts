import { CreationFields } from "@/types";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateUser = (): CreationFields => {
  const t = useTranslations();

  // Defina o esquema de validação com zod
  const userSchema = z.object({
    email: z.string().email(t("Zod.email")),
    fullName: z.string().min(1, t("Zod.fullName")),
    role_id: z.string().optional(),
  });

  return {
    fields: [
      {
        label: t("Table.email"),
        dbName: "email",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.fullName"),
        dbName: "fullName",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.roleId"),
        dbName: "role_id",
        required: false,
        type: "text",
        flexWidth: "100%",
      },
    ],
    options: {
      imageOptional: true,
      maxImages: 1,
    },
    validationSchema: userSchema,
  };
};
