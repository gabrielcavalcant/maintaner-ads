import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
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
        <ChartContainer
          config={chartConfig}
          className="h-full min-h-[250px] w-full "
        >
          <BarChart data={chartData}>
            <YAxis type="number" dataKey="count" hide />
            <XAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Bar dataKey="count" fill="var(--color-count)" radius={4}>
              <LabelList
                dataKey="count"
                position="top"
                offset={2}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
