
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Index";
import ChatPage from "./pages/ChatPage";
import AICustomizationPage from "./pages/AICustomizationPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import BulkMessagingPage from "./pages/BulkMessagingPage";
import ContactsPage from "./pages/ContactsPage";
import NotFound from "./pages/NotFound";

// Adicionamos o título da plataforma "Sinapse" no documento HTML
document.title = "Sinapse - Plataforma de IA para Vendas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/ai" element={<AICustomizationPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/messaging" element={<BulkMessagingPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
