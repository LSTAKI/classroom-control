'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { Student } from '@/lib/types';

const chartConfig = {
    avgMarks: {
        label: 'Avg. Marks (%)',
        color: 'hsl(var(--primary))',
    },
} satisfies ChartConfig;

interface StudentPerformanceChartProps {
    students: Student[];
}

export default function StudentPerformanceChart({ students }: StudentPerformanceChartProps) {
    const performanceData = students.map(student => ({
        name: student.name.split(' ')[0],
        avgMarks: student.marks && student.marks.length > 0 ? parseFloat((student.marks.reduce((acc, mark) => acc + mark.score, 0) / student.marks.length).toFixed(1)) : 0,
    }));

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
