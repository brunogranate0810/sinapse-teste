
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';

interface ConversationSummaryProps {
  summary: string;
  className?: string;
}

export function ConversationSummary({ summary, className }: ConversationSummaryProps) {
  return (
    <Card className={cn('mt-4', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bot size={16} className="text-[#012742]" />
          Resumo da Conversa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{summary}</p>
      </CardContent>
    </Card>
  );
}
