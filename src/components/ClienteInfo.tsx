import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { AtendimentoClient } from '@/data/sampleAtendimento';

interface ClienteInfoProps {
  cliente: AtendimentoClient;
}

export const ClienteInfo: React.FC<ClienteInfoProps> = ({ cliente }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
          Dados Pessoais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">BENEFÍCIO</label>
              <p className="font-semibold text-sm sm:text-base break-all">{cliente.beneficio}</p>
            </div>
            
            <div>
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">CPF</label>
              <p className="font-semibold text-sm sm:text-base break-all">{cliente.cpf}</p>
            </div>
            
            <div>
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">NOME</label>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-sm sm:text-base break-words min-w-0 flex-1">{cliente.nome}</p>
                <Badge variant="secondary" className="text-xs shrink-0">👤</Badge>
              </div>
            </div>
            
            <div>
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">NASCIMENTO</label>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-sm sm:text-base min-w-0">{cliente.nascimento} - {cliente.idade} anos</p>
                <Badge variant="secondary" className="text-xs shrink-0">📅</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">DIB</label>
              <p className="font-semibold text-sm sm:text-base">{cliente.dib}</p>
            </div>
            
            <div>
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">ESPÉCIE</label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Badge 
                  variant={cliente.status === 'ATIVO' ? 'default' : 'secondary'}
                  className="bg-green-100 text-green-800 border-green-200 text-xs shrink-0 w-fit"
                >
                  {cliente.status}
                </Badge>
                <p className="text-xs sm:text-sm break-words min-w-0">{cliente.especie}</p>
              </div>
            </div>
            
            <div>
              <label className="text-xs sm:text-sm font-medium text-muted-foreground">REPRESENTANTE LEGAL</label>
              <p className="font-semibold text-sm sm:text-base break-words">{cliente.representanteLegal || 'Não possui'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};