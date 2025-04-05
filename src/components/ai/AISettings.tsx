
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Bot, MessageSquare, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AISettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [aiName, setAiName] = useState('Sinapse IA');
  const [aiDescription, setAiDescription] = useState('Assistente de vendas inteligente');
  const [enabledChannels, setEnabledChannels] = useState({
    whatsapp: true,
    email: true,
    sms: false
  });

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações da IA foram atualizadas com sucesso",
      });
    }, 1000);
  };

  const handleIntegrationRequest = () => {
    toast({
      title: "Solicitação enviada",
      description: "Nossa equipe entrará em contato para configurar a integração",
    });
  };

  const toggleChannel = (channel: 'whatsapp' | 'email' | 'sms') => {
    setEnabledChannels(prev => ({
      ...prev,
      [channel]: !prev[channel]
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais da IA</CardTitle>
          <CardDescription>Personalize como sua IA irá se comportar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-name">Nome da IA</Label>
            <Input 
              id="ai-name" 
              value={aiName} 
              onChange={(e) => setAiName(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ai-description">Descrição/Cargo</Label>
            <Input 
              id="ai-description" 
              value={aiDescription} 
              onChange={(e) => setAiDescription(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ai-prompt">Instruções de Personalidade</Label>
            <Textarea 
              id="ai-prompt" 
              placeholder="Descreva a personalidade e o tom de voz da sua IA..." 
              className="min-h-[120px]" 
            />
          </div>
          <div className="pt-2">
            <Button onClick={handleSaveSettings} disabled={isLoading} className="w-full">
              {isLoading ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Canais de Comunicação</CardTitle>
          <CardDescription>Controle quais canais a IA pode utilizar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#E7F5FF] p-2 rounded-md">
                <Bot size={20} className="text-[#012742]" />
              </div>
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-xs text-muted-foreground">Responder mensagens no WhatsApp</p>
              </div>
            </div>
            <Switch 
              checked={enabledChannels.whatsapp} 
              onCheckedChange={() => toggleChannel('whatsapp')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#E7F5FF] p-2 rounded-md">
                <Bot size={20} className="text-[#012742]" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-xs text-muted-foreground">Responder emails automaticamente</p>
              </div>
            </div>
            <Switch 
              checked={enabledChannels.email} 
              onCheckedChange={() => toggleChannel('email')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#E7F5FF] p-2 rounded-md">
                <Bot size={20} className="text-[#012742]" />
              </div>
              <div>
                <p className="font-medium">SMS</p>
                <p className="text-xs text-muted-foreground">Responder mensagens SMS</p>
              </div>
            </div>
            <Switch 
              checked={enabledChannels.sms} 
              onCheckedChange={() => toggleChannel('sms')} 
            />
          </div>
          
          <div className="pt-4">
            <Label>Limites de Uso</Label>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm">Uso mensal: <span className="font-medium">1,240/5,000</span></p>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div className="bg-[#012742] h-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Renova em 12 dias</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
          <CardDescription>Conecte sua IA com outras plataformas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 text-center hover:border-[#012742] transition-colors cursor-pointer">
              <div className="mx-auto w-12 h-12 bg-[#E7F5FF] rounded-full flex items-center justify-center mb-2">
                <MessageSquare size={20} className="text-[#012742]" />
              </div>
              <p className="font-medium">WhatsApp Business</p>
              <p className="text-xs text-muted-foreground mt-1">Conectado</p>
            </div>
            
            <div 
              className="border border-dashed rounded-lg p-4 text-center hover:border-[#012742] transition-colors cursor-pointer"
              onClick={handleIntegrationRequest}
            >
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                <Plus size={20} />
              </div>
              <p className="font-medium">Email</p>
              <p className="text-xs text-muted-foreground mt-1">Conectar SMTP</p>
            </div>
            
            <div 
              className="border border-dashed rounded-lg p-4 text-center hover:border-[#012742] transition-colors cursor-pointer"
              onClick={handleIntegrationRequest}
            >
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                <Plus size={20} />
              </div>
              <p className="font-medium">Calendário</p>
              <p className="text-xs text-muted-foreground mt-1">Conectar Google</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
