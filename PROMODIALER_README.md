# PROMODialer VoIP - Progressive Web App

Cliente VoIP simplificado para operadores PromoBank realizarem ações de comunicação usando aplicativos nativos do dispositivo.

## 🚀 Características Principais

### PWA Completa
- ✅ **Instalável** como app nativo no dispositivo
- ✅ **Funciona offline** para visualizar dados já carregados
- ✅ **Service Worker** com cache de recursos estáticos
- ✅ **Manifest.json** configurado para instalação

### Funcionalidades Core
- 📱 **Integração Nativa**: Abre apps nativos (discador, WhatsApp, SMS)
- 👥 **Gestão de Clientes**: Lista completa com busca e filtros
- 📊 **Dashboard**: Estatísticas e status de conexão em tempo real
- 📝 **Tabulação Rápida**: Atualização imediata de status dos clientes
- 📋 **Sistema de Logs**: Registro completo de todas as ações
- 🔄 **Sincronização**: Dados salvos no LocalStorage

### Design Mobile-First
- 📱 **Responsivo**: Otimizado para dispositivos móveis (max-width: 420px)
- 🎨 **Gradient Design**: Gradiente azul para roxo como tema principal
- 🎯 **UX Intuitiva**: Cards com bordas arredondadas e sombras elegantes
- ⚡ **Performance**: Loading states e transições suaves

## 🛠️ Instalação e Configuração

### Pré-requisitos
```bash
Node.js 18+ e npm instalados
```

### Instalar Dependências
```bash
npm install
```

### Executar em Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Servir Build de Produção
```bash
npm run preview
```

## 📱 Como Instalar a PWA

### No Android (Chrome/Edge)
1. Acesse a aplicação no navegador
2. Toque no menu (3 pontos) 
3. Selecione "Instalar app" ou "Adicionar à tela inicial"
4. Confirme a instalação

### No iOS (Safari)
1. Acesse a aplicação no Safari
2. Toque no botão compartilhar (quadrado com seta)
3. Selecione "Adicionar à Tela de Início"
4. Confirme a instalação

### No Desktop (Chrome/Edge)
1. Acesse a aplicação
2. Clique no ícone de instalação na barra de endereços
3. Confirme "Instalar"

## 🔧 Como Usar

### 1. Login
- **Empresa**: Nome da empresa/filial
- **Operador**: Nome do operador
- **Senha**: Senha de acesso
- **Servidor**: URL do servidor PromoBank (pré-configurado)

### 2. Dashboard
- Visualize estatísticas do dia
- Verifique status de conexão
- Acesse funcionalidades disponíveis

### 3. Lista de Clientes
- **Buscar**: Por nome ou telefone
- **Filtrar**: Todos, Alta Prioridade, Callback, WhatsApp
- **Ações nativas**:
  - 📞 **Ligar**: Abre discador nativo
  - 📱 **WhatsApp Call**: Abre WhatsApp para ligação
  - 💬 **WhatsApp Msg**: Envia mensagem via WhatsApp
  - 📨 **SMS**: Abre app SMS nativo

### 4. Tabulação Rápida
- **Interessado**: Cliente demonstrou interesse
- **Callback**: Agendar nova tentativa de contato
- **Não Interessado**: Cliente rejeitou a proposta

### 5. Sistema de Logs
- Visualize todas as ações realizadas
- Filtre por tipo: Info, Sucesso, Aviso, Erro
- Limpe os logs quando necessário

## 🎨 Design System

### Cores Principais (HSL)
```css
--primary: 217 91% 60% (Azul)
--primary-dark: 262 83% 58% (Roxo)
--success: 142 76% 36% (Verde)
--warning: 38 92% 50% (Amarelo)
--error: 0 84% 60% (Vermelho)
```

### Gradientes
```css
--gradient-primary: linear-gradient(135deg, #3B82F6, #8B5CF6)
--gradient-success: linear-gradient(135deg, #10B981, #10B981)
--gradient-card: linear-gradient(145deg, #FFFFFF, #F9FAFB)
```

