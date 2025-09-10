import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, Send, Calendar } from 'lucide-react';
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
      {/* Header com informações do cliente */}
      <div className="bg-gradient-primary text-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Cliente já atendido!</h2>
            <p className="text-white/80">
              Você atendeu esse cliente no dia 19/08/2025 às 10:49. 
              Último contato: {ultimoContato || '(55) 98145-9194'}
            </p>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => setShowQualificacao(true)}
            className="bg-white/20 text-white border-white/20 hover:bg-white/30"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Histórico de Atendimento
          </Button>
        </div>
      </div>

      {/* Tabs de navegação */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <Button variant="default" size="sm" className="flex-1">
          Dados Pessoais
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          Dados Financeiros  
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          Endereço
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          Análise
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal - Dados do cliente */}
        <div className="lg:col-span-2 space-y-6">
          <ClienteInfo cliente={cliente} />
          <FinanceiroInfo cliente={cliente} />
          <ContratosAtivos cliente={cliente} />
        </div>

        {/* Coluna lateral - Contatos */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contatos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cliente.contatos.telefones.map((telefone, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{telefone}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      Telefone {index + 1}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => handleContato('Ligação', telefone)}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="h-8 w-8"
                      onClick={() => handleContato('WhatsApp', telefone)}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="h-8 w-8" 
                      onClick={() => handleContato('SMS', telefone)}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button 
                onClick={() => setShowQualificacao(true)}
                className="w-full mt-4"
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