/**
 * Páginas de nicho: FaroFino Perfumes, FaroFino Eletrônicos e FaroFino Máquinas.
 * Cada nicho usa o mesmo layout da página principal (src/components/LandingPage.astro),
 * com textos, ofertas, link do grupo e nome próprios. Os textos seguem a linha da versão B
 * ("chega de pagar caro; desconto bom não é sorte").
 */
import { WHATSAPP_GROUP_URL } from '../config';
import type { PageCopy } from './copy';
import { formatPrice, type Offer } from './offers';

export interface ChatMessage {
  intro: string;
  produto: string;
  /** id da oferta (para usar a mesma foto do card). */
  ofertaId: string;
  de: string;
  por: string;
  link: string;
  hora: string;
}

export interface ChatContent {
  /** Nome do grupo no topo da conversa. */
  grupo: string;
  /** Duas mensagens com foto grande. */
  mensagens: ChatMessage[];
  /** Mensagem curta com miniatura ("caiu de X pra Y"). */
  curta: Omit<ChatMessage, 'intro'>;
}

export interface Nicho {
  /** Endereço da página: farofinoofertas.com/<slug>. Também vai como variante no Pixel/Clarity. */
  slug: 'perfumes' | 'eletronicos' | 'maquinas';
  /** Texto da etiqueta da logo: FaroFino [Perfumes]. */
  marca: string;
  /**
   * Link do grupo deste nicho.
   * PROVISÓRIO: enquanto os links de cada grupo não chegam, aponta para o link geral.
   */
  grupoUrl: string;
  seo: { titulo: string; descricao: string; ogImage: string };
  copy: PageCopy;
  ofertas: Offer[];
  chat: ChatContent;
}

// Monta uma oferta calculando o desconto a partir dos preços.
const oferta = (id: string, titulo: string, precoAntigo: number, precoAtual: number): Offer => ({
  id,
  titulo,
  imagem: '',
  precoAntigo,
  precoAtual,
  desconto: Math.round((1 - precoAtual / precoAntigo) * 100),
  loja: 'Mercado Livre',
  link: '',
});

// Monta o celular simulado com 3 ofertas do próprio nicho.
const chatDe = (grupo: string, ofertas: Offer[], links: [string, string, string]): ChatContent => {
  const [a, b, c] = ofertas;
  return {
    grupo,
    mensagens: [
      {
        intro: 'Preço farejado!',
        produto: a.titulo,
        ofertaId: a.id,
        de: formatPrice(a.precoAntigo),
        por: formatPrice(a.precoAtual),
        link: links[0],
        hora: '09:12',
      },
      {
        intro: 'Pista quente: esse aqui não dura até amanhã.',
        produto: b.titulo,
        ofertaId: b.id,
        de: formatPrice(b.precoAntigo),
        por: formatPrice(b.precoAtual),
        link: links[1],
        hora: '12:47',
      },
    ],
    curta: {
      produto: c.titulo,
      ofertaId: c.id,
      de: formatPrice(c.precoAntigo),
      por: formatPrice(c.precoAtual),
      link: links[2],
      hora: '18:05',
    },
  };
};

// Perguntas que valem para todos os nichos
const faqComum = [
  { q: 'Tem pegadinha? É grátis mesmo?', a: 'Sem pegadinha. Entrar e ficar no grupo é 100% gratuito.' },
  {
    q: 'Comprando pelo link eu pago mais?',
    a: 'Não. O preço é o mesmo do site. A comissão sai da loja, não do seu bolso.',
  },
  {
    q: 'Vou receber mensagem demais?',
    a: 'Só o FaroFino posta, e só ofertas. Dá pra silenciar o grupo e olhar quando quiser.',
  },
];
const faqFinal = [
  {
    q: 'Vocês são o Mercado Livre ou a Shopee?',
    a: 'Não. Somos um grupo independente que participa dos programas de afiliados dessas lojas.',
  },
  { q: 'E se eu quiser sair?', a: 'É só sair pelo próprio WhatsApp, a qualquer momento.' },
];

const transparenciaComum = (extra: { titulo: string; texto: string }): PageCopy['transparencia'] => ({
  titulo: 'Você economiza. A gente ganha como?',
  texto:
    'Os links que mandamos são de programas de afiliados das próprias lojas. Quando você compra por eles, a loja paga uma pequena comissão pra gente. Você não paga nada a mais: o preço é o mesmo do site.',
  pontos: [
    { titulo: 'Você não paga a mais', texto: 'A comissão sai da loja, não do seu bolso.' },
    {
      titulo: 'Compra no site oficial',
      texto: 'Mercado Livre ou Shopee, direto. A gente nunca pede seus dados de pagamento.',
    },
    extra,
  ],
});

