
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FunnelStageProps {
  title: string;
  count: number;
  percentage: number;
  color: string;
  selected?: boolean;
  onClick?: () => void;
}

export function FunnelStage({ 
  title, 
  count, 
  percentage, 
  color, 
  selected = false,
  onClick 
}: FunnelStageProps) {
  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-200', 
        selected ? 'ring-2 ring-primary shadow-md' : 'hover:shadow'
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">{count}</div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-300" 
              style={{ 
                width: `${percentage}%`,
                backgroundColor: color 
              }} 
            />
          </div>
          <div className="text-xs text-muted-foreground">{percentage}% of total</div>
        </div>
      </CardContent>
    </Card>
  );
}
