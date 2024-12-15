import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMediaQuery } from "@/helper/hooks/use-media-query";

const chartConfig = {
  value: {
    label: "Pontuação",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const chartData = [
  { criteria: "Tempo de Resposta", value: 65 },
  { criteria: "Manutenções Concluídas", value: 98 },
  { criteria: "Satisfação do Cliente", value: 90 },
  // Adicione mais critérios conforme necessário
];

export function PerformanceRadarChart() {
  return (
    <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
      <CardHeader className=" pb-2">
        <CardTitle>Desempenho Geral</CardTitle>
        <CardDescription>
          Visualização de desempenho geral de todas as equipes com base em
          critérios como tempo de resposta e número de manutenções concluídas.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full h-full "
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="criteria" />
            <PolarGrid gridType="circle" className="fill-muted opacity-20" />
            <Radar
              dataKey="value"
              fill="var(--color-value)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
