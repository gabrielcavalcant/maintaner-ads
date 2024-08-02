import { CreationFields } from "@/types";
import { useTranslations } from "next-intl";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { faker } from "@faker-js/faker";
import { Label } from "@/components/ui/label";
import Combobox from "@/components/ui/combobox";

const generateFakeEnrironmentData = (num: number) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: faker.lorem.word(),
    location: faker.location.streetAddress(),
    company_name: faker.lorem.word(),
  }));
};

// Gera 50 itens fictícios
const env_data = generateFakeEnrironmentData(50);

export const useCreateMachine = (): CreationFields => {
  const t = useTranslations();

  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  // Defina o esquema de validação com zod
  const machineSchema = z.object({
    name: z.string().min(1, { message: t("Zod.machineName") }),
    type: z.string().min(1, { message: t("Zod.machineType") }),
    model: z.string().min(1, { message: t("Zod.machineModel") }),
    manufacture_date: z.string().refine((date) => dateRegex.test(date), {
      message: t("Zod.machineManufactureDate"),
    }),
    serial_number: z.string().optional(),
  });

  return {
    fields: [
      {
        label: t("Table.name"),
        dbName: "name",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.type"),
        dbName: "type",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.model"),
        dbName: "model",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.manufactureDate"),
        dbName: "manufacture_date",
        required: true,
        type: "text",
        flexWidth: "100%",
        formatInput(input) {
          // Remover todos os caracteres não numéricos
          const cleaned = input.replace(/\D/g, "");

          // Limitar o comprimento máximo para 8 caracteres (DDMMYYYY)
          const limited = cleaned.slice(0, 8);

          // Formatar conforme o usuário digita
          let formatted = limited;

          if (limited.length > 2) {
            formatted = `${limited.slice(0, 2)}/${limited.slice(2)}`;
          }
          if (limited.length > 4) {
            formatted = `${limited.slice(0, 2)}/${limited.slice(
              2,
              4
            )}/${limited.slice(4, 8)}`;
          }

          return formatted;
        },
      },
      {
        label: t("Table.serialNumber"),
        dbName: "serial_number",
        required: false,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.environment"),
        dbName: "environment_id",
        required: false,
        type: "node",
        render: ({ onChange, value }) => {
          return (
            <Combobox
              options={env_data}
              onValueChange={(value) => {
                onChange(value.toString());
              }}
              searchPlaceholder={t("Common.searchEnvironment")}
              placeholder={t("Table.selectEnvironment")}
              value={value}
              emptyMessage={t("Common.notFound")}
              render={(item) => {
                return (
                  <div className="flex flex-col justify-center items-start">
                    <span>
                      <Label className="font-semibold">Nome: </Label>
                      <Label>{item.name}</Label>
                    </span>
                    <span>
                      <Label className="font-semibold">Local: </Label>
                      <Label>{item.location}</Label>
                    </span>
                    <span>
                      <Label className="font-semibold">Empresa: </Label>
                      <Label>{item.company_name}</Label>
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
    validationSchema: machineSchema,
  };
};
