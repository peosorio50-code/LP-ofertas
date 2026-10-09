/**
 * Textos de cada versão da página (teste A/B).
 * As duas versões usam exatamente o mesmo layout (src/components/LandingPage.astro);
 * só o que está aqui muda entre elas.
 */

export interface PageCopy {
  hero: {
    /** Primeira parte do título. */
    titulo: string;
    /** Segunda parte do título, com o sublinhado verde. */
    destaque: string;
    subtitulo: string;
    botao: string;
    nota: string;
  };
  comoFunciona: {
    titulo: string;
    passos: { titulo: string; texto: string }[];
  };
  transparencia: {
    titulo: string;
    texto: string;
    pontos: { titulo: string; texto: string }[];
  };
  vitrine: {
    titulo: string;
    nota: string;
    botao: string;
  };
  faq: {
    titulo: string;
    itens: { q: string; a: string }[];
  };
  final: {
    titulo: string;
    subtitulo: string;
    botao: string;
  };
}

/** Versão A: tom de amigo que manda promoção (texto original). */
export const copyA: PageCopy = {
  hero: {
    titulo: 'A gente fareja as melhores ofertas.',
    destaque: 'Você só recebe no WhatsApp.',
    subtitulo:
      'Promoções de verdade do Mercado Livre e da Shopee, direto no seu celular. Grátis, sem cadastro e sem pegadinha.',
    botao: 'Entrar no grupo grátis',
    nota: 'Só o FaroFino posta no grupo. Você sai quando quiser.',
  },
  comoFunciona: {
    titulo: 'Como funciona',
    passos: [
      { titulo: 'Você entra no grupo', texto: 'Um clique e pronto. Não pedimos nome, e-mail nem cadastro.' },
      {
        titulo: 'O FaroFino fareja',
        texto: 'A gente monitora as lojas e separa só o que está com preço bom de verdade.',
      },
      {
        titulo: 'Você compra direto na loja',
        texto: 'O link abre no site ou app oficial da loja. O pagamento e a entrega são com eles.',
      },
    ],
  },
  transparencia: {
    titulo: 'Sem mistério: como a gente ganha dinheiro?',
    texto:
      'Os links que mandamos são de programas de afiliados das próprias lojas. Quando você compra por eles, a loja paga uma pequena comissão pra gente. Você não paga nada a mais por isso: o preço é exatamente o mesmo do site.',
    pontos: [
      {
        titulo: 'Compra no site oficial',
        texto: 'Você é levado direto pro Mercado Livre ou pra Shopee. A gente nunca pede seus dados de pagamento.',
      },
      { titulo: 'Lojas que você já conhece', texto: 'Nada de loja desconhecida ou site estranho.' },
      {
        titulo: 'Garantia da loja',
        texto: 'Troca, devolução e suporte seguem as regras da loja onde você comprou.',
      },
    ],
  },
  vitrine: {
    titulo: 'Olha o tipo de coisa que o FaroFino encontra',
    nota: 'Isso aqui é amostra. No grupo, o preço muda rápido e quem manda é a loja.',
    botao: 'Quero receber ofertas assim',
  },
  faq: {
    titulo: 'Perguntas frequentes',
    itens: [
      { q: 'É grátis mesmo?', a: 'Sim. Entrar e ficar no grupo é 100% gratuito.' },
      {
        q: 'Vou pagar mais caro comprando pelo link?',
        a: 'Não. O preço é o mesmo do site. A comissão sai da loja, não do seu bolso.',
      },
      {
        q: 'O grupo vai lotar meu celular de mensagem?',
        a: 'Só o FaroFino posta, e só ofertas. Dá pra silenciar o grupo e olhar quando quiser.',
      },
      {
        q: 'Vocês são o Mercado Livre ou a Shopee?',
        a: 'Não. Somos um grupo independente que participa dos programas de afiliados dessas lojas.',
      },
      { q: 'Como saio do grupo?', a: 'É só sair pelo próprio WhatsApp, a qualquer momento.' },
    ],
  },
  final: {
    titulo: 'Bora economizar?',
    subtitulo: 'O próximo achado pode ser aquela coisa que tá no seu carrinho faz um mês.',
    botao: 'Entrar no grupo grátis',
  },
};

/** Versão B: parar de perder dinheiro pagando caro. Promoção boa não é sorte, é acompanhar o preço. */
export const copyB: PageCopy = {
  hero: {
    titulo: 'Chega de pagar caro.',
    destaque: 'Achar promoção boa não é sorte.',
    subtitulo:
      'É acompanhar o preço todo dia. O FaroFino faz isso no Mercado Livre e na Shopee e manda no seu WhatsApp só o que caiu de verdade.',
    botao: 'Quero parar de pagar caro',
    nota: 'Grátis e sem cadastro. Só o FaroFino posta, e você sai quando quiser.',
  },
  comoFunciona: {
    titulo: 'O método (sem sorte nenhuma)',
    passos: [
      { titulo: 'Você entra no grupo', texto: 'Um clique. Sem nome, sem e-mail, sem cadastro.' },
      {
        titulo: 'A gente vigia os preços',
        texto: 'Todo dia o FaroFino acompanha as lojas e só manda o que está com preço bom de verdade.',
      },
      {
        titulo: 'Você compra na hora certa',
        texto: 'O link abre no site ou app oficial da loja, com o preço que caiu. Pagamento e entrega são com eles.',
      },
    ],
  },
  transparencia: {
    titulo: 'Você economiza. A gente ganha como?',
    texto:
      'Os links que mandamos são de programas de afiliados das próprias lojas. Quando você compra por eles, a loja paga uma pequena comissão pra gente. Você não paga nada a mais: o preço é o mesmo do site.',
    pontos: [
      { titulo: 'Você não paga a mais', texto: 'A comissão sai da loja, não do seu bolso.' },
      {
        titulo: 'Compra no site oficial',
        texto: 'Mercado Livre ou Shopee, direto. A gente nunca pede seus dados de pagamento.',
      },
      { titulo: 'Garantia da loja', texto: 'Troca, devolução e suporte seguem as regras da loja.' },
    ],
  },
  vitrine: {
    titulo: 'Olha o que fica na mesa quando você paga preço cheio',
    nota: 'Exemplos de preços farejados nas lojas. O preço muda rápido e quem define é a loja.',
    botao: 'Quero pagar menos',
  },
  faq: {
    titulo: 'Antes de entrar',
    itens: [
      { q: 'Tem pegadinha? É grátis mesmo?', a: 'Sem pegadinha. Entrar e ficar no grupo é 100% gratuito.' },
      {
        q: 'Comprando pelo link eu pago mais?',
        a: 'Não. O preço é o mesmo do site. A comissão sai da loja, não do seu bolso.',
      },
      {
        q: 'Vou receber mensagem demais?',
        a: 'Só o FaroFino posta, e só ofertas. Dá pra silenciar o grupo e olhar quando quiser.',
      },
      {
        q: 'Vocês são o Mercado Livre ou a Shopee?',
        a: 'Não. Somos um grupo independente que participa dos programas de afiliados dessas lojas.',
      },
      { q: 'E se eu quiser sair?', a: 'É só sair pelo próprio WhatsApp, a qualquer momento.' },
    ],
  },
  final: {
    titulo: 'Preço cheio é coisa do passado.',
    subtitulo: 'Da próxima vez que for comprar alguma coisa, dá uma olhada no grupo antes.',
    botao: 'Quero parar de pagar caro',
  },
};
