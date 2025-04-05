import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { PlaybookEditor } from '@/components/ai/PlaybookEditor';
import { KnowledgeBase } from '@/components/ai/KnowledgeBase';
import { Bot, MessageSquare, FileText, Settings, BrainCircuit, Save, Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AICustomizationPage = () => {
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

  const toggleChannel = (channel: 'whatsapp' | 'email' | 'sms') => {
    setEnabledChannels(prev => ({
      ...prev,
      [channel]: !prev[channel]
    }));
  };

  return (
    <AppLayout title="Personalização da IA">
      <Tabs defaultValue="settings">
        <TabsList className="mb-6">
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings size={16} /> Configurações
          </TabsTrigger>
          <TabsTrigger value="playbooks" className="flex items-center gap-1">
            <FileText size={16} /> Playbooks
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-1">
            <BrainCircuit size={16} /> Base de Conhecimento
          </TabsTrigger>
          <TabsTrigger value="conversations" className="flex items-center gap-1">
            <MessageSquare size={16} /> Conversas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings">
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
                  
                  <div className="border border-dashed rounded-lg p-4 text-center hover:border-[#012742] transition-colors cursor-pointer">
                    <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                      <Plus size={20} />
                    </div>
                    <p className="font-medium">Email</p>
                    <p className="text-xs text-muted-foreground mt-1">Conectar SMTP</p>
                  </div>
                  
                  <div className="border border-dashed rounded-lg p-4 text-center hover:border-[#012742] transition-colors cursor-pointer">
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
        </TabsContent>
        
        <TabsContent value="playbooks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Playbooks de Vendas</span>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus size={16} /> Novo Playbook
                </Button>
              </CardTitle>
              <CardDescription>
                Crie roteiros para sua IA seguir em diferentes cenários de vendas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PlaybookEditor />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="knowledge">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Base de Conhecimento</span>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus size={16} /> Adicionar Documento
                </Button>
              </CardTitle>
              <CardDescription>
                Forneça informações sobre seus produtos e serviços para a IA consultar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <KnowledgeBase />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversations">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Conversas</CardTitle>
              <CardDescription>
                Revise conversas passadas da sua IA com clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative w-64">
                    <Input placeholder="Pesquisar conversas" className="pl-8" />
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Filtrar por:</Label>
                    <select className="text-sm border rounded px-2 py-1">
                      <option>Todas as conversas</option>
                      <option>WhatsApp</option>
                      <option>Email</option>
                    </select>
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <div className="p-4 border-b hover:bg-muted/50 cursor-pointer">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">João Silva</p>
                      <p className="text-xs text-muted-foreground">Hoje, 10:23</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      Olá! Gostaria de saber mais sobre o pacote premium que vocês oferecem...
                    </p>
                    <div className="flex items-center mt-2">
                      <Badge className="bg-green-100 text-green-800 text-xs">Resolvido</Badge>
                      <span className="text-xs text-muted-foreground ml-2">WhatsApp</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border-b hover:bg-muted/50 cursor-pointer">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">Maria Oliveira</p>
                      <p className="text-xs text-muted-foreground">Ontem, 15:47</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      Obrigada pelas informações. Vou analisar a proposta e retorno em breve...
                    </p>
                    <div className="flex items-center mt-2">
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">Aguardando</Badge>
                      <span className="text-xs text-muted-foreground ml-2">Email</span>
                    </div>
                  </div>
                  
                  <div className="p-4 hover:bg-muted/50 cursor-pointer">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium">Pedro Santos</p>
                      <p className="text-xs text-muted-foreground">12/04/2023</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      Quanto custa o plano empresarial? Temos uma equipe de 15 pessoas...
                    </p>
                    <div className="flex items-center mt-2">
                      <Badge className="bg-blue-100 text-blue-800 text-xs">Em andamento</Badge>
                      <span className="text-xs text-muted-foreground ml-2">WhatsApp</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline">Carregar mais conversas</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default AICustomizationPage;
