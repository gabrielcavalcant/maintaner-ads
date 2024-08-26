import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";
import { Badge } from "@/components/ui/badge";
import { simulatedResponseAPI } from "@/helper/simulate-api";
import EditModal from "@/components/creation/edit-modal";
import { useCreateRole } from "../creation/useCreateRole";
import { ReceiptText } from "lucide-react";
import { useRouter } from "@/navigation";

type UseRoleColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useRoleColumns = ({
  onEditClick,
  onRemoveClick,
}: UseRoleColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();
  const router = useRouter();

  const { fields, validationSchema } = useCreateRole();

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
              (permission: { name: string; id: number }) => {
                return (
                  <Badge key={permission.id} className="text-sm">
                    {permission.name}
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
          <TooltipButton
            Icon={ReceiptText}
            message={t("Common.details")}
            onClick={() => {
              router.push(`roles/${row.original.id}`);
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
                  total_permissions: row.original.total_permissions,
                  permissions: row.original.permissions,
                })
              }
              mutationKey={["editRole", row.original.id]}
              title={t("Roles.edit")}
              description={t("Roles.editDescription")}
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
