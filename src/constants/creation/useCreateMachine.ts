import { CreationFields } from "@/types";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateMachine = (): CreationFields => {
  const t = useTranslations();

  // Defina o esquema de validação com zod
  const machineSchema = z.object({
    name: z.string().min(1, t("Zod.machineName")),
    type: z.string().min(1, t("Zod.machineType")),
    model: z.string().min(1, t("Zod.machineModel")),
    manufacture_date: z
      .string()
      .refine(
        (date) => !isNaN(Date.parse(date)),
        t("Zod.machineManufactureDate")
      ),
    serial_number: z.string(),
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
      },
      {
        label: t("Table.serialNumber"),
        dbName: "serial_number",
        required: false,
        type: "text",
        flexWidth: "100%",
      },
      // {
      //   label: t("Table.environmentId"),
      //   dbName: "environment_id",
      //   required: false,
      //   type: "text",
      //   flexWidth: "100%",
      // },
    ],
    options: {
      imageOptional: true,
      maxImages: 1,
    },
    validationSchema: machineSchema,
  };
};
