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
import CreationModalButton from "@/components/creation-modal-button";
import { useCreatePart } from "@/constants/creation/useCreatePart";

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
      name: faker.lorem.words(2),
      code: faker.number.int({ min: 0, max: 4000 }),
      supplier: faker.company.name(),
      base64: faker.image.avatar(),
      stock_quantity: faker.number.int({ min: 0, max: 200 }),
      unit_price: faker.number.float({ min: 9.99, max: 5000 }),
    }));
  };

  // Gera 50 itens fictícios
  const data = generateFakeData(50);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = usePartColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreatePart();

  return (
    <div>
      <Header title={t("Parts.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModalButton
          onSubmit={(formValues) => {
            console.log(formValues);
          }}
          fields={fields}
          title={t("Parts.createTitle")}
          description={t("Parts.createDescription")}
          validationSchema={validationSchema}
          imageRequired
        >
          {t("Parts.new")}
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
