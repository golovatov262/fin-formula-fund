
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const UnderConstruction = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', textAlign: 'center', padding: '2rem' }}>
    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</div>
    <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Сайт в разработке</h1>
    <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '400px' }}>Извините, сайт находится в разработке. Скоро вернёмся — совсем немного осталось!</p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<UnderConstruction />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;