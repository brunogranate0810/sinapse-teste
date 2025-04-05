
import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Mon', First: 40, Qualification: 30, Scheduling: 20, Closing: 10 },
  { name: 'Tue', First: 45, Qualification: 35, Scheduling: 25, Closing: 15 },
  { name: 'Wed', First: 50, Qualification: 40, Scheduling: 30, Closing: 20 },
  { name: 'Thu', First: 55, Qualification: 45, Scheduling: 35, Closing: 25 },
  { name: 'Fri', First: 60, Qualification: 50, Scheduling: 40, Closing: 30 },
  { name: 'Sat', First: 65, Qualification: 55, Scheduling: 45, Closing: 35 },
  { name: 'Sun', First: 70, Qualification: 60, Scheduling: 50, Closing: 40 },
];

interface FunnelChartProps {
  className?: string;
}

export function FunnelChart({ className }: FunnelChartProps) {
  return (
    <Card className={className}>
      <div className="p-4 h-80">
        <h3 className="text-lg font-medium mb-4">Funnel Performance</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorFirst" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ebccc" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0ebccc" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorQualification" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4172a4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4172a4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorScheduling" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6ed6e0" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6ed6e0" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorClosing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#25D366" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#25D366" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: '#e0e0e0' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              axisLine={{ stroke: '#e0e0e0' }}
              tickLine={false}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0',
              }}
            />
            <Area
              type="monotone"
              dataKey="First"
              stroke="#0ebccc"
              fillOpacity={1}
              fill="url(#colorFirst)"
            />
            <Area
              type="monotone"
              dataKey="Qualification"
              stroke="#4172a4"
              fillOpacity={1}
              fill="url(#colorQualification)"
            />
            <Area
              type="monotone"
              dataKey="Scheduling"
              stroke="#6ed6e0"
              fillOpacity={1}
              fill="url(#colorScheduling)"
            />
            <Area
              type="monotone"
              dataKey="Closing"
              stroke="#25D366"
              fillOpacity={1}
              fill="url(#colorClosing)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
