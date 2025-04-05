
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
    name: 'John Smith',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '+1 (555) 123-4567',
    status: 'online' as const,
    lastSeen: new Date(),
    lastMessage: {
      content: 'Hello! I saw your ad about the premium package...',
      timestamp: new Date('2023-08-15T10:23:00'),
      unread: true,
      isAiActive: true
    }
  },
  {
    id: '2',
    name: 'Emily Johnson',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '+1 (555) 987-6543',
    status: 'typing' as const,
    lastSeen: new Date('2023-08-15T09:50:00'),
    lastMessage: {
      content: "Thanks for the information! I'll get back to you...",
      timestamp: new Date('2023-08-15T09:45:00'),
      unread: false,
      isAiActive: true
    }
  },
  {
    id: '3',
    name: 'Michael Brown',
    avatar: 'https://i.pravatar.cc/150?img=8',
    phone: '+1 (555) 456-7890',
    status: 'offline' as const,
    lastSeen: new Date('2023-08-14T18:30:00'),
    lastMessage: {
      content: "What's the pricing for the enterprise plan?",
      timestamp: new Date('2023-08-14T16:30:00'),
      unread: false,
      isAiActive: false
    }
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    avatar: 'https://i.pravatar.cc/150?img=9',
    phone: '+1 (555) 789-0123',
    status: 'online' as const,
    lastSeen: new Date('2023-08-14T15:30:00'),
    lastMessage: {
      content: 'Is there a free trial available?',
      timestamp: new Date('2023-08-14T15:15:00'),
      unread: false,
      isAiActive: true
    }
  },
  {
    id: '5',
    name: 'David Garcia',
    avatar: 'https://i.pravatar.cc/150?img=3',
    phone: '+1 (555) 321-6549',
    status: 'online' as const,
    lastSeen: new Date('2023-08-14T12:00:00'),
    lastMessage: {
      content: 'Can you schedule a demo for next week?',
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
    <AppLayout title="Live Chat">
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
                <TabsTrigger value="info">Contact Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat">
                <WhatsAppChat contact={selectedContact} />
              </TabsContent>
              
              <TabsContent value="info">
                <Card className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{selectedContact.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-medium">{selectedContact.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Active Lead
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned Agent</p>
                      <p className="font-medium">AI Assistant (Auto)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tags</p>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">New Lead</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs">Enterprise</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs">Follow-up</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="h-[calc(100vh-9rem)] flex items-center justify-center">
              <p className="text-muted-foreground">Select a contact to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
