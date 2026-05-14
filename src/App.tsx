
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Savings from "./pages/Savings";
import Loans from "./pages/Loans";
import Membership from "./pages/Membership";
import IndividualLoans from "./pages/IndividualLoans";
import IndividualSavings from "./pages/IndividualSavings";
import IndividualMembership from "./pages/IndividualMembership";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";
import Agent from "./pages/Agent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/individual/loans" element={<IndividualLoans />} />
            <Route path="/individual/savings" element={<IndividualSavings />} />
            <Route path="/individual/membership" element={<IndividualMembership />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
