
import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Check, ExternalLink, MessageSquare, Mail, Calendar, FileText, ShoppingCart, CreditCard, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IntegrationCard = ({ 
  icon: Icon, 
  title, 
  description, 
  connected = false,
  available = true,
  onConnect = () => {}
}) => {
  return (
    <Card className={`border ${connected ? 'border-[#012742]' : ''} ${!available ? 'opacity-60' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-md ${connected ? 'bg-[#E7F5FF]' : 'bg-muted'}`}>
              <Icon size={20} className={connected ? 'text-[#012742]' : ''} />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {connected && (
            <div className="flex items-center gap-1 text-xs bg-[#E7F5FF] text-[#012742] px-2 py-1 rounded-full">
              <Check size={12} /> Conectado
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant={connected ? "outline" : "default"} 
          className="w-full"
          onClick={onConnect}
          disabled={!available}
        >
          {connected ? 'Configurar' : available ? 'Conectar' : 'Em breve'}
          {!connected && available && <ExternalLink size={14} className="ml-2" />}
        </Button>
      </CardContent>
    </Card>
  );
};

const IntegrationsPage = () => {
  const { toast } = useToast();
  
  const handleConnectZapier = () => {
    toast({
      title: "Integração com Zapier",
      description: "Por favor, copie o webhook URL e crie um Zap no Zapier.com",
    });
  };

  return (
    <AppLayout title="Integrações">
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="messaging">Mensagens</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="crm">CRM</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          </TabsList>
          
          <Button variant="outline">
            Solicitar Integração
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Integrações Populares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <IntegrationCard
                icon={MessageSquare}
                title="WhatsApp Business API"
                description="Conecte sua conta WhatsApp Business para envio/recepção de mensagens"
                connected={true}
              />
              
              <IntegrationCard
                icon={FileText}
                title="Zapier"
                description="Automatize fluxos de trabalho com mais de 3.000 aplicativos"
                onConnect={handleConnectZapier}
              />
              
              <IntegrationCard
                icon={Calendar}
                title="Google Agenda"
                description="Sincronize eventos e reuniões com o Google Agenda"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Todas as Integrações</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <IntegrationCard
                icon={MessageSquare}
                title="WhatsApp Business API"
                description="Conecte sua conta WhatsApp Business para envio/recepção de mensagens"
                connected={true}
              />
              
              <IntegrationCard
                icon={Mail}
                title="Gmail/SMTP"
                description="Envie e receba emails diretamente da plataforma"
              />
              
              <IntegrationCard
                icon={Calendar}
                title="Google Agenda"
                description="Sincronize eventos e reuniões com o Google Agenda"
              />
              
              <IntegrationCard
                icon={FileText}
                title="Zapier"
                description="Automatize fluxos de trabalho com mais de 3.000 aplicativos"
              />
              
              <IntegrationCard
                icon={ShoppingCart}
                title="WooCommerce"
                description="Integre com sua loja WooCommerce"
                available={false}
              />
              
              <IntegrationCard
                icon={CreditCard}
                title="Stripe"
                description="Processe pagamentos e assinaturas"
                available={false}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="messaging" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IntegrationCard
              icon={MessageSquare}
              title="WhatsApp Business API"
              description="Conecte sua conta WhatsApp Business para envio/recepção de mensagens"
              connected={true}
            />
            
            <IntegrationCard
              icon={Mail}
              title="Gmail/SMTP"
              description="Envie e receba emails diretamente da plataforma"
            />
            
            <IntegrationCard
              icon={MessageSquare}
              title="SMS Gateway"
              description="Envie SMS para seus contatos"
              available={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IntegrationCard
              icon={Calendar}
              title="Google Agenda"
              description="Sincronize eventos e reuniões com o Google Agenda"
            />
            
            <IntegrationCard
              icon={Calendar}
              title="Microsoft Outlook"
              description="Sincronize eventos e reuniões com o Outlook"
              available={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="crm" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IntegrationCard
              icon={FileText}
              title="Zapier"
              description="Automatize fluxos de trabalho com mais de 3.000 aplicativos"
              onConnect={handleConnectZapier}
            />
            
            <IntegrationCard
              icon={FileText}
              title="Importar/Exportar CSV"
              description="Importe ou exporte contatos em formato CSV"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="payments" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IntegrationCard
              icon={CreditCard}
              title="Stripe"
              description="Processe pagamentos e assinaturas"
              available={false}
            />
            
            <IntegrationCard
              icon={ShoppingCart}
              title="WooCommerce"
              description="Integre com sua loja WooCommerce"
              available={false}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Webhook do Zapier</CardTitle>
          <CardDescription>
            Use este webhook para integrar o Sinapse com Zapier
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">URL do Webhook</Label>
            <div className="flex space-x-2">
              <Input 
                id="webhook-url" 
                readOnly 
                value="https://hooks.zapier.com/hooks/catch/12345/abcdef/" 
                className="font-mono text-sm"
              />
              <Button variant="outline">Copiar</Button>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 p-3 bg-yellow-50 text-yellow-800 rounded-md">
            <AlertCircle size={16} className="mt-0.5" />
            <div className="text-sm">
              <p><strong>Como usar:</strong> Crie um Zap no Zapier começando com o trigger "Webhook by Zapier", e cole esta URL.</p>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between">
              <Label>Eventos de Ativação</Label>
              <Button variant="link" size="sm" className="h-auto p-0">
                Ativar Todos
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between border p-3 rounded-md">
                <span>Novo contato criado</span>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between border p-3 rounded-md">
                <span>Novo estágio no funil</span>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between border p-3 rounded-md">
                <span>Nova mensagem recebida</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between border p-3 rounded-md">
                <span>Reunião agendada</span>
                <Switch />
              </div>
            </div>
          </div>
          
          <Button className="w-full">
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default IntegrationsPage;
