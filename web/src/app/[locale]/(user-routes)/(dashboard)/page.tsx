"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { MaintenanceBarChart } from "@/components/graphs/MaintenanceBarChart";
import { MaintenancePieChart } from "@/components/graphs/MaintenancePieChart";
import { PerformanceRadarChart } from "@/components/graphs/PerformanceRadarChart";
import {
  CalendarIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  WrenchIcon,
} from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useMaintenanceColumns } from "@/constants/list/useMaintenanceColumns ";
import { faker } from "@faker-js/faker";
import { DataTable } from "@/components/table/data-table";
import { useCreateMaintenance } from "@/constants/creation/useCreateMaintenance";
import { FiBox } from "react-icons/fi";
import { PiWashingMachineFill } from "react-icons/pi";
import { FaCheckSquare, FaFolderOpen } from "react-icons/fa";
import IconCard from "@/components/icon-card";
import { useTranslations } from "next-intl";
import DatePickerWithRange from "@/components/date-range-picker";
import { ScatterPlotCard } from "@/components/graphs/ScatterPlotChart";
import { MaintenanceTotalTimeAreaChart } from "@/components/graphs/MaintenanceTotalTimeAreaChart";
import { MaintenanceAreaChart } from "@/components/graphs/MaintenanceAreaChart";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { simulatedResponseAPI } from "@/helper/simulate-api";
import { useDashboardColumns } from "@/constants/list/useDashboardColumns";

export default function Dashboard() {
  const t = useTranslations();

  const dashboardCards = [
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

  const { data, isPending } = useQuery({
    queryKey: ["Buscar manutenções"],
    queryFn: () => simulatedResponseAPI(generateFakeData(50)),
  });

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useDashboardColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  return (
    <div className="flex flex-col gap-4 w-full mt-10 sm:mt-0">
      <div className="chart-wrapper flex max-w-full flex-col  items-center justify-center gap-4   ">
        <div className="chart-wrapper flex max-w-full flex-col flex-wrap items-start justify-center gap-4  sm:flex-row ">
          {dashboardCards?.map((card, index) => {
            const { title, Icon } = card;
            return (
              <IconCard key={index} title={title} value={200} Icon={Icon} />
            );
          })}
          <DatePickerWithRange className="my-4" />
        </div>
        <div className="chart-wrapper flex max-w-full flex-col flex-wrap items-start justify-center gap-4  sm:flex-row ">
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
            <MaintenanceBarChart />
            <MaintenancePieChart />
          </div>
          <div className="grid w-full flex-1 gap-4">
            <PerformanceRadarChart />
            <MaintenanceAreaChart />
          </div>
          <div className="grid w-full flex-1 gap-4">
            <ScatterPlotCard />
            <MaintenanceTotalTimeAreaChart />
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ultimas manutenções</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data}
            columns={columns}
            pageCount={0}
            isFetching={isPending}
            rowCount={data?.length}
            maxItems={30}
            height="63vh"
          />
        </CardContent>
      </Card>
    </div>
  );
}
