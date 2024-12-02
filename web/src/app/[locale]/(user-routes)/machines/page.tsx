"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { useCreateMachine } from "@/constants/creation/useCreateMachine";
import CreationModal from "@/components/creation/creation-modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "@/helper/hooks/useAxios";
import { useMachinesColumns } from "@/constants/list/useMachinesColumns";
import toast from "react-hot-toast";


export default function Equipments() {
  const api = useAxios();
  const { data, refetch } = useQuery({
    queryKey: ["getMotorcycles"],
    queryFn: async () => {
      const { data: response } = await api.get("/Motorcycle");
      return response;
    },
  });

  const {
    mutate,
    error,
    data: mutateResponse,
  } = useMutation({
    mutationKey: ["createMotorcycle"],
    mutationFn: async (body: {
      name: string;
      type: number;
      plate: string;
      yearManufacture: number;
      customerCpf: string;
    }) => {
      const response = await api.post("/Motorcycle", body);

      if (response.status === 201) {
        refetch();
        toast.success(`Motocicleta criada com sucesso!`);
      }
      else {
        toast.error(`Não foi possível registrar a Motocicleta!`);
      }
      return response;
    },
  });

  const handleEditClick = (id: number) => {
    console.log("Edit clicked for id:", id);
    // Adicione a lógica de edição aqui
  };

  const handleRemoveClick = (id: number) => {
    console.log("Remove clicked for id:", id);
    // Adicione a lógica de remoção aqui
  };

  const t = useTranslations();

  const { fields, validationSchema } = useCreateMachine();

  const columns = useMachinesColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  return (
    <div>
      <Header title={t("Machines.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModal
          onSubmit={(formValues) => {
            mutate(formValues as any);
            return { success: mutateResponse?.status === 200 };
          }}
          fields={fields}
          title={t("Machines.createTitle")}
          description={t("Machines.createDescription")}
          validationSchema={validationSchema}
          asChild
        >
          <Button>{t("Machines.new")}</Button>
        </CreationModal>
      </div>
      <DataTable
        data={data?.motorcycles || []}
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
