import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";
import EditModal from "@/components/creation/edit-modal";
import { simulatedResponseAPI } from "@/helper/simulate-api";
import { ReceiptText } from "lucide-react";
import { useRouter } from "@/navigation";
import { useCreateCustomer } from "../creation/useCreateCustomer";

type UseCustomersColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useCustomersColumns = ({
  onEditClick,
  onRemoveClick,
}: UseCustomersColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();
  const router = useRouter();

  const { fields, validationSchema } = useCreateCustomer();

  return [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.name")} />
      ),
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.name}</div>
      ),
    },
    {
      id: "actions",
      header: t("Table.actions"),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1 my-1">
            <TooltipButton
              Icon={ReceiptText}
              message={t("Common.details")}
              onClick={() => {
                router.push(`customers/${row.original.id}`);
              }}
            />
            {onEditClick && (
              <EditModal
                onSubmit={(formValues) => {
                  console.log(formValues);
                }}
                fields={fields}
                mutationFn={() =>
                  simulatedResponseAPI({
                    id: row.original.id,
                    name: row.original.name,
                    location: row.original.location,
                    company_name: row.original.company_name,
                  })
                }
                mutationKey={["editCustomer", row.original.id]}
                title={t("Customer.editTitle")}
                description={t("Customer.editDescription")}
                validationSchema={validationSchema}
                asChild
              >
                <TooltipButton
                  Icon={MdEdit}
                  message={t("Common.edit")}
                  onClick={() => onEditClick(row.original.id)}
                />
              </EditModal>
            )}
            {onRemoveClick && (
              <TooltipButton
                Icon={FaEraser}
                message={t("Common.remove")}
                onClick={() => onRemoveClick(row.original.id)}
              />
            )}
          </div>
        );
      },
    },
  ];
};
