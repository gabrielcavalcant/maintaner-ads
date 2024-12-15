import Combobox from "@/components/ui/combobox";
import { CreationFields } from "@/types";
import { faker } from "@faker-js/faker";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateUser = (): CreationFields => {
  const t = useTranslations();

  // Defina o esquema de validação com zod
  const userSchema = z.object({
    email: z.string().email(t("Zod.email")),
    fullName: z.string().min(1, t("Zod.fullName")),
    role_id: z.number().positive(t("Zod.role")),
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
        label: t("Table.role"),
        dbName: "role_id",
        required: false,
        type: "number",
        flexWidth: "100%",
        render({ value, onChange }) {
          return (
            <Combobox
              options={role_data}
              onValueChange={(value) => {
                onChange(value);
              }}
              searchPlaceholder={t("Common.searchRole")}
              placeholder={t("Table.selectRole")}
              value={value}
              emptyMessage={t("Common.notFound")}
              render={(item) => {
                return (
                  <div className="flex flex-col justify-center items-start w-full">
                    <span>
                      <span className="font-semibold">Nome: </span>
                      <span>{item?.name}</span>
                    </span>
                  </div>
                );
              }}
            />
          );
        },
      },
    ],
    options: {
      imageOptional: true,
      maxImages: 1,
    },
    validationSchema: userSchema,
  };
};
