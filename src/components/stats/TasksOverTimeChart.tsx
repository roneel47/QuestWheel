"use client";

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ScrollText } from 'lucide-react';

interface ChartData {
  name: string;
  tasks: number;
}

interface TasksOverTimeChartProps {
  data: ChartData[];
  totalTasks: number;
}

const TasksOverTimeChart: FC<TasksOverTimeChartProps> = ({ data, totalTasks }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScrollText className="w-6 h-6 text-primary" />
          Tasks Completed Over Time
        </CardTitle>
        <CardDescription>
          Total: {totalTasks} tasks (showing last {data.length} active days)
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[350px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                cursor={{ fill: 'hsl(var(--accent))', fillOpacity: 0.1 }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="tasks" name="Tasks Completed" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Not enough data to display chart. Complete some tasks!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TasksOverTimeChart;
