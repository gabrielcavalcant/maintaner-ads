import MultipleCombobox from "@/components/multiple-combobox";
import { Label } from "@/components/ui/label";
import { CreationFields } from "@/types";
import { faker } from "@faker-js/faker";
import { useTranslations } from "next-intl";
import { z } from "zod";

// Função para gerar dados fictícios
const generateFakeUsersData = (num: number) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    fullName: faker.person.fullName(),
    base64: faker.image.avatar(),
    specialty: faker.lorem.word(),
    email: faker.internet.email(),
  }));
};

// Gera 50 itens fictícios
const users_data = generateFakeUsersData(50);

export const useCreateTeam = (): CreationFields => {
  const t = useTranslations();

  // Defina o esquema de validação com zod
  const teamSchema = z.object({
    name: z.string().min(1, t("Zod.teamName")),
    members: z
      .array(
        z.object({
          id: z.number().min(1),
        })
      )
      .nonempty(t("Zod.members"))
      .transform((members) => members.map((member) => member.id)),
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
        label: t("Table.members"),
        dbName: "members",
        required: true,
        type: "array",
        flexWidth: "100%",
        render({ onChange, value }) {
          return (
            <MultipleCombobox
              options={users_data as any}
              onValuesChange={(value: any) => {
                onChange(value);
              }}
              searchPlaceholder={t("Common.searchUsers")}
              placeholder={t("Table.selectUsers")}
              values={value}
              optionsRender={(item) => {
                return (
                  <div className="flex flex-col p-2 w-full">
                    <span>
                      <Label className="font-semibold">Nome: </Label>
                      <Label>{item?.fullName}</Label>
                    </span>
                    <span>
                      <Label className="font-semibold">Email: </Label>
                      <Label>{item?.email}</Label>
                    </span>
                  </div>
                );
              }}
              render={(item) => {
                return (
                  <>
                    <span>
                      <span className="font-semibold">Nome: </span>
                      <span>{item?.fullName}</span>
                    </span>
                    <span>
                      <span className="font-semibold">Especialidade: </span>
                      <span>{item?.specialty}</span>
                    </span>
                    <span>
                      <span className="font-semibold">Email: </span>
                      <span>{item?.email}</span>
                    </span>
                  </>
                );
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
    validationSchema: teamSchema,
  };
};
