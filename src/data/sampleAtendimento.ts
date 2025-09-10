export interface AtendimentoClient {
  id: string;
  beneficio: string;
  dib: string;
  cpf: string;
  especie: string;
  status: 'ATIVO' | 'INATIVO';
  nome: string;
  representanteLegal?: string;
  nascimento: string;
  idade: number;
  rendimento: {
    bruto: number;
    liquido: number;
  };
  margem: {
    valor: number;
    dataAtualizacao: string;
    simulada: number;
    percentual: number;
  };
  cartaoRMC: {
    valor: number;
    dataAtualizacao: string;
    simulada: number;
    percentual: number;
  };
  cartaoRCC: {
    valor: number;
    dataAtualizacao: string;
    simulada: number;
    percentual: number;
  };
  contatos: {
    telefones: string[];
  };
  contratosAtivos: Array<{
    id: string;
    banco: string;
    averbacao: string;
    prazo: string;
    parcela: number;
    taxa: number;
    contrato: string;
    saldoQuitacao: number;
    valorFinanciado: number;
  }>;
  cartoesAtivos: Array<{
    tipo: string;
    banco: string;
    contrato: string;
    averbacao: string;
    parcela: number;
    valorContrato: number;
  }>;
}

export const sampleAtendimentoClient: AtendimentoClient = {
  id: "1",
  beneficio: "0000000027",
  dib: "27/11/1995",
  cpf: "380.124.997-20",
  especie: "42 - APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO",
  status: "ATIVO",
  nome: "ADILSON GOMES DA ROCHA",
  nascimento: "20/08/1948",
  idade: 77,
  rendimento: {
    bruto: 3425.50,
    liquido: 3425.50
  },
  margem: {
    valor: 773.15,
    dataAtualizacao: "28/08/2025 08:54:07",
    simulada: 636.88,
    percentual: 36
  },
  cartaoRMC: {
    valor: 0,
    dataAtualizacao: "28/08/2025 08:54:07",
    simulada: 43.18,
    percentual: 6
  },
  cartaoRCC: {
    valor: 171.27,
    dataAtualizacao: "28/08/2025 08:54:07",
    simulada: 171.28,
    percentual: 6
  },
  contatos: {
    telefones: ["(21) 98011-1025", "(18) 98818-8819", "(41) 99263-3240", "(51) 98054-2087"]
  },
  contratosAtivos: [
    {
      id: "1",
      banco: "41 - BANRISUL",
      averbacao: "04/09/2019",
      prazo: "71/72",
      parcela: 362.05,
      taxa: 1.86,
      contrato: "7521098",
      saldoQuitacao: 355.44,
      valorFinanciado: 13786.69
    }
  ],
  cartoesAtivos: [
    {
      tipo: "RMC",
      banco: "623 - PANAMERICANO",
      contrato: "229014682433",
      averbacao: "28/07/2016",
      parcela: 128.10,
      valorContrato: 640.50
    }
  ]
};

export const qualificacaoOptions = {
  positivas: [
    "Visita na loja confirmada",
    "Fidelizado",
    "Fidelizado em Negociação", 
    "Prospecção Atendida",
    "Prospecção em Negociação"
  ],
  negativas: [
    "Fraude",
    "Benefício suspenso",
    "Cliente sem interesse",
    "Cliente Desligou",
    "Cliente Analfabeto",
    "Cliente estava ausente / Recado com terceiros",
    "Cliente falecido"
  ]
};