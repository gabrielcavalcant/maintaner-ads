"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { useTeamColumns } from "@/constants/useTeamsColumns";
import CreationModalButton from "@/components/creation-modal-button";
import { Field } from "@/types";
import { z } from "zod";
import { useCreateTeam } from "@/constants/creation/useCreateTeam";

export default function Teams() {
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
      name: faker.company.name(),
      total_members: faker.number.int({ min: 1, max: 10 }),
    }));
  };

  // Gera 50 itens fictícios
  const data = generateFakeData(50);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useTeamColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreateTeam();

  return (
    <div>
      <Header title={t("Teams.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModalButton
          onSubmit={(formValues) => {
            console.log(formValues);
          }}
          fields={fields}
          title={t("Team.createTitle")}
          description={t("Team.createDescription")}
          validationSchema={validationSchema}
        >
          {t("Teams.new")}
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
