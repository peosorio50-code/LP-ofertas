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
| `sem-misterio.jpg` | Sem mistério (fica atrás de um degradê laranja/rosa) | 1920×1200 |
| `final.jpg` | Chamada final (fica atrás de um degradê azul/violeta) | 1920×1080 |

Também dá para usar `vitrine.jpg` e `faq.jpg`, mas essas seções ficam melhores só com o degradê.
