/**
 * Interações da página. Tudo é progressivo: sem JavaScript (ou com "reduzir movimento"
 * ativado no sistema), a página aparece completa e parada.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

/** Cards e celular inclinam em 3D seguindo o mouse. */
function initTilt() {
  if (reduceMotion || !finePointer) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--tilt-x', `${(-y * 8).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${(x * 10).toFixed(2)}deg`);
      el.style.setProperty('--glare-x', `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--glare-y', `${((y + 0.5) * 100).toFixed(1)}%`);
      el.classList.add('is-tilting');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
      el.classList.remove('is-tilting');
    });
  });
}

/** Mascote se inclina na direção do mouse/dedo e se agita quando alguém passa no botão. */
function initMascots() {
  if (reduceMotion) return;
  const mascots = [...document.querySelectorAll<HTMLElement>('[data-mascot-react]')];
  if (!mascots.length) return;

  let frame = 0;
  const lean = (clientX: number, clientY: number) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      mascots.forEach((mascot) => {
        const rect = mascot.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const dx = (clientX - (rect.left + rect.width / 2)) / window.innerWidth;
        const dy = (clientY - (rect.top + rect.height / 2)) / window.innerHeight;
        mascot.style.setProperty('--lean', `${clamp(dx * 14, -7, 7).toFixed(2)}deg`);
        mascot.style.setProperty('--lift', `${clamp(dy * 10, -6, 6).toFixed(1)}px`);
      });
    });
  };
  window.addEventListener('pointermove', (e) => lean(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchstart', (e) => lean(e.touches[0].clientX, e.touches[0].clientY), { passive: true });

  const excite = () => {
    mascots.forEach((mascot) => {
      mascot.classList.remove('is-excited');
      void mascot.offsetWidth; // reinicia a animação
      mascot.classList.add('is-excited');
    });
  };
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointerenter', excite);
    btn.addEventListener('focus', excite);
  });
  mascots.forEach((mascot) => mascot.addEventListener('animationend', () => mascot.classList.remove('is-excited')));
}

/** Celular simulado: as mensagens chegam uma por uma, com "digitando...". */
function initChat() {
  const phone = document.querySelector<HTMLElement>('[data-chat]');
  if (!phone || reduceMotion || !('IntersectionObserver' in window)) return;

  const bubbles = [...phone.querySelectorAll<HTMLElement>('[data-bubble]')];
  const typing = phone.querySelector<HTMLElement>('[data-typing]');
  const status = phone.querySelector<HTMLElement>('[data-chat-status]');
  const replay = document.querySelector<HTMLButtonElement>('[data-chat-replay]');
  const statusText = status?.textContent ?? '';
  let running = false;

  const play = async () => {
    if (running) return;
    running = true;
    if (replay) replay.hidden = true;
    bubbles.forEach((b) => b.classList.add('is-pending'));
    for (const bubble of bubbles) {
      if (typing) typing.hidden = false;
      if (status) status.textContent = 'FaroFino está digitando...';
      await wait(1100);
      if (typing) typing.hidden = true;
      if (status) status.textContent = statusText;
      bubble.classList.remove('is-pending');
      bubble.classList.add('is-in');
      await wait(500);
    }
    running = false;
    if (replay) replay.hidden = false;
  };

  const rect = phone.getBoundingClientRect();
  if (rect.top > window.innerHeight) bubbles.forEach((b) => b.classList.add('is-pending'));

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        play();
      }
    },
    { threshold: 0.35 },
  );
  observer.observe(phone);
  replay?.addEventListener('click', play);
}

/** Blocos abaixo da primeira tela surgem suavemente ao rolar. */
function initReveal() {
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
    (el) => el.getBoundingClientRect().top > window.innerHeight,
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  items.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${(i % 4) * 70}ms`);
    observer.observe(el);
  });
}

/** Etiquetas do fundo da primeira dobra se movem de leve com o mouse (efeito de profundidade). */
function initParallax() {
  if (reduceMotion || !finePointer) return;
  const layer = document.querySelector<HTMLElement>('[data-parallax]');
  if (!layer) return;
  window.addEventListener(
    'pointermove',
    (event) => {
      if (window.scrollY > window.innerHeight) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      layer.style.setProperty('--px', `${(-x * 24).toFixed(1)}px`);
      layer.style.setProperty('--py', `${(-y * 16).toFixed(1)}px`);
    },
    { passive: true },
  );
}

/** Botões: brilho que acompanha o mouse. */
function initButtons() {
  if (!finePointer) return;
  document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', (event) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--shine-x', `${event.clientX - rect.left}px`);
      btn.style.setProperty('--shine-y', `${event.clientY - rect.top}px`);
    });
  });
}

export function initInteractions() {
  initTilt();
  initMascots();
  initChat();
  initReveal();
  initParallax();
  initButtons();
}
