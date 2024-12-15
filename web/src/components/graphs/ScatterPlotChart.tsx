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
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
} from "recharts";
import { faker } from "@faker-js/faker";

// Função para calcular a diferença em anos
const calculateYearsOld = (date: Date) => {
  const today = new Date();
  return today.getFullYear() - date.getFullYear();
};

// Gerar dados do gráfico de dispersão
const scatterData = Array.from({ length: 50 }, () => {
  const manufactureDate = faker.date.past({ years: 15 });
  const yearsOld = calculateYearsOld(manufactureDate);
  return {
    manufactureDate: manufactureDate.toISOString().split("T")[0], // Data no formato YYYY-MM-DD
    maintenanceFrequency: Math.min(
      20,
      Math.max(1, yearsOld * 2 + faker.number.int({ min: 1, max: 5 }))
    ), // Frequência ajustada pela idade
  };
});

const scatterChartConfig = {
  manufactureDate: {
    label: "Manufacture Date",
    color: "hsl(var(--primary))",
  },
  maintenanceFrequency: {
    label: "Maintenance Frequency",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig;

export function ScatterPlotCard() {
  return (
    <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
      <CardHeader className="">
        <CardTitle>Correlação entre Data de Fabricação e Manutenções</CardTitle>
        <CardDescription>
          Visualização da relação entre a data de fabricação das motocicletas e a
          frequência de manutenções.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={scatterChartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ScatterChart margin={{ top: 0, left: 0, bottom: 0, right: 0 }}>
            <XAxis
              dataKey="manufactureDate"
              name="Data de Fabricação"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("pt-BR");
              }}
              range={[100, 250]}
            />
            <YAxis
              dataKey="maintenanceFrequency"
              name="Frequência de Manutenções"
              range={[200, 300]}
              hide
            />

            <Tooltip content={<ChartTooltipContent />} />
            <Scatter
              data={scatterData}
              fill="var(--color-manufactureDate)"
              shape="circle"
            />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