### Componentes
- **Cards**: Bordas arredondadas (0.75rem) com sombras elegantes
- **Botões**: Variantes para cada tipo de ação
- **Loading States**: Spinners e estados de carregamento
- **Status Indicators**: Cores específicas por status

## 📊 Dados de Exemplo

A aplicação inclui 5 clientes de exemplo para demonstração:

```javascript
const sampleClients = [
  {
    id: '001',
    nome: 'João Silva Santos',
    telefone: '11987654321',
    convenio: 'SIAPE',
    margem: 15000.00,
    prioridade: 'Alta'
  },
  // ... mais 4 clientes
];
```

## 🔗 URLs Nativas Suportadas

### Ligações
```javascript
tel:+55${telefone} // Abre discador nativo
```

### WhatsApp
```javascript
whatsapp://send?phone=55${telefone} // Abre WhatsApp para ligação
whatsapp://send?phone=55${telefone}&text=${mensagem} // Envia mensagem
```

### SMS
```javascript
sms:+55${telefone}?body=${mensagem} // Abre app SMS nativo
```

## 📱 Recursos PWA

### Service Worker (`public/sw.js`)
- Cache de recursos estáticos
- Estratégia cache-first para assets
- Limpeza automática de caches antigos

### Manifest (`public/manifest.json`)
- Configuração completa para instalação
- Ícones em múltiplas resoluções
- Display standalone
- Orientação portrait

### LocalStorage
- Cache de dados do operador
- Lista de clientes persistente
- Logs temporários

## 🔧 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes base (shadcn)
│   ├── LoginForm.tsx    # Tela de login
│   ├── Dashboard.tsx    # Dashboard principal
│   ├── ClientList.tsx   # Lista de clientes
│   ├── LogSystem.tsx    # Sistema de logs
│   └── Navigation.tsx   # Navegação principal
├── data/
│   └── sampleClients.ts # Dados de exemplo
├── hooks/
│   └── usePromoDialer.ts # Hook principal da aplicação
├── lib/
│   └── utils.ts         # Utilitários
├── index.css           # Design system completo
└── App.tsx             # Componente principal

public/
├── manifest.json       # Manifest PWA
├── sw.js              # Service Worker
└── robots.txt         # SEO
```

## 🌐 SEO e Meta Tags

- ✅ **Title e Description** otimizados
- ✅ **Open Graph** para redes sociais
- ✅ **Twitter Cards** configurados
- ✅ **Canonical URLs** implementadas
- ✅ **Lang="pt-BR"** definido
- ✅ **Viewport** responsivo configurado

## 🔄 Funcionalidades Offline

- ✅ **Visualização** de dados já carregados
- ✅ **Cache** de recursos estáticos
- ✅ **Service Worker** ativo
- ✅ **Indicador** de status de conexão
- ⚠️ **Limitação**: Ações nativas requerem conexão

## 📈 Performance

- **Bundle otimizado** com Vite
- **Lazy loading** implementado
- **Tree shaking** automático
- **Compression** de assets
- **Cache eficiente** de recursos

## 🔒 Segurança

- **HTTPS obrigatório** para PWA
- **CSP headers** recomendados
- **Input validation** implementada
- **XSS protection** via React
- **Secure storage** com LocalStorage

## 🚀 Deploy

### Netlify/Vercel
1. Conecte o repositório
2. Configure build command: `npm run build`
3. Configure publish directory: `dist`
4. Deploy automático

### Servidor Próprio
1. Execute `npm run build`
2. Copie a pasta `dist` para o servidor
3. Configure HTTPS
4. Configure headers para PWA

---

**PROMODialer VoIP** - Desenvolvido com React 18, TypeScript, Tailwind CSS e PWA APIs para máxima performance e experiência nativa em dispositivos móveis.