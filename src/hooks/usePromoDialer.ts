import { useState, useEffect } from 'react';
import { Client, sampleClients } from '@/data/sampleClients';

export interface LogEntry {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

export interface OperatorInfo {
  nome: string;
  empresa: string;
  servidor: string;
}

export type ConnectionStatus = 'connected' | 'offline' | 'error';

export const usePromoDialer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [operatorInfo, setOperatorInfo] = useState<OperatorInfo | null>(null);
  const [clientList, setClientList] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('offline');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(() => console.log('Service Worker registration failed'));
    }

    // Load cached data
    const cachedOperator = localStorage.getItem('promodialer-operator');
    const cachedClients = localStorage.getItem('promodialer-clients');
    
    if (cachedOperator) {
      setOperatorInfo(JSON.parse(cachedOperator));
      setIsAuthenticated(true);
      setConnectionStatus('connected');
    }
    
    if (cachedClients) {
      const clients = JSON.parse(cachedClients);
      setClientList(clients);
      setFilteredClients(clients);
    }
  }, []);

  const authenticatePromoBank = async (empresa: string, operador: string, senha: string, servidor: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const operator: OperatorInfo = {
        nome: operador,
        empresa,
        servidor
      };
      
      setOperatorInfo(operator);
      setIsAuthenticated(true);
      setConnectionStatus('connected');
      setClientList(sampleClients);
      setFilteredClients(sampleClients);
      
      // Cache data
      localStorage.setItem('promodialer-operator', JSON.stringify(operator));
      localStorage.setItem('promodialer-clients', JSON.stringify(sampleClients));
      
      addLog(`Login realizado com sucesso: ${operador}@${empresa}`, 'success');
      
    } catch (error) {
      setConnectionStatus('error');
      addLog('Erro ao conectar com PromoBank', 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const makePhoneCall = (client: Client) => {
    const phoneUrl = `tel:+55${client.telefone}`;
    window.open(phoneUrl, '_self');
    addLog(`Ligação iniciada para ${client.nome} (${client.telefone})`, 'info');
  };

  const makeWhatsAppCall = (client: Client) => {
    const whatsappUrl = `whatsapp://send?phone=55${client.whatsapp}`;
    window.open(whatsappUrl, '_self');
    addLog(`WhatsApp Call para ${client.nome} (${client.whatsapp})`, 'info');
  };

  const sendWhatsAppMessage = (client: Client, customMessage?: string) => {
    const defaultMessage = `Olá ${client.nome}, sou ${operatorInfo?.nome} da ${operatorInfo?.empresa}. Tenho uma proposta de crédito consignado que pode ser interessante para você.`;
    const message = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `whatsapp://send?phone=55${client.whatsapp}&text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_self');
    addLog(`Mensagem WhatsApp enviada para ${client.nome}`, 'success');
  };

  const sendSMS = (client: Client, customMessage?: string) => {
    const defaultMessage = `Olá ${client.nome}, ${operatorInfo?.nome} da ${operatorInfo?.empresa}. Proposta de crédito consignado disponível.`;
    const message = customMessage || defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    const smsUrl = `sms:+55${client.telefone}?body=${encodedMessage}`;
    
    window.open(smsUrl, '_self');
    addLog(`SMS enviado para ${client.nome} (${client.telefone})`, 'success');
  };

  const updateClientTabulacao = (id: string, tabulacao: string) => {
    const updatedClients = clientList.map(client =>
      client.id === id 
        ? { ...client, tabulacao, ultimoContato: new Date().toISOString().split('T')[0] }
        : client
    );
    
    setClientList(updatedClients);
    setFilteredClients(updatedClients);
    localStorage.setItem('promodialer-clients', JSON.stringify(updatedClients));
    
    const client = clientList.find(c => c.id === id);
    addLog(`Tabulação atualizada: ${client?.nome} - ${tabulacao}`, 'success');
  };

  const filterClients = (filter: string) => {
    let filtered = clientList;
    
    switch (filter) {
      case 'alta':
        filtered = clientList.filter(client => client.prioridade === 'Alta');
        break;
      case 'callback':
        filtered = clientList.filter(client => client.tabulacao === 'Callback');
        break;
      case 'whatsapp':
        filtered = clientList.filter(client => client.whatsapp);
        break;
      default:
        filtered = clientList;
    }
    
    setFilteredClients(filtered);
  };

  const searchClients = (query: string) => {
    if (!query.trim()) {
      setFilteredClients(clientList);
      return;
    }
    
    const filtered = clientList.filter(client =>
      client.nome.toLowerCase().includes(query.toLowerCase()) ||
      client.telefone.includes(query)
    );
    
    setFilteredClients(filtered);
  };

  const addLog = (message: string, type: LogEntry['type']) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };
    
    setLogs(prev => [newLog, ...prev.slice(0, 99)]); // Keep last 100 logs
  };

  const clearLogs = () => {
    setLogs([]);
    addLog('Logs limpos pelo usuário', 'info');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setOperatorInfo(null);
    setConnectionStatus('offline');
    localStorage.removeItem('promodialer-operator');
    addLog('Logout realizado', 'info');
  };

  const refreshClients = async () => {
    setIsLoading(true);
    try {
      // Simulate API refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      setClientList([...sampleClients]);
      setFilteredClients([...sampleClients]);
      addLog('Lista de clientes atualizada', 'success');
    } catch (error) {
      addLog('Erro ao atualizar lista de clientes', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    isAuthenticated,
    operatorInfo,
    clientList,
    filteredClients,
    logs,
    connectionStatus,
    isLoading,
    
    // Actions
    authenticatePromoBank,
    makePhoneCall,
    makeWhatsAppCall,
    sendWhatsAppMessage,
    sendSMS,
    updateClientTabulacao,
    filterClients,
    searchClients,
    addLog,
    clearLogs,
    logout,
    refreshClients
  };
};