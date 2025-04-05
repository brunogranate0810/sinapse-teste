
import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Check, SendHorizontal, Calendar, Users, Tag, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Shared tags with ContactsPage to show the integration
const availableTags = [
  { id: '1', name: 'Novo Lead', color: '#E7F5FF' },
  { id: '2', name: 'Qualificado', color: '#BFE5FF' },
  { id: '3', name: 'Reunião Agendada', color: '#E7F5FF' },
  { id: '4', name: 'Proposta Enviada', color: '#BFE5FF' },
  { id: '5', name: 'Cliente', color: '#E7F5FF' },
  { id: '6', name: 'Empresarial', color: '#E7F5FF' },
  { id: '7', name: 'Premium', color: '#BFE5FF' },
  { id: '8', name: 'Precisa Seguimento', color: '#E7F5FF' }
];

const stages = [
  { id: 'novo', name: 'Novo Lead' },
  { id: 'qualificado', name: 'Qualificado' },
  { id: 'reuniao', name: 'Reunião' },
  { id: 'proposta', name: 'Proposta' },
  { id: 'cliente', name: 'Cliente' }
];

const BulkMessagingPage = () => {
  const { toast } = useToast();
  const [messageType, setMessageType] = useState<'whatsapp' | 'email'>('whatsapp');
  const [messageText, setMessageText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('');

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const toggleStage = (stageId: string) => {
    if (selectedStages.includes(stageId)) {
      setSelectedStages(selectedStages.filter(id => id !== stageId));
    } else {
      setSelectedStages([...selectedStages, stageId]);
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, escreva uma mensagem",
        variant: "destructive",
      });
      return;
    }

    if (selectedTags.length === 0 && selectedStages.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma tag ou estágio de contato",
        variant: "destructive",
      });
      return;
    }

    if (messageType === 'email' && !subject.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, adicione um assunto para o email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      const recipientCount = (selectedTags.length * 10) + (selectedStages.length * 15);
      
      toast({
        title: "Sucesso",
        description: `Mensagem ${scheduleDate ? 'agendada' : 'enviada'} para ${recipientCount} contatos`,
        variant: "default",
      });

      // Reset form
      setMessageText('');
      setSubject('');
      setSelectedTags([]);
      setSelectedStages([]);
      setScheduleDate('');
      setScheduleTime('');
    }, 1500);
  };

  return (
    <AppLayout title="Mensagens em Massa">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Nova Campanha de Mensagens</CardTitle>
                <div>
                  <Tabs defaultValue="whatsapp" onValueChange={(v) => setMessageType(v as 'whatsapp' | 'email')}>
                    <TabsList>
                      <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                      <TabsTrigger value="email">Email</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {messageType === 'whatsapp' ? (
                <Textarea
                  placeholder="Digite sua mensagem do WhatsApp aqui..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="min-h-[200px]"
                />
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label>Assunto do Email</Label>
                    <Input 
                      placeholder="Assunto do Email" 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label>Conteúdo</Label>
                    <Textarea
                      placeholder="Digite o conteúdo do seu email aqui..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Agendar envio (opcional)</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input 
                      type="date" 
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Input 
                      type="time" 
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? 'Enviando...' : scheduleDate ? 'Agendar' : 'Enviar Agora'}
                  <SendHorizontal size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={18} />
                Selecionar Contatos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Tag size={14} /> Filtrar por Tags
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {availableTags.map(tag => (
                    <Badge 
                      key={tag.id} 
                      variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                      onClick={() => toggleTag(tag.id)}
                      className={`cursor-pointer ${selectedTags.includes(tag.id) 
                        ? "bg-[#012742] text-white" 
                        : "bg-transparent hover:bg-[#E7F5FF] hover:text-[#012742]"}`}
                    >
                      {selectedTags.includes(tag.id) && (
                        <Check size={14} className="mr-1" />
                      )}
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <Label className="flex items-center gap-2 mb-2">
                  <Filter size={14} /> Filtrar por Estágio do Funil
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {stages.map(stage => (
                    <Badge 
                      key={stage.id} 
                      variant={selectedStages.includes(stage.id) ? "default" : "outline"}
                      onClick={() => toggleStage(stage.id)}
                      className={`cursor-pointer ${selectedStages.includes(stage.id) 
                        ? "bg-[#012742] text-white" 
                        : "bg-transparent hover:bg-[#E7F5FF] hover:text-[#012742]"}`}
                    >
                      {selectedStages.includes(stage.id) && (
                        <Check size={14} className="mr-1" />
                      )}
                      {stage.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">Contatos selecionados:</p>
                <p className="font-medium text-lg">
                  {(selectedTags.length * 10) + (selectedStages.length * 15)} contatos
                </p>
                <div className="text-xs text-muted-foreground mt-1">
                  {selectedTags.length > 0 && (
                    <p>{selectedTags.length} tags selecionadas</p>
                  )}
                  {selectedStages.length > 0 && (
                    <p>{selectedStages.length} estágios selecionados</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default BulkMessagingPage;
