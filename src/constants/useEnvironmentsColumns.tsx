import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";
import { useCreateEnvironment } from "./creation/useCreateEnvironment";
import CreationModal from "@/components/creation/creation-modal";
import EditModal from "@/components/creation/edit-modal";
import { faker } from "@faker-js/faker";
import { simulatedResponseAPI } from "@/helper/simulate-api";

type UseEnvironmentsColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useEnvironmentsColumns = ({
  onEditClick,
  onRemoveClick,
}: UseEnvironmentsColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();

  const { fields, validationSchema } = useCreateEnvironment();

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
        <DataTableColumnHeader column={column} title={t("Table.location")} />
      ),
      accessorKey: "location",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">{row.original.location}</div>
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.company_name")}
        />
      ),
      accessorKey: "company_name",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.company_name}
        </div>
      ),
    },
    {
      id: "actions",
      header: t("Table.actions"),
      cell: ({ row }) => {
        return (
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
                    name: row.original.name,
                    location: row.original.location,
                    company_name: row.original.company_name,
                  })
                }
                mutationKey={["editEnvironment", row.original.id]}
                title={t("Environment.editTitle")}
                description={t("Environment.editDescription")}
                validationSchema={validationSchema}
                asChild
              >
                <TooltipButton
                  Icon={MdEdit}
                  message="Editar"
                  onClick={() => onEditClick(row.original.id)}
                />
              </EditModal>
            )}
            {onRemoveClick && (
              <TooltipButton
                Icon={FaEraser}
                message="Remover"
                onClick={() => onRemoveClick(row.original.id)}
              />
            )}
          </div>
        );
      },
    },
  ];
};
