"use client";
import { FiBox } from "react-icons/fi";
import { PiWashingMachineFill } from "react-icons/pi";
import { FaFolderOpen, FaCheckSquare } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { DataTable } from "@/components/table/data-table";
import { useDashboardColumns } from "@/constants/useDashboardColumns";
import Data from "../../../../mock_data/dashboard.json";
import Header from "@/components/header";
import IconCard from "@/components/icon-card";

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

  const columns = useDashboardColumns();

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
        data={Data || []}
        columns={columns}
        pageCount={0}
        isFetching={false}
        rowCount={Data?.length || 0}
        maxItems={30}
        height="60vh"
      />
    </div>
  );
}
