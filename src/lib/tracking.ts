/**
 * Preserva os parâmetros UTM da página nos links do grupo e dispara
 * um evento de clique em cada botão/card com o nome da seção.
 *
 * Nenhum dado pessoal é coletado. Enquanto Meta Pixel e Google Analytics
 * não forem instalados, o evento fica apenas no `window.dataLayer`.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function getPageUtms(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utms[key] = value;
  }
  return utms;
}

function appendUtms(href: string, utms: Record<string, string>): string {
  try {
    const url = new URL(href);
    for (const [key, value] of Object.entries(utms)) url.searchParams.set(key, value);
    return url.toString();
  } catch {
    return href;
  }
}

export type CtaClick = {
  secao: string; // hero | vitrine | final
  elemento: string; // botao | card
  oferta?: string;
};

/** Versão da página no teste A/B ('a' = página principal, 'b' = versão curta em /b). */
const getVariante = () => document.documentElement.dataset.variante || 'a';

export function trackCtaClick(data: CtaClick, utms: Record<string, string>) {
  const payload = { event: 'cta_click', variante: getVariante(), ...data, ...utms };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('farofino:cta_click', { detail: payload }));

  // ---- Meta Pixel (instalar o código base no <head>, em src/layouts/Base.astro) ----
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'CliqueGrupoWhatsApp', payload);
  }

  // ---- Google Analytics 4 (instalar o gtag.js no <head>, em src/layouts/Base.astro) ----
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click', {
      variante: getVariante(),
      secao: data.secao,
      elemento: data.elemento,
      oferta: data.oferta,
    });
  }
}

export function initTracking() {
  const utms = getPageUtms();
  const links = document.querySelectorAll<HTMLAnchorElement>('a[data-cta]');

  // lp=a|b vai junto no link do grupo, para o redirecionamento também saber a versão
  const params = { ...utms, lp: getVariante() };

  links.forEach((link) => {
    link.href = appendUtms(link.href, params);

    link.addEventListener('click', () => {
      trackCtaClick(
        {
          secao: link.dataset.cta || 'desconhecida',
          elemento: link.dataset.elemento || 'botao',
          oferta: link.dataset.oferta,
        },
        utms,
      );
    });
  });
}
