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
   * Link de afiliado do produto (opcional, pode ficar vazio). Só para controle:
   * na landing page os cards NÃO levam ao produto, todo clique vai para o grupo do WhatsApp.
   */
  link: string;
}

// Ofertas reais do Mercado Livre, levantadas em buscas de 02/10/2026.
// Preços e descontos mudam rápido: atualize esta lista sempre que for divulgar.
// O campo link fica vazio de propósito: na página, todo card leva para o grupo do WhatsApp.
// Com 'imagem' vazio, o card usa uma foto ilustrativa do Pexels (src/data/offer-photos.json)
// e, se ela não existir, um placeholder neutro. Para usar a foto do anúncio, preencha 'imagem'.
export const offers: Offer[] = [
  {
    id: 'oferta-1',
    titulo: 'Fone de Ouvido Pulse TWS Bluetooth 5.3',
    imagem: '',
    precoAntigo: 149.90,
    precoAtual: 73.21,
    desconto: 51,
    loja: 'Mercado Livre',
    link: '',
  },
  {
    id: 'oferta-2',
    titulo: 'Garrafa Térmica Inquebrável Inox 1 Litro Invicta',
    imagem: '',
    precoAntigo: 220.90,
    precoAtual: 126.42,
    desconto: 43,
    loja: 'Mercado Livre',
    link: '',
  },
  {
    id: 'oferta-3',
    titulo: 'Jogo de Panelas Inox 5 Peças com Tampa de Vidro Wincy',
    imagem: '',
    precoAntigo: 396.86,
    precoAtual: 242.00,
    desconto: 39,
    loja: 'Mercado Livre',
    link: '',
  },
  {
    id: 'oferta-4',
    titulo: 'Mochila 40L Antifurto e Impermeável para Notebook 15,6" Yorepek',
    imagem: '',
    precoAntigo: 300.00,
    precoAtual: 127.71,
    desconto: 57,
    loja: 'Mercado Livre',
    link: '',
  },
  {
    id: 'oferta-5',
    titulo: 'Aspirador de Pó Vertical 2 em 1 Britânia BAS30 1400W',
    imagem: '',
    precoAntigo: 224.90,
    precoAtual: 129.90,
    desconto: 42,
    loja: 'Mercado Livre',
    link: '',
  },
  {
    id: 'oferta-6',
    titulo: 'Jogo de Lençol Queen 3 Peças 400 Fios com Elástico',
    imagem: '',
    precoAntigo: 58.88,
    precoAtual: 32.38,
    desconto: 45,
    loja: 'Mercado Livre',
    link: '',
  },
  {
    id: 'oferta-7',
    titulo: 'Cafeteira Elétrica Britânia CP30 Inox',
    imagem: '',
    precoAntigo: 250.00,
    precoAtual: 110.00,
    desconto: 56,
    loja: 'Mercado Livre',
    link: '',
  },
  {
    id: 'oferta-8',
    titulo: 'Fone de Ouvido Sem Fio HUAWEI FreeBuds SE 2',
    imagem: '',
    precoAntigo: 399.00,
    precoAtual: 139.00,
    desconto: 65,
    loja: 'Mercado Livre',
    link: '',
  },
  {
    id: 'oferta-9',
    titulo: 'Garrafa Térmica Termolar 1 Litro Inox com Pressão',
    imagem: '',
    precoAntigo: 153.69,
    precoAtual: 95.82,
    desconto: 38,
    loja: 'Mercado Livre',
    link: '',
  },
];

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const formatPrice = (value: number) => brl.format(value);
