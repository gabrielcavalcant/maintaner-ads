"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { useEnvironmentsColumns } from "@/constants/useEnvironmentsColumns";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import CreationModalButton from "@/components/creation-modal-button";
import { useCreateEnvironment } from "@/constants/creation/useCreateEnvironment";

export default function Environments() {
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
      name: faker.lorem.word(),
      location: faker.lorem.sentence(),
      company_name: faker.lorem.word(),
    }));
  };

  // Gera 50 itens fictícios
  const data = generateFakeData(50);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useEnvironmentsColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreateEnvironment();

  return (
    <div>
      <Header title={t("Environments.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModalButton
          onSubmit={(formValues) => {
            console.log(formValues);
          }}
          fields={fields}
          title={t("Environment.createTitle")}
          description={t("Environment.createDescription")}
          validationSchema={validationSchema}
          imageRequired={false}
        >
          {t("Environments.new")}
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
