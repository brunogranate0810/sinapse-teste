
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Save, Move } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  text: string;
  description?: string;
}

export function QualificationQuestions() {
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', text: 'Qual é o tamanho da sua empresa?', description: 'Para entender o porte do cliente' },
    { id: '2', text: 'Qual é o seu principal desafio de vendas?', description: 'Para alinhar com nossas soluções' },
    { id: '3', text: 'Qual é o seu orçamento mensal para ferramentas de marketing?', description: 'Para recomendar o plano adequado' }
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const newId = Date.now().toString();
    setQuestions([...questions, { 
      id: newId, 
      text: newQuestion,
      description: newDescription 
    }]);
    setNewQuestion('');
    setNewDescription('');
  };
  
  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };
  
  const handleEditQuestion = (id: string) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      setEditingId(id);
      setNewQuestion(question.text);
      setNewDescription(question.description || '');
    }
  };
  
  const handleSaveEdit = () => {
    if (!editingId || !newQuestion.trim()) return;
    
    setQuestions(questions.map(q => 
      q.id === editingId 
        ? { ...q, text: newQuestion, description: newDescription }
        : q
    ));
    
    setEditingId(null);
    setNewQuestion('');
    setNewDescription('');
  };
  
  const moveQuestion = (fromIndex: number, toIndex: number) => {
    const updatedQuestions = [...questions];
    const [movedItem] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, movedItem);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Adicionar Nova Pergunta</h3>
        <div className="space-y-3">
          <Input 
            placeholder="Digite a pergunta de qualificação..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <Textarea 
            placeholder="Descrição ou contexto (opcional)..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            {editingId ? (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingId(null);
                    setNewQuestion('');
                    setNewDescription('');
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit}>
                  <Save size={16} className="mr-1" /> Salvar Edição
                </Button>
              </div>
            ) : (
              <Button onClick={handleAddQuestion} disabled={!newQuestion.trim()}>
                <Plus size={16} className="mr-1" /> Adicionar Pergunta
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="divide-y">
        {questions.map((question, index) => (
          <div 
            key={question.id}
            className={cn(
              "py-3 flex gap-3 items-start",
              editingId === question.id ? "opacity-50" : ""
            )}
          >
            <div className="flex-shrink-0 text-muted-foreground cursor-move">
              <Move size={16} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{question.text}</p>
              {question.description && (
                <p className="text-xs text-muted-foreground mt-1">{question.description}</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEditQuestion(question.id)}
                disabled={Boolean(editingId)}
              >
                Editar
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDeleteQuestion(question.id)}
                disabled={Boolean(editingId)}
              >
                <Trash2 size={14} className="text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
