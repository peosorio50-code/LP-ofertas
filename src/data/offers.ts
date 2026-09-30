export type Loja = 'Mercado Livre' | 'Shopee';

export interface Offer {
  id: string;
  titulo: string;
  /** Caminho ou URL da imagem do produto. */
  imagem: string;
  /** Preço em reais (número). */
  precoAntigo: number;
  precoAtual: number;
  /** Percentual de desconto, ex.: 35 para "35% off". */
  desconto: number;
  loja: Loja;
  /**
   * Link de afiliado do produto. Guardado para uso futuro/controle:
   * na landing page os cards NÃO levam ao produto, todo clique vai para o grupo do WhatsApp.
   */
  link: string;
}

// ATENÇÃO: DADOS DE EXEMPLO — substituir por ofertas reais.
// Produtos, preços, descontos e links abaixo são fictícios, e as imagens são placeholders neutros.
export const offers: Offer[] = [
  {
    id: 'exemplo-1',
    titulo: 'Fone de ouvido Bluetooth com cancelamento de ruído',
    imagem: '/ofertas/exemplo-1.svg',
    precoAntigo: 249.9,
    precoAtual: 159.9,
    desconto: 36,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-1',
  },
  {
    id: 'exemplo-2',
    titulo: 'Panela de pressão elétrica 5 litros',
    imagem: '/ofertas/exemplo-2.svg',
    precoAntigo: 429.0,
    precoAtual: 299.0,
    desconto: 30,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-2',
  },
  {
    id: 'exemplo-3',
    titulo: 'Tênis de corrida leve com amortecimento',
    imagem: '/ofertas/exemplo-3.svg',
    precoAntigo: 299.99,
    precoAtual: 189.99,
    desconto: 37,
    loja: 'Shopee',
    link: 'https://exemplo.com/oferta-3',
  },
  {
    id: 'exemplo-4',
    titulo: 'Mochila para notebook até 15,6" impermeável',
    imagem: '/ofertas/exemplo-4.svg',
    precoAntigo: 139.9,
    precoAtual: 89.9,
    desconto: 36,
    loja: 'Shopee',
    link: 'https://exemplo.com/oferta-4',
  },
  {
    id: 'exemplo-5',
    titulo: 'Relógio inteligente com monitor de atividades',
    imagem: '/ofertas/exemplo-5.svg',
    precoAntigo: 349.0,
    precoAtual: 219.0,
    desconto: 37,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-5',
  },
  {
    id: 'exemplo-6',
    titulo: 'Luminária de mesa LED articulada',
    imagem: '/ofertas/exemplo-6.svg',
    precoAntigo: 119.9,
    precoAtual: 79.9,
    desconto: 33,
    loja: 'Shopee',
    link: 'https://exemplo.com/oferta-6',
  },
  {
    id: 'exemplo-7',
    titulo: 'Cafeteira elétrica 30 xícaras',
    imagem: '/ofertas/exemplo-7.svg',
    precoAntigo: 189.9,
    precoAtual: 134.9,
    desconto: 29,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-7',
  },
  {
    id: 'exemplo-8',
    titulo: 'Controle sem fio para PC e celular',
    imagem: '/ofertas/exemplo-8.svg',
    precoAntigo: 159.9,
    precoAtual: 99.9,
    desconto: 38,
    loja: 'Shopee',
    link: 'https://exemplo.com/oferta-8',
  },
];

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const formatPrice = (value: number) => brl.format(value);
