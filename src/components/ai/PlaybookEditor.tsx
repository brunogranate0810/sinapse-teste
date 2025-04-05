
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Plus, Save, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export function PlaybookEditor() {
  const { toast } = useToast();
  const [playbookName, setPlaybookName] = useState('Default Sales Funnel');
  const [playbookIntro, setPlaybookIntro] = useState(
    'This playbook guides the AI through a standard sales funnel, from initial greeting to qualification and scheduling.'
  );
  const [steps, setSteps] = useState([
    {
      id: '1',
      title: 'Initial Greeting',
      content: 'Greet the prospect warmly. Introduce yourself as an AI assistant. Ask how you can help them today.'
    },
    {
      id: '2',
      title: 'Qualification',
      content: 'Ask qualifying questions about their business needs, budget, and timeline. Document their responses.'
    },
    {
      id: '3',
      title: 'Solution Presentation',
      content: 'Based on their responses, explain how our solution addresses their specific needs.'
    },
    {
      id: '4',
      title: 'Objection Handling',
      content: 'Address common objections. If the prospect raises concerns, notify a human agent immediately.'
    },
    {
      id: '5',
      title: 'Schedule Demo',
      content: 'Offer to schedule a demo with a sales representative. Provide available time slots.'
    }
  ]);

  const addNewStep = () => {
    const newStep = {
      id: Date.now().toString(),
      title: 'New Step',
      content: 'Describe what the AI should do in this step...'
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (id: string, field: 'title' | 'content', value: string) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const deleteStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Playbook Saved",
      description: "Your AI conversation playbook has been updated",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit size={20} />
          AI Conversation Playbook
        </CardTitle>
        <CardDescription>
          Define the conversation flow for your AI assistant. These steps will guide how the AI interacts with customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label htmlFor="playbook-name" className="text-sm font-medium mb-2 block">
              Playbook Name
            </label>
            <Input
              id="playbook-name"
              value={playbookName}
              onChange={(e) => setPlaybookName(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="playbook-intro" className="text-sm font-medium mb-2 block">
              Playbook Introduction
            </label>
            <Textarea
              id="playbook-intro"
              value={playbookIntro}
              onChange={(e) => setPlaybookIntro(e.target.value)}
              rows={3}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-6">
            <h3 className="text-sm font-medium">Conversation Steps</h3>
            
            {steps.map((step, index) => (
              <div key={step.id} className="p-4 border rounded-md bg-muted/20">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Step {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteStep(step.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">
                      Title
                    </label>
                    <Input
                      value={step.title}
                      onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                      placeholder="Step title"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">
                      Instructions for AI
                    </label>
                    <Textarea
                      value={step.content}
                      onChange={(e) => updateStep(step.id, 'content', e.target.value)}
                      placeholder="What should the AI do in this step?"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              className="w-full"
              onClick={addNewStep}
            >
              <Plus size={16} className="mr-1" />
              Add Step
            </Button>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-1">
              <Save size={16} />
              Save Playbook
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
