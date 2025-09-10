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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Rendimento */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-500" />
            RENDIMENTO
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">Bruto:</p>
              <p className="font-bold text-lg">{formatCurrency(cliente.rendimento.bruto)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Base de cálculo (líquido):</p>
              <p className="font-semibold">{formatCurrency(cliente.rendimento.liquido)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Margem */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            MARGEM
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">IN100:</p>
              <p className="font-bold text-lg text-green-600">{formatCurrency(cliente.margem.valor)}</p>
            </div>
            <div>
              <p className="text-xs text-green-600">{cliente.margem.dataAtualizacao}</p>
              <p className="text-xs">Simulada: {formatCurrency(cliente.margem.simulada)} ({cliente.margem.percentual}%)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cartão RMC */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-orange-500" />
            CARTÃO RMC
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">IN100:</p>
              <p className="font-bold text-lg">{formatCurrency(cliente.cartaoRMC.valor)}</p>
            </div>
            <div>
              <p className="text-xs text-orange-600">{cliente.cartaoRMC.dataAtualizacao}</p>
              <p className="text-xs">Simulada: {formatCurrency(cliente.cartaoRMC.simulada)} ({cliente.cartaoRMC.percentual}%)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cartão RCC */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-purple-500" />
            CARTÃO RCC
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground">IN100:</p>
              <p className="font-bold text-lg text-purple-600">{formatCurrency(cliente.cartaoRCC.valor)}</p>
            </div>
            <div>
              <p className="text-xs text-purple-600">{cliente.cartaoRCC.dataAtualizacao}</p>
              <p className="text-xs">Simulada: {formatCurrency(cliente.cartaoRCC.simulada)} ({cliente.cartaoRCC.percentual}%)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};