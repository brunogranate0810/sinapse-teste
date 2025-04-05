
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { QualificationQuestions } from '@/components/ai/QualificationQuestions';

export function QualificationQuestionsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perguntas de Qualificação</CardTitle>
        <CardDescription>
          Defina as perguntas que sua IA fará para qualificar novos leads
        </CardDescription>
      </CardHeader>
      <CardContent>
        <QualificationQuestions />
      </CardContent>
    </Card>
  );
}
