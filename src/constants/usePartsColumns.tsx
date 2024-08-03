import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditModal from "@/components/creation/edit-modal";
import { simulatedResponseAPI } from "@/helper/simulate-api";
import { useCreatePart } from "./creation/useCreatePart";
import { formatToBRL } from "@/lib/formatters";

type UsePartColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const usePartColumns = ({
  onEditClick,
  onRemoveClick,
}: UsePartColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();

  const { fields, validationSchema } = useCreatePart();

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
        <DataTableColumnHeader column={column} title={t("Table.code")} />
      ),
      accessorKey: "code",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.code}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.supplier")} />
      ),
      accessorKey: "supplier",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.supplier}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.image")} />
      ),
      accessorKey: "base64",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          <Avatar>
            <AvatarImage
              src={`data:image/png;base64,${row.original.base64}`}
              alt={row.original.name}
              width={50}
              height={50}
              className="object-cover"
            />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.stock_quantity")}
        />
      ),
      accessorKey: "stock_quantity",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.stock_quantity}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.unit_price")} />
      ),
      accessorKey: "unit_price",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {formatToBRL(row.original.unit_price)}
        </div>
      ),
    },
    {
      id: "actions",
      header: t("Table.actions"),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 my-1">
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
                  code: row.original.code,
                  supplier: row.original.supplier,
                  base64: row.original.base64,
                  stock_quantity: row.original.stock_quantity,
                  unit_price: row.original.unit_price,
                })
              }
              mutationKey={["editPart", row.original.id]}
              title={t("Mainteances.edit")}
              description={t("Mainteances.editDescription")}
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
      ),
    },
  ];
};
