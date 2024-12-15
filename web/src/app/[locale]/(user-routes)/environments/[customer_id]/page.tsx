"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { faker } from "@faker-js/faker";
import Details from "@/components/details";
import { MaintenanceBarChart } from "@/components/graphs/MaintenanceBarChart";
import { MaintenanceAreaChart } from "@/components/graphs/MaintenanceAreaChart";
import { Label } from "@/components/ui/label";
import { useMotorcycleMaintenancesColumns } from "@/constants/list/useMotorcycleMaintenancesColumns";
import { useCreateMotorcycle } from "@/constants/creation/useCreateMotorcycle";

export default function CustomerDetails({
  params,
}: {
  params: { customer_id: string };
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
    id: params.customer_id,
    name: faker.lorem.word(),
    location: faker.lorem.sentence(),
    company_name: faker.lorem.word(),
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
      dataName: "location",
      label: "Localização",
      canCopy: false,
    },
    {
      dataName: "company_name",
      label: "Empresa",
      canCopy: false,
    },
  ];

  return (
    <div>
      <Header title={t("Customers.detailsTitle")} />
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
