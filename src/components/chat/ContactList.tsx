
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  lastMessage: {
    content: string;
    timestamp: Date;
    unread: boolean;
    isAiActive: boolean;
  };
}

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contactId: string) => void;
  selectedContactId?: string;
  className?: string;
}

export function ContactList({ 
  contacts, 
  onSelectContact, 
  selectedContactId,
  className 
}: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );
  
  return (
    <Card className={cn('flex flex-col h-[calc(100vh-9rem)]', className)}>
      <CardHeader className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-y-auto flex-1">
        <div className="divide-y">
          {filteredContacts.map((contact) => (
            <div 
              key={contact.id}
              className={cn(
                'p-3 cursor-pointer hover:bg-muted/50 transition-colors',
                selectedContactId === contact.id && 'bg-muted'
              )}
              onClick={() => onSelectContact(contact.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {contact.lastMessage.isAiActive && (
                    <div className="absolute -right-1 -bottom-1 bg-primary rounded-full p-0.5">
                      <Bot size={10} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-medium truncate">{contact.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {contact.lastMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs truncate text-muted-foreground">
                      {contact.lastMessage.content}
                    </p>
                    {contact.lastMessage.unread && (
                      <Badge variant="default" className="text-[10px] h-5 min-w-[20px] flex items-center justify-center">
                        1
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
