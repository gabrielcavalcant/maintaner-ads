"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { useMachinesColumns } from "@/constants/list/useMachinesColumns";
import { useCreateMachine } from "@/constants/creation/useCreateMachine";
import CreationModal from "@/components/creation/creation-modal";

export default function Equipments() {
  const t = useTranslations();

  const handleEditClick = (id: number) => {
    // Adicione a lógica de edição aqui
  };

  const handleRemoveClick = (id: number) => {
    // Adicione a lógica de remoção aqui
  };

  // Função para gerar dados fictícios
  const generateFakeData = (num: number) => {
    return Array.from({ length: num }, (_, index) => ({
      id: index + 1,
      name: faker.lorem.words(2),
      type: faker.lorem.word(),
      model: faker.lorem.word(),
      manufacture_date: new Date(faker.date.recent()).toLocaleDateString(
        "pt-BR"
      ),
      serial_number: faker.number
        .int({ min: 123424, max: 23412343 })
        .toString(),
      environment: faker.location.street(),
      environment_id: faker.number.int({ min: 1, max: 50 }),
    }));
  };

  // Gera 50 itens fictícios
  const data = generateFakeData(50);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useMachinesColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreateMachine();

  return (
    <div>
      <Header title={t("Machines.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModal
          onSubmit={(formValues) => {
          }}
          fields={fields}
          title={t("Machines.createTest")}
          description={t("Machines.createDescription")}
          validationSchema={validationSchema}
        >
          <Button>{t("Machines.new")}</Button>
        </CreationModal>
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
