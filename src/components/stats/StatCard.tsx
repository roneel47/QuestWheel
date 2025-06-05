import type { FC, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  description?: string;
}

const StatCard: FC<StatCardProps> = ({ title, value, icon, description }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
