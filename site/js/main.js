(() => {
  'use strict';

  /* ---------------------------------------------------------------------
   * Config — troque o número de WhatsApp abaixo pelo número real do artista/galeria.
   * ------------------------------------------------------------------- */
  const WHATSAPP_NUMBER = '5581999999999';

  const wa = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  const MESSAGES = {
    curador: 'Olá! Gostaria de falar com o curador sobre as obras de Caio Livio.',
    catalogo: 'Olá! Gostaria de receber o Catálogo Completo de Caio Livio em PDF.',
    simulacao: 'Olá! Gostaria de solicitar uma simulação de obra no meu ambiente.',
    obra: (titulo, codigo) => `Olá! Tenho interesse na obra ${titulo} (${codigo}). Poderia me enviar mais informações?`,
    visita: 'Olá! Vim pelo site da galeria.',
    curadoriaEnviada: 'Olá! Acabei de enviar uma solicitação de curadoria pelo site.',
  };

  /* ---------------------------------------------------------------------
   * Data
   * ------------------------------------------------------------------- */
  const SERIES = [
    { num: '01', name: 'Essência', desc: 'Exploração emocional', count: '42', key: 'ESSÊNCIA', grad: 'var(--serie-essencia)' },
    { num: '02', name: 'Movimento', desc: 'Dinamismo e energia', count: '38', key: 'MOVIMENTO', grad: 'var(--serie-movimento)' },
    { num: '03', name: 'Horizonte', desc: 'Paisagens abstratas', count: '45', key: 'HORIZONTE', grad: 'var(--serie-horizonte)' },
    { num: '04', name: 'Conexões', desc: 'Relações humanas', count: '35', key: 'CONEXÕES', grad: 'var(--serie-conexoes)' },
    { num: '05', name: 'Origem', desc: 'Raízes culturais brasileiras', count: '40', key: 'ORIGEM', grad: 'var(--serie-origem)' },
  ];

  const MARQUEE_ITEMS = [
    '200+ OBRAS AUTORAIS', 'RECIFE · PERNAMBUCO · BRASIL', 'CERTIFICADO DE AUTENTICIDADE',
    'COLECIONADORES EM TODO O BRASIL', 'ATENDIMENTO PERSONALIZADO POR CURADORIA', 'PINTURA ABSTRATA CONTEMPORÂNEA',
  ];

  const TESTIMONIALS = [
    { text: 'Adquiri duas obras da série Horizonte para o meu escritório em São Paulo. A qualidade da pintura e a profundidade emocional das peças transformaram completamente o ambiente. Caio tem um talento raro para capturar estados de alma em tela.', name: 'Marcos Andrade', role: 'Empresário · São Paulo', initial: 'M' },
    { text: 'Como arquiteta, fico muito exigente com as obras que recomendo para os meus clientes. As telas de Caio têm uma versatilidade estética extraordinária, se adaptando perfeitamente a projetos contemporâneos de alto padrão.', name: 'Carla Mendes', role: 'Arquiteta de Interiores · Recife', initial: 'C' },
    { text: 'Sou colecionadora de arte há vinte anos e posso dizer com convicção que a série Essência é um dos trabalhos mais consistentes que encontrei na cena nordestina contemporânea. Obras que crescem com o tempo.', name: 'Ana Cláudia Ferreira', role: 'Colecionadora de Arte · Fortaleza', initial: 'A' },
  ];

  const EXPOS = [
    { year: '2024', title: 'Série Origens: Exposição Individual', place: 'Galeria Amparo 60 · Recife, PE', desc: 'Apresentação inédita da série Origens, explorando as raízes culturais brasileiras através da linguagem abstrata. A exposição reuniu colecionadores e críticos de arte de todo o Nordeste, consolidando Caio Livio como uma das vozes mais consistentes da cena artística pernambucana contemporânea.' },
    { year: '2023', title: 'Arte Contemporânea Nordestina', place: 'MAMAM · Museu de Arte Moderna Aloisio Magalhães · Recife, PE', desc: 'Participação em mostra coletiva dedicada à nova geração de artistas nordestinos, com obras da série Movimento em destaque na curadoria principal.' },
    { year: '2022', title: 'Movimento e Abstração: Coletiva', place: 'Espaço Cultural Casa Amarela · Recife, PE', desc: 'Mostra coletiva reunindo artistas abstratos da região metropolitana do Recife, com diálogos entre gestualismo e expressionismo contemporâneo.' },
    { year: '2019', title: 'Essência: Primeira Grande Individual', place: 'CCBB · Centro Cultural Banco do Brasil · Recife, PE', desc: 'Primeira exposição individual de grande porte, apresentando a série Essência completa e marcando a entrada do artista no circuito institucional.' },
    { year: '2016', title: 'Novos Talentos da Arte Brasileira', place: 'Galeria Nara Roesler · São Paulo, SP', desc: 'Seleção nacional de artistas emergentes, com obras expostas e primeira projeção do trabalho fora do Nordeste.' },
    { year: '2012', title: 'Horizontes Abstrato: Individual de Estreia', place: 'Galeria Mamute · Recife, PE', desc: 'Exposição de estreia, apresentando os primeiros experimentos com a linguagem gestual que viria a definir o vocabulário visual do artista.' },
  ];

  const CONTACTS = [
    { label: 'WHATSAPP', value: '+55 (81) 9 9999-9999', href: () => wa(MESSAGES.visita), icon: 'M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z' },
    { label: 'INSTAGRAM', value: '@caiolivioarte', href: () => 'https://instagram.com/caiolivioarte', icon: null, rect: true },
    { label: 'E-MAIL', value: 'curadoria@caiolivio.art', href: () => 'mailto:curadoria@caiolivio.art', icon: null, mail: true },
    { label: 'LOCALIZAÇÃO', value: 'Recife, Pernambuco, Brasil', href: () => '#contato', icon: null, pin: true },
  ];

  const IMG_DIR = 'images/obras/';
  const THUMB_DIR = 'images/obras/thumbs/';

  // Página atual: index (destaques) ou catálogo completo
  const IS_CATALOGO = document.body.dataset.page === 'catalogo';
  const PAGE_SIZE = IS_CATALOGO ? 12 : 8;

  function buildObras() {
    // Fotos reais do acervo (geradas em js/obras-data.js a partir da pasta obras/)
    const fotos = (window.OBRAS_FOTOS || []).filter(o => o.int.length > 0);
    return fotos.map((f, i) => {
      const s = SERIES[i % 5];
      const n = String(f.n).padStart(3, '0');
      return {
        id: f.n,
        serie: s.name,
        serieKey: s.key,
        title: `Obra ${n}`,
        codigo: `CL·${n}`,
        dim: 'Medidas sob consulta',
        year: null,
        grad: s.grad,
        img: IMG_DIR + f.int[0],
        thumb: THUMB_DIR + f.int[0],
        galeria: [...f.int, ...f.det, ...f.dupla],
      };
    });
  }
  const OBRAS = buildObras();

  /* ---------------------------------------------------------------------
   * Favoritos (carrinho) — persistidos no navegador do visitante
   * ------------------------------------------------------------------- */
  const FAV_KEY = 'cl_favoritos';
  const HEART_ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 6.6a5.5 5.5 0 0 0-7.8 0L12 7.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 23l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';

  function loadFavorites() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
    catch { return []; }
  }
  let favorites = loadFavorites();
  function saveFavorites() { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); }
  function isFavorited(id) { return favorites.includes(id); }
  function toggleFavorite(id) {
    favorites = isFavorited(id) ? favorites.filter(x => x !== id) : [...favorites, id];
    saveFavorites();
    syncFavUI(id);
  }

  function syncFavUI(id) {
    document.querySelectorAll(`.obra-card__fav[data-id="${id}"]`).forEach(btn => {
      btn.classList.toggle('is-active', isFavorited(id));
    });
    if (currentModalId === id) updateModalFavButton();
    updateCartBadge();
    if (!cartOverlay.hidden) renderCart();
  }

  function updateCartBadge() {
    cartCountEl.textContent = String(favorites.length);
    cartCountEl.hidden = favorites.length === 0;
  }

  /* ---------------------------------------------------------------------
   * Header scroll state
   * ------------------------------------------------------------------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
   * Mobile nav toggle
   * ------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') { nav.classList.remove('is-open'); navToggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------------------------------------------------------------------
   * WhatsApp links
   * ------------------------------------------------------------------- */
  document.querySelectorAll('.js-wa-curador').forEach(el => el.href = wa(MESSAGES.curador));
  document.querySelectorAll('.js-wa-catalogo').forEach(el => el.href = wa(MESSAGES.catalogo));
  document.querySelectorAll('.js-wa-simulacao').forEach(el => el.href = wa(MESSAGES.simulacao));

  /* ---------------------------------------------------------------------
   * Marquee (duplicated for seamless loop)
   * ------------------------------------------------------------------- */
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const marqueeGroupHtml = MARQUEE_ITEMS.map(m => `<span class="marquee__item">${m}</span>`).join('');
    marqueeTrack.innerHTML = `<div class="marquee__group">${marqueeGroupHtml}</div><div class="marquee__group">${marqueeGroupHtml}</div>`;
  }

  /* ---------------------------------------------------------------------
   * Coleções
   * ------------------------------------------------------------------- */
  const seriesList = document.getElementById('seriesList');
  if (seriesList) {
  seriesList.innerHTML = SERIES.map(s => `
    <div class="series-row" data-serie="${s.key}">
      <div class="series-row__swatch" style="background:${s.grad}"></div>
      <span class="series-row__num">Série ${s.num}</span>
      <div>
        <div class="series-row__name">${s.name}</div>
        <div class="series-row__desc">${s.desc}</div>
      </div>
      <span class="series-row__count">${s.count} OBRAS</span>
      <span class="series-row__arrow">→</span>
    </div>
  `).join('');
  seriesList.addEventListener('click', (e) => {
    const row = e.target.closest('.series-row');
    if (!row) return;
    pickSerie(row.dataset.serie);
  });
  }

  /* ---------------------------------------------------------------------
   * Acervo — busca, filtros, grid, paginação, modal
   * ------------------------------------------------------------------- */
  const filterNames = ['TODAS', ...SERIES.map(s => s.key)];
  const state = { filter: 'TODAS', query: '', shown: PAGE_SIZE };

  const filterChips = document.getElementById('filterChips');
  const obrasGrid = document.getElementById('obrasGrid');
  const obraCount = document.getElementById('obraCount');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const obraSearch = document.getElementById('obraSearch');

  function renderChips() {
    filterChips.innerHTML = filterNames.map(f => `
      <button class="filter-chip${state.filter === f ? ' is-active' : ''}" data-filter="${f}">${f}</button>
    `).join('');
  }

  function getFiltered() {
    const q = state.query.trim().toLowerCase();
    return OBRAS.filter(o => {
      if (state.filter !== 'TODAS' && o.serieKey !== state.filter) return false;
      if (q && !`${o.title} ${o.codigo} ${o.serie}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }

  function renderObras() {
    const filtered = getFiltered();
    const visible = filtered.slice(0, state.shown);

    obrasGrid.innerHTML = visible.map(o => `
      <div class="obra-card" data-id="${o.id}">
        <div class="obra-card__wall js-open-modal" data-id="${o.id}">
          <div class="obra-card__spot"></div>
          <button class="obra-card__fav js-fav-btn${isFavorited(o.id) ? ' is-active' : ''}" data-id="${o.id}" aria-label="Favoritar obra" type="button">${HEART_ICON}</button>
          <div class="matte matte--sm">
            <div class="artwork artwork--square" style="background:${o.grad}">
              <img src="${o.thumb}" alt="${o.title} — pintura abstrata de Caio Livio" loading="lazy">
            </div>
          </div>
        </div>
        <div class="obra-card__info">
          <div>
            <div class="obra-card__title">${o.title}</div>
            <div class="obra-card__meta">${o.dim}</div>
          </div>
          <button class="btn-outline-gold js-open-modal" data-id="${o.id}" type="button">SOLICITAR</button>
        </div>
      </div>
    `).join('');

    obraCount.textContent = `Exibindo ${visible.length} de ${filtered.length} obras`;
    // No index o botão vira link para o catálogo completo e fica sempre visível
    loadMoreWrap.classList.toggle('is-hidden', IS_CATALOGO && visible.length >= filtered.length);
  }

  function pickSerie(key) {
    state.filter = key;
    state.shown = PAGE_SIZE;
    renderChips();
    renderObras();
    const el = document.getElementById('acervo');
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  }

  filterChips.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;
    state.filter = btn.dataset.filter;
    state.shown = PAGE_SIZE;
    renderChips();
    renderObras();
  });

  obraSearch.addEventListener('input', (e) => {
    state.query = e.target.value;
    state.shown = PAGE_SIZE;
    renderObras();
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      state.shown += PAGE_SIZE;
      renderObras();
    });
  }

  /* ---------------------------------------------------------------------
   * Modal
   * ------------------------------------------------------------------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCard = document.getElementById('modalCard');
  const modalArtwork = document.getElementById('modalArtwork');
  const modalCode = document.getElementById('modalCode');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const modalDim = document.getElementById('modalDim');
  const modalYear = document.getElementById('modalYear');
  const modalSerie = document.getElementById('modalSerie');
  const modalWa = document.getElementById('modalWa');
  const modalFav = document.getElementById('modalFav');
  let currentModalId = null;

  function updateModalFavButton() {
    const active = currentModalId !== null && isFavorited(currentModalId);
    modalFav.classList.toggle('is-active', active);
    modalFav.innerHTML = `${HEART_ICON} ${active ? 'FAVORITADO' : 'FAVORITAR'}`;
  }

  const modalThumbs = document.getElementById('modalThumbs');

  function setModalImage(o, file) {
    modalArtwork.style.background = o.grad;
    modalArtwork.innerHTML = `<img src="${IMG_DIR}${file}" alt="${o.title} — pintura abstrata de Caio Livio">`;
    modalThumbs.querySelectorAll('.modal__thumb').forEach(t => {
      t.classList.toggle('is-active', t.dataset.file === file);
    });
  }

  function openModal(id) {
    const o = OBRAS.find(x => x.id === id);
    if (!o) return;
    currentModalId = id;
    modalCode.textContent = o.codigo;
    modalTitle.textContent = o.title;
    modalSub.textContent = `Pintura Abstrata · Série ${o.serie}`;
    modalDim.textContent = o.dim;
    modalYear.textContent = 'Sob consulta';
    modalSerie.textContent = o.serie;
    modalWa.href = wa(MESSAGES.obra(o.title, o.codigo));
    modalThumbs.innerHTML = o.galeria.map(f => `
      <button class="modal__thumb" data-file="${f}" type="button">
        <img src="${THUMB_DIR}${f}" alt="" loading="lazy">
      </button>
    `).join('');
    setModalImage(o, o.galeria[0]);
    updateModalFavButton();
    modalOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  modalThumbs.addEventListener('click', (e) => {
    const btn = e.target.closest('.modal__thumb');
    if (!btn || currentModalId === null) return;
    const o = OBRAS.find(x => x.id === currentModalId);
    if (o) setModalImage(o, btn.dataset.file);
  });
  function closeModal() {
    modalOverlay.hidden = true;
    document.body.style.overflow = '';
  }

  obrasGrid.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.js-fav-btn');
    if (favBtn) { toggleFavorite(Number(favBtn.dataset.id)); return; }
    const trigger = e.target.closest('.js-open-modal');
    if (!trigger) return;
    openModal(Number(trigger.dataset.id));
  });
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  modalCard.addEventListener('click', (e) => e.stopPropagation());
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalBack').addEventListener('click', closeModal);
  modalFav.addEventListener('click', () => { if (currentModalId !== null) toggleFavorite(currentModalId); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modalOverlay.hidden) closeModal(); });

  renderChips();
  renderObras();

  /* ---------------------------------------------------------------------
   * Visualizador de ambiente — obra aplicada na parede de uma sala
   * ------------------------------------------------------------------- */
  const ambOverlay = document.getElementById('ambOverlay');
  const ambPanel = document.getElementById('ambPanel');
  const ambTitle = document.getElementById('ambTitle');
  const ambArt = document.getElementById('ambArt');
  const ambArtImg = document.getElementById('ambArtImg');
  const ambFoto = document.getElementById('ambFoto');
  const ambSizes = document.getElementById('ambSizes');
  const ambEnvs = document.getElementById('ambEnvs');

  // Fotos reais de ambiente (Pexels, licença livre). cx/bottom em % da foto;
  // widths = largura da obra em % da foto, por tamanho.
  const AMBIENTES = {
    sala:   { img: 'images/ambientes/sala.jpg',   cx: 50, bottom: 52, widths: { p: 18, m: 23, g: 29 } },
    hall:   { img: 'images/ambientes/hall.jpg',   cx: 50, bottom: 55, widths: { p: 14, m: 18, g: 22 } },
    quarto: { img: 'images/ambientes/quarto.jpg', cx: 47, bottom: 52, widths: { p: 11, m: 14, g: 17 } },
  };
  let ambSize = 'm';
  let ambEnv = 'sala';

  function applyAmb() {
    const env = AMBIENTES[ambEnv];
    if (ambFoto.getAttribute('src') !== env.img) ambFoto.src = env.img;
    ambArt.style.left = env.cx + '%';
    ambArt.style.bottom = env.bottom + '%';
    ambArt.style.width = env.widths[ambSize] + '%';
    ambSizes.querySelectorAll('.amb-size').forEach(b => {
      b.classList.toggle('is-active', b.dataset.size === ambSize);
    });
    ambEnvs.querySelectorAll('.amb-size').forEach(b => {
      b.classList.toggle('is-active', b.dataset.env === ambEnv);
    });
  }

  function openAmbiente() {
    if (currentModalId === null) return;
    const o = OBRAS.find(x => x.id === currentModalId);
    if (!o) return;
    ambTitle.textContent = `${o.title} · Caio Livio`;
    ambArtImg.src = o.img;
    applyAmb();
    ambOverlay.hidden = false;
  }
  function closeAmbiente() { ambOverlay.hidden = true; }

  document.getElementById('modalAmbiente').addEventListener('click', openAmbiente);
  document.getElementById('ambClose').addEventListener('click', closeAmbiente);
  ambOverlay.addEventListener('click', (e) => { if (e.target === ambOverlay) closeAmbiente(); });
  ambPanel.addEventListener('click', (e) => e.stopPropagation());
  ambSizes.addEventListener('click', (e) => {
    const btn = e.target.closest('.amb-size');
    if (!btn) return;
    ambSize = btn.dataset.size;
    applyAmb();
  });
  ambEnvs.addEventListener('click', (e) => {
    const btn = e.target.closest('.amb-size');
    if (!btn) return;
    ambEnv = btn.dataset.env;
    applyAmb();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !ambOverlay.hidden) closeAmbiente(); });

  /* ---------------------------------------------------------------------
   * Carrinho de favoritos
   * ------------------------------------------------------------------- */
  const cartToggle = document.getElementById('cartToggle');
  const cartCountEl = document.getElementById('cartCount');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartPanel = document.getElementById('cartPanel');
  const cartList = document.getElementById('cartList');
  const cartEmpty = document.getElementById('cartEmpty');

  function renderCart() {
    const items = OBRAS.filter(o => isFavorited(o.id));
    cartEmpty.classList.toggle('is-visible', items.length === 0);
    cartList.innerHTML = items.map(o => `
      <div class="cart-item" data-id="${o.id}">
        <div class="cart-item__swatch" style="background:${o.grad}"><img src="${o.thumb}" alt="" loading="lazy"></div>
        <div>
          <div class="cart-item__title">${o.title}</div>
          <div class="cart-item__meta">${o.dim} · ${o.serie}</div>
          <div class="cart-item__actions">
            <a href="${wa(MESSAGES.obra(o.title, o.codigo))}" class="cart-item__wa" target="_blank" rel="noopener">SOLICITAR VIA WHATSAPP</a>
            <button class="cart-item__remove js-cart-remove" data-id="${o.id}" type="button">REMOVER</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function openCart() { renderCart(); cartOverlay.hidden = false; document.body.style.overflow = 'hidden'; }
  function closeCart() { cartOverlay.hidden = true; document.body.style.overflow = ''; }

  cartToggle.addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', (e) => { if (e.target === cartOverlay) closeCart(); });
  cartPanel.addEventListener('click', (e) => e.stopPropagation());
  cartList.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-cart-remove');
    if (!btn) return;
    toggleFavorite(Number(btn.dataset.id));
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !cartOverlay.hidden) closeCart(); });

  updateCartBadge();

  /* ---------------------------------------------------------------------
   * Depoimentos
   * ------------------------------------------------------------------- */
  const testimonialsGrid = document.getElementById('testimonialsGrid');
  if (testimonialsGrid) testimonialsGrid.innerHTML = TESTIMONIALS.map(d => `
    <div class="testimonial">
      <span class="testimonial__quote-mark">"</span>
      <p class="testimonial__text">${d.text}</p>
      <div class="testimonial__author">
        <span class="testimonial__avatar">${d.initial}</span>
        <div>
          <div class="testimonial__name">${d.name}</div>
          <div class="testimonial__role">${d.role}</div>
        </div>
      </div>
    </div>
  `).join('');

  /* ---------------------------------------------------------------------
   * Exposições
   * ------------------------------------------------------------------- */
  const expoList = document.getElementById('expoList');
  const expoMeta = document.getElementById('expoMeta');
  const expoTitle = document.getElementById('expoTitle');
  const expoDesc = document.getElementById('expoDesc');
  let expoIdx = 0;

  if (expoList) {

  function renderExpos() {
    expoList.innerHTML = EXPOS.map((e, i) => `
      <div class="expo-item${i === expoIdx ? ' is-active' : ''}" data-idx="${i}">
        <span class="expo-item__year">${e.year}</span>
        <div>
          <div class="expo-item__title">${e.title}</div>
          <div class="expo-item__place">${e.place}</div>
        </div>
      </div>
    `).join('');
    const sel = EXPOS[expoIdx];
    expoMeta.textContent = `${sel.year} · ${sel.place.toUpperCase()}`;
    expoTitle.textContent = sel.title;
    expoDesc.textContent = sel.desc;
  }
  expoList.addEventListener('click', (e) => {
    const item = e.target.closest('.expo-item');
    if (!item) return;
    expoIdx = Number(item.dataset.idx);
    renderExpos();
  });
  renderExpos();
  }

  /* ---------------------------------------------------------------------
   * Contato — métodos + formulário
   * ------------------------------------------------------------------- */
  const ICONS = {
    wa: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z"/></svg>',
    ig: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    mail: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    pin: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  };
  const contactIconKeys = ['wa', 'ig', 'mail', 'pin'];

  const contactMethods = document.getElementById('contactMethods');
  if (contactMethods) contactMethods.innerHTML = CONTACTS.map((c, i) => `
    <a href="${c.href()}" class="contact-method" target="${i === 0 || i === 1 ? '_blank' : '_self'}" rel="noopener">
      <span class="contact-method__icon">${ICONS[contactIconKeys[i]]}</span>
      <span>
        <span class="contact-method__label">${c.label}</span>
        <span class="contact-method__value">${c.value}</span>
      </span>
    </a>
  `).join('');

  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.open(wa(MESSAGES.curadoriaEnviada), '_blank');
      contactForm.hidden = true;
      formSuccess.hidden = false;
    });
  }

  /* ---------------------------------------------------------------------
   * Reveal on scroll
   * ------------------------------------------------------------------- */
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
})();
