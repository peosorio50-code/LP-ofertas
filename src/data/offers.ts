export type Loja = 'Mercado Livre' | 'Shopee';

export interface Offer {
  id: string;
  titulo: string;
  /**
   * Caminho ou URL da foto do produto.
   * Vazio ('') = mostra um placeholder neutro com o nome do produto (usado nos dados de exemplo).
   */
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
// Produtos, preços, descontos e links abaixo são INVENTADOS, só para preencher os cards
// (não são anúncios reais do Mercado Livre nem da Shopee). Com 'imagem' vazio, o card usa uma
// foto de exemplo do Pexels (src/data/offer-photos.json) e, se ela não existir, um placeholder neutro.
export const offers: Offer[] = [
  {
    id: 'exemplo-1',
    titulo: 'Fone de Ouvido Bluetooth TWS com Case Carregador',
    imagem: '',
    precoAntigo: 189.90,
    precoAtual: 89.90,
    desconto: 53,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-1',
  },
  {
    id: 'exemplo-2',
    titulo: 'Garrafa Térmica Inox 1 Litro com Alça',
    imagem: '',
    precoAntigo: 89.90,
    precoAtual: 44.90,
    desconto: 50,
    loja: 'Shopee',
    link: 'https://exemplo.com/oferta-2',
  },
  {
    id: 'exemplo-3',
    titulo: 'Jogo de Panelas Inox 5 Peças com Tampa de Vidro',
    imagem: '',
    precoAntigo: 499.90,
    precoAtual: 299.90,
    desconto: 40,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-3',
  },
  {
    id: 'exemplo-4',
    titulo: 'Mochila para Notebook 15,6" Impermeável com Entrada USB',
    imagem: '',
    precoAntigo: 159.90,
    precoAtual: 79.90,
    desconto: 50,
    loja: 'Shopee',
    link: 'https://exemplo.com/oferta-4',
  },
  {
    id: 'exemplo-5',
    titulo: 'Smartwatch com Monitor Cardíaco e Notificações',
    imagem: '',
    precoAntigo: 399.00,
    precoAtual: 219.00,
    desconto: 45,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-5',
  },
  {
    id: 'exemplo-6',
    titulo: 'Luminária LED de Mesa Recarregável',
    imagem: '',
    precoAntigo: 99.90,
    precoAtual: 54.90,
    desconto: 45,
    loja: 'Shopee',
    link: 'https://exemplo.com/oferta-6',
  },
  {
    id: 'exemplo-7',
    titulo: 'Kit 3 Potes Herméticos de Vidro 1 Litro',
    imagem: '',
    precoAntigo: 119.90,
    precoAtual: 69.90,
    desconto: 42,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-7',
  },
  {
    id: 'exemplo-8',
    titulo: 'Organizador de Maquiagem Giratório 360°',
    imagem: '',
    precoAntigo: 79.90,
    precoAtual: 39.90,
    desconto: 50,
    loja: 'Shopee',
    link: 'https://exemplo.com/oferta-8',
  },
  {
    id: 'exemplo-9',
    titulo: 'Aspirador de Pó Vertical 2 em 1',
    imagem: '',
    precoAntigo: 349.90,
    precoAtual: 229.90,
    desconto: 34,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-9',
  },
  {
    id: 'exemplo-10',
    titulo: 'Tênis Casual Masculino Leve e Confortável',
    imagem: '',
    precoAntigo: 199.90,
    precoAtual: 119.90,
    desconto: 40,
    loja: 'Shopee',
    link: 'https://exemplo.com/oferta-10',
  },
  {
    id: 'exemplo-11',
    titulo: 'Jogo de Lençol Queen 400 Fios',
    imagem: '',
    precoAntigo: 189.90,
    precoAtual: 109.90,
    desconto: 42,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-11',
  },
  {
    id: 'exemplo-12',
    titulo: 'Kit 10 Cabides de Veludo Antideslizante',
    imagem: '',
    precoAntigo: 59.90,
    precoAtual: 29.90,
    desconto: 50,
    loja: 'Shopee',
    link: 'https://exemplo.com/oferta-12',
  },
  {
    id: 'exemplo-13',
    titulo: 'Cafeteira Elétrica Programável 30 Xícaras',
    imagem: '',
    precoAntigo: 229.90,
    precoAtual: 139.90,
    desconto: 39,
    loja: 'Mercado Livre',
    link: 'https://exemplo.com/oferta-13',
  },
];

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const formatPrice = (value: number) => brl.format(value);
