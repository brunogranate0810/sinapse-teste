
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
  { name: 'Seg', First: 40, Qualification: 30, Scheduling: 20, Closing: 10 },
  { name: 'Ter', First: 45, Qualification: 35, Scheduling: 25, Closing: 15 },
  { name: 'Qua', First: 50, Qualification: 40, Scheduling: 30, Closing: 20 },
  { name: 'Qui', First: 55, Qualification: 45, Scheduling: 35, Closing: 25 },
  { name: 'Sex', First: 60, Qualification: 50, Scheduling: 40, Closing: 30 },
  { name: 'Sab', First: 65, Qualification: 55, Scheduling: 45, Closing: 35 },
  { name: 'Dom', First: 70, Qualification: 60, Scheduling: 50, Closing: 40 },
];

interface FunnelChartProps {
  className?: string;
  data?: Array<{ name: string; value: number; color: string }>;
}

export function FunnelChart({ className, data: funnelData }: FunnelChartProps) {
  return (
    <div className="w-full h-[300px] overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorFirst" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E7F5FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#E7F5FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorQualification" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#BFE5FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#BFE5FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorScheduling" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#012742" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#012742" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorClosing" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E7F5FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#E7F5FF" stopOpacity={0} />
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
            stroke="#E7F5FF"
            fillOpacity={1}
            fill="url(#colorFirst)"
          />
          <Area
            type="monotone"
            dataKey="Qualification"
            stroke="#BFE5FF"
            fillOpacity={1}
            fill="url(#colorQualification)"
          />
          <Area
            type="monotone"
            dataKey="Scheduling"
            stroke="#012742"
            fillOpacity={1}
            fill="url(#colorScheduling)"
          />
          <Area
            type="monotone"
            dataKey="Closing"
            stroke="#E7F5FF"
            fillOpacity={1}
            fill="url(#colorClosing)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
