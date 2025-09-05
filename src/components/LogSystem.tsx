import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Trash2,
  Clock,
  Activity
} from 'lucide-react';
import { LogEntry } from '@/hooks/usePromoDialer';

interface LogSystemProps {
  logs: LogEntry[];
  onClearLogs: () => void;
}

export const LogSystem: React.FC<LogSystemProps> = ({ logs, onClearLogs }) => {
  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'info':
        return <Info className="w-4 h-4 text-primary" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-error" />;
      default:
        return <Info className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getLogBadgeStyle = (type: LogEntry['type']) => {
    switch (type) {
      case 'info':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(timestamp);
  };

  const logTypeCounts = logs.reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      {/* Header with Stats */}
      <Card className="shadow-card border-0 gradient-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Sistema de Logs
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearLogs}
              disabled={logs.length === 0}
            >
              <Trash2 className="w-3 h-3" />
              Limpar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{logTypeCounts.info || 0}</div>
              <div className="text-xs text-muted-foreground">Info</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-success">{logTypeCounts.success || 0}</div>
              <div className="text-xs text-muted-foreground">Sucesso</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-warning">{logTypeCounts.warning || 0}</div>
              <div className="text-xs text-muted-foreground">Aviso</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-error">{logTypeCounts.error || 0}</div>
              <div className="text-xs text-muted-foreground">Erro</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log Entries */}
      <div className="space-y-2">
        {logs.length === 0 ? (
          <Card className="shadow-card border-0">
            <CardContent className="p-8 text-center">
              <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum log registrado</h3>
              <p className="text-muted-foreground">
                As ações realizadas aparecerão aqui automaticamente
              </p>
            </CardContent>
          </Card>
        ) : (
          logs.map((log) => (
            <Card key={log.id} className="shadow-card border-0">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getLogIcon(log.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        {log.message}
                      </p>
                      <Badge className={getLogBadgeStyle(log.type)}>
                        {log.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(log.timestamp)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {logs.length > 10 && (
        <div className="text-center text-xs text-muted-foreground">
          Mostrando {logs.length} registros
        </div>
      )}
    </div>
  );
};