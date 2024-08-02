import { Input } from "@/components/ui/input";
import { CreationFields } from "@/types";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreatePart = (): CreationFields => {
  const t = useTranslations();

  // Defina o esquema de validação com zod
  const partSchema = z.object({
    name: z.string().min(1, t("Zod.partName")),
    code: z.string().optional(),
    supplier: z.string().optional(),
    base64: z.string().optional(),
    stock_quantity: z.string().optional(),
    unit_price: z.string().optional(),
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
        label: t("Table.code"),
        dbName: "code",
        required: true,
        type: "text",
        flexWidth: "50%",
      },
      {
        label: t("Table.supplier"),
        dbName: "supplier",
        required: true,
        type: "text",
        flexWidth: "50%",
      },
      {
        label: t("Table.stockQuantity"),
        dbName: "stock_quantity",
        required: false,
        type: "node",
        flexWidth: "100%",
        render({ onChange, value }) {
          return (
            <Input
              type="number"
              onChange={(e) => {
                onChange(e.target.value);
              }}
              value={value}
            />
          );
        },
      },
      {
        label: t("Table.unitPrice"),
        dbName: "unit_price",
        required: false,
        type: "text",
        flexWidth: "100%",
      },
    ],
    options: {
      imageOptional: true,
      maxImages: 1,
    },
    validationSchema: partSchema,
  };
};
