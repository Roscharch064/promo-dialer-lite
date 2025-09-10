import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FileText, Plus, RotateCcw } from 'lucide-react';
import { AtendimentoClient } from '@/data/sampleAtendimento';

interface ContratosAtivosProps {
  cliente: AtendimentoClient;
}

export const ContratosAtivos: React.FC<ContratosAtivosProps> = ({ cliente }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Contratos Ativos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-base sm:text-lg">CONTRATOS ATIVOS</span>
            </div>
            <Button size="sm" variant="outline" className="text-xs sm:text-sm w-fit">
              <Badge className="mr-2">💰</Badge>
              <span className="hidden sm:inline">SALDO DEVEDOR ONLINE</span>
              <span className="sm:hidden">SALDO ONLINE</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <div className="min-w-[800px] sm:min-w-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">BANCO</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">AVERBAÇÃO</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">PRAZO</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">PARCELA</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">TAXA</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">CONTRATO</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">SALDO QUIT.</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">VALOR FIN.</th>
                    <th className="text-center p-1 sm:p-2 text-xs sm:text-sm font-medium">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {cliente.contratosAtivos.map((contrato) => (
                    <tr key={contrato.id} className="border-b hover:bg-muted/50">
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{contrato.banco}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{contrato.averbacao} ℹ️</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{contrato.prazo} ℹ️</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{formatCurrency(contrato.parcela)}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{contrato.taxa}%</td>
                      <td className="p-1 sm:p-2">
                        <Badge variant="outline" className="text-xs">{contrato.contrato} 📋</Badge>
                      </td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{formatCurrency(contrato.saldoQuitacao)}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{formatCurrency(contrato.valorFinanciado)}</td>
                      <td className="p-1 sm:p-2 text-center">
                        <div className="flex items-center justify-center">
                          <input type="checkbox" className="mr-1 sm:mr-2" />
                          <Badge className="bg-blue-100 text-blue-800 text-xs">🛒</Badge>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cartões Ativos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">CARTÕES ATIVOS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <div className="min-w-[600px] sm:min-w-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">TIPO</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">BANCO</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">CONTRATO</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">AVERBAÇÃO</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">PARCELA</th>
                    <th className="text-left p-1 sm:p-2 text-xs sm:text-sm font-medium">VLR. CONTRATO</th>
                  </tr>
                </thead>
                <tbody>
                  {cliente.cartoesAtivos.map((cartao, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-1 sm:p-2">
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 text-xs">
                          {cartao.tipo}
                        </Badge>
                      </td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{cartao.banco}</td>
                      <td className="p-1 sm:p-2">
                        <Badge variant="outline" className="text-xs">{cartao.contrato} 📋</Badge>
                      </td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{cartao.averbacao}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{formatCurrency(cartao.parcela)}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{formatCurrency(cartao.valorContrato)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seções de Simulação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Margem */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-green-600">MARGEM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Valor da Parcela</label>
                <Input 
                  value="R$ 773,15" 
                  className="font-semibold text-sm" 
                  readOnly 
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Banco</label>
                <Select defaultValue="">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banrisul">Banrisul</SelectItem>
                    <SelectItem value="bradesco">Bradesco</SelectItem>
                    <SelectItem value="itau">Itaú</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Tabela</label>
                <Select defaultValue="">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tab1">Tabela 1</SelectItem>
                    <SelectItem value="tab2">Tabela 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Prazo 📊</label>
                <Select defaultValue="">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Valor Líquido</label>
                <Input value="R$ 0,00" className="text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Coeficiente</label>
                <Input value="0,00000" className="text-sm" />
              </div>
            </div>
            <Button size="sm" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
            </Button>
          </CardContent>
        </Card>

        {/* RMC */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-orange-600">RMC</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Valor da Parcela</label>
                <Input 
                  value="R$ 43,18" 
                  className="font-semibold text-sm" 
                  readOnly 
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Banco</label>
                <Select defaultValue="">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banrisul">Banrisul</SelectItem>
                    <SelectItem value="bradesco">Bradesco</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Tabela</label>
                <Select defaultValue="">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tab1">Tabela 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Prazo 📊</label>
                <Select defaultValue="">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Valor do saque 70%</label>
                <Input value="R$ 0,00" className="text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Disponível no cartão (30%)</label>
                <Input value="R$ 0,00" className="text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Total da operação</label>
                <Input value="R$ 0,00" className="text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Coeficiente</label>
                <Input value="0,00000" className="text-sm" />
              </div>
            </div>
            <Button size="sm" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
            </Button>
          </CardContent>
        </Card>

        {/* RCC */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-purple-600">RCC</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Valor da Parcela</label>
                <Input value="R$ 171,28" className="font-semibold text-sm" readOnly />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Banco</label>
                <Select defaultValue="">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banrisul">Banrisul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Tabela</label>
                <Select defaultValue="">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tab1">Tabela 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Prazo 📊</label>
                <Select defaultValue="">
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Valor do saque 70%</label>
                <Input value="R$ 0,00" className="text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Disponível no cartão (30%)</label>
                <Input value="R$ 0,00" className="text-sm" />
              </div>
            </div>
            <Button size="sm" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};