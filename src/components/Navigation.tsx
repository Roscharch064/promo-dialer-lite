import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Activity, LogOut, User, MessageSquare } from 'lucide-react';
import { OperatorInfo } from '@/hooks/usePromoDialer';

interface NavigationProps {
  operatorInfo: OperatorInfo;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  operatorInfo,
  activeTab,
  onTabChange,
  onLogout
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
    { id: 'logs', label: 'Logs', icon: Activity }
  ];

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-primary text-white shadow-card sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">{operatorInfo.nome}</h1>
              <p className="text-white/80 text-xs">{operatorInfo.empresa}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-card shadow-sm border-b sticky top-[72px] z-40">
        <div className="container">
          <div className="flex">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                className={`flex-1 rounded-none border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};