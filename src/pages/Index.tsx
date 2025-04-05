
import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { FunnelStage } from '@/components/dashboard/FunnelStage';
import { FunnelChart } from '@/components/dashboard/FunnelChart';
import { MessageSquare, Users, BarChart2, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  
  const funnelStages = [
    {
      id: 'first_message',
      title: 'First Message',
      count: 458,
      percentage: 100,
      color: '#0ebccc',
    },
    {
      id: 'qualification',
      title: 'Qualification',
      count: 352,
      percentage: 76.9,
      color: '#4172a4',
    },
    {
      id: 'scheduling',
      title: 'Scheduling',
      count: 189,
      percentage: 41.3,
      color: '#6ed6e0',
    },
    {
      id: 'closing',
      title: 'Closing',
      count: 85,
      percentage: 18.6,
      color: '#25D366',
    }
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Conversations" 
          value="1,248" 
          icon={<MessageSquare size={18} />} 
          change={{ value: 12.5, isPositive: true }}
        />
        <StatsCard 
          title="Active Contacts" 
          value="458" 
          icon={<Users size={18} />} 
          change={{ value: 8.2, isPositive: true }}
        />
        <StatsCard 
          title="Conversion Rate" 
          value="18.6%" 
          icon={<BarChart2 size={18} />} 
          change={{ value: 3.1, isPositive: true }}
        />
        <StatsCard 
          title="Deals Closed" 
          value="85" 
          icon={<CheckCircle2 size={18} />} 
          change={{ value: 15.3, isPositive: true }}
        />
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Funnel Stages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {funnelStages.map((stage) => (
            <FunnelStage
              key={stage.id}
              title={stage.title}
              count={stage.count}
              percentage={stage.percentage}
              color={stage.color}
              selected={selectedStage === stage.id}
              onClick={() => setSelectedStage(stage.id === selectedStage ? null : stage.id)}
            />
          ))}
        </div>
      </div>
      
      <FunnelChart className="w-full" />
    </AppLayout>
  );
};

export default Dashboard;
