import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Phone, 
  MessageCircle, 
  PhoneCall, 
  MessageSquare,
  Filter,
  RefreshCw,
  User,
  Calendar,
  DollarSign,
  Building2
} from 'lucide-react';
import { Client } from '@/data/sampleClients';

interface ClientListProps {
  clients: Client[];
  isLoading: boolean;
  onMakeCall: (client: Client) => void;
  onWhatsAppCall: (client: Client) => void;
  onWhatsAppMessage: (client: Client) => void;
  onSendSMS: (client: Client) => void;
  onUpdateTabulacao: (id: string, tabulacao: string) => void;
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
  onRefresh: () => void;
}

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  isLoading,
  onMakeCall,
  onWhatsAppCall,
  onWhatsAppMessage,
  onSendSMS,
  onUpdateTabulacao,
  onSearch,
  onFilter,
  onRefresh
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    onFilter(filter);
  };

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta': return 'bg-error/10 text-error border-error/20';
      case 'Média': return 'bg-warning/10 text-warning border-warning/20';
      case 'Baixa': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTabulacaoColor = (tabulacao: string) => {
    switch (tabulacao) {
      case 'Interessado': return 'bg-success/10 text-success border-success/20';
      case 'Callback': return 'bg-warning/10 text-warning border-warning/20';
      case 'Não Interessado': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const filters = [
    { key: 'todos', label: 'Todos' },
    { key: 'alta', label: 'Alta Prioridade' },
    { key: 'callback', label: 'Callback' },
    { key: 'whatsapp', label: 'WhatsApp' }
  ];

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <Card className="shadow-card border-0">
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilter(filter.key)}
                className="whitespace-nowrap"
              >
                <Filter className="w-3 h-3" />
                {filter.label}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="ml-auto"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client Cards */}
      <div className="space-y-3">
        {clients.length === 0 ? (
          <Card className="shadow-card border-0">
            <CardContent className="p-8 text-center">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum cliente encontrado</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Tente ajustar sua busca' : 'Carregue a lista de clientes'}
              </p>
            </CardContent>
          </Card>
        ) : (
          clients.map((client) => (
            <Card key={client.id} className="shadow-card border-0 gradient-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {client.nome}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{client.telefone}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Badge className={getPriorityColor(client.prioridade)}>
                      {client.prioridade}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Client Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Convênio:</span>
                    <span className="font-medium">{client.convenio}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Margem:</span>
                    <span className="font-medium text-success">{formatCurrency(client.margem)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Último contato:</span>
                    <span className="font-medium">{formatDate(client.ultimoContato)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getTabulacaoColor(client.tabulacao)}>
                      {client.tabulacao}
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="action"
                    size="sm"
                    onClick={() => onMakeCall(client)}
                    className="text-success border-success/20 hover:bg-success/10"
                  >
                    <Phone className="w-3 h-3" />
                    Ligar
                  </Button>
                  <Button
                    variant="action"
                    size="sm"
                    onClick={() => onWhatsAppCall(client)}
                    className="text-success border-success/20 hover:bg-success/10"
                  >
                    <PhoneCall className="w-3 h-3" />
                    WhatsApp Call
                  </Button>
                  <Button
                    variant="action"
                    size="sm"
                    onClick={() => onWhatsAppMessage(client)}
                    className="text-primary border-primary/20 hover:bg-primary/10"
                  >
                    <MessageCircle className="w-3 h-3" />
                    WhatsApp Msg
                  </Button>
                  <Button
                    variant="action"
                    size="sm"
                    onClick={() => onSendSMS(client)}
                    className="text-warning border-warning/20 hover:bg-warning/10"
                  >
                    <MessageSquare className="w-3 h-3" />
                    SMS
                  </Button>
                </div>

                {/* Tabulação Buttons */}
                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground mb-2">Tabulação Rápida:</p>
                  <div className="flex gap-1">
                    <Button
                      variant="success"
                      size="xs"
                      onClick={() => onUpdateTabulacao(client.id, 'Interessado')}
                    >
                      Interessado
                    </Button>
                    <Button
                      variant="warning"
                      size="xs"
                      onClick={() => onUpdateTabulacao(client.id, 'Callback')}
                    >
                      Callback
                    </Button>
                    <Button
                      variant="error"
                      size="xs"
                      onClick={() => onUpdateTabulacao(client.id, 'Não Interessado')}
                    >
                      Não Interessado
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};