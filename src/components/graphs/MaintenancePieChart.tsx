"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Legend, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMediaQuery } from "@/helper/hooks/use-media-query";

const chartData = [
  { name: "Preventiva", value: 12, fill: "var(--color-corretiva)" },
  { name: "Corretiva", value: 19, fill: "var(--color-preventiva)" },
  { name: "Preditiva", value: 3, fill: "var(--color-preditiva)" },
];

const chartConfig = {
  value: {
    label: "Visitors",
  },
  preventiva: {
    label: "Preventiva",
    color: "hsl(var(--chart-1))",
  },
  corretiva: {
    label: "Corretiva",
    color: "hsl(var(--chart-2))",
  },
  preditiva: {
    label: "Preditiva",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function MaintenancePieChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
      <CardHeader className=" pb-2">
        <CardTitle>Distribuição de Tipos de Manutenção</CardTitle>
        <CardDescription>
          Mostrando a proporção de cada tipo de manutenção realizada
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Legend />
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius="50%"
              nameKey="name"
              strokeWidth={5}
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
