
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PlaybookEditor } from '@/components/ai/PlaybookEditor';
import { useToast } from '@/hooks/use-toast';

export function PlaybooksTab() {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Playbooks de Vendas</span>
          <Button 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => {
              toast({
                title: "Novo Playbook",
                description: "Editor de playbook aberto. Crie seu fluxo de vendas.",
              });
            }}
          >
            <Plus size={16} /> Novo Playbook
          </Button>
        </CardTitle>
        <CardDescription>
          Crie roteiros para sua IA seguir em diferentes cenários de vendas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PlaybookEditor />
      </CardContent>
    </Card>
  );
}
