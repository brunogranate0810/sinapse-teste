
import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { ContactList } from '@/components/chat/ContactList';
import { WhatsAppChat } from '@/components/chat/WhatsAppChat';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const mockContacts = [
  {
    id: '1',
    name: 'João Silva',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '+55 (11) 99123-4567',
    status: 'online' as const,
    lastSeen: new Date(),
    lastMessage: {
      content: 'Olá! Vi seu anúncio sobre o pacote premium...',
      timestamp: new Date('2023-08-15T10:23:00'),
      unread: true,
      isAiActive: true
    }
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '+55 (11) 98987-6543',
    status: 'typing' as const,
    lastSeen: new Date('2023-08-15T09:50:00'),
    lastMessage: {
      content: "Obrigada pelas informações! Vou analisar e retorno...",
      timestamp: new Date('2023-08-15T09:45:00'),
      unread: false,
      isAiActive: true
    }
  },
  {
    id: '3',
    name: 'Pedro Santos',
    avatar: 'https://i.pravatar.cc/150?img=8',
    phone: '+55 (11) 97456-7890',
    status: 'offline' as const,
    lastSeen: new Date('2023-08-14T18:30:00'),
    lastMessage: {
      content: "Qual o preço do plano empresarial?",
      timestamp: new Date('2023-08-14T16:30:00'),
      unread: false,
      isAiActive: false
    }
  },
  {
    id: '4',
    name: 'Ana Souza',
    avatar: 'https://i.pravatar.cc/150?img=9',
    phone: '+55 (11) 96789-0123',
    status: 'online' as const,
    lastSeen: new Date('2023-08-14T15:30:00'),
    lastMessage: {
      content: 'Existe uma versão de teste gratuita?',
      timestamp: new Date('2023-08-14T15:15:00'),
      unread: false,
      isAiActive: true
    }
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    avatar: 'https://i.pravatar.cc/150?img=3',
    phone: '+55 (11) 95321-6549',
    status: 'online' as const,
    lastSeen: new Date('2023-08-14T12:00:00'),
    lastMessage: {
      content: 'Podemos agendar uma demonstração para a próxima semana?',
      timestamp: new Date('2023-08-14T11:05:00'),
      unread: false,
      isAiActive: true
    }
  }
];

const ChatPage = () => {
  const [selectedContactId, setSelectedContactId] = useState(mockContacts[0].id);
  const selectedContact = mockContacts.find(c => c.id === selectedContactId);
  
  return (
    <AppLayout title="Chat Ao Vivo">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/3">
          <ContactList
            contacts={mockContacts}
            onSelectContact={setSelectedContactId}
            selectedContactId={selectedContactId}
          />
        </div>
        
        <div className="w-full lg:w-2/3">
          {selectedContact ? (
            <Tabs defaultValue="chat">
              <TabsList className="mb-4">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="info">Informações de Contato</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat">
                <WhatsAppChat contact={selectedContact} />
              </TabsContent>
              
              <TabsContent value="info">
                <Card className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Informações de Contato</h2>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Nome Completo</p>
                        <p className="font-medium">{selectedContact.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Número de Telefone</p>
                        <p className="font-medium">{selectedContact.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Lead Ativo
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Agente Designado</p>
                      <p className="font-medium">Assistente IA (Automático)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tags</p>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <span className="px-2 py-1 bg-[#E7F5FF] text-[#012742] rounded-md text-xs">Novo Lead</span>
                        <span className="px-2 py-1 bg-[#BFE5FF] text-[#012742] rounded-md text-xs">Empresarial</span>
                        <span className="px-2 py-1 bg-[#E7F5FF] text-[#012742] rounded-md text-xs">Acompanhamento</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="h-[calc(100vh-9rem)] flex items-center justify-center">
              <p className="text-muted-foreground">Selecione um contato para iniciar o chat</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
