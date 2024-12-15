import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
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
import { useTranslations } from "next-intl";

const chartConfig = {
  count: {
    label: "Total",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const monthlyMaintenanceData = [
  { month: "Jan", count: 5 },
  { month: "Feb", count: 7 },
  { month: "Mar", count: 6 },
  { month: "Apr", count: 12 },
  { month: "May", count: 15 },
  { month: "Jun", count: 21 },
  { month: "Jul", count: 15 },
  { month: "Aug", count: 12 },
  { month: "Sep", count: 10 },
  { month: "Oct", count: 8 },
  { month: "Nov", count: 13 },
  { month: "Dec", count: 15 },
];

export function MaintenanceAreaChart() {
  const t = useTranslations();

  return (
    <Card className="max-w-lg" x-chunk="charts-01-chunk-7">
      <CardHeader className="">
        <CardTitle>Manutenções ao longo do tempo</CardTitle>
        <CardDescription>
          Visualize a quantidade total de manutenções realizadas ao longo do
          tempo.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={monthlyMaintenanceData}
            margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
          >
            <XAxis dataKey="month" hide />
            <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillCount)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
            >
              <LabelList
                dataKey="month"
                position="top"
                offset={5}
                className="fill-foreground opacity-20"
                fontSize={10}
                formatter={(value: string) => {
                  return t(`Calendar.${value}`);
                }}
              />
            </Area>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
