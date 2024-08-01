import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import TableCopy from "@/components/table/table-copy";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";

type UseDashboardColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useDashboardColumns = ({
  onEditClick,
  onRemoveClick,
}: UseDashboardColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();

  return [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.environment")} />
      ),
      accessorKey: "environment",
      cell: ({ row, column }) => (
        <div className="flex gap-1 items-center">
          {row.original.environment}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.equipment")} />
      ),
      accessorKey: "equipment",
      cell: ({ row, column }) =>
        row.original.equipment && (
          <div className="flex gap-1 items-center">
            {row.original.equipment}
          </div>
        ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.request")} />
      ),
      accessorKey: "request",
      cell: ({ row, column }) =>
        row.original.request && (
          <div className="flex gap-1 items-center">
            {row.original.request}
            <TableCopy
              row={row}
              accessorKey="equipment"
              title={t("Table.request")}
            />
          </div>
        ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.service")} />
      ),
      accessorKey: "service",
      cell: ({ row, column }) =>
        row.original.service && (
          <div className="flex gap-1 items-center">
            {row.original.service}
            <TableCopy
              row={row}
              accessorKey="service"
              title={t("Table.service")}
            />
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
