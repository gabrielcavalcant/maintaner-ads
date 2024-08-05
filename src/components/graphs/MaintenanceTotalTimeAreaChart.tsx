"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Dados de exemplo para o gráfico de área
const monthlyMaintenanceData = [
  { month: "Jan", totalTime: 20 },
  { month: "Feb", totalTime: 35 },
  { month: "Mar", totalTime: 30 },
  { month: "Apr", totalTime: 45 },
  { month: "May", totalTime: 50 },
  { month: "Jun", totalTime: 60 },
  { month: "Jul", totalTime: 55 },
  { month: "Aug", totalTime: 40 },
  { month: "Sep", totalTime: 35 },
  { month: "Oct", totalTime: 50 },
  { month: "Nov", totalTime: 45 },
  { month: "Dec", totalTime: 55 },
];

const chartConfig = {
  totalTime: {
    label: "Tempo Total",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function MaintenanceTotalTimeAreaChart() {
  return (
    <Card className="max-w-lg" x-chunk="charts-01-chunk-7">
      <CardHeader>
        <CardTitle>Tempo Total de Manutenção por Mês</CardTitle>
        <CardDescription>
          Visualização do tempo total gasto em manutenções ao longo do ano.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <AreaChart data={monthlyMaintenanceData}>
            <XAxis dataKey="month" />
            <YAxis domain={["dataMin - 5", "dataMax + 10"]} />
            <defs>
              <linearGradient id="fillTotalTime" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-totalTime)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-totalTime)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="totalTime"
              type="natural"
              fill="url(#fillTotalTime)"
              fillOpacity={0.4}
              stroke="var(--color-totalTime)"
            />
            <Tooltip content={<ChartTooltipContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
