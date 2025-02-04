"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { useRoleColumns } from "@/constants/list/useRolesColumns";
import CreationModal from "@/components/creation/creation-modal";
import { Button } from "@/components/ui/button";
import { useCreateRole } from "@/constants/creation/useCreateRole";

export default function Roles() {
  const t = useTranslations();

  const handleEditClick = (id: number) => {
    console.log("Edit clicked for id:", id);
  };

  const handleRemoveClick = (id: number) => {
    console.log("Remove clicked for id:", id);
  };

  // Função para gerar dados fictícios
  const generateFakeData = (num: number) => {
    return Array.from({ length: num }, (_, index) => ({
      id: index + 1,
      name: faker.lorem.word(),
      total_permissions: faker.number.int({ min: 1, max: 10 }),
      permissions: Array.from({ length: Math.random() * 8 }, (_, index) => {
        return {
          name: faker.lorem.word(),
          id: faker.number.int({ min: 1, max: 10 }),
        };
      }),
    }));
  };

  // Gera 50 itens fictícios
  const data = generateFakeData(50);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useRoleColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreateRole();

  return (
    <div>
      <Header title={t("Roles.title")} />
      <div className="flex w-full items-center justify-end">
        {/* <CreationModal
          onSubmit={(formValues) => {
            console.log(formValues);
          }}
          fields={fields}
          title={t("Roles.new")}
          description={t("Roles.createDescription")}
          validationSchema={validationSchema}
        >
          <Button>{t("Roles.new")}</Button>
        </CreationModal> */}
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
