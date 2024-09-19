"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { useTeamColumns } from "@/constants/list/useTeamsColumns";
import CreationModal from "@/components/creation/creation-modal";
import { Button } from "@/components/ui/button";
import { useCreateTeam } from "@/constants/creation/useCreateTeam";

export default function Teams() {
  const t = useTranslations();

  const handleEditClick = (id: number) => {
    // Adicione a lógica de edição aqui
  };

  const handleRemoveClick = (id: number) => {
    // Adicione a lógica de remoção aqui
  };

  // Função para gerar dados fictícios
  const generateTeamData = (index: number) => {
    const totalMembers = faker.number.int({ min: 1, max: 10 });
    const members = Array.from({ length: totalMembers }, (_, index) => ({
      id: index + 1,
      fullName: faker.person.fullName(),
      base64: faker.image.avatar(),
      specialty: faker.lorem.word(),
      email: faker.internet.email(),
    }));

    return {
      id: index + 1,
      name: faker.company.name(),
      total_members: members.length,
      members: members,
    };
  };

  // Gera 50 itens fictícios
  const data = Array.from({ length: 10 }, (_, index) =>
    generateTeamData(index)
  );

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
        <CreationModal
          onSubmit={(formValues) => {
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
