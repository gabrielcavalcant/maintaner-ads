import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UseUserColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useUserColumns = ({
  onEditClick,
  onRemoveClick,
}: UseUserColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();

  return [
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
        <DataTableColumnHeader column={column} title={t("Table.fullName")} />
      ),
      accessorKey: "fullName",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.fullName}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.email")} />
      ),
      accessorKey: "email",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.email}</div>
      ),
    },

    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.createdAt")} />
      ),
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.role_id")} />
      ),
      accessorKey: "role_id",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.role_id}</div>
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
