import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/Layout.jsx";
import Home from "@/pages/Home.jsx";
import About from "@/pages/About.jsx";
import Prediction from "@/pages/Prediction.jsx";
import Chatbot from "@/pages/Chatbot.jsx";
import HelpfulAdvice from "@/pages/HelpfulAdvice.jsx";
import NotFound from "@/pages/NotFound.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/advice" element={<HelpfulAdvice />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