// ATENÇÃO: ofertas reais do Mercado Livre levantadas em buscas de 17/10/2026.
// Preços mudam rápido: atualize antes de divulgar. Fotos: ilustrativas (src/data/offer-photos.json).

// ---------------------------------------------------------------- Perfumes
const ofertasPerfumes = [
  oferta('perf-1', 'Perfume Jimmy Choo Man Eau de Toilette 30ml', 462.0, 281.94),
  oferta('perf-2', 'Perfume Árabe Feminino Eau de Parfum 85ml', 399.99, 167.99),
  oferta('perf-3', 'Kaiak Pulso Natura Masculino 100ml', 108.99, 76.29),
  oferta('perf-4', 'Eudora Eau de Parfum Tradicional Feminino 75ml', 224.9, 168.67),
  oferta('perf-5', 'Quasar Vision Colônia O Boticário 100ml', 164.9, 123.67),
  oferta('perf-6', 'Perfume Masculino Importado Eau de Toilette 30ml', 69.99, 41.99),
  oferta('perf-7', 'Egeo O Boticário Desodorante Colônia 100ml', 144.9, 118.81),
  oferta('perf-8', 'Kaiak Clássico Natura Masculino 100ml', 137.38, 109.9),
  oferta('perf-9', 'Combo Malbec Tradicional 100ml + Kaiak Pulso 100ml', 469.99, 410.3),
];

const perfumes: Nicho = {
  slug: 'perfumes',
  marca: 'Perfumes',
  grupoUrl: WHATSAPP_GROUP_URL, // PROVISÓRIO: trocar pelo link do grupo de perfumes
  seo: {
    titulo: 'FaroFino Perfumes | Promoções de perfumes no WhatsApp',
    descricao:
      'Grupo gratuito de WhatsApp com promoções de perfumes importados e nacionais do Mercado Livre e da Shopee. O FaroFino acompanha os preços e avisa quando cai de verdade.',
    ogImage: '/og-perfumes.jpg',
  },
  copy: {
    hero: {
      titulo: 'Chega de pagar preço cheio em perfume.',
      destaque: 'Desconto bom não é sorte, é faro.',
      subtitulo:
        'O FaroFino acompanha todo dia os preços de perfumes importados e nacionais no Mercado Livre e na Shopee e manda no seu WhatsApp só quando cai de verdade.',
      botao: 'Quero perfume mais barato',
      nota: 'Grátis e sem cadastro. Só o FaroFino posta, e você sai quando quiser.',
    },
    comoFunciona: {
      titulo: 'O método (sem sorte nenhuma)',
      passos: [
        { titulo: 'Você entra no grupo de perfumes', texto: 'Um clique. Sem nome, sem e-mail, sem cadastro.' },
        {
          titulo: 'A gente vigia os preços',
          texto: 'Todo dia o FaroFino acompanha perfumes nas lojas e só manda o que está com preço bom de verdade.',
        },
        {
          titulo: 'Você compra na hora certa',
          texto: 'O link abre no site ou app oficial da loja. Pagamento, entrega e garantia são com eles.',
        },
      ],
    },
    transparencia: transparenciaComum({
      titulo: 'Dica de quem fareja',
      texto: 'Em perfume, prefira lojas oficiais e vendedores bem avaliados. Na dúvida, confira antes de comprar.',
    }),
    vitrine: {
      titulo: 'Olha o que fica na mesa quando você paga perfume a preço cheio',
      nota: 'Exemplos de preços farejados nas lojas. O preço muda rápido e quem define é a loja.',
      botao: 'Quero pagar menos em perfume',
    },
    faq: {
      titulo: 'Antes de entrar',
      itens: [
        ...faqComum,
        {
          q: 'Os perfumes são originais?',
          a: 'A gente prioriza lojas oficiais e vendedores bem avaliados, mas quem vende é a loja. Confira sempre o vendedor e as avaliações antes de comprar.',
        },
        ...faqFinal,
      ],
    },
    final: {
      titulo: 'Seu próximo perfume pode sair bem mais barato.',
      subtitulo: 'Antes de comprar o próximo frasco, dá uma olhada no grupo.',
      botao: 'Quero perfume mais barato',
    },
  },
  ofertas: ofertasPerfumes,
  chat: chatDe('FaroFino Perfumes', ofertasPerfumes, ['farofi.no/jimmychoo', 'farofi.no/arabe', 'farofi.no/kaiak']),
};

