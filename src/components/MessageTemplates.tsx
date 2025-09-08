import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, MessageSquare, Save, RotateCcw } from 'lucide-react';
import { OperatorInfo } from '@/hooks/usePromoDialer';

interface MessageTemplatesProps {
  operatorInfo: OperatorInfo;
  whatsappTemplate: string;
  smsTemplate: string;
  onUpdateWhatsAppTemplate: (template: string) => void;
  onUpdateSMSTemplate: (template: string) => void;
}

export const MessageTemplates: React.FC<MessageTemplatesProps> = ({
  operatorInfo,
  whatsappTemplate,
  smsTemplate,
  onUpdateWhatsAppTemplate,
  onUpdateSMSTemplate
}) => {
  const [localWhatsApp, setLocalWhatsApp] = useState(whatsappTemplate);
  const [localSMS, setLocalSMS] = useState(smsTemplate);

  const handleSaveWhatsApp = () => {
    onUpdateWhatsAppTemplate(localWhatsApp);
  };

  const handleSaveSMS = () => {
    onUpdateSMSTemplate(localSMS);
  };

  const resetWhatsAppDefault = () => {
    const defaultTemplate = `Olá {NOME}, sou ${operatorInfo?.nome} da ${operatorInfo?.empresa}. Tenho uma proposta de crédito consignado que pode ser interessante para você.`;
    setLocalWhatsApp(defaultTemplate);
  };

  const resetSMSDefault = () => {
    const defaultTemplate = `Olá {NOME}, ${operatorInfo?.nome} da ${operatorInfo?.empresa}. Proposta de crédito consignado disponível.`;
    setLocalSMS(defaultTemplate);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-primary rounded-xl p-6 text-white shadow-card">
        <h2 className="text-2xl font-bold mb-2">Modelos de Mensagem</h2>
        <p className="text-white/80">Personalize suas mensagens de WhatsApp e SMS</p>
      </div>

      {/* WhatsApp Template */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-success" />
            Modelo WhatsApp
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="whatsapp-template">Mensagem WhatsApp</Label>
            <Textarea
              id="whatsapp-template"
              value={localWhatsApp}
              onChange={(e) => setLocalWhatsApp(e.target.value)}
              placeholder="Digite sua mensagem padrão para WhatsApp..."
              className="min-h-[120px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Use <code className="bg-muted px-1 rounded">{"{NOME}"}</code> para inserir automaticamente o nome do cliente.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveWhatsApp} className="flex-1">
              <Save className="w-4 h-4" />
              Salvar WhatsApp
            </Button>
            <Button variant="outline" onClick={resetWhatsAppDefault}>
              <RotateCcw className="w-4 h-4" />
              Padrão
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SMS Template */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-warning" />
            Modelo SMS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sms-template">Mensagem SMS</Label>
            <Textarea
              id="sms-template"
              value={localSMS}
              onChange={(e) => setLocalSMS(e.target.value)}
              placeholder="Digite sua mensagem padrão para SMS..."
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Use <code className="bg-muted px-1 rounded">{"{NOME}"}</code> para inserir automaticamente o nome do cliente.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveSMS} className="flex-1">
              <Save className="w-4 h-4" />
              Salvar SMS
            </Button>
            <Button variant="outline" onClick={resetSMSDefault}>
              <RotateCcw className="w-4 h-4" />
              Padrão
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="shadow-card border-0 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">Exemplo de Mensagem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">WhatsApp Preview:</Label>
            <div className="bg-background p-3 rounded-lg border text-sm">
              {localWhatsApp.replace('{NOME}', 'João Silva')}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">SMS Preview:</Label>
            <div className="bg-background p-3 rounded-lg border text-sm">
              {localSMS.replace('{NOME}', 'João Silva')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};