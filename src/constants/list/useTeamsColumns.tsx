import DataTableColumnHeader from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { FaEraser } from "react-icons/fa6";
import TooltipButton from "@/components/tooltip-button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { simulatedResponseAPI } from "@/helper/simulate-api";
import EditModal from "@/components/creation/edit-modal";
import { useCreateTeam } from "../creation/useCreateTeam";
import { ReceiptText } from "lucide-react";
import { useRouter } from "@/navigation";

type UseTeamColumnsProps = {
  onEditClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
};

export const useTeamColumns = ({
  onEditClick,
  onRemoveClick,
}: UseTeamColumnsProps = {}): ColumnDef<any>[] => {
  const t = useTranslations();
  const router = useRouter();

  const { fields, validationSchema } = useCreateTeam();

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
        <DataTableColumnHeader column={column} title={t("Team.members")} />
      ),
      accessorKey: "members",

      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap gap-2 py-2">
            {row?.original?.members?.map(
              (member: {
                id: string;
                fullName: string;
                base64: string;
                specialty: string;
              }) => {
                return (
                  <DropdownMenu key={member.id}>
                    <DropdownMenuTrigger>
                      <Badge
                        className="text-sm flex gap-2 hover:scale-105 transition-all"
                        variant="outline"
                      >
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={member.base64} />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                        {member.fullName}
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <div className="flex w-full justify-start items-center gap-2 p-2">
                        <Avatar>
                          <AvatarImage src={member.base64} />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start justify-center gap-2">
                          <Label>{member.fullName}</Label>
                          <Badge className="m-0 w-full text-center justify-center">
                            {member.specialty}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        Remover da equipe
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
            )}
          </div>
        );
      },
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("Table.total_members")}
        />
      ),
      accessorKey: "total_members",
      cell: ({ row }) => (
        <div className="flex gap-1 items-center">
          {row.original.total_members}
        </div>
      ),
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
              router.push(`teams/${row.original.id}`);
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
                  total_members: row.original.total_members,
                  members: row.original.members,
                })
              }
              mutationKey={["editTeam", row.original.id]}
              title={t("Teams.edit")}
              description={t("Teams.editDescription")}
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
              message="Remover"
              onClick={() => onRemoveClick(row.original.id)}
            />
          )}
        </div>
      ),
    },
  ];
};
