
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
import { Check, SendHorizontal, CalendarIcon, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BulkMessagingPage = () => {
  const { toast } = useToast();
  const [messageType, setMessageType] = useState<'whatsapp' | 'email'>('whatsapp');
  const [messageText, setMessageText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const availableTags = [
    { id: '1', name: 'Novo Lead', color: '#E7F5FF' },
    { id: '2', name: 'Qualificado', color: '#BFE5FF' },
    { id: '3', name: 'Reunião Agendada', color: '#E7F5FF' },
    { id: '4', name: 'Proposta Enviada', color: '#BFE5FF' },
    { id: '5', name: 'Cliente', color: '#E7F5FF' }
  ];

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
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

    if (selectedTags.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma tag de contato",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Sucesso",
        description: `Mensagem ${scheduleDate ? 'agendada' : 'enviada'} para ${selectedTags.length * 15} contatos`,
        variant: "default",
      });

      // Reset form
      setMessageText('');
      setSelectedTags([]);
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
                  <Input 
                    placeholder="Assunto do Email" 
                    value={messageText} 
                    onChange={(e) => setMessageText(e.target.value)} 
                  />
                  <Textarea
                    placeholder="Digite o conteúdo do seu email aqui..."
                    className="min-h-[200px]"
                  />
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
                <Label>Filtrar por Tags</Label>
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

              <div>
                <Label>Filtrar por Etapa do Funil</Label>
                <Select>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Selecionar etapa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as etapas</SelectItem>
                    <SelectItem value="lead">Novo Lead</SelectItem>
                    <SelectItem value="qualified">Lead Qualificado</SelectItem>
                    <SelectItem value="meeting">Reunião Agendada</SelectItem>
                    <SelectItem value="proposal">Proposta</SelectItem>
                    <SelectItem value="client">Cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">Contatos selecionados:</p>
                <p className="font-medium text-lg">
                  {selectedTags.length > 0 ? selectedTags.length * 15 : 0} contatos
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default BulkMessagingPage;
