import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Phone, MessageCircle, TrendingUp, Wifi, WifiOff, PhoneCall, PhoneOff } from 'lucide-react';
import { OperatorInfo, ConnectionStatus } from '@/hooks/usePromoDialer';

interface DashboardProps {
  operatorInfo: OperatorInfo;
  connectionStatus: ConnectionStatus;
  clientCount: number;
  isOnlineForCalls: boolean;
  onToggleOnlineStatus: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  operatorInfo, 
  connectionStatus, 
  clientCount,
  isOnlineForCalls,
  onToggleOnlineStatus
}) => {
  const stats = [
    {
      title: 'Total Clientes',
      value: clientCount.toString(),
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Chamadas Hoje',
      value: '12',
      icon: Phone,
      color: 'text-success'
    },
    {
      title: 'Mensagens Hoje',
      value: '8',
      icon: MessageCircle,
      color: 'text-warning'
    },
    {
      title: 'Conversões',
      value: '3',
      icon: TrendingUp,
      color: 'text-success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-primary rounded-xl p-6 text-white shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Olá, {operatorInfo.nome}!</h2>
            <p className="text-white/80">{operatorInfo.empresa}</p>
          </div>
          <div className="flex items-center gap-2">
            {connectionStatus === 'connected' ? (
              <Wifi className="w-5 h-5 text-white" />
            ) : (
              <WifiOff className="w-5 h-5 text-white/60" />
            )}
            <span className="text-sm text-white/80">
              {connectionStatus === 'connected' ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        
        {/* Call Status Toggle */}
        <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div className="flex items-center gap-3">
            {isOnlineForCalls ? (
              <PhoneCall className="w-5 h-5 text-white" />
            ) : (
              <PhoneOff className="w-5 h-5 text-white/60" />
            )}
            <div>
              <p className="text-sm font-medium text-white">
                Status para Chamadas
              </p>
              <p className="text-xs text-white/70">
                {isOnlineForCalls ? 'Disponível para receber chamadas' : 'Indisponível para chamadas'}
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onToggleOnlineStatus}
            className={`${
              isOnlineForCalls 
                ? 'bg-white/20 text-white hover:bg-white/30' 
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {isOnlineForCalls ? 'Online' : 'Offline'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card border-0 gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg">Funcionalidades Disponíveis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Ligações via discador nativo</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Chamadas e mensagens WhatsApp</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Envio de SMS nativo</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Tabulação rápida de clientes</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Sincronização automática</span>
          </div>
        </CardContent>
      </Card>

      {/* Connection Status */}
      <Card className={`shadow-card border-0 ${
        connectionStatus === 'connected' 
          ? 'bg-success/10 border-success/20' 
          : 'bg-error/10 border-error/20'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'status-online' : 'status-offline'
            }`} />
            <div>
              <p className="font-medium">
                {connectionStatus === 'connected' ? 'Conectado ao PromoBank' : 'Desconectado'}
              </p>
              <p className="text-sm text-muted-foreground">
                Servidor: {operatorInfo.servidor}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};