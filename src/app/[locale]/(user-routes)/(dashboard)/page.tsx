"use client";
import { FiBox } from "react-icons/fi";
import { PiWashingMachineFill } from "react-icons/pi";
import { FaFolderOpen, FaCheckSquare } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { DataTable } from "@/components/table/data-table";
import Header from "@/components/header";
import IconCard from "@/components/icon-card";
import { ColumnDef } from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import { useMaintenanceColumns } from "@/constants/useMaintenanceColumns ";

export default function Home() {
  const t = useTranslations();

  const dashboardCards = [
    {
      title: t("Dashboard.environments"),
      Icon: FiBox,
      accessorKey: "",
    },
    {
      title: t("Dashboard.equipments"),
      Icon: PiWashingMachineFill,
      accessorKey: "",
    },
    {
      title: t("Dashboard.closedOs"),
      Icon: FaFolderOpen,
      accessorKey: "",
    },
    {
      title: t("Dashboard.openOs"),
      Icon: FaCheckSquare,
      accessorKey: "",
    },
  ];

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
      type: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      maintenance_date: faker.date.recent(),
      status: faker.number.int({ min: 0, max: 1 }),
      machine_id: faker.number.int({ min: 0, max: 50 }),
      team_id: faker.number.int({ min: 0, max: 50 }),
      responsible_id: faker.number.int({ min: 0, max: 50 }),
      machine: faker.lorem.words(2),
      team: faker.lorem.word(),
      responsible: faker.person.firstName(),
    }));
  };

  // Gera 50 itens fictícios
  const data = generateFakeData(50);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useMaintenanceColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  return (
    <div className="">
      <Header title={t("Dashboard.title")} />
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-1">
        {dashboardCards?.map((card, index) => {
          const { title, Icon } = card;
          return <IconCard key={index} title={title} value={200} Icon={Icon} />;
        })}
      </div>
      <DataTable
        data={data || []}
        columns={columns}
        pageCount={0}
        isFetching={false}
        rowCount={data?.length || 0}
        maxItems={30}
        height="60vh"
      />
    </div>
  );
}
