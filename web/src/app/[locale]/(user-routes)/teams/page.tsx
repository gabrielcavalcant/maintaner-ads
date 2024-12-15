"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { useTeamColumns } from "@/constants/list/useTeamsColumns";
import CreationModal from "@/components/creation/creation-modal";
import { Button } from "@/components/ui/button";
import { useCreateTeam } from "@/constants/creation/useCreateTeam";
import { useAxios } from "@/helper/hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function Teams() {
  const api = useAxios();
  const { data, refetch } = useQuery({
    queryKey: ["getTeams"],
    queryFn: async () => {
      const { data: response } = await api.get("/Team");
      return response;
    },
  });

  const {
    mutate,
    error,
    data: mutateResponse,
  } = useMutation({
    mutationKey: ["createTeam"],
    mutationFn: async (body: {
      name: string;
    }) => {
      const response = await api.post("/Team", body);

      if (response.status === 201) {
        refetch();
        toast.success(`Time criado com sucesso!`);
      }
      else {
        toast.error(`Não foi possível registrar o time!`);
      }
      return response;
    },
  });

  const handleEditClick = (id: number) => {
    console.log("Edit clicked for id:", id);
  };

  const handleRemoveClick = (id: number) => {
    console.log("Remove clicked for id:", id);
  };

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useTeamColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const t = useTranslations();

  const { fields, validationSchema } = useCreateTeam();

  return (
    <div>
      <Header title={t("Teams.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModal
          onSubmit={(formValues) => {
            mutate(formValues as any);
            return { success: mutateResponse?.status === 200 };
          }}
          fields={fields}
          title={t("Team.createTitle")}
          description={t("Team.createDescription")}
          validationSchema={validationSchema}
        >
          <Button>{t("Teams.new")}</Button>
        </CreationModal>
      </div>
      <DataTable
        data={data?.teams || []}
        columns={columns}
        pageCount={0}
        isFetching={false}
        rowCount={data?.length}
        maxItems={30}
        height="63vh"
      />
    </div>
  );
}
