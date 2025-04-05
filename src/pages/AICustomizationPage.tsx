
import React from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, FileText, BrainCircuit, MessageSquare, Plus } from 'lucide-react';

import { AISettings } from '@/components/ai/AISettings';
import { PlaybooksTab } from '@/components/ai/PlaybooksTab';
import { KnowledgeBaseTab } from '@/components/ai/KnowledgeBaseTab';
import { QualificationQuestionsTab } from '@/components/ai/QualificationQuestionsTab';

const AICustomizationPage = () => {
  return (
    <AppLayout title="Personalização da IA">
      <Tabs defaultValue="settings">
        <TabsList className="mb-6">
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings size={16} /> Configurações
          </TabsTrigger>
          <TabsTrigger value="playbooks" className="flex items-center gap-1">
            <FileText size={16} /> Playbooks
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-1">
            <BrainCircuit size={16} /> Base de Conhecimento
          </TabsTrigger>
          <TabsTrigger value="questions" className="flex items-center gap-1">
            <MessageSquare size={16} /> Perguntas de Qualificação
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings">
          <AISettings />
        </TabsContent>
        
        <TabsContent value="playbooks">
          <PlaybooksTab />
        </TabsContent>
        
        <TabsContent value="knowledge">
          <KnowledgeBaseTab />
        </TabsContent>
        
        <TabsContent value="questions">
          <QualificationQuestionsTab />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default AICustomizationPage;
