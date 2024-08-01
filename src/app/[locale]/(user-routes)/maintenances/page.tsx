"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { useMachinesColumns } from "@/constants/useMachinesColumns";
import { usePartColumns } from "@/constants/usePartsColumns";
import { useMaintenanceColumns } from "@/constants/useMaintenanceColumns ";
import CreationModalButton from "@/components/creation-modal-button";
import { useCreateMaintenance } from "@/constants/creation/useCreateMaintenance";

export default function Parts() {
  const t = useTranslations();

  const handleEditClick = (id: number) => {
    console.log("Edit clicked for id:", id);
    // Adicione a lógica de edição aqui
  };

  const handleRemoveClick = (id: number) => {
    console.log("Remove clicked for id:", id);
    // Adicione a lógica de remoção aqui
  };

  // Função para gerar dados fictícios
  const generateFakeData = (num: number) => {
    return Array.from({ length: num }, (_, index) => ({
      id: index + 1,
      type: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      maintenance_date: faker.date.recent(),
      status: faker.number.int({ min: 0, max: 1 }),
      machine_id: faker.lorem.words(2),
      team_id: faker.lorem.word(),
      responsible_id: faker.person.firstName(),
    }));
  };

  // Gera 50 itens fictícios
  const data = generateFakeData(50);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useMaintenanceColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreateMaintenance();

  return (
    <div>
      <Header title={t("Maintenances.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModalButton
          onSubmit={(formValues) => {
            console.log(formValues);
          }}
          fields={fields}
          title={t("Maintenances.createTitle")}
          description={t("Maintenances.createDescription")}
          validationSchema={validationSchema}
        >
          {t("Maintenances.new")}
        </CreationModalButton>
      </div>
      <DataTable
        data={data}
        columns={columns}
        pageCount={0}
        isFetching={false}
        rowCount={data.length}
        maxItems={30}
        height="63vh"
      />
    </div>
  );
}
