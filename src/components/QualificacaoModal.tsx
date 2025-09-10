import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Calendar, Phone, CheckCircle, XCircle } from 'lucide-react';
import { qualificacaoOptions } from '@/data/sampleAtendimento';

interface QualificacaoModalProps {
  open: boolean;
  onClose: () => void;
  onQualificar: (qualificacao: string, observacao?: string) => void;
}

export const QualificacaoModal: React.FC<QualificacaoModalProps> = ({
  open,
  onClose,
  onQualificar
}) => {
  const [selectedQualificacao, setSelectedQualificacao] = useState<string>('');
  const [observacao, setObservacao] = useState('');
  const [perfilQualificacao, setPerfilQualificacao] = useState('');

  const handleSalvar = () => {
    if (selectedQualificacao) {
      onQualificar(selectedQualificacao, observacao);
      setSelectedQualificacao('');
      setObservacao('');
      setPerfilQualificacao('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] w-[95vw] sm:w-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">ATENDIMENTO</DialogTitle>
        </DialogHeader>

        {/* Navigation tabs */}
        <div className="flex flex-wrap bg-gradient-primary text-white rounded-lg p-1 gap-1">
          <Button variant="ghost" size="sm" className="flex-1 min-w-0 bg-white/20 text-white text-xs sm:text-sm">
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Propostas</span>
            <span className="sm:hidden">Prop.</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 min-w-0 text-white/80 text-xs sm:text-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Qualificação do Atendimento</span>
            <span className="sm:hidden">Qualif.</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 min-w-0 text-white/80 text-xs sm:text-sm">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Agendamento do Retorno</span>
            <span className="sm:hidden">Agendar</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 min-w-0 text-white/80 text-xs sm:text-sm">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Qualificação do Telefone</span>
            <span className="sm:hidden">Telefone</span>
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Qualificação do Atendimento</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Perfil de Qualificação*</label>
                <Select value={perfilQualificacao} onValueChange={setPerfilQualificacao}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Padrão Sistema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="padrao">Padrão Sistema</SelectItem>
                    <SelectItem value="customizado">Customizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Selecione uma qualificação de atendimento*:</label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Qualificação Positiva */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-600">Qualificação Positiva* 👍</h4>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                      {qualificacaoOptions.positivas.map((opcao) => (
                        <label key={opcao} className="flex items-center space-x-2 cursor-pointer hover:bg-green-50 p-2 rounded">
                          <input
                            type="radio"
                            name="qualificacao"
                            value={opcao}
                            checked={selectedQualificacao === opcao}
                            onChange={(e) => setSelectedQualificacao(e.target.value)}
                            className="text-green-600"
                          />
                          <span className="text-sm">{opcao}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Qualificação Negativa */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h4 className="font-medium text-red-600">Qualificação Negativa* 🔇</h4>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                      {qualificacaoOptions.negativas.map((opcao) => (
                        <label key={opcao} className="flex items-center space-x-2 cursor-pointer hover:bg-red-50 p-2 rounded">
                          <input
                            type="radio"
                            name="qualificacao"
                            value={opcao}
                            checked={selectedQualificacao === opcao}
                            onChange={(e) => setSelectedQualificacao(e.target.value)}
                            className="text-red-600"
                          />
                          <span className="text-sm">{opcao}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Observação (opcional)</label>
                <Textarea
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  placeholder="Escreva uma observação"
                  className="mt-1 min-h-[100px]"
                />
              </div>

              {!selectedQualificacao && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex items-center gap-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-sm text-yellow-800">Nenhuma proposta foi adicionada!</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleSalvar}
              disabled={!selectedQualificacao}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Salvar Atendimento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};