import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const chartConfig = {
  count: {
    label: "Total",
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

const chartData = [
  { type: "Preventiva", count: 12, fill: "var(--color-corretiva)" },
  { type: "Corretiva", count: 19, fill: "var(--color-preventiva)" },
  { type: "Preditiva", count: 3, fill: "var(--color-preditiva)" },
];

export function MaintenanceBarChart() {
  return (
    <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
      <CardHeader className="pb-2">
        <CardTitle>Manutenções por Tipo</CardTitle>
        <CardDescription>
          Exibindo a quantidade de manutenções realizadas para cada tipo.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid />
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
