import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";

type UseMaintenanceColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useMaintenanceColumns = ({
  onEditClick,
  onRemoveClick,
}: UseMaintenanceColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();

  return [
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
        <DataTableColumnHeader column={column} title={t("Table.description")} />
      ),
      accessorKey: "description",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.description}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.maintenance_date")}
        />
      ),
      accessorKey: "maintenance_date",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {new Date(row.original.maintenance_date).toLocaleDateString()}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.status")} />
      ),
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.status}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.machine_id")} />
      ),
      accessorKey: "machine_id",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.machine_id}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.team_id")} />
      ),
      accessorKey: "team_id",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.team_id}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.responsible_id")}
        />
      ),
      accessorKey: "responsible_id",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.responsible_id}
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
