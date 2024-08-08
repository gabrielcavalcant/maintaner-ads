import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";

type UseTeamMemberColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useTeamMemberColumns = ({
  onEditClick,
  onRemoveClick,
}: UseTeamMemberColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();

  return [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.id")} />
      ),
      accessorKey: "id",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.id}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.specialty")} />
      ),
      accessorKey: "specialty",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.specialty}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.team_id")} />
      ),
      accessorKey: "team_id",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.team_id}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.user_id")} />
      ),
      accessorKey: "user_id",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.user_id}
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
