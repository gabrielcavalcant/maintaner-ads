"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { useCreateItem } from "@/constants/creation/useCreateItem";
import { useItemColumns } from "@/constants/list/useItemsColumns";
import { Button } from "@/components/ui/button";
import CreationModal from "@/components/creation/creation-modal";
import { useAxios } from "@/helper/hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


export default function Items() {
  const api = useAxios();
  const { data, refetch } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: async () => {
      const { data: response } = await api.get("/Item");
      return response;
    },
  });

  const {
    mutate,
    error,
    data: mutateResponse,
  } = useMutation({
    mutationKey: ["createItem"],
    mutationFn: async (body: {
      name: string;
      serialCode: string;
      supplier: string;
      description: string;
      stockQuantity: number;
    }) => {
      const response = await api.post("/Item", body);

      if (response.status === 201) {
        refetch();
        toast.success(`Item criado com sucesso!`);
      }
      else {
        toast.error(`Não foi possível registrar o Item!`);
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

  // // Função para gerar dados fictícios
  // const generateFakeData = (num: number) => {
  //   return Array.from({ length: num }, (_, index) => ({
  //     id: index + 1,
  //     name: faker.lorem.words(2),
  //     code: faker.number.int({ min: 0, max: 4000 }),
  //     supplier: faker.company.name(),
  //     base64: faker.image.avatar(),
  //     stock_quantity: faker.number.int({ min: 0, max: 200 }),
  //     unit_price: faker.number.float({ min: 9.99, max: 5000 }),
  //   }));
  // };

  // // Gera 50 itens fictícios
  // const data = generateFakeData(50);
  const t = useTranslations();

  const { fields, validationSchema } = useCreateItem();

  const columns: ColumnDef<any>[] = useItemColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });


  return (
    <div>
      <Header title={t("Items.title")} />
      <div className="flex w-full items-center justify-end">
        <CreationModal
          onSubmit={(formValues) => {
            mutate(formValues as any);
            return { success: mutateResponse?.status === 200 };
          }}
          fields={fields}
          title={t("Items.createTitle")}
          description={t("Items.createDescription")}
          validationSchema={validationSchema}
        >
          <Button>{t("Items.new")}</Button>
        </CreationModal>
      </div>
      <DataTable
        data={data?.items || []}
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
