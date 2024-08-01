import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import TableCopy from "@/components/table/table-copy";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";

type UseMachinesColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useMachinesColumns = ({
  onEditClick,
  onRemoveClick,
}: UseMachinesColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();

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
        <DataTableColumnHeader column={column} title={t("Table.model")} />
      ),
      accessorKey: "model",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.model}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.manufacture_date")}
        />
      ),
      accessorKey: "manufacture_date",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {new Date(row.original.manufacture_date).toLocaleDateString()}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.serial_number")}
        />
      ),
      accessorKey: "serial_number",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.serial_number}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.environment_id")}
        />
      ),
      accessorKey: "environment_id",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.environment_id}
        </div>
      ),
    },
    {
      id: "actions",
      header: t("Table.actions"),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 my-1">
          {onEditClick && (
            <TooltipButton
              Icon={MdEdit}
              message="Editar"
              onClick={() => onEditClick(row.original.id)}
            />
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
