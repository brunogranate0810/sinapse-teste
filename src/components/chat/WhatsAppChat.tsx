
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Send, Paperclip, Smile, CheckCheck, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'contact' | 'ai';
  isRead?: boolean;
}

interface WhatsAppChatProps {
  contact: {
    id: string;
    name: string;
    avatar?: string;
    phone: string;
    status: 'online' | 'offline' | 'typing';
    lastSeen?: Date;
  };
  className?: string;
}

export function WhatsAppChat({ contact, className }: WhatsAppChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I saw your ad about the premium package. Can you tell me more about it?',
      timestamp: new Date('2023-08-15T10:23:00'),
      sender: 'contact',
      isRead: true,
    },
    {
      id: '2',
      content: 'Sure! Our premium package includes 24/7 AI support, unlimited message templates, and integration with your CRM. Would you like to schedule a demo?',
      timestamp: new Date('2023-08-15T10:25:00'),
      sender: 'ai',
      isRead: true,
    },
    {
      id: '3',
      content: 'That sounds interesting. What about the pricing?',
      timestamp: new Date('2023-08-15T10:28:00'),
      sender: 'contact',
      isRead: true,
    },
    {
      id: '4',
      content: 'Our AI will handle this conversation automatically. You can jump in anytime to take control.',
      timestamp: new Date('2023-08-15T10:28:30'),
      sender: 'user',
      isRead: true,
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [aiActive, setAiActive] = useState(true);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      sender: 'user',
      isRead: false,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate AI deactivation when human responds
    if (aiActive) setAiActive(false);
  };
  
  const toggleAI = () => {
    setAiActive(!aiActive);
  };

  return (
    <Card className={cn('flex flex-col h-[calc(100vh-9rem)]', className)}>
      <CardHeader className="border-b p-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{contact.name}</p>
              <p className="text-xs text-muted-foreground">{contact.phone}</p>
            </div>
          </div>
          <Button
            variant={aiActive ? "default" : "outline"}
            size="sm"
            onClick={toggleAI}
            className={cn(
              "flex items-center gap-1",
              aiActive ? "bg-primary" : ""
            )}
          >
            <Bot size={16} />
            <span>AI {aiActive ? 'Active' : 'Paused'}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto flex flex-col-reverse">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "whatsapp-message",
                message.sender === 'contact' ? "received" : "sent",
                message.sender === 'ai' && "bg-blue-50"
              )}
            >
              {message.sender === 'ai' && (
                <div className="absolute -left-1 -top-1 bg-primary rounded-full p-0.5">
                  <Bot size={12} className="text-white" />
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {(message.sender === 'user' || message.sender === 'ai') && message.isRead && (
                  <CheckCheck size={12} className="text-blue-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <Separator />
      <div className="p-3 flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Paperclip size={18} />
        </Button>
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button variant="ghost" size="icon">
          <Smile size={18} />
        </Button>
        <Button onClick={handleSendMessage} size="icon" type="submit">
          <Send size={18} />
        </Button>
      </div>
    </Card>
  );
}
