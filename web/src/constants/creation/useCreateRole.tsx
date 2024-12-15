import MultipleCombobox from "@/components/multiple-combobox";
import { CreationFields } from "@/types";
import { faker } from "@faker-js/faker";
import { useTranslations } from "next-intl";
import { z } from "zod";

// Função para gerar dados fictícios
const generateFakePermissionsData = (num: number) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: faker.lorem.word(),
  }));
};

// Gera 50 itens fictícios
const permissions_data = generateFakePermissionsData(50);

export const useCreateRole = (): CreationFields => {
  const t = useTranslations();

  const customerSchema = z.object({
    name: z.string().min(1, t("Zod.roleName")),
    permissions: z
      .array(
        z.object({
          id: z.number().min(1),
          name: z.string().min(1),
        })
      )
      .nonempty(t("Zod.permission")),
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
      {
        label: t("Table.roles"),
        dbName: "permissions",
        required: false,
        type: "array",
        flexWidth: "100%",
        render({ onChange, value }) {
          return (
            <MultipleCombobox
              options={permissions_data as any}
              onValuesChange={(value: any) => {
                onChange(value);
              }}
              searchPlaceholder={t("Common.searchPermissions")}
              placeholder={t("Table.selectPermissions")}
              values={value}
              render={(item) => {
                return <>{item?.name}</>;
              }}
              emptyMessage={t("Common.notFound")}
            />
          );
        },
      },
    ],
    options: {
      imageOptional: true,
      maxImages: 1,
    },
    validationSchema: customerSchema,
  };
};
