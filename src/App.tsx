import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePromoDialer } from '@/hooks/usePromoDialer';
import { LoginForm } from '@/components/LoginForm';
import { Dashboard } from '@/components/Dashboard';
import { AtendimentoClient } from '@/components/AtendimentoClient';
import { LogSystem } from '@/components/LogSystem';
import { MessageTemplates } from '@/components/MessageTemplates';
import { Navigation } from '@/components/Navigation';

const queryClient = new QueryClient();

const PromoDialerApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const {
    isAuthenticated,
    operatorInfo,
    filteredClients,
    logs,
    connectionStatus,
    isLoading,
    isOnlineForCalls,
    whatsappTemplate,
    smsTemplate,
    authenticatePromoBank,
    makePhoneCall,
    makeWhatsAppCall,
    sendWhatsAppMessage,
    sendSMS,
    updateClientTabulacao,
    filterClients,
    searchClients,
    clearLogs,
    logout,
    refreshClients,
    toggleOnlineStatus,
    updateWhatsAppTemplate,
    updateSMSTemplate
  } = usePromoDialer();

  if (!isAuthenticated) {
    return (
      <LoginForm 
        onLogin={authenticatePromoBank}
        isLoading={isLoading}
      />
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            operatorInfo={operatorInfo!}
            connectionStatus={connectionStatus}
            clientCount={filteredClients.length}
            isOnlineForCalls={isOnlineForCalls}
            onToggleOnlineStatus={toggleOnlineStatus}
          />
        );
      case 'atendimento':
        return (
          <AtendimentoClient
            onMakeCall={(phone) => {
              const phoneUrl = `tel:+55${phone}`;
              window.open(phoneUrl, '_self');
            }}
            onWhatsAppMessage={(phone) => {
              const whatsappUrl = `whatsapp://send?phone=55${phone}`;
              window.open(whatsappUrl, '_self');
            }}
            onSendSMS={(phone) => {
              const smsUrl = `sms:+55${phone}`;
              window.open(smsUrl, '_self');
            }}
          />
        );
      case 'logs':
        return (
          <LogSystem
            logs={logs}
            onClearLogs={clearLogs}
          />
        );
      case 'messages':
        return (
          <MessageTemplates
            operatorInfo={operatorInfo!}
            whatsappTemplate={whatsappTemplate}
            smsTemplate={smsTemplate}
            onUpdateWhatsAppTemplate={updateWhatsAppTemplate}
            onUpdateSMSTemplate={updateSMSTemplate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        operatorInfo={operatorInfo!}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={logout}
      />
      
      <main className="container py-6">
        {renderActiveTab()}
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PromoDialerApp />} />
          <Route path="*" element={<PromoDialerApp />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
