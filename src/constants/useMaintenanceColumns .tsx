import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";
import CreationModal from "@/components/creation/creation-modal";
import EditModal from "@/components/creation/edit-modal";
import { simulatedResponseAPI } from "@/helper/simulate-api";
import { faker } from "@faker-js/faker";
import { useCreateMaintenance } from "./creation/useCreateMaintenance";
import { Card } from "@/components/ui/card";

type UseMaintenanceColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useMaintenanceColumns = ({
  onEditClick,
  onRemoveClick,
}: UseMaintenanceColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();

  const { fields, validationSchema } = useCreateMaintenance();

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
      cell: ({ row }) => {
        const status =
          row.original.status === 0
            ? { label: "Pendente", color: "yellow" }
            : row.original.status === 1
            ? { label: "Concluido", color: "green" }
            : { label: "Desconhecido", color: "red" };

        return (
          <Card
            className={`flex gap-1 items-center justify-center bg-${status.color}-500`}
          >
            {status.label}
          </Card>
        );
      },
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.machine_id")} />
      ),
      accessorKey: "machine",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.machine}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.team_id")} />
      ),
      accessorKey: "team",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.team}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.responsible_id")}
        />
      ),
      accessorKey: "responsible",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.responsible}
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
                  type: row.original.type,
                  description: row.original.description,
                  maintenance_date: row.original.maintenance_date,
                  status: row.original.status,
                  machine_id: row.original.machine_id,
                  team_id: row.original.team_id,
                  responsible_id: row.original.responsible_id,
                })
              }
              mutationKey={["editMaintenance", row.original.id]}
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
