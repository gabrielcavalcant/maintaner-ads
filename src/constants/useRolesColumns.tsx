import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";
import { Badge } from "@/components/ui/badge";

type UseRoleColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useRoleColumns = ({
  onEditClick,
  onRemoveClick,
}: UseRoleColumnsProps = {}): ColumnDef<any>[] => {
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
        <DataTableColumnHeader
          column={column}
          title={t("Table.total_permissions")}
        />
      ),
      accessorKey: "total_permissions",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.total_permissions}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.permissions")} />
      ),
      accessorKey: "permissions",

      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap gap-2 py-2">
            {row?.original?.permissions?.map(
              (permission: string, index: number) => {
                return (
                  <Badge key={index} className="text-sm">
                    {permission}
                  </Badge>
                );
              }
            )}
          </div>
        );
      },
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
