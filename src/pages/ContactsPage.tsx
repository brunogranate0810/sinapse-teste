
import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, Plus, Filter, MoreHorizontal, Star, Phone, Mail,
  MessageSquare, Calendar, User, Tag, Pencil, X, Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: string;
  tags: string[];
  lastContact: Date;
  assigned: string;
}

interface Stage {
  id: string;
  name: string;
  contacts: Contact[];
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
    assigned: 'IA'
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
    assigned: 'IA'
  },
  {
    id: '3',
    name: 'Pedro Santos',
    email: 'pedro@santos.net',
    phone: '+55 (11) 97456-7890',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'reuniao',
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
    assigned: 'IA'
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
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  
  const initialStages: Stage[] = [
    { id: 'novo', name: 'Novo Lead', contacts: mockContacts.filter(c => c.status === 'novo') },
    { id: 'qualificado', name: 'Qualificado', contacts: mockContacts.filter(c => c.status === 'qualificado') },
    { id: 'reuniao', name: 'Reunião', contacts: mockContacts.filter(c => c.status === 'reuniao') },
    { id: 'proposta', name: 'Proposta', contacts: mockContacts.filter(c => c.status === 'proposta') },
    { id: 'cliente', name: 'Cliente', contacts: mockContacts.filter(c => c.status === 'cliente') }
  ];
  
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [newStageName, setNewStageName] = useState('');
  const [isAddingStage, setIsAddingStage] = useState(false);
  const [availableTags, setAvailableTags] = useState<string[]>([
    'Novo Lead', 'Qualificado', 'Reunião Agendada', 'Proposta Enviada', 'Cliente', 
    'Empresarial', 'Premium', 'Precisa Seguimento'
  ]);
  const [newTag, setNewTag] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newContactTags, setNewContactTags] = useState<string[]>([]);
  
  const getStatusBadgeColor = (status: string) => {
    const colors = {
      novo: 'bg-[#E7F5FF] text-[#012742]',
      qualificado: 'bg-[#BFE5FF] text-[#012742]',
      reuniao: 'bg-green-100 text-green-800',
      proposta: 'bg-yellow-100 text-yellow-800',
      cliente: 'bg-[#E7F5FF] text-[#012742]'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredStages = stages.map(stage => {
    return {
      ...stage,
      contacts: stage.contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
      )
    };
  });

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStage = stages.find(s => s.id === source.droppableId);
    const destStage = stages.find(s => s.id === destination.droppableId);

    if (!sourceStage || !destStage) return;

    // Find the contact that was dragged
    const contactIndex = sourceStage.contacts.findIndex(c => c.id === draggableId);
    if (contactIndex < 0) return;

    const contactToMove = { ...sourceStage.contacts[contactIndex], status: destination.droppableId };
    
    // Create new arrays
    const newSourceContacts = Array.from(sourceStage.contacts);
    newSourceContacts.splice(source.index, 1);
    
    const newDestContacts = Array.from(destStage.contacts);
    newDestContacts.splice(destination.index, 0, contactToMove);
    
    // Update stages
    const newStages = stages.map(stage => {
      if (stage.id === source.droppableId) {
        return { ...stage, contacts: newSourceContacts };
      }
      if (stage.id === destination.droppableId) {
        return { ...stage, contacts: newDestContacts };
      }
      return stage;
    });

    setStages(newStages);
    
    toast({
      title: "Contato movido",
      description: `${contactToMove.name} movido para ${destStage.name}`,
    });
  };

  const handleAddStage = () => {
    if (!newStageName.trim()) {
      toast({
        title: "Erro",
        description: "Nome do estágio não pode estar vazio",
        variant: "destructive",
      });
      return;
    }

    const stageId = newStageName.toLowerCase().replace(/\s+/g, '-');
    
    if (stages.some(s => s.id === stageId)) {
      toast({
        title: "Erro",
        description: "Já existe um estágio com este nome",
        variant: "destructive",
      });
      return;
    }

    const newStage: Stage = {
      id: stageId,
      name: newStageName,
      contacts: []
    };

    setStages([...stages, newStage]);
    setNewStageName('');
    setIsAddingStage(false);
    
    toast({
      title: "Estágio adicionado",
      description: `${newStageName} foi adicionado ao funil`,
    });
  };

  const handleAddTag = () => {
    if (!newTag.trim()) {
      toast({
        title: "Erro",
        description: "Nome da tag não pode estar vazio",
        variant: "destructive",
      });
      return;
    }

    if (availableTags.includes(newTag)) {
      toast({
        title: "Erro",
        description: "Esta tag já existe",
        variant: "destructive",
      });
      return;
    }

    setAvailableTags([...availableTags, newTag]);
    if (selectedContact) {
      setNewContactTags([...newContactTags, newTag]);
    }
    setNewTag('');
    setIsAddingTag(false);
    
    toast({
      title: "Tag adicionada",
      description: `Tag "${newTag}" foi criada`,
    });
  };

  const toggleContactTag = (tag: string) => {
    if (!selectedContact) return;
    
    setNewContactTags(prevTags => 
      prevTags.includes(tag) 
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSaveContactTags = () => {
    if (!selectedContact) return;
    
    // Update the contact's tags
    const updatedStages = stages.map(stage => ({
      ...stage,
      contacts: stage.contacts.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, tags: [...newContactTags] }
          : contact
      )
    }));
    
    setStages(updatedStages);
    
    // Update the selected contact
    setSelectedContact({
      ...selectedContact,
      tags: [...newContactTags]
    });
    
    toast({
      title: "Tags atualizadas",
      description: "As tags do contato foram atualizadas com sucesso",
    });
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setNewContactTags([...contact.tags]);
  };

  return (
    <AppLayout title="Contatos (CRM)">
      <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar contatos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} /> Filtrar
          </Button>
        </div>
        
        <Button>
          <Plus size={16} className="mr-1" /> Novo Contato
        </Button>
      </div>

      <div className="flex overflow-x-auto pb-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          {filteredStages.map(stage => (
            <div key={stage.id} className="min-w-[320px] px-2 first:pl-0 last:pr-0">
              <div className="bg-muted/50 rounded-t-lg p-3 flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <Badge className={`${getStatusBadgeColor(stage.id)}`}>{stage.contacts.length}</Badge>
                  {stage.name}
                </h3>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal size={16} />
                </Button>
              </div>
              
              <Droppable droppableId={stage.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-muted/20 rounded-b-lg p-2 min-h-[500px]"
                  >
                    {stage.contacts.map((contact, index) => (
                      <Draggable key={contact.id} draggableId={contact.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-3 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleSelectContact(contact)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-3 mb-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={contact.avatar} alt={contact.name} />
                                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{contact.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {contact.email}
                                  </p>
                                </div>
                              </div>
                              {contact.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {contact.tags.slice(0, 2).map((tag, i) => (
                                    <Badge key={i} variant="secondary" className="bg-[#E7F5FF] text-[#012742]">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {contact.tags.length > 2 && (
                                    <Badge variant="outline" className="border-dashed">
                                      +{contact.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}
                              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                                <span>Atribuído: {contact.assigned}</span>
                                <span>{new Date(contact.lastContact).toLocaleDateString('pt-BR')}</span>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
          
          {isAddingStage ? (
            <div className="min-w-[320px] px-2">
              <div className="bg-muted/50 rounded-t-lg p-3">
                <Input 
                  value={newStageName}
                  onChange={(e) => setNewStageName(e.target.value)}
                  placeholder="Nome do estágio"
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddStage}>Adicionar</Button>
                  <Button size="sm" variant="outline" onClick={() => setIsAddingStage(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
              <div className="bg-muted/20 rounded-b-lg p-2 min-h-[500px]"></div>
            </div>
          ) : (
            <div className="min-w-[100px] flex items-start pl-2">
              <Button 
                variant="outline" 
                className="mt-3 w-full border-dashed" 
                onClick={() => setIsAddingStage(true)}
              >
                <Plus size={16} className="mr-1" /> Adicionar Estágio
              </Button>
            </div>
          )}
        </DragDropContext>
      </div>

      <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <DialogContent className="max-w-lg">
          {selectedContact && (
            <>
              <DialogHeader>
                <div className="flex justify-center mb-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <DialogTitle>{selectedContact.name}</DialogTitle>
                <DialogDescription>
                  <Badge className={getStatusBadgeColor(selectedContact.status)}>
                    {stages.find(s => s.id === selectedContact.status)?.name || selectedContact.status}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

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
                  <span>Último contato: {selectedContact.lastContact.toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} />
                  <span>Atribuído a: {selectedContact.assigned}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">Tags</Label>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleSaveContactTags}
                      className="h-8"
                    >
                      <Save size={14} className="mr-1" />
                      Salvar Tags
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {availableTags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant={newContactTags.includes(tag) ? "default" : "outline"}
                        onClick={() => toggleContactTag(tag)}
                        className={`cursor-pointer ${newContactTags.includes(tag) 
                          ? "bg-[#012742] text-white" 
                          : "bg-transparent hover:bg-[#E7F5FF] hover:text-[#012742]"}`}
                      >
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {isAddingTag ? (
                    <div className="flex gap-2 items-center">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Nome da tag"
                        className="flex-1"
                      />
                      <Button size="sm" onClick={handleAddTag}>
                        <Plus size={14} className="mr-1" />
                        Adicionar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsAddingTag(false)}>
                        <X size={14} />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="border-dashed w-full" 
                      onClick={() => setIsAddingTag(true)}
                    >
                      <Plus size={14} className="mr-1" />
                      Criar Nova Tag
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button className="flex-1">
                    <MessageSquare size={14} className="mr-1" />
                    Enviar Mensagem
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone size={14} className="mr-1" />
                    Ligar
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default ContactsPage;
