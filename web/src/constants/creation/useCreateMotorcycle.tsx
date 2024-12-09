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
import CreationModal from "@/components/creation/creation-modal";
import { Button } from "@/components/ui/button";

export const useCreateMotorcycle = (): CreationFields => {
  const t = useTranslations();

  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    // Obter o ano atual
    const currentYear = new Date().getFullYear();
    const minYear = 1885; // Ano mínimo permitido

  // Defina o esquema de validação com zod
  const motorcycleSchema = z.object({
    name: z.string().min(1, t("Zod.name")),
    type: z.number(),
    plate: z
      .string()
      .min(7, t("Zod.plateLength"))
      .max(7, t("Zod.plateLength")),
    yearManufacture: z
      .number()
      .int(t("Zod.yearMustBeInteger"))
      .min(minYear, t("Zod.yearMin", { minYear }))
      .max(currentYear, t("Zod.yearMax", { currentYear })),
    customerCpf: z.string().length(11, t("Zod.customerCpfLength")),
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
        type: "number",
        flexWidth: "100%",
      },
      {
        label: t("Table.plate"),
        dbName: "plate",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
      {
        label: t("Table.yearManufacture"),
        dbName: "yearManufacture",
        required: true,
        type: "number",
        flexWidth: "100%",
        // maskFn(input) {
        //   // Limitar a entrada para números
        //   const cleaned = input.replace(/\D/g, "");

        //   // Limitar o comprimento a 4 caracteres
        //   const limited = cleaned.slice(0, 4);

        //   return limited;
        // },
      },
      {
        label: t("Table.customerCpf"),
        dbName: "customerCpf",
        required: true,
        type: "text",
        flexWidth: "100%",
      },
      // {
      //   label: t("Table.customer"),
      //   dbName: "customer_id",
      //   required: false,
      //   type: "number",
      //   flexWidth: "100%",
      //   render: ({ onChange, value }) => {
      //     return (
      //       <Combobox
      //         options={env_data}
      //         onValueChange={(value) => {
      //           onChange(value);
      //         }}
      //         renderCustomAction={() => (
      //           <CreationModal
      //             onSubmit={(formValues) => {
      //               console.log(formValues);
      //             }}
      //             fields={fields}
      //             title={t("Customer.createTitle")}
      //             description={t("Customer.createDescription")}
      //             validationSchema={validationSchema}
      //             asChild
      //           >
      //             <Button>{t("Customers.new")}</Button>
      //           </CreationModal>
      //         )}
      //         searchPlaceholder={t("Common.searchCustomer")}
      //         placeholder={t("Table.selectCustomer")}
      //         value={value}
      //         emptyMessage={t("Common.notFound")}
      //         render={(item) => {
      //           return (
      //             <div className="flex flex-col justify-center items-start w-full">
      //               <span>
      //                 <span className="font-semibold">Nome: </span>
      //                 <span>{item.name}</span>
      //               </span>
      //               <span>
      //                 <span className="font-semibold">Local: </span>
      //                 <span>{item.location}</span>
      //               </span>
      //               <span>
      //                 <span className="font-semibold">Empresa: </span>
      //                 <span>{item.company_name}</span>
      //               </span>
      //             </div>
      //           );
      //         }}
      //       />
      //     );
      //   },
      // },
    ],
    options: {
      imageOptional: true,
      maxImages: 1,
    },
    validationSchema: motorcycleSchema,
  };
};
