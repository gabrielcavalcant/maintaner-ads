"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { useEnvironmentsColumns } from "@/constants/list/useEnvironmentsColumns";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { useCreateEnvironment } from "@/constants/creation/useCreateEnvironment";
import CreationModal from "@/components/creation/creation-modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "@/helper/hooks/useAxios";

export default function Environments() {
  const api = useAxios();
  const { data, refetch } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: async () => {
      const { data: response } = await api.get("/Customer");
      return response;
    },
  });

  const {
    mutate,
    error,
    data: mutateResponse,
  } = useMutation({
    mutationKey: ["createCustumer"],
    mutationFn: async (body: {
      name: string;
      telephone: string;
      cpf: string;
    }) => {
      const response = await api.post("/Customer", body);

      if (response.status === 200) {
        refetch();
      }

      return response;
    },
  });
  const t = useTranslations();

  const { fields, validationSchema } = useCreateEnvironment();

  const columns = useEnvironmentsColumns();

  return (
    <div>
      <Header title={t("Environments.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModal
          onSubmit={(formValues) => {
            mutate(formValues as any);
            return { success: mutateResponse?.status === 201 };
          }}
          fields={fields}
          title={t("Environment.createTitle")}
          description={t("Environment.createDescription")}
          validationSchema={validationSchema}
          asChild
        >
          <Button>{t("Environments.new")}</Button>
        </CreationModal>
      </div>
      <DataTable
        data={data?.customers || []}
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
