
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Database, FilePlus, Save, Search, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: 'Products' | 'Pricing' | 'FAQ' | 'Policies';
}

export function KnowledgeBase() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    {
      id: '1',
      title: 'Basic Plan Features',
      content: 'The Basic Plan includes up to 1,000 WhatsApp messages per month, 3 AI playbooks, and basic reporting.',
      category: 'Products'
    },
    {
      id: '2',
      title: 'Pro Plan Features',
      content: 'The Pro Plan includes up to 10,000 WhatsApp messages per month, unlimited AI playbooks, advanced analytics, and priority support.',
      category: 'Products'
    },
    {
      id: '3',
      title: 'Basic Plan Pricing',
      content: 'The Basic Plan costs $99/month when billed annually or $129/month when billed monthly.',
      category: 'Pricing'
    },
    {
      id: '4',
      title: 'How to cancel subscription',
      content: 'You can cancel your subscription at any time from your Account Settings page. Your service will continue until the end of your billing period.',
      category: 'FAQ'
    },
    {
      id: '5',
      title: 'Refund Policy',
      content: 'We offer a 14-day money-back guarantee on all new subscriptions. After this period, refunds are provided at the discretion of management.',
      category: 'Policies'
    }
  ]);
  
  const [newItem, setNewItem] = useState<Omit<KnowledgeItem, 'id'>>({
    title: '',
    content: '',
    category: 'Products'
  });

  const filteredItems = knowledgeItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = () => {
    if (!newItem.title || !newItem.content) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }
    
    const newKnowledgeItem = {
      ...newItem,
      id: Date.now().toString()
    };
    
    setKnowledgeItems([...knowledgeItems, newKnowledgeItem]);
    setNewItem({
      title: '',
      content: '',
      category: 'Products'
    });
    
    toast({
      title: "Item Added",
      description: "Knowledge base item has been added"
    });
  };
  
  const handleDeleteItem = (id: string) => {
    setKnowledgeItems(knowledgeItems.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "Knowledge base item has been removed"
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database size={20} />
          Knowledge Base
        </CardTitle>
        <CardDescription>
          Add information that your AI assistant can access during conversations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="browse">
          <TabsList className="mb-4">
            <TabsTrigger value="browse">Browse Knowledge</TabsTrigger>
            <TabsTrigger value="add">Add New Item</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search knowledge base..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-3 mt-4">
              {filteredItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No items found matching your search
                </p>
              ) : (
                filteredItems.map(item => (
                  <div key={item.id} className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <p className="text-sm mt-2 text-muted-foreground">
                      {item.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="add">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <select 
                  className="w-full border rounded-md px-3 py-2 bg-background"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value as KnowledgeItem['category']})}
                >
                  <option value="Products">Products</option>
                  <option value="Pricing">Pricing</option>
                  <option value="FAQ">FAQ</option>
                  <option value="Policies">Policies</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Title</label>
                <Input
                  placeholder="Knowledge item title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Content</label>
                <Textarea
                  placeholder="Enter the knowledge content that your AI will use..."
                  value={newItem.content}
                  onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                  rows={6}
                />
              </div>
              
              <Button onClick={handleAddItem} className="gap-2 w-full">
                <FilePlus size={16} />
                Add to Knowledge Base
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
