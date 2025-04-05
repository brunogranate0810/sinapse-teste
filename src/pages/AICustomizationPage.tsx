
import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaybookEditor } from '@/components/ai/PlaybookEditor';
import { KnowledgeBase } from '@/components/ai/KnowledgeBase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CircleHelp, HelpCircle, Plus, Save } from 'lucide-react';

const AICustomizationPage = () => {
  return (
    <AppLayout title="AI Customization">
      <Tabs defaultValue="playbook" className="space-y-6">
        <TabsList>
          <TabsTrigger value="playbook">Conversation Playbook</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="qualification">Qualification Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="playbook">
          <PlaybookEditor />
        </TabsContent>
        
        <TabsContent value="knowledge">
          <KnowledgeBase />
        </TabsContent>
        
        <TabsContent value="qualification">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle size={20} />
                Qualification Questions
              </CardTitle>
              <CardDescription>
                Define questions that your AI will ask to qualify leads. These help determine if a lead is a good fit for your product or service.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Question 1</h3>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                  
                  <Input
                    defaultValue="What industry is your company in?"
                    className="mb-2"
                  />
                  
                  <div>
                    <p className="text-sm mb-2 text-muted-foreground">Follow-up actions based on response:</p>
                    <Textarea
                      rows={3}
                      defaultValue="If they mention healthcare, education, or finance, ask about compliance requirements. For retail or e-commerce, ask about their current customer service volume. For other industries, ask about their team size."
                    />
                  </div>
                </div>
                
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Question 2</h3>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                  
                  <Input
                    defaultValue="How many customer service agents do you currently have?"
                    className="mb-2"
                  />
                  
                  <div>
                    <p className="text-sm mb-2 text-muted-foreground">Follow-up actions based on response:</p>
                    <Textarea
                      rows={3}
                      defaultValue="If less than 5, recommend our Small Business plan. If 5-20, recommend our Business plan. If more than 20, recommend our Enterprise plan and offer to connect them with an account executive."
                    />
                  </div>
                </div>
                
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Question 3</h3>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                  
                  <Input
                    defaultValue="What's your timeline for implementing a new customer service solution?"
                    className="mb-2"
                  />
                  
                  <div>
                    <p className="text-sm mb-2 text-muted-foreground">Follow-up actions based on response:</p>
                    <Textarea
                      rows={3}
                      defaultValue="If they say 'immediately' or 'as soon as possible', offer to schedule a demo within 48 hours. If within 1-3 months, offer to send detailed product information. If longer than 3 months, suggest adding them to our newsletter for updates."
                    />
                  </div>
                </div>
                
                <Button className="w-full">
                  <Plus size={16} className="mr-1" />
                  Add Question
                </Button>
                
                <div className="flex justify-end">
                  <Button className="gap-1">
                    <Save size={16} />
                    Save Questions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

export default AICustomizationPage;
