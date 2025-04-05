
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon, change, className }: StatsCardProps) {
  return (
    <Card className={cn('dashboard-card', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center text-xs mt-1">
            <div className={cn(
              'mr-1',
              change.isPositive ? 'text-green-500' : 'text-red-500'
            )}>
              {change.isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            </div>
            <div className={cn(
              change.isPositive ? 'text-green-500' : 'text-red-500'
            )}>
              {change.value}%
            </div>
            <div className="text-muted-foreground ml-1">from last week</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