// ---------------------------------------------------------------- Eletrônicos
const ofertasEletronicos = [
  oferta('elet-1', 'Celular Samsung Galaxy A17 128GB 4GB RAM', 1399.0, 889.0),
  oferta('elet-2', 'Motorola Moto G34 5G 128GB 4GB RAM', 1299.0, 738.0),
  oferta('elet-3', 'Fone de Ouvido Sem Fio HUAWEI FreeBuds SE 2', 399.0, 139.0),
  oferta('elet-4', 'Kit Smartwatch D20 + Fone Sem Fio', 199.9, 95.95),
  oferta('elet-5', 'Headset Gamer Logitech G335', 499.9, 413.17),
  oferta('elet-6', 'Tablet Bdf Octa-core 10 Polegadas', 1099.0, 648.41),
  oferta('elet-7', 'Notebook Gamer Acer Nitro V15 RTX 4050', 8999.0, 6649.0),
  oferta('elet-8', 'Headset JBL Quantum 650 Sem Fio', 799.0, 599.0),
  oferta('elet-9', 'Samsung Galaxy S23 256GB 8GB RAM', 5499.0, 4949.0),
];

const eletronicos: Nicho = {
  slug: 'eletronicos',
  marca: 'Eletrônicos',
  grupoUrl: WHATSAPP_GROUP_URL, // PROVISÓRIO: trocar pelo link do grupo de eletrônicos
  seo: {
    titulo: 'FaroFino Eletrônicos | Promoções de eletrônicos no WhatsApp',
    descricao:
      'Grupo gratuito de WhatsApp com promoções de celular, fone, notebook e mais do Mercado Livre e da Shopee. O FaroFino acompanha os preços e avisa quando cai de verdade.',
    ogImage: '/og-eletronicos.jpg',
  },
  copy: {
    hero: {
      titulo: 'Chega de pagar caro em eletrônico.',
      destaque: 'Desconto bom não é sorte, é faro.',
      subtitulo:
        'Celular, fone, notebook e smartwatch mudam de preço o tempo todo. O FaroFino acompanha no Mercado Livre e na Shopee e avisa no seu WhatsApp quando cai de verdade.',
      botao: 'Quero eletrônico mais barato',
      nota: 'Grátis e sem cadastro. Só o FaroFino posta, e você sai quando quiser.',
    },
    comoFunciona: {
      titulo: 'O método (sem sorte nenhuma)',
      passos: [
        { titulo: 'Você entra no grupo de eletrônicos', texto: 'Um clique. Sem nome, sem e-mail, sem cadastro.' },
        {
          titulo: 'A gente vigia os preços',
          texto: 'Eletrônico sobe e desce de preço o tempo todo. O FaroFino acompanha e só manda o que está bom de verdade.',
        },
        {
          titulo: 'Você compra na hora certa',
          texto: 'O link abre no site ou app oficial da loja. Pagamento, entrega e garantia são com eles.',
        },
      ],
    },
    transparencia: transparenciaComum({
      titulo: 'Garantia da loja',
      texto: 'Troca, devolução e garantia seguem as regras da loja onde você comprou.',
    }),
    vitrine: {
      titulo: 'Olha o que fica na mesa quando você paga eletrônico a preço cheio',
      nota: 'Exemplos de preços farejados nas lojas. O preço muda rápido e quem define é a loja.',
      botao: 'Quero pagar menos em eletrônico',
    },
    faq: {
      titulo: 'Antes de entrar',
      itens: [
        ...faqComum,
        {
          q: 'E a garantia?',
          a: 'Vale a garantia da loja onde você comprou, como em qualquer compra no Mercado Livre ou na Shopee. Confira no anúncio se o produto é novo e a voltagem, quando for o caso.',
        },
        ...faqFinal,
      ],
    },
    final: {
      titulo: 'Seu próximo eletrônico pode sair bem mais barato.',
      subtitulo: 'Antes de trocar de celular ou comprar aquele fone, dá uma olhada no grupo.',
      botao: 'Quero eletrônico mais barato',
    },
  },
  ofertas: ofertasEletronicos,
  chat: chatDe('FaroFino Eletrônicos', ofertasEletronicos, ['farofi.no/galaxy', 'farofi.no/motog34', 'farofi.no/freebuds']),
};

