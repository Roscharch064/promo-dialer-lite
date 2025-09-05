import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Lock, Building, Server } from 'lucide-react';

interface LoginFormProps {
  onLogin: (empresa: string, operador: string, senha: string, servidor: string) => Promise<void>;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const [empresa, setEmpresa] = useState('');
  const [operador, setOperador] = useState('');
  const [senha, setSenha] = useState('');
  const [servidor, setServidor] = useState('https://promobank.com.br');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!empresa || !operador || !senha) {
      return;
    }
    
    try {
      await onLogin(empresa, operador, senha, servidor);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-button">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">PROMODialer</h1>
          <p className="text-muted-foreground">Cliente VoIP PromoBank</p>
        </div>

        <Card className="shadow-card border-0 gradient-card">
          <CardHeader>
            <CardTitle className="text-center text-xl">Conectar ao PromoBank</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Empresa
                </label>
                <Input
                  type="text"
                  placeholder="Nome da empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  required
                  className="transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Operador
                </label>
                <Input
                  type="text"
                  placeholder="Nome do operador"
                  value={operador}
                  onChange={(e) => setOperador(e.target.value)}
                  required
                  className="transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Senha
                </label>
                <Input
                  type="password"
                  placeholder="Senha de acesso"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Servidor PromoBank
                </label>
                <Input
                  type="url"
                  placeholder="https://promobank.com.br"
                  value={servidor}
                  onChange={(e) => setServidor(e.target.value)}
                  className="transition-smooth"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium py-3 shadow-button transition-smooth"
                disabled={isLoading || !empresa || !operador || !senha}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="loading-spinner" />
                    Conectando...
                  </div>
                ) : (
                  'Conectar'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};