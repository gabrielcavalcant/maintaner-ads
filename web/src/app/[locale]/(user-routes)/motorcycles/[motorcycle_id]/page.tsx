"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import CreationModal from "@/components/creation/creation-modal";
import Details from "@/components/details";
import { MaintenanceBarChart } from "@/components/graphs/MaintenanceBarChart";
import { MaintenanceAreaChart } from "@/components/graphs/MaintenanceAreaChart";
import { Label } from "@/components/ui/label";
import { useMotorcycleMaintenancesColumns } from "@/constants/list/useMotorcycleMaintenancesColumns";
import { useCreateMotorcycle } from "@/constants/creation/useCreateMotorcycle";

export default function MotorcycleDetails({
  params,
}: {
  params: { motorcycle_id: string };
}) {
  const t = useTranslations();

  const handleEditClick = (id: number) => {
    console.log("Edit clicked for id:", id);
  };

  const handleRemoveClick = (id: number) => {
    console.log("Remove clicked for id:", id);
  };

  const generateFakeData = (num: number) => {
    return Array.from({ length: num }, (_, index) => ({
      id: index + 1,
      type: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      maintenance_date: new Date(faker.date.recent()).toLocaleDateString(
        "pt-BR"
      ),
      status: faker.number.int({ min: 0, max: 1 }),
      motorcycle_id: faker.number.int({ min: 0, max: 50 }),
      team_id: faker.number.int({ min: 0, max: 50 }),
      responsible_id: faker.number.int({ min: 0, max: 50 }),
      motorcycle: faker.lorem.words(2),
      team: faker.lorem.word(),
      responsible: faker.person.firstName(),
    }));
  };

  // Gera 50 itens fictícios
  const data = {
    id: params.motorcycle_id,
    name: faker.lorem.words(2),
    type: faker.lorem.word(),
    model: faker.lorem.word(),
    manufacture_date: new Date(faker.date.recent()).toLocaleDateString("pt-BR"),
    serial_number: faker.number.int({ min: 123424, max: 23412343 }).toString(),
    customer: faker.location.street(),
    customer_id: faker.number.int({ min: 1, max: 50 }),
  };

  const maintenances_data = generateFakeData(5);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useMotorcycleMaintenancesColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreateMotorcycle();

  const options = [
    {
      dataName: "name",
      label: "Nome da motocicleta",
      canCopy: false,
    },
    {
      dataName: "type",
      label: "Tipo da motocicleta",
      canCopy: false,
    },
    {
      dataName: "model",
      label: "Modelo da motocicleta",
      canCopy: false,
    },
    {
      dataName: "manufacture_date",
      label: "Data de fabricação",
      canCopy: false,
    },
    {
      dataName: "serial_number",
      label: "Número de série",
      canCopy: true,
    },
    {
      dataName: "customer",
      label: "Cliente",
      canCopy: false,
    },
  ];

  return (
    <div>
      <Header title={t("Motorcycles.detailsTitle")} goBack />
      <div className="flex w-full items-center justify-end"></div>
      <Details data={data} options={options} />
      <div className="flex flex-col  w-full mt-10 sm:mt-0">
        <div className="flex flex-wrap md:flex-nowrap justify-center items-stretch gap-2 w-full">
          <div className="flex-1 min-w-0 h-full">
            <MaintenanceBarChart />
          </div>
          <div className="flex-1 min-w-0 h-full">
            <MaintenanceAreaChart />
          </div>
        </div>
      </div>
      <Label className="text-xl">Últimas manutenções</Label>
      <DataTable
        data={maintenances_data}
        columns={columns}
        pageCount={0}
        isFetching={false}
        rowCount={maintenances_data.length}
        maxItems={30}
        height="63vh"
      />
    </div>
  );
}
