import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import { AtendimentoClient } from '@/data/sampleAtendimento';

interface FinanceiroInfoProps {
  cliente: AtendimentoClient;
}

export const FinanceiroInfo: React.FC<FinanceiroInfoProps> = ({ cliente }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Rendimento */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            RENDIMENTO
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Bruto:</p>
              <p className="font-bold text-base sm:text-lg break-words">{formatCurrency(cliente.rendimento.bruto)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Base de cálculo (líquido):</p>
              <p className="font-semibold text-sm break-words">{formatCurrency(cliente.rendimento.liquido)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Margem */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
            MARGEM
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">IN100:</p>
              <p className="font-bold text-base sm:text-lg text-green-600 break-words">{formatCurrency(cliente.margem.valor)}</p>
            </div>
            <div>
              <p className="text-xs text-green-600 break-words">{cliente.margem.dataAtualizacao}</p>
              <p className="text-xs break-words">Simulada: {formatCurrency(cliente.margem.simulada)} ({cliente.margem.percentual}%)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cartão RMC */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
            <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            CARTÃO RMC
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">IN100:</p>
              <p className="font-bold text-base sm:text-lg break-words">{formatCurrency(cliente.cartaoRMC.valor)}</p>
            </div>
            <div>
              <p className="text-xs text-orange-600 break-words">{cliente.cartaoRMC.dataAtualizacao}</p>
              <p className="text-xs break-words">Simulada: {formatCurrency(cliente.cartaoRMC.simulada)} ({cliente.cartaoRMC.percentual}%)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cartão RCC */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
            <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
            CARTÃO RCC
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">IN100:</p>
              <p className="font-bold text-base sm:text-lg text-purple-600 break-words">{formatCurrency(cliente.cartaoRCC.valor)}</p>
            </div>
            <div>
              <p className="text-xs text-purple-600 break-words">{cliente.cartaoRCC.dataAtualizacao}</p>
              <p className="text-xs break-words">Simulada: {formatCurrency(cliente.cartaoRCC.simulada)} ({cliente.cartaoRCC.percentual}%)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};