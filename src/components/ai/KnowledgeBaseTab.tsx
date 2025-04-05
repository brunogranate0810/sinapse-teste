
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { KnowledgeBase } from '@/components/ai/KnowledgeBase';
import { useToast } from '@/hooks/use-toast';

export function KnowledgeBaseTab() {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Base de Conhecimento</span>
          <Button 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => {
              toast({
                title: "Adicionar Documento",
                description: "Selecione os documentos para treinar sua IA.",
              });
            }}
          >
            <Plus size={16} /> Adicionar Documento
          </Button>
        </CardTitle>
        <CardDescription>
          Forneça informações sobre seus produtos e serviços para a IA consultar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <KnowledgeBase />
      </CardContent>
    </Card>
  );
}
