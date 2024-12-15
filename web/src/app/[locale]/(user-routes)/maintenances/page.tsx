"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { useCreateMaintenance } from "@/constants/creation/useCreateMaintenance";
import { useMaintenanceColumns } from "@/constants/list/useMaintenanceColumns ";
import CreationModal from "@/components/creation/creation-modal";
import { Button } from "@/components/ui/button";
import { useAxios } from "@/helper/hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function Maintenances() {
  const api = useAxios();
  const { data, refetch } = useQuery({
    queryKey: ["getMotorcycles"],
    queryFn: async () => {
      const { data: response } = await api.get("/Maintenance");
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
      const response = await api.post("/Maintenance", body);

      if (response.status === 201) {
        refetch();
        toast.success(`Manutenção criada com sucesso!`);
      }
      else {
        toast.error(`Não foi possível registrar a Manutenção!`);
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

  const t = useTranslations();

  // // Função para gerar dados fictícios
  // const generateFakeData = (num: number) => {
  //   return Array.from({ length: num }, (_, index) => ({
  //     id: index + 1,
  //     type: faker.lorem.words(2),
  //     description: faker.lorem.sentence(),
  //     maintenance_date: new Date(faker.date.recent()).toLocaleDateString(
  //       "pt-BR"
  //     ),
  //     status: faker.number.int({ min: 0, max: 1 }),
  //     motorcycle_id: faker.number.int({ min: 0, max: 50 }),
  //     team_id: faker.number.int({ min: 0, max: 50 }),
  //     responsible_id: faker.number.int({ min: 0, max: 50 }),
  //     motorcycle: faker.lorem.words(2),
  //     team: faker.lorem.word(),
  //     responsible: faker.person.firstName(),
  //   }));
  // };

  // Gera 50 itens fictícios
  // const data = generateFakeData(50);

  const { fields, validationSchema } = useCreateMaintenance();

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useMaintenanceColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  return (
    <div>
      <Header title={t("Maintenances.title")} />

      <div className="flex w-full items-center justify-end">
        <CreationModal
          onSubmit={(formValues: any) => {
            mutate(formValues as any);
            return { success: mutateResponse?.status === 200 };
          }}
          fields={fields}
          title={t("Maintenances.createTitle")}
          description={t("Maintenances.createDescription")}
          validationSchema={validationSchema}
        >
          <Button>{t("Maintenances.new")}</Button>
        </CreationModal>
      </div>
      <DataTable
        data={data?.maintenances || []}
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
