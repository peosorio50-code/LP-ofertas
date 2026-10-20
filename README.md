# FaroFino Ofertas — Landing page

Página estática (Astro + TypeScript) cujo único objetivo é levar o visitante ao grupo do WhatsApp.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:4321
npm run build    # gera a pasta dist/ (é só publicar essa pasta)
```

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Link do grupo (`WHATSAPP_GROUP_URL`) e domínio do site (`SITE_URL`, usado na imagem de compartilhamento) | `src/config.ts` |
| Ofertas (hoje são **dados de exemplo**) | `src/data/offers.ts` |
| Imagens de exemplo das ofertas | `public/ofertas/` |
| Meta Pixel / Google Analytics (espaço reservado no `<head>`) | `src/layouts/Base.astro` |
| Evento de clique e repasse de UTMs | `src/lib/tracking.ts` |
| Imagem de compartilhamento (Open Graph) | `public/og-image.jpg` |

## Rastreamento

- Os parâmetros `utm_*` da URL da página são repassados para o link do grupo.
- Cada clique em botão ou card envia `{ event: 'cta_click', secao, elemento, oferta?, utm_* }` para `window.dataLayer`
  e chama `fbq`/`gtag` automaticamente quando esses scripts estiverem instalados. `secao` é `hero`, `vitrine` ou `final`.

## Fotos de fundo

Salve as fotos em `src/assets/fundos/` com o nome exato da seção (`.jpg`, `.png` ou `.webp`).
O site otimiza o tamanho sozinho. Sem a foto, a seção mostra só o degradê.

| Arquivo | Seção | Tamanho sugerido |
| --- | --- | --- |
| `hero.jpg` | Primeira dobra (atrás do título e do carrossel) | 1920×1080 |
| `como-funciona.jpg` | Como funciona (atrás do celular) | 1920×1200 |
| `sem-misterio.jpg` | Sem mistério (fica atrás de um degradê verde-escuro) | 1920×1200 |
| `final.jpg` | Chamada final (fica atrás de um degradê azul-marinho/verde) | 1920×1080 |

Também dá para usar `vitrine.jpg` e `faq.jpg`, mas essas seções ficam melhores só com o degradê.

## Teste A/B

- **Versão A**: `farofinoofertas.com` → texto original (tom de amigo que manda promoção)
- **Versão B**: `farofinoofertas.com/b` → texto "chega de pagar caro / promoção boa não é sorte" (não aparece no Google: `noindex`)

As duas usam exatamente o mesmo layout (`src/components/LandingPage.astro`). Os textos de cada uma ficam em
`src/data/copy.ts` (`copyA` e `copyB`): para testar uma nova copy, é só editar ali.

Cada versão se identifica em todas as métricas:
- **Meta Pixel:** o `PageView` traz a URL (`/` ou `/b`) e o evento `CliqueGrupoWhatsApp` traz o parâmetro `variante` (`a` ou `b`).
- **Clarity:** etiqueta personalizada `variante` (filtre as gravações por ela).
- **Link do grupo:** recebe `lp=a` ou `lp=b`, junto com as UTMs.

## Páginas de nicho

| Página | Endereço | Etiqueta da logo |
| --- | --- | --- |
| FaroFino Perfumes | `farofinoofertas.com/perfumes` | Perfumes |
| FaroFino Eletrônicos | `farofinoofertas.com/eletronicos` | Eletrônicos |
| FaroFino Máquinas (ferramentas e máquinas) | `farofinoofertas.com/maquinas` | Máquinas |

Mesmo layout da página principal, com texto na linha da versão B. Textos, ofertas, celular simulado e **link do grupo**
de cada nicho ficam em `src/data/nichos.ts` (campo `grupoUrl`: `entrar.farofinoofertas.com/?lp=<nicho>`).
Fotos das ofertas: `src/data/offer-photos.json`. Imagem de compartilhamento: `public/og-<nicho>.jpg`.

Cada nicho tem sua paleta (a verde é a padrão do FaroFino): **Perfumes** roxo, **Eletrônicos** azul e
**Máquinas** preto com amarelo. As cores ficam em `src/styles/temas.css`. A imagem de etiquetas da primeira dobra
tem uma versão por nicho, gerada com `node scripts/recolor-hero.mjs`.

Nas métricas, cada nicho aparece como `variante` = `perfumes`, `eletronicos` ou `maquinas` (Pixel e Clarity), e o link
do grupo recebe `lp=<nicho>`.
