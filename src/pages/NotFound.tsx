
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F8FBFE]">
      <div className="text-center max-w-md">
        <div className="mb-6 text-[#012742] flex justify-center">
          <div className="relative">
            <div className="text-9xl font-bold">4</div>
            <div className="absolute top-0 left-[52%] transform -translate-x-1/2 text-9xl font-bold">
              0
            </div>
            <div className="absolute top-0 right-0 text-9xl font-bold">4</div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-[#012742]">Página Não Encontrada</h1>
        <p className="text-muted-foreground mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <Home size={16} />
              Voltar ao Início
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft size={16} className="mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
