import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, Send, Calendar, Wifi } from 'lucide-react';
import { sampleAtendimentoClient } from '@/data/sampleAtendimento';
import { ClienteInfo } from './ClienteInfo';
import { FinanceiroInfo } from './FinanceiroInfo';
import { ContratosAtivos } from './ContratosAtivos';
import { QualificacaoModal } from './QualificacaoModal';
import { usePromoDialer } from '@/hooks/usePromoDialer';

interface AtendimentoClientProps {
  onMakeCall: (phone: string) => void;
  onWhatsAppMessage: (phone: string) => void;
  onSendSMS: (phone: string) => void;
}

export const AtendimentoClient: React.FC<AtendimentoClientProps> = ({
  onMakeCall,
  onWhatsAppMessage, 
  onSendSMS
}) => {
  const [showQualificacao, setShowQualificacao] = useState(false);
  const [ultimoContato, setUltimoContato] = useState<string | null>(null);
  const { addLog } = usePromoDialer();

  const cliente = sampleAtendimentoClient;

  const handleContato = (tipo: string, telefone: string) => {
    const cleanPhone = telefone.replace(/\D/g, '');
    const timestamp = new Date().toLocaleString();
    setUltimoContato(`${tipo} - ${timestamp}`);
    
    switch (tipo) {
      case 'Ligação':
        onMakeCall(cleanPhone);
        break;
      case 'WhatsApp':
        onWhatsAppMessage(cleanPhone);
        break;
      case 'SMS':
        onSendSMS(cleanPhone);
        break;
    }
    addLog(`${tipo} realizado para ${cliente.nome} (${telefone})`, 'info');
  };

  const handleQualificacao = (qualificacao: string, observacao?: string) => {
    addLog(`Atendimento qualificado: ${qualificacao}`, 'success');
    if (observacao) {
      addLog(`Observação: ${observacao}`, 'info');
    }
    setShowQualificacao(false);
  };

  return (
    <div className="space-y-6">
      {/* Status para Chamadas */}
      <div className="bg-gradient-primary text-white p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-semibold">Olá, willan.sup07!</h3>
              <div className="flex items-center gap-1 text-sm">
                <Wifi className="w-4 h-4" />
                <span>Online</span>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-2">1111</p>
            <div className="space-y-1">
              <p className="font-medium text-sm">Status para Chamadas</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Disponível para receber chamadas</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                  Online
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header com informações do cliente */}
      <div className="bg-gradient-primary text-white p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold">Cliente já atendido!</h2>
            <p className="text-white/80 text-sm sm:text-base break-words">
              Você atendeu esse cliente no dia 19/08/2025 às 10:49.<br className="sm:hidden" />
              <span className="sm:ml-2">Último contato: {ultimoContato || '(55) 98145-9194'}</span>
            </p>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => setShowQualificacao(true)}
            className="bg-white/20 text-white border-white/20 hover:bg-white/30 shrink-0 text-sm"
            size="sm"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Histórico de Atendimento</span>
            <span className="sm:hidden">Histórico</span>
          </Button>
        </div>
      </div>

      {/* Tabs de navegação */}
      <div className="flex flex-wrap gap-1 bg-muted p-1 rounded-lg">
        <Button variant="default" size="sm" className="flex-1 min-w-0 text-xs sm:text-sm">
          Dados Pessoais
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 min-w-0 text-xs sm:text-sm">
          Dados Financeiros  
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 min-w-0 text-xs sm:text-sm">
          Endereço
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 min-w-0 text-xs sm:text-sm">
          Análise
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Coluna principal - Dados do cliente */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6 order-2 xl:order-1">
          <ClienteInfo cliente={cliente} />
          <FinanceiroInfo cliente={cliente} />
          <ContratosAtivos cliente={cliente} />
        </div>

        {/* Coluna lateral - Contatos */}
        <div className="space-y-4 order-1 xl:order-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Contatos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cliente.contatos.telefones.map((telefone, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base">{telefone}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      Telefone {index + 1}
                    </Badge>
                  </div>
                  <div className="flex gap-1 justify-end sm:justify-start shrink-0">
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="h-8 w-8 xs:h-10 xs:w-10"
                      onClick={() => handleContato('Ligação', telefone)}
                      title="Fazer ligação"
                    >
                      <Phone className="w-3 h-3 xs:w-4 xs:h-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="h-8 w-8 xs:h-10 xs:w-10"
                      onClick={() => handleContato('WhatsApp', telefone)}
                      title="Enviar WhatsApp"
                    >
                      <MessageSquare className="w-3 h-3 xs:w-4 xs:h-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="h-8 w-8 xs:h-10 xs:w-10" 
                      onClick={() => handleContato('SMS', telefone)}
                      title="Enviar SMS"
                    >
                      <Send className="w-3 h-3 xs:w-4 xs:h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button 
                onClick={() => setShowQualificacao(true)}
                className="w-full mt-4 text-sm sm:text-base"
                size="sm"
              >
                Qualificar Atendimento
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <QualificacaoModal 
        open={showQualificacao}
        onClose={() => setShowQualificacao(false)}
        onQualificar={handleQualificacao}
      />
    </div>
  );
};