// ---------------------------------------------------------------- Máquinas (ferramentas e máquinas)
const ofertasMaquinas = [
  oferta('maq-1', 'Kit Serra Mármore + Esmerilhadeira The Black Tools 220V', 552.32, 319.9),
  oferta('maq-2', 'Máquina de Solda Inversora ESAB Bantam 2.5', 670.0, 428.0),
  oferta('maq-3', 'Lavadora de Alta Pressão Portátil a Bateria', 199.0, 124.9),
  oferta('maq-4', 'Máquina de Solda Inversora Schulz MIS 140', 539.0, 377.3),
  oferta('maq-5', 'Kit Serra Mármore, Esmerilhadeira e Furadeira Ismafer', 561.25, 449.0),
  oferta('maq-6', 'Lavadora de Alta Pressão Klatter 1400W', 349.0, 289.0),
  oferta('maq-7', 'Compressor de Ar Schulz CSI6 20L 1,5 CV', 1149.0, 949.99),
  oferta('maq-8', 'Compressor de Ar Portátil Schulz Jet Master 0,68 HP', 1036.0, 891.81),
  oferta('maq-9', 'Lavadora de Alta Pressão Kärcher K3.98', 998.9, 899.9),
];

const maquinas: Nicho = {
  slug: 'maquinas',
  marca: 'Máquinas',
  grupoUrl: WHATSAPP_GROUP_URL, // PROVISÓRIO: trocar pelo link do grupo de máquinas
  seo: {
    titulo: 'FaroFino Máquinas | Promoções de ferramentas e máquinas no WhatsApp',
    descricao:
      'Grupo gratuito de WhatsApp com promoções de furadeira, parafusadeira, máquina de solda, compressor e lavadora de alta pressão do Mercado Livre e da Shopee.',
    ogImage: '/og-maquinas.jpg',
  },
  copy: {
    hero: {
      titulo: 'Chega de pagar caro em ferramenta.',
      destaque: 'Desconto bom não é sorte, é faro.',
      subtitulo:
        'Serra mármore, máquina de solda, compressor, lavadora de alta pressão: o FaroFino acompanha os preços no Mercado Livre e na Shopee e avisa no seu WhatsApp quando cai de verdade.',
      botao: 'Quero ferramenta mais barata',
      nota: 'Grátis e sem cadastro. Só o FaroFino posta, e você sai quando quiser.',
    },
    comoFunciona: {
      titulo: 'O método (sem sorte nenhuma)',
      passos: [
        { titulo: 'Você entra no grupo de máquinas', texto: 'Um clique. Sem nome, sem e-mail, sem cadastro.' },
        {
          titulo: 'A gente vigia os preços',
          texto: 'Todo dia o FaroFino acompanha ferramentas e máquinas nas lojas e só manda o que está com preço bom de verdade.',
        },
        {
          titulo: 'Você compra na hora certa',
          texto: 'O link abre no site ou app oficial da loja. Pagamento, entrega e garantia são com eles.',
        },
      ],
    },
    transparencia: transparenciaComum({
      titulo: 'Confira a voltagem',
      texto: 'Antes de comprar, veja no anúncio se é 127V ou 220V e o que vem no kit. Garantia e troca seguem as regras da loja.',
    }),
    vitrine: {
      titulo: 'Olha o que fica na mesa quando você paga ferramenta a preço cheio',
      nota: 'Exemplos de preços farejados nas lojas. O preço muda rápido e quem define é a loja.',
      botao: 'Quero pagar menos em ferramenta',
    },
    faq: {
      titulo: 'Antes de entrar',
      itens: [
        ...faqComum,
        {
          q: 'Serve pra quem trabalha com isso?',
          a: 'Serve. Tem oferta pra quem usa ferramenta todo dia no trabalho e pra quem só quer resolver as coisas em casa.',
        },
        ...faqFinal,
      ],
    },
    final: {
      titulo: 'Sua próxima ferramenta pode sair bem mais barata.',
      subtitulo: 'Antes de comprar aquela máquina que tá faltando na oficina, dá uma olhada no grupo.',
      botao: 'Quero ferramenta mais barata',
    },
  },
  ofertas: ofertasMaquinas,
  chat: chatDe('FaroFino Máquinas', ofertasMaquinas, ['farofi.no/serramarmore', 'farofi.no/solda', 'farofi.no/lavadora']),
};

export const nichos = { perfumes, eletronicos, maquinas };
