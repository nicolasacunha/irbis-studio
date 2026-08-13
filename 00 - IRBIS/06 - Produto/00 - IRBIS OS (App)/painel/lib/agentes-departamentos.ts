// Metadados de apresentação dos 7 departamentos do mapa de agentes — ângulo/raio no
// "céu" e a linha de tese de cada um. Os jobs em si (o conteúdo que muda) vêm do banco,
// tabela agentes_jobs — ver app/agentes/page.tsx.
export type DepartamentoId =
  | "vendas"
  | "negocio"
  | "marketing"
  | "clientes"
  | "backoffice"
  | "operacoes"
  | "inteligencia";

export const DEPARTAMENTOS: {
  id: DepartamentoId;
  nome: string;
  tagline: string;
  angulo: number;
  raio: number;
}[] = [
  { id: "vendas", nome: "Vendas", tagline: "Do primeiro contato ao contrato assinado.", angulo: 8, raio: 0.82 },
  { id: "negocio", nome: "Negócio", tagline: "Para onde a IRBIS aponta, e a que preço.", angulo: 64, raio: 0.54 },
  { id: "marketing", nome: "Marketing", tagline: "Voz, conteúdo e sinal de intenção de compra.", angulo: 124, raio: 0.76 },
  { id: "clientes", nome: "Clientes", tagline: "O que mantém quem já pagou, pagando de novo.", angulo: 181, raio: 0.6 },
  { id: "backoffice", nome: "Back Office", tagline: "Dinheiro entrando, saindo, e sob controle.", angulo: 236, raio: 0.79 },
  { id: "operacoes", nome: "Operações", tagline: "Da assinatura ao projeto no ar.", angulo: 292, raio: 0.5 },
  { id: "inteligencia", nome: "Inteligência", tagline: "A memória que amarra os outros seis.", angulo: 338, raio: 0.46 },
];

export const NIVEL_LABEL: Record<string, string> = {
  ai: "100% IA",
  assisted: "Humano + IA",
  human: "Humano lidera",
};
