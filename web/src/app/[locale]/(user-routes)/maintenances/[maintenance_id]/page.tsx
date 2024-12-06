"use client";
import Header from "@/components/header";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { faker } from "@faker-js/faker";

import Details from "@/components/details";
import { useMaintenanceItemColumns } from "@/constants/list/useMaintenanceItemsColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import useColor from "@/helper/hooks/useColor";
import { useCreateMotorcycle } from "@/constants/creation/useCreateMotorcycle";

function parseHSL(color: string): [number, string, string] {
  const [hueStr, saturationStr, lightnessStr] = color.split(" ");
  const hue = parseInt(hueStr, 10);
  return [hue, saturationStr, lightnessStr];
}

// Função para harmonizar cores com base em intervalos de hue e quantidade de cores
function harmonize(
  color: string,
  start: number,
  end: number,
  count: number
): string[] {
  const colors: string[] = [];
  const [h, s, l] = parseHSL(color);

  // Adiciona a cor base
  colors.push(color);

  // Calcular o intervalo para garantir que a quantidade desejada de cores seja gerada
  const totalIntervals = count; // Excluindo a cor base
  const step = (end - start) / totalIntervals;

  for (let i = 0; i < totalIntervals; i++) {
    const h1 = (h + start + i * step + 360) % 360; // Ajusta o hue
    const c1 = `hsl(${h1}, ${s}, ${l})`;
    colors.push(c1);
  }

  return colors;
}

export default function MaintenanceDetails({
  params,
}: {
  params: { maintenance_id: string };
}) {
  const { theme } = useTheme();
  const t = useTranslations();

  const primaryColor = useColor({ variable: "primary" });

  const handleEditClick = (id: number) => {
    console.log("Edit clicked for id:", id);
    // Adicione a lógica de edição aqui
  };

  const handleRemoveClick = (id: number) => {
    console.log("Remove clicked for id:", id);
    // Adicione a lógica de remoção aqui
  };

  const generateFakeData = (num: number) => {
    // Gera os dados falsos
    const data = Array.from({ length: num }, (_, index) => ({
      id: index + 1,
      name: faker.lorem.words(2),
      code: faker.number.int({ min: 0, max: 4000 }),
      supplier: faker.company.name(),
      base64: faker.image.avatar(),
      stock_quantity: faker.number.int({ min: 0, max: 200 }),
      unit_price: faker.number.float({ min: 9.99, max: 5000 }),
      quantity: faker.number.int({ min: 1, max: 50 }),
    }));

    // Ordena os dados pela quantidade (quantity) em ordem decrescente
    data.sort((a, b) => b.quantity - a.quantity);

    return data;
  };

  // Gera 50 itens fictícios
  const data = {
    id: params.maintenance_id,
    type: faker.lorem.words(2),
    description: faker.lorem.sentence(),
    maintenance_date: new Date(faker.date.recent()).toLocaleDateString("pt-BR"),
    status: faker.number.int({ min: 0, max: 1 }),
    motorcycle_id: faker.number.int({ min: 0, max: 50 }),
    team_id: faker.number.int({ min: 0, max: 50 }),
    responsible_id: faker.number.int({ min: 0, max: 50 }),
    motorcycle: faker.lorem.words(2),
    team: faker.lorem.word(),
    responsible: faker.person.firstName(),
  };

  const maintenances_items_data = generateFakeData(15);

  // Use o hook com as funções definidas
  const columns: ColumnDef<any>[] = useMaintenanceItemColumns({
    onEditClick: handleEditClick,
    onRemoveClick: handleRemoveClick,
  });

  const { fields, validationSchema } = useCreateMotorcycle();

  const options = [
    {
      dataName: "type",
      label: "Tipo da manutenção",
      canCopy: false,
    },
    {
      dataName: "description",
      label: "Descrição",
      canCopy: false,
    },
    {
      dataName: "maintenance_date",
      label: "Data da manutenção",
      canCopy: false,
    },
    {
      dataName: "status",
      label: "Status",
      canCopy: false,
    },
    {
      dataName: "motorcycle",
      label: "Nome da motocicleta",
      canCopy: false,
    },
    {
      dataName: "team",
      label: "Equipe responsável",
      canCopy: false,
    },
    {
      dataName: "responsible",
      label: "Responsável",
      canCopy: false,
    },
  ];

  const colors = useMemo(
    () => harmonize(primaryColor, 0, -90, maintenances_items_data.length),
    [maintenances_items_data.length, primaryColor]
  );

  const chartData = maintenances_items_data.map((item, index) => ({
    item: item.name,
    count: item.quantity,
    fill: colors[index + 1],
    ...item,
  }));

  const chartConfig = useMemo(() => {
    return {
      ...maintenances_items_data.reduce((acc: any, item, index) => {
        acc[item.name] = {
          label: item.name,
        };
        return acc;
      }, {}),
      count: {
        label: "Quantidade",
      },
    } as ChartConfig;
  }, [maintenances_items_data]);

  return (
    <div className="pb-5">
      <Header title={t("Maintenances.detailsTitle")} />
      <div className="flex w-full items-center justify-end"></div>
      <Details data={data} options={options} />
      <div className="flex flex-col  w-full mt-10 sm:mt-0"></div>
      <div className="flex gap-2">
        <div className="w-full">
          <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
            <CardHeader className="pb-2">
              <CardTitle>Quantidade de itens utilizados</CardTitle>
              <CardDescription>
                Exibindo a quantidade de itens utilizados.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-1">
              <ChartContainer
                config={chartConfig}
                className="h-full min-h-[500px] w-full "
              >
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" dataKey="count" hide />
                  <YAxis
                    dataKey="item"
                    type="category"
                    tickLine={true}
                    tickMargin={4}
                    axisLine={false}
                    width={120}
                    height={700}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4}>
                    <LabelList
                      dataKey="count"
                      position="right"
                      offset={2}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
