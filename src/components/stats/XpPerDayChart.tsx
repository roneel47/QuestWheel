"use client";

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Star } from 'lucide-react';

interface ChartData {
  name: string;
  xp: number;
}

interface XpPerDayChartProps {
  data: ChartData[];
  totalXp: number;
}

const XpPerDayChart: FC<XpPerDayChartProps> = ({ data, totalXp }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-6 h-6 text-primary" />
           XP Earned Per Day
        </CardTitle>
        <CardDescription>
          Total: {totalXp} XP (showing last {data.length} active days)
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[350px]">
       {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
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
            <Bar dataKey="xp" name="XP Earned" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Not enough data to display chart. Earn some XP!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default XpPerDayChart;
