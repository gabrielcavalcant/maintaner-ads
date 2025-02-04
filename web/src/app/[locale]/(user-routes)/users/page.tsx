"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { useUserColumns } from "@/constants/list/useUserColumns";
import { useCreateUser } from "@/constants/creation/useCreateUser";
import CreationModal from "@/components/creation/creation-modal";

export default function Users() {
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
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      base64: faker.image.avatar(),
      createdAt: faker.date.past(),
      role_id: faker.number.int({ min: 0, max: 10 }),
      role: faker.lorem.word(),
    }));
  };

  // Gera 50 itens fictícios
  const data = generateFakeData(50);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useUserColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreateUser();

  return (
    <div>
      <Header title={t("Users.title")} />
      <div className="flex w-full items-center justify-end">
        {/* <CreationModal
          onSubmit={(formValues) => {
            console.log(formValues);
          }}
          fields={fields}
          title={t("Users.createTitle")}
          description={t("Users.createDescription")}
          validationSchema={validationSchema}
        >
          <Button>{t("Users.new")}</Button>
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
