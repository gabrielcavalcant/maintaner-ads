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
import { useCreateUser } from "./creation/useCreateuser";
import { Badge } from "@/components/ui/badge";
import ConfirmAlertDialog from "@/components/confirm-alert-dialog";
import toast from "react-hot-toast";

type UseUserColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useUserColumns = ({
  onEditClick,
  onRemoveClick,
}: UseUserColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();

  const { fields, validationSchema } = useCreateUser();

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
              src={`${row.original.base64}`}
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
        <DataTableColumnHeader column={column} title={t("Table.role_id")} />
      ),
      accessorKey: "role",
      cell: ({ row }) => (
        <Badge className="flex justify-center items-center">
          {row.original.role}
        </Badge>
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
                  fullName: row.original.fullName,
                  email: row.original.email,
                  base64: row.original.base64,
                  createdAt: row.original.createdAt,
                  role_id: row.original.role_id,
                })
              }
              mutationKey={["editUser", row.original.id]}
              title={t("Machines.edit")}
              description={t("Machines.editDescription")}
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
            <ConfirmAlertDialog
              onContinue={() => {
                toast.success(`${row.original.fullName} removido com sucesso`);
              }}
            >
              <TooltipButton
                Icon={FaEraser}
                message={t("Common.remove")}
                onClick={() => onRemoveClick(row.original.id)}
              />
            </ConfirmAlertDialog>
          )}
        </div>
      ),
    },
  ];
};
