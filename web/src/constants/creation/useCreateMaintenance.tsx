import { faker } from "@faker-js/faker";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { CreationFields } from "@/types";
import Combobox from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTeam } from "./useCreateTeam";
import CreationModal from "@/components/creation/creation-modal";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatters";

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const generateFakeTeamData = (num: number) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: faker.company.name(),
    total_members: faker.number.int({ min: 1, max: 10 }),
  }));
};

const generateFakeMotorcycleData = (num: number) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: faker.lorem.words(2),
    type: faker.lorem.word(),
    model: faker.lorem.word(),
    manufacture_date: faker.date.recent(),
    serial_number: faker.number.int({ min: 123424, max: 23412343 }),
    environment_id: faker.location.street(),
  }));
};

// Função para gerar dados fictícios
const generateFakeUsersData = (num: number) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    base64: faker.image.avatar(),
    createdAt: faker.date.past(),
    role_id: faker.number.int({ min: 2, max: 2314 }),
    role: faker.lorem.word(),
  }));
};

// Gera 50 itens fictícios
const users_data = generateFakeUsersData(50);

const motorcycle_data = generateFakeMotorcycleData(50);

const team_data = generateFakeTeamData(50);

export const useCreateMaintenance = (): CreationFields => {
  const t = useTranslations();
  const { fields, validationSchema } = useCreateTeam();

  const maintenanceSchema = z.object({
    type: z.string().min(1, t("Zod.maintenanceType")),
    description: z.string().optional(),
    maintenance_date: z.string().refine((date) => dateRegex.test(date), {
      message: t("Zod.motorcycleManufactureDate"),
    }),
    motorcycle_id: z.number().positive(t("Zod.motorcycle")),
    team_id: z.number().positive(t("Zod.team")),
    responsible_id: z.number().positive(t("Zod.responsibleEmail")),
  });

  return {
    fields: [
      {
        label: t("Table.type"),
        dbName: "type",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.description"),
        dbName: "description",
        required: false,
        flexWidth: "100%",
        render({ onChange, value }) {
          return (
            <Textarea
              onChange={(e) => onChange(e.target.value)}
              value={value}
            />
          );
        },
      },
      {
        label: t("Table.maintenanceDate"),
        dbName: "maintenance_date",
        required: true,
        type: "text",
        flexWidth: "100%",
        maskFn: formatDate,
      },
      {
        label: t("Table.motorcycle"),
        dbName: "motorcycle_id",
        required: true,
        type: "number",
        flexWidth: "100%",
        render({ onChange, value }) {
          return (
            <Combobox
              options={motorcycle_data}
              onValueChange={(value) => {
                onChange(value.toString());
              }}
              searchPlaceholder={t("Common.searchMotorcycle")}
              placeholder={t("Table.selectMotorcycle")}
              value={value}
              render={(item) => {
                return (
                  <>
                    <span>
                      <span className="font-semibold">Nome: </span>
                      <span>{item?.name}</span>
                    </span>
                    <span>
                      <span className="font-semibold">Modelo: </span>
                      <span>{item?.model}</span>
                    </span>
                    <span>
                      <span className="font-semibold">Tipo: </span>
                      <span>{item?.type}</span>
                    </span>
                  </>
                );
              }}
              emptyMessage={t("Common.notFound")}
            />
          );
        },
      },
      {
        label: t("Table.team"),
        dbName: "team_id",
        required: true,
        type: "number",
        flexWidth: "100%",
        render({ onChange, value }) {
          return (
            <Combobox
              options={team_data}
              onValueChange={(value) => {
                onChange(value.toString());
              }}
              renderCustomAction={() => (
                <CreationModal
                  onSubmit={(formValues) => {
                    console.log(formValues);
                  }}
                  fields={fields}
                  title={t("Team.createTitle")}
                  description={t("Team.createDescription")}
                  validationSchema={validationSchema}
                >
                  <Button>{t("Teams.new")}</Button>
                </CreationModal>
              )}
              searchPlaceholder={t("Common.searchTeam")}
              placeholder={t("Table.selectTeam")}
              value={value}
              emptyMessage={t("Common.notFound")}
              render={(item) => {
                return (
                  <span>
                    <span>{item?.name}</span>
                  </span>
                );
              }}
            />
          );
        },
      },
      {
        label: t("Table.responsible"),
        dbName: "responsible_id",
        required: true,
        type: "number",
        flexWidth: "100%",
        render({ onChange, value, form }) {
          const team_id = form.watch("team_id");
          return (
            <Combobox
              options={users_data}
              onValueChange={(value) => {
                onChange(value);
              }}
              searchPlaceholder={t("Common.searchTeam")}
              placeholder={t("Table.selectUser")}
              value={value}
              disabled={!team_id}
              emptyMessage={t("Common.notFound")}
              render={(item) => {
                return (
                  <>
                    <span>
                      <span className="font-semibold">Nome: </span>
                      <span>{item?.fullName}</span>
                    </span>
                    <span>
                      <span className="font-semibold">Email: </span>
                      <span>{item?.email}</span>
                    </span>
                    <span>
                      <span className="font-semibold">Cargo: </span>
                      <span>{item?.role}</span>
                    </span>
                  </>
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
    validationSchema: maintenanceSchema,
  };
};
