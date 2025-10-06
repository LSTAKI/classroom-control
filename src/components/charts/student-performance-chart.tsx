'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MOCK_STUDENTS } from '@/lib/mock-data';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const performanceData = MOCK_STUDENTS.map(student => ({
    name: student.name.split(' ')[0],
    avgMarks: parseFloat((student.marks.reduce((acc, mark) => acc + mark.score, 0) / student.marks.length).toFixed(1)),
}));

const chartConfig = {
    avgMarks: {
        label: 'Avg. Marks (%)',
        color: 'hsl(var(--primary))',
    },
} satisfies ChartConfig;

export default function StudentPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={performanceData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="avgMarks"
              fill="var(--color-avgMarks)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
