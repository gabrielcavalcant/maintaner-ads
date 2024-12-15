import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";
import EditModal from "@/components/creation/edit-modal";
import { simulatedResponseAPI } from "@/helper/simulate-api";
import { useCreateMaintenance } from "../creation/useCreateMaintenance";
import { Card } from "@/components/ui/card";
import { ReceiptText } from "lucide-react";
import { useRouter } from "@/navigation";

type UseMaintenanceColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useMaintenanceColumns = ({
  onEditClick,
  onRemoveClick,
}: UseMaintenanceColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();
  const router = useRouter();
  const { fields, validationSchema } = useCreateMaintenance();

  return [
    // {
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title={t("Table.type")} />
    //   ),
    //   accessorKey: "type",
    //   cell: ({ row }) => (
    //     <div className="flex gap-1 items-center">{row.original.type}</div>
    //   ),
    // },
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
    // {
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title={t("Table.maintenance_date")}
    //     />
    //   ),
    //   accessorKey: "maintenance_date",
    //   cell: ({ row }) => (
    //     <div className="flex gap-1 items-center">
    //       {new Date(row.original.maintenance_date).toLocaleDateString()}
    //     </div>
    //   ),
    // },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.status")} />
      ),
      accessorKey: "maintenanceStatus",
      cell: ({ row }) => {
        const status =
          row.original.maintenanceStatus === 1
            ? { label: "Criado", color: "yellow" }
            : row.original.maintenanceStatus === 2
            ? { label: "Em Progresso", color: "blue" }
            : row.original.maintenanceStatus === 3
            ? { label: "Concluído", color: "green" }
            : { label: "Desconhecido", color: "red" };
    
        return (
          <Card
            className={`flex gap-1 items-center justify-center bg-${status.color}-500 text-white`}
          >
            {status.label}
          </Card>
        );
      },
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.motorcycle_id")} />
      ),
      accessorKey: "motorcycleId",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.motorcycleId}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.motorcycle_name")} />
      ),
      accessorKey: "motorcycleName",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.motorcycleName}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.motorcycle_plate")} />
      ),
      accessorKey: "motorcyclePlate",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.motorcyclePlate}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.team_id")} />
      ),
      accessorKey: "teamId",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.teamId}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("Table.team_name")} />
      ),
      accessorKey: "teamName",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.teamName}</div>
      ),
    },
    // {
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title={t("Table.responsible_id")}
    //     />
    //   ),
    //   accessorKey: "responsible",
    //   cell: ({ row }) => (
    //     <div className="flex gap-1 items-center">
    //       {row.original.responsible}
    //     </div>
    //   ),
    // },
    {
      id: "actions",
      header: t("Table.actions"),
      cell: ({ row }) => (
        <div className="flex items-center gap-1 my-1">
          <TooltipButton
            Icon={ReceiptText}
            message={t("Common.details")}
            onClick={() => {
              router.push(`maintenance/${row.original.id}`);
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
                  type: row.original.type,
                  description: row.original.description,
                  maintenance_date: row.original.maintenance_date,
                  status: row.original.status,
                  motorcycle_id: row.original.motorcycle_id,
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
              message={t("Remover")}
              onClick={() => onRemoveClick(row.original.id)}
            />
          )}
        </div>
      ),
    },
  ];
};
