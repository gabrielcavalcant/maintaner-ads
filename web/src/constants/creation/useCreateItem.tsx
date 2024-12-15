import WebcamInput from "@/components/webcam-input";
import { formatToBRL, parseCurrency } from "@/lib/formatters";
import { CreationFields } from "@/types";
import { useTranslations } from "next-intl";
import { z } from "zod";

export const useCreateItem = (): CreationFields => {
  const t = useTranslations();

  const itemSchema = z.object({
    name: z.string().min(1, t("Zod.itemName")),
    serialCode: z.string().min(1, t("Zod.serialCode")).max(15,t("Zod.serialCode")),
    supplier: z.string().min(1, t("Zod.supplier")).max(100,t("Zod.supplier")),
    // base64: z.string().optional(),
    stockQuantity: z.number().positive(t("Zod.stockQuantity")),
    description: z.string().min(1, t("Zod.itemDescription")).max(250,t("Zod.itemDescription")),
    // unit_price: z.preprocess(
    //   parseCurrency,
    //   z.number().positive(t("Zod.unit_price"))
    // ),
    // image: z
    //   .array(
    //     z
    //       .object({
    //         url: z.string(),
    //         file: z.instanceof(File),
    //       })
    //       .transform(async ({ file }) => {
    //         const reader = new FileReader();
    //         return new Promise<string>((resolve, reject) => {
    //           reader.onload = () => resolve(reader.result as string);
    //           reader.onerror = () =>
    //             reject(new Error("Failed to convert to base64"));
    //           reader.readAsDataURL(file);
    //         });
    //       })
    //   )
    //   .transform(async (promises) => {
    //     // Transforma o array de promessas em um array de strings base64
    //     return Promise.all(promises);
    //   }),
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
        label: t("Table.serialCode"),
        dbName: "serialCode",
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
        dbName: "stockQuantity",
        required: true,
        type: "number",
        flexWidth: "100%",
      },
      {
        label: t("Table.description"),
        dbName: "description",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
      // {
      //   label: t("Table.unitPrice"),
      //   dbName: "unit_price",
      //   required: true,
      //   flexWidth: "100%",
      //   maskFn: formatToBRL,
      // },
      // {
      //   label: t("Table.itemImage"),
      //   dbName: "image",
      //   required: true,
      //   type: "array",
      //   flexWidth: "100%",
      //   render({ onChange, value }) {
      //     return <WebcamInput onChange={onChange} value={value} />;
      //   },
      // },
    ],
    options: {
      imageOptional: true,
      maxImages: 1,
    },
    validationSchema: itemSchema,
  };
};
