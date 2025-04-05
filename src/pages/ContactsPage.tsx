
import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Plus, Filter, MoreHorizontal, Star, Phone, Mail,
  MessageSquare, Calendar, User
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'novo' | 'qualificado' | 'reunião' | 'proposta' | 'cliente';
  tags: string[];
  lastContact: Date;
  assigned: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+55 (11) 99123-4567',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'novo',
    tags: ['Novo Lead', 'Empresarial'],
    lastContact: new Date('2023-08-15T10:23:00'),
    assigned: 'AI'
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@empresa.com.br',
    phone: '+55 (11) 98987-6543',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'qualificado',
    tags: ['Qualificado', 'Premium'],
    lastContact: new Date('2023-08-15T09:50:00'),
    assigned: 'AI'
  },
  {
    id: '3',
    name: 'Pedro Santos',
    email: 'pedro@santos.net',
    phone: '+55 (11) 97456-7890',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'reunião',
    tags: ['Reunião Agendada'],
    lastContact: new Date('2023-08-14T16:30:00'),
    assigned: 'João Cardoso'
  },
  {
    id: '4',
    name: 'Ana Souza',
    email: 'ana.souza@gmail.com',
    phone: '+55 (11) 96789-0123',
    avatar: 'https://i.pravatar.cc/150?img=9',
    status: 'proposta',
    tags: ['Proposta Enviada'],
    lastContact: new Date('2023-08-14T15:15:00'),
    assigned: 'AI'
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    email: 'carlos@ferreira.org',
    phone: '+55 (11) 95321-6549',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'cliente',
    tags: ['Cliente', 'Premium'],
    lastContact: new Date('2023-08-14T12:00:00'),
    assigned: 'Marina Silva'
  },
];

const ContactsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const filteredContacts = mockContacts.filter(contact => {
    // Apply search filter
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery);
    
    // Apply status filter
    const matchesStatus = 
      filterStatus === 'all' || 
      contact.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      novo: 'bg-blue-100 text-blue-800',
      qualificado: 'bg-purple-100 text-purple-800',
      reunião: 'bg-green-100 text-green-800',
      proposta: 'bg-yellow-100 text-yellow-800',
      cliente: 'bg-[#E7F5FF] text-[#012742]'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      novo: 'Novo Lead',
      qualificado: 'Qualificado',
      reunião: 'Reunião Agendada',
      proposta: 'Proposta Enviada',
      cliente: 'Cliente'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <AppLayout title="Contatos (CRM)">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-2/3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Contatos</CardTitle>
                <Button>
                  <Plus size={16} className="mr-1" /> Novo Contato
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar contatos..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <Filter size={16} className="mr-2" />
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="novo">Novo Lead</SelectItem>
                    <SelectItem value="qualificado">Qualificado</SelectItem>
                    <SelectItem value="reunião">Reunião Agendada</SelectItem>
                    <SelectItem value="proposta">Proposta Enviada</SelectItem>
                    <SelectItem value="cliente">Cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-2 px-3 text-left">Nome</th>
                      <th className="py-2 px-3 text-left hidden md:table-cell">Email</th>
                      <th className="py-2 px-3 text-left hidden lg:table-cell">Status</th>
                      <th className="py-2 px-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr 
                        key={contact.id} 
                        className="border-b hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleSelectContact(contact)}
                      >
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-xs text-muted-foreground md:hidden">
                                {contact.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3 hidden md:table-cell">{contact.email}</td>
                        <td className="py-2 px-3 hidden lg:table-cell">
                          <Badge className={getStatusBadgeColor(contact.status)}>
                            {getStatusLabel(contact.status)}
                          </Badge>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/3">
          {selectedContact ? (
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{selectedContact.name}</CardTitle>
                <Badge className={`mt-2 ${getStatusBadgeColor(selectedContact.status)}`}>
                  {getStatusLabel(selectedContact.status)}
                </Badge>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="w-full">
                    <TabsTrigger value="details" className="flex-1">
                      <User size={14} className="mr-1" /> Detalhes
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex-1">
                      <MessageSquare size={14} className="mr-1" /> Histórico
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="flex-1">
                      <Calendar size={14} className="mr-1" /> Tarefas
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>{selectedContact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span>{selectedContact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>Último contato: {selectedContact.lastContact.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={14} />
                        <span>Atribuído a: {selectedContact.assigned}</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tags</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedContact.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-[#E7F5FF] text-[#012742]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" className="flex-1">
                          <MessageSquare size={14} className="mr-1" />
                          Chat
                        </Button>
                        <Button className="flex-1">
                          <Phone size={14} className="mr-1" />
                          Ligar
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="history">
                    <div className="mt-4">
                      <p className="text-center text-muted-foreground">
                        Histórico de comunicações com este contato
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="tasks">
                    <div className="mt-4">
                      <p className="text-center text-muted-foreground">
                        Tarefas relacionadas a este contato
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-[400px]">
              <p className="text-muted-foreground">
                Selecione um contato para ver detalhes
              </p>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ContactsPage;
