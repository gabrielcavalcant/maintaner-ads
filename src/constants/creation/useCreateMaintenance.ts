import { CreationFields } from "@/types";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateMaintenance = (): CreationFields => {
  const t = useTranslations();

  // Defina o esquema de validação com zod
  const maintenanceSchema = z.object({
    type: z.string().min(1, t("Zod.maintenanceType")),
    description: z.string().optional(),
    maintenance_date: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), t("Zod.maintenanceDate")),
    machine_id: z.string().optional(),
    team_id: z.string().optional(),
    responsible_email: z.string().email(t("Zod.responsibleEmail")),
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
        label: t("Table.machineId"),
        dbName: "machine_id",
        required: false,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.teamId"),
        dbName: "team_id",
        required: false,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.responsibleEmail"),
        dbName: "responsible_email",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
    ],
    options: {
      imageOptional: true,
      maxImages: 1,
    },
    validationSchema: maintenanceSchema,
  };
};
