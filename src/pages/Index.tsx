
import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FunnelChart } from '@/components/dashboard/FunnelChart';
import { FunnelStage } from '@/components/dashboard/FunnelStage';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Bell, Calendar, ChevronRight, MessageSquare, Phone, User, Users } from 'lucide-react';

const Dashboard = () => {
  const funnelData = [
    { name: 'Novos Leads', value: 120, color: '#E7F5FF' },
    { name: 'Leads Qualificados', value: 80, color: '#BFE5FF' },
    { name: 'Reuniões', value: 40, color: '#012742' },
    { name: 'Propostas', value: 20, color: '#E7F5FF' },
    { name: 'Clientes', value: 10, color: '#BFE5FF' }
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Novos Leads" 
            value={32}
            change={{ value: 24, isPositive: true }}
            description="nos últimos 30 dias" 
          />
          <StatsCard 
            title="Mensagens" 
            value={642}
            change={{ value: 12, isPositive: true }}
            description="mensagens enviadas" 
          />
          <StatsCard 
            title="Taxa de Conversão" 
            value="8.5%"
            change={{ value: 1.2, isPositive: true }}
            description="mês passado: 7.3%" 
          />
          <StatsCard 
            title="Novos Clientes" 
            value={9}
            change={{ value: 3, isPositive: true }}
            description="mês passado: 6" 
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Funil de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full">
                <Tabs defaultValue="chart">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="chart">Gráfico</TabsTrigger>
                      <TabsTrigger value="stages">Estágios</TabsTrigger>
                    </TabsList>
                    
                    <select className="text-sm border rounded px-2 py-1">
                      <option>Últimos 30 dias</option>
                      <option>Este Mês</option>
                      <option>Último Trimestre</option>
                    </select>
                  </div>
                  
                  <TabsContent value="chart" className="mt-0">
                    <FunnelChart />
                  </TabsContent>
                  
                  <TabsContent value="stages" className="mt-0">
                    <div className="space-y-4">
                      {funnelData.map((stage, index) => (
                        <FunnelStage
                          key={stage.name}
                          title={stage.name}
                          count={stage.value}
                          percentage={Math.round((stage.value / funnelData[0].value) * 100)}
                          conversionRate={index > 0 ? Math.round((stage.value / funnelData[index - 1].value) * 100) : 100}
                          color={stage.color}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-4">
                <div className="flex gap-3 items-start p-3 hover:bg-muted/50 rounded-md">
                  <div className="bg-[#E7F5FF] p-2 rounded">
                    <MessageSquare size={16} className="text-[#012742]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Nova mensagem de Maria</p>
                    <p className="text-xs text-muted-foreground">Respondido pela IA às 11:30</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start p-3 hover:bg-muted/50 rounded-md">
                  <div className="bg-[#E7F5FF] p-2 rounded">
                    <User size={16} className="text-[#012742]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Novo lead qualificado</p>
                    <p className="text-xs text-muted-foreground">João Silva - B2B - Há 2 horas</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start p-3 hover:bg-muted/50 rounded-md">
                  <div className="bg-[#E7F5FF] p-2 rounded">
                    <Calendar size={16} className="text-[#012742]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Reunião agendada</p>
                    <p className="text-xs text-muted-foreground">Com Carlos Ferreira - Amanhã às 14:00</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start p-3 hover:bg-muted/50 rounded-md">
                  <div className="bg-[#E7F5FF] p-2 rounded">
                    <Bell size={16} className="text-[#012742]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Lembrete: seguimento</p>
                    <p className="text-xs text-muted-foreground">Ana Souza - Há 3 dias sem resposta</p>
                  </div>
                </div>
                
                <div className="flex justify-center mt-2">
                  <a href="#" className="text-xs text-[#012742] hover:underline flex items-center">
                    Ver todas as atividades <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={18} /> Contatos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[#E7F5FF] flex items-center justify-center">
                      <span className="font-medium text-[#012742]">M</span>
                    </div>
                    <div>
                      <p className="font-medium">Maria Oliveira</p>
                      <p className="text-xs text-muted-foreground">maria.oliveira@email.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                      <MessageSquare size={14} />
                    </div>
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                      <Phone size={14} />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[#E7F5FF] flex items-center justify-center">
                      <span className="font-medium text-[#012742]">P</span>
                    </div>
                    <div>
                      <p className="font-medium">Pedro Santos</p>
                      <p className="text-xs text-muted-foreground">pedro@santos.net</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                      <MessageSquare size={14} />
                    </div>
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                      <Phone size={14} />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[#E7F5FF] flex items-center justify-center">
                      <span className="font-medium text-[#012742]">A</span>
                    </div>
                    <div>
                      <p className="font-medium">Ana Souza</p>
                      <p className="text-xs text-muted-foreground">ana.souza@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                      <MessageSquare size={14} />
                    </div>
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center">
                      <Phone size={14} />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-2">
                  <a href="/contacts" className="text-xs text-[#012742] hover:underline flex items-center">
                    Ver todos os contatos <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={18} /> Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 items-start pb-3 border-b">
                  <div className="bg-[#E7F5FF] text-[#012742] p-2 rounded text-center min-w-[60px]">
                    <p className="text-xs">Abr</p>
                    <p className="text-lg font-semibold">10</p>
                  </div>
                  <div>
                    <p className="font-medium">Reunião com Carlos Ferreira</p>
                    <p className="text-xs text-muted-foreground">14:00 - 15:00</p>
                    <p className="text-sm mt-1">Apresentação do produto premium</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start pb-3 border-b">
                  <div className="bg-[#E7F5FF] text-[#012742] p-2 rounded text-center min-w-[60px]">
                    <p className="text-xs">Abr</p>
                    <p className="text-lg font-semibold">12</p>
                  </div>
                  <div>
                    <p className="font-medium">Contato Follow-up: Maria</p>
                    <p className="text-xs text-muted-foreground">10:30 - 11:00</p>
                    <p className="text-sm mt-1">Verificar feedback da proposta</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-[#E7F5FF] text-[#012742] p-2 rounded text-center min-w-[60px]">
                    <p className="text-xs">Abr</p>
                    <p className="text-lg font-semibold">15</p>
                  </div>
                  <div>
                    <p className="font-medium">Campanha de Email</p>
                    <p className="text-xs text-muted-foreground">Automático</p>
                    <p className="text-sm mt-1">Lançamento de novo produto</p>
                  </div>
                </div>
                
                <div className="flex justify-center mt-2">
                  <a href="#" className="text-xs text-[#012742] hover:underline flex items-center">
                    Ver todos os eventos <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
