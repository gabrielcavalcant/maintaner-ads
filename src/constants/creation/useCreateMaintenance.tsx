import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { CreationFields } from "@/types";
import { Card } from "@/components/ui/card";
import Combobox from "@/components/combobox";

const generateFakeTeamData = (num: number) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: faker.company.name(),
    total_members: faker.number.int({ min: 1, max: 10 }),
  }));
};

const generateFakeMachineData = (num: number) => {
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

const machine_data = generateFakeMachineData(50);

const team_data = generateFakeTeamData(50);

export const useCreateMaintenance = (): CreationFields => {
  const t = useTranslations();
  const [teamId, setTeamId] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(teamId);
    setTeamId(undefined);
  }, [teamId]);

  const maintenanceSchema = z.object({
    type: z.string().min(1, t("Zod.maintenanceType")),
    description: z.string().optional(),
    maintenance_date: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), t("Zod.maintenanceDate")),
    machine_id: z.string().min(1, t("Zod.machine")),
    team_id: z.string().min(1, t("Zod.team")),
    responsible_id: z.string().email(t("Zod.responsibleEmail")),
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
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.maintenanceDate"),
        dbName: "maintenance_date",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.machine"),
        dbName: "machine_id",
        required: true,
        type: "node",
        flexWidth: "100%",
        render({ onChange, value }) {
          return (
            <Combobox
              options={machine_data}
              onValueChange={(value) => {
                onChange(value.toString());
              }}
              searchPlaceholder={t("Common.searchMachine")}
              placeholder={t("Table.selectMachine")}
              value={value}
              render={(item) => {
                return (
                  <>
                    <span>
                      <span className="font-semibold">Nome: </span>
                      <span>{item.name}</span>
                    </span>
                    <span>
                      <span className="font-semibold">Modelo: </span>
                      <span>{item.model}</span>
                    </span>
                    <span>
                      <span className="font-semibold">Tipo: </span>
                      <span>{item.type}</span>
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
        type: "node",
        flexWidth: "100%",
        render({ onChange, value }) {
          return (
            <Combobox
              options={team_data}
              onValueChange={(value) => {
                onChange(value.toString());
                setTeamId(value.toString());
              }}
              searchPlaceholder={t("Common.searchTeam")}
              placeholder={t("Table.selectTeam")}
              value={value}
              emptyMessage={t("Common.notFound")}
              render={(item) => {
                return (
                  <>
                    <span>
                      <span>{item.name}</span>
                    </span>
                  </>
                );
              }}
            />
          );
        },
      },
      {
        label: t("Table.responsibleEmail"),
        dbName: "responsible_email",
        required: true,
        type: "node",
        flexWidth: "100%",
        render({ onChange, value }) {
          return (
            <Combobox
              options={users_data}
              onValueChange={(value) => {
                onChange(value.toString());
              }}
              searchPlaceholder={t("Common.searchTeam")}
              placeholder={t("Table.selectUser")}
              value={value}
              disabled={teamId !== undefined ? true : false}
              emptyMessage={t("Common.notFound")}
              render={(item) => {
                return (
                  <>
                    <span>
                      <span className="font-semibold">Nome: </span>
                      <span>{item.fullName}</span>
                    </span>
                    <span>
                      <span className="font-semibold">Email: </span>
                      <span>{item.email}</span>
                    </span>
                    <span>
                      <span className="font-semibold">Cargo: </span>
                      <span>{item.role}</span>
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
