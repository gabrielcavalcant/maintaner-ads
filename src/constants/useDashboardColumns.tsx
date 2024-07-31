import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import TableCopy from "@/components/table/table-copy";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";

export const useDashboardColumns = (): ColumnDef<any>[] => {
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
          <Button
            variant="ghost"
            size="icon"
            className="text-card-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <MdEdit className="text-lg" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-card-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <FaEraser className="text-lg" />
          </Button>
        </div>
      ),
    },
  ];
};
