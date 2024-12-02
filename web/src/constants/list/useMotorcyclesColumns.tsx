import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";
import EditModal from "@/components/creation/edit-modal";
import { useCreateMotorcycle } from "../creation/useCreateMotorcycle";
import { simulatedResponseAPI } from "@/helper/simulate-api";
import { useRouter } from "@/navigation";
import { ReceiptText } from "lucide-react";

type UseMotorcyclesColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useMotorcyclesColumns = ({
  onEditClick,
  onRemoveClick,
}: UseMotorcyclesColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();
  const router = useRouter();
  const { fields, validationSchema } = useCreateMotorcycle();

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
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.type")} />
      ),
      accessorKey: "type",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.type}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.plate")} />
      ),
      accessorKey: "plate",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.plate}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.yearManufacture")}
        />
      ),
      accessorKey: "yearManufacture",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.yearManufacture}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.customerCpf")}
        />
      ),
      accessorKey: "customerCpf",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.customerCpf}
        </div>
      ),
    },
    // {
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title={t("Table.environment_id")}
    //     />
    //   ),
    //   accessorKey: "environment_id",
    //   cell: ({ row }) => (
    //     <div className="flex gap-1 items-center">
    //       {row.original.environment_id}
    //     </div>
    //   ),
    // },
    {
      id: "actions",
      header: t("Table.actions"),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 my-1">
          <TooltipButton
            Icon={ReceiptText}
            message={t("Common.details")}
            onClick={() => {
              router.push(`motorcycle/${row.original.motorcycleId}`);
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
                  type: row.original.type,
                  yearManufacture: row.original.yearManufacture,
                  serial_number: row.original.serial_number,
                  environment: row.original.environment,
                  environment_id: row.original.environment_id,
                })
              }
              mutationKey={["editMotorcycle", row.original.id]}
              title={t("Motorcycles.edit")}
              description={t("Motorcycles.editDescription")}
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
              message="Remover"
              onClick={() => onRemoveClick(row.original.id)}
            />
          )}
        </div>
      ),
    },
  ];
};
