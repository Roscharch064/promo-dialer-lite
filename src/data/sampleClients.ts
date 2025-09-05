export interface Client {
  id: string;
  nome: string;
  telefone: string;
  whatsapp: string;
  convenio: string;
  margem: number;
  status: string;
  tabulacao: string;
  ultimoContato: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
}

export const sampleClients: Client[] = [
  {
    id: '001',
    nome: 'João Silva Santos',
    telefone: '11987654321',
    whatsapp: '11987654321',
    convenio: 'SIAPE',
    margem: 15000.00,
    status: 'Ativo',
    tabulacao: 'Interessado',
    ultimoContato: '2024-09-01',
    prioridade: 'Alta'
  },
  {
    id: '002', 
    nome: 'Maria Oliveira Costa',
    telefone: '11976543210',
    whatsapp: '11976543210',
    convenio: 'INSS',
    margem: 8500.00,
    status: 'Ativo',
    tabulacao: 'Callback',
    ultimoContato: '2024-08-28',
    prioridade: 'Média'
  },
  {
    id: '003',
    nome: 'Carlos Eduardo Lima',
    telefone: '11965432109',
    whatsapp: '11965432109',
    convenio: 'SIAPE',
    margem: 12800.00,
    status: 'Ativo',
    tabulacao: 'Não Interessado',
    ultimoContato: '2024-08-25',
    prioridade: 'Baixa'
  },
  {
    id: '004',
    nome: 'Ana Paula Ferreira',
    telefone: '11954321098',
    whatsapp: '11954321098',
    convenio: 'INSS',
    margem: 9200.00,
    status: 'Ativo',
    tabulacao: 'Callback',
    ultimoContato: '2024-09-02',
    prioridade: 'Alta'
  },
  {
    id: '005',
    nome: 'Roberto Mendes Souza',
    telefone: '11943210987',
    whatsapp: '11943210987',
    convenio: 'SIAPE',
    margem: 18500.00,
    status: 'Ativo',
    tabulacao: 'Interessado',
    ultimoContato: '2024-08-30',
    prioridade: 'Alta'
  }
];