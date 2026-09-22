const categories = [
  { id: 'engine', name: 'Двигатель', sub: 'Детали и комплектующие', request: 'Детали двигателя' },
  { id: 'hydraulics', name: 'Гидравлика', sub: 'Насосы, цилиндры, РВД', request: 'Гидравлическая система' },
  { id: 'filters', name: 'Фильтры и масла', sub: 'Всё для обслуживания', request: 'Фильтры и масла' },
  { id: 'transmission', name: 'Трансмиссия', sub: 'Мосты и коробки передач', request: 'Детали трансмиссии' },
  { id: 'electrics', name: 'Электрика', sub: 'Стартеры, генераторы, датчики', request: 'Электрооборудование' },
  { id: 'equipment', name: 'Рабочее оборудование', sub: 'Ковши, коронки и зубья', request: 'Рабочее оборудование' },
  { id: 'undercarriage', name: 'Ходовая часть', sub: 'Гусеницы и опорные ролики', request: 'Детали ходовой части' },
  { id: 'fuel', name: 'Топливная система', sub: 'Насосы и форсунки', request: 'Детали топливной системы' },
  { id: 'wheels', name: 'Шины и диски', sub: 'Колёса для спецтехники', request: 'Шины и диски' },
  { id: 'pins', name: 'Пальцы и втулки', sub: 'Соединения рабочих узлов', request: 'Пальцы и втулки' },
  { id: 'seals', name: 'Сальники', sub: 'Уплотнения и манжеты', request: 'Сальники и уплотнения' },
  { id: 'cabin', name: 'Кабина и стёкла', sub: 'Остекление и детали кузова', request: 'Детали кабины и стёкла JCB' },
];

// Only the source-confirmed article is supplied. Other part numbers and fitment need a client export.
const products = [
  { id: 'valve', name: 'Распределитель передний Husco', article: '25/222579', category: 'hydraulics', price: 260000, brand: 'Husco', image: 'valve.jpg' },
  { id: 'crankshaft', name: 'Вал коленчатый', article: '', category: 'engine', price: 65000, brand: '', image: 'crankshaft.jpg' },
  { id: 'starter', name: 'Стартер', article: '', category: 'electrics', price: 21000, brand: '', image: 'starter.jpg' },
  { id: 'alternator', name: 'Генератор', article: '', category: 'electrics', price: 16000, brand: '', image: 'alternator.jpg' },
  { id: 'tensioner', name: 'Натяжитель Gates', article: '', category: 'engine', price: 5000, brand: 'Gates', image: 'tensioner.jpg' },
  { id: 'gear', name: 'Главная пара', article: '', category: 'transmission', price: 19000, brand: '', image: 'gear.jpg' },
  { id: 'bucket', name: 'Ковш 40 см', article: '', category: 'equipment', price: 39000, brand: '', image: 'bucket.jpg' },
  { id: 'switch', name: 'Подрулевой переключатель', article: '', category: 'electrics', price: 15000, brand: '', image: 'switch.jpg' },
  { id: 'belt', name: 'Ремни генератора', article: '', category: 'engine', price: 2500, brand: '', image: 'belt.jpg' },
];
const main = document.querySelector('#main');
const dialog = document.querySelector('#request-dialog');
const money = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const normalize = value => value.toLocaleLowerCase('ru-RU').replace(/ё/g, 'е').replace(/[\s/\-_.]/g, '');
const refreshIcons = () => window.lucide?.createIcons();
let searchMode = 'article';
let sortMode = 'default';
let returnFocus = null;
let cleanupCategoryCards = () => {};
let cleanupPopularCarousel = () => {};

function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="#home">Главная</a>${items.map(item => `${icon('chevron-right')}${item.href ? `<a href="${item.href}">${escapeHtml(item.name)}</a>` : `<span aria-current="page">${escapeHtml(item.name)}</span>`}`).join('')}</nav>`;
}

function productRow(product, compact = false) {
  const meta = product.article ? `<code>${product.article}</code>` : '<span>Артикул уточним при подборе</span>';
  return `<article class="product-row"><a class="product-image" href="#product?id=${product.id}" aria-label="${escapeHtml(product.name)}"><img src="assets/${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" width="100" height="86"></a><div><a class="product-title" href="#product?id=${product.id}">${escapeHtml(product.name)}</a><div class="product-meta">${meta}${product.brand ? `<span>${product.brand}</span>` : ''}</div>${compact ? '<div class="stock">Наличие уточняется</div>' : ''}</div>${compact ? '' : '<div class="stock">Уточнить наличие</div>'}<div class="price">${money(product.price)}<small>цена из каталога</small></div><button class="row-request" data-product="${product.id}" aria-label="Заказать: ${escapeHtml(product.name)}">Заказать${icon('arrow-up-right')}</button></article>`;
}

function finder() {
  return `<section class="finder" id="part-finder" aria-labelledby="finder-title" tabindex="-1"><div class="container finder-inner"><div class="finder-heading"><h2 id="finder-title">Нужная деталь. Точный поиск.</h2></div><div class="finder-workspace"><div class="finder-tabs" role="tablist" aria-label="Способ подбора"><button id="tab-article" role="tab" aria-controls="finder-panel" aria-selected="true" data-mode="article">По артикулу</button><button id="tab-name" role="tab" aria-controls="finder-panel" aria-selected="false" tabindex="-1" data-mode="name">По названию</button><button id="tab-model" role="tab" aria-controls="finder-panel" aria-selected="false" tabindex="-1" data-mode="model">По модели</button></div><div id="finder-panel" role="tabpanel" aria-labelledby="tab-article">${searchPanel('article')}</div></div></div></section>`;
}

function searchPanel(mode) {
  if (mode === 'model') return `<form class="search-large finder-search" data-model-form><label class="finder-input"><span>Модель техники</span><select name="model" aria-label="Модель техники"><option value="JCB 3CX">JCB 3CX</option><option value="JCB 4CX">JCB 4CX</option><option value="JCB 5CX">JCB 5CX</option><option value="Телескопический погрузчик JCB">Телескопический погрузчик JCB</option><option value="Другая модель JCB">Другая модель JCB</option></select></label><button class="button dark" type="submit">Подобрать${icon('arrow-right')}</button></form><div class="search-examples">Совместимость уточним по серийному номеру техники.</div>`;
  return `<form class="search-large finder-search" data-search>${icon('search')}<label class="finder-input"><span class="sr-only">${mode === 'article' ? 'Артикул запчасти' : 'Название запчасти'}</span><input name="q" type="search" placeholder="${mode === 'article' ? 'Артикул запчасти' : 'Название детали'}" autocomplete="off" required></label><button class="button dark" type="submit">Найти${icon('arrow-right')}</button></form><div class="search-examples"><span>Например:</span>${(mode === 'article' ? ['25/222579'] : ['Генератор', 'Стартер', 'Главная пара']).map(query => `<button data-query="${query}">${query}${icon('arrow-up-right')}</button>`).join('')}</div>`;
}

function productCard(product, kind = 'catalog') {
  const category = categories.find(item => item.id === product.category);
  const studio = ['valve','crankshaft','starter','gear','alternator','tensioner'].includes(product.id);
  const image = studio ? product.id + '-studio.jpg' : product.image;
  const badge = { popular: 'Выбор покупателей', new: 'Новинка', special: 'Особые условия' }[kind] || '';
  return `<article class="part-card part-card--${kind}"><a class="part-visual" href="#product?id=${product.id}" aria-label="${escapeHtml(product.name)}">${badge ? `<span class="part-badge">${badge}</span>` : ''}<img src="assets/${image}" alt="${escapeHtml(product.name)}${studio ? ' — визуализация' : ''}" loading="lazy" width="500" height="500"><span class="part-view">${icon('arrow-up-right')}</span></a><div class="part-body"><span class="part-category">${category.name}${product.brand ? ' / ' + product.brand : ''}</span><h3><a href="#product?id=${product.id}">${escapeHtml(product.name)}</a></h3><div class="part-article">${product.article ? `Артикул <code>${product.article}</code>` : 'Артикул уточняется'}</div><div class="part-bottom"><div class="part-price">${kind === 'special' ? 'По запросу' : money(product.price)}<small>${kind === 'special' ? 'Условия у менеджера' : 'Наличие уточняется'}</small></div><button class="part-request" data-product="${product.id}" aria-label="Запросить: ${escapeHtml(product.name)}" title="Запросить деталь">${icon('plus')}</button></div></div></article>`;
}

function productShowcases() {
  // Editorial demo selections, not verified sales rankings or arrival dates.
  const cards = (ids,kind) => ids.map(id=>productCard(products.find(product=>product.id===id),kind)).join('');
  return `${popularCarousel(cards(['valve','crankshaft','starter','gear','alternator','tensioner'],'popular'))}<section class="new-section" id="new" aria-labelledby="new-title"><div class="container new-inner"><div class="new-copy"><span class="section-index">ЗНАКОМИМСЯ БЛИЖЕ</span><h2 id="new-title">Новинки</h2><p>Комплектующие для вашей следующей задачи. Подберём исполнение под конкретную машину.</p><a class="text-link" href="#catalog">Смотреть запчасти${icon('arrow-right')}</a><div class="new-caption">${icon('component')}<span>От отдельных деталей<br>до комплектующих узла</span></div></div><div class="new-products">${cards(['alternator','tensioner'],'new')}</div></div></section><section class="special-section" id="offers" aria-labelledby="special-title"><div class="container special-inner"><div class="special-copy"><span class="section-index">РАЗУМНЫЙ ПОДХОД К ОБСЛУЖИВАНИЮ</span><h2 id="special-title">Спецпредложения</h2><p>Обсудим специальные условия на детали для двигателя и регулярного обслуживания.</p><button class="button yellow" data-request="Специальные предложения на запчасти">Уточнить условия${icon('arrow-up-right')}</button></div><div class="special-products">${cards(['tensioner','crankshaft'],'special')}</div></div></section>`;
}

function popularCarousel(cards) {
  return `<section class="showcase-section" id="popular" aria-labelledby="popular-title" aria-roledescription="карусель"><div class="container section"><div class="section-top"><div><span class="section-index">ПРОВЕРЕННЫЕ РЕШЕНИЯ</span><h2 id="popular-title">Популярные товары</h2></div><a class="text-link" href="#catalog">Весь каталог${icon('arrow-right')}</a></div><div class="popular-viewport" id="popular-slides" tabindex="0" aria-label="Популярные запчасти">${cards}</div><div class="popular-controls"><div class="popular-pages" role="group" aria-label="Страницы популярных товаров"></div><span class="popular-counter" aria-hidden="true"></span><div class="popular-arrows"><button class="icon-button" type="button" data-carousel="prev" aria-controls="popular-slides" aria-label="Предыдущие товары" title="Предыдущие товары">${icon('arrow-left')}</button><button class="icon-button" type="button" data-carousel="next" aria-controls="popular-slides" aria-label="Следующие товары" title="Следующие товары">${icon('arrow-right')}</button></div></div><span class="sr-only popular-announcement" aria-live="polite" aria-atomic="true"></span></div></section>`;
}

function initPopularCarousel() {
  const section = main.querySelector('#popular');
  if (!section) return;
  const viewport = section.querySelector('.popular-viewport');
  const cards = [...viewport.children];
  const pages = section.querySelector('.popular-pages');
  const counter = section.querySelector('.popular-counter');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let perPage = 3;
  let current = 0;
  let total = 2;
  let timer;
  let scrollTimer;
  let hovered = false;
  let visible = false;
  let paused = reducedMotion.matches;

  function update() {
    const bounds = viewport.getBoundingClientRect();
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const onScreen = rect.right > bounds.left + 8 && rect.left < bounds.right - 8;
      card.inert = !onScreen;
      card.setAttribute('aria-hidden', String(!onScreen));
    });
    [...pages.children].forEach((button, index) => button.setAttribute('aria-current', String(index === current)));
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }

  function goTo(index, manual = false) {
    current = (index + total) % total;
    // Card offsets are measured against the scroller, independent of page layout.
    const distance = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(viewport).columnGap);
    viewport.scrollTo({ left: current * perPage * distance, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    if (manual) section.querySelector('.popular-announcement').textContent = `Товары ${current * perPage + 1}–${Math.min((current + 1) * perPage, cards.length)} из ${cards.length}`;
    restart();
  }

  function restart() {
    clearInterval(timer);
    if (paused || hovered || !visible || document.hidden || section.contains(document.activeElement)) return;
    timer = setInterval(() => { if (!dialog.open) goTo(current + 1); }, 6000);
  }

  function layout() {
    const nextPerPage = Number(getComputedStyle(viewport).getPropertyValue('--popular-visible'));
    const firstIndex = current * perPage;
    perPage = nextPerPage;
    total = Math.ceil(cards.length / perPage);
    cards.forEach((card, index) => { card.style.scrollSnapAlign = index % perPage === 0 ? 'start' : 'none'; });
    current = Math.min(Math.floor(firstIndex / perPage), total - 1);
    if (pages.children.length !== total) pages.innerHTML = Array.from({ length: total }, (_, index) => `<button type="button" data-page="${index}" aria-label="Товары ${index * perPage + 1}–${Math.min((index + 1) * perPage, cards.length)}" aria-controls="popular-slides"><span></span></button>`).join('');
    const distance = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(viewport).columnGap);
    viewport.scrollTo({ left: current * perPage * distance, behavior: 'instant' });
    update();
    restart();
  }

  section.addEventListener('click', event => {
    const pageButton = event.target.closest('[data-page]');
    const action = event.target.closest('[data-carousel]')?.dataset.carousel;
    if (pageButton) goTo(Number(pageButton.dataset.page), true);
    if (action === 'prev') goTo(current - 1, true);
    if (action === 'next') goTo(current + 1, true);
  });
  section.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; restart(); } });
  section.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') { hovered = false; restart(); } });
  section.addEventListener('focusin', () => clearInterval(timer));
  section.addEventListener('focusout', event => { if (!section.contains(event.relatedTarget)) queueMicrotask(restart); });
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(current + (event.key === 'ArrowRight' ? 1 : -1), true);
    }
  });
  viewport.addEventListener('pointerdown', () => clearInterval(timer));
  viewport.addEventListener('pointerup', restart);
  viewport.addEventListener('pointercancel', restart);
  viewport.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    clearInterval(timer);
    scrollTimer = setTimeout(() => {
      const distance = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(viewport).columnGap);
      current = Math.min(total - 1, Math.round(viewport.scrollLeft / (distance * perPage)));
      update();
      restart();
    }, 120);
  }, { passive: true });
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; restart(); }, { threshold: 0.15 });
  observer.observe(viewport);
  const resize = new ResizeObserver(layout);
  resize.observe(viewport);
  const onMotionChange = () => { paused = reducedMotion.matches; restart(); };
  reducedMotion.addEventListener('change', onMotionChange);
  document.addEventListener('visibilitychange', restart);
  layout();
  cleanupPopularCarousel = () => {
    clearInterval(timer);
    clearTimeout(scrollTimer);
    observer.disconnect();
    resize.disconnect();
    reducedMotion.removeEventListener('change', onMotionChange);
    document.removeEventListener('visibilitychange', restart);
  };
}

function brandStrip() {
  // Additional manufacturers are an editorial selection pending assortment approval.
  const brands = ['JCB', 'Perkins', 'Gates', 'TIMKEN', 'HUSCO', 'CARRARO', 'ZF', 'SKF', 'Donaldson', 'BOSCH'];
  const group = copy => `<div class="brand-group" ${copy ? 'aria-hidden="true"' : ''}>${brands.map(brand => `<span class="brand-logo brand-logo--${brand.toLowerCase()}">${brand}</span>`).join('')}</div>`;
  return `<section class="brands-band" aria-label="Бренды запчастей"><div class="container brands-heading"><span class="section-index">ИМЕНА, КОТОРЫЕ ЗНАЕТ ВАША ТЕХНИКА</span></div><div class="brand-window"><div class="brand-track">${group(false)}${group(true)}</div></div></section>`;
}

function requestFields(subject = '', productId = '') {
  return `<form class="request-form"><input type="hidden" name="productId" value="${escapeHtml(productId)}"><div class="request-fields-row"><label>Ваше имя<input name="name" placeholder="Как к вам обращаться" autocomplete="given-name" required maxlength="80"></label><label>Телефон<input name="phone" type="tel" placeholder="+7 (___) ___-__-__" autocomplete="tel" required maxlength="24"></label></div><label>Что нужно вашей технике?<textarea name="message" placeholder="Артикул, название детали или модель техники" maxlength="1500" required>${escapeHtml(subject)}</textarea></label><div class="error-message" role="alert" hidden></div><button class="button yellow" type="submit">Подготовить заявку${icon('arrow-up-right')}</button><p class="form-note">Отправка через сайт пока недоступна. Связаться с нами можно по телефону или в Telegram.</p></form>`;
}

function categoryGrid() {
  // Navigation groups for the prototype; not inventory or compatibility claims.
  const groups = {
    engine: ['Блок и головка цилиндров', 'Поршни и гильзы', 'Коленчатые валы', 'Детали ГРМ', 'Насосы и охлаждение', 'Прокладки и ремкомплекты'],
    hydraulics: ['Гидронасосы', 'Гидроцилиндры', 'Распределители', 'Рукава высокого давления', 'Клапаны', 'Ремкомплекты'],
    filters: ['Масляные фильтры', 'Топливные фильтры', 'Воздушные фильтры', 'Гидравлические фильтры', 'Моторные масла', 'Трансмиссионные масла'],
    transmission: ['Коробки передач', 'Мосты', 'Главные пары', 'Полуоси', 'Подшипники', 'Фрикционные диски'],
    electrics: ['Стартеры', 'Генераторы', 'Датчики', 'Реле и предохранители', 'Переключатели', 'Проводка'],
    equipment: ['Ковши', 'Коронки и зубья', 'Адаптеры', 'Режущие кромки', 'Крепёж', 'Быстросъёмные соединения'],
    undercarriage: ['Гусеницы', 'Опорные катки', 'Поддерживающие ролики', 'Ведущие звёздочки', 'Направляющие колёса', 'Натяжители'],
    fuel: ['Топливные насосы', 'Форсунки', 'ТНВД', 'Топливопроводы', 'Насосы подкачки', 'Ремкомплекты'],
    wheels: ['Шины', 'Колёсные диски', 'Ступицы', 'Камеры', 'Колёсный крепёж', 'Вентили'],
    pins: ['Пальцы стрелы', 'Пальцы ковша', 'Втулки', 'Шайбы', 'Стопоры', 'Пресс-маслёнки'],
    seals: ['Сальники валов', 'Уплотнительные кольца', 'Манжеты', 'Пыльники', 'Направляющие кольца', 'Комплекты уплотнений'],
    cabin: ['Лобовые стёкла', 'Боковые стёкла', 'Двери и замки', 'Зеркала', 'Стеклоочистители', 'Уплотнители'],
  };
  const queryAliases = { 'Коленчатые валы': 'коленчатый', 'Стартеры': 'стартер', 'Генераторы': 'генератор', 'Главные пары': 'главная пара', 'Распределители': 'распределитель', 'Ковши': 'ковш', 'Переключатели': 'переключатель' };
  const cards = categories.map((category, index) => {
    const x = (index % 3) * 50;
    const y = Math.floor((index % 6) / 3) * 100;
    const explodedY = Math.floor(index / 3) * 100 / 3;
    return `<article class="category-card" data-category="${category.id}" style="--slot:${index % 3};--art-x:${x}%;--art-y:${y}%;--exploded-y:${explodedY}%;--category-sheet:url('assets/categories${index > 5 ? '-extra' : ''}.jpg')">
      <div class="category-heading"><span class="category-number">${String(index + 1).padStart(2, '0')}<span> / 12</span></span><h3 id="category-title-${category.id}">${category.name}</h3><p>${category.sub}</p></div>
      <span class="category-art" aria-hidden="true"></span>
      <span class="category-open-icon" aria-hidden="true">${icon('arrow-up-right')}</span>
      <div class="category-rail" aria-hidden="true"><span class="category-rail-number">${String(index + 1).padStart(2, '0')}</span><span class="category-rail-title">${category.name}</span></div>
      <button class="category-trigger" type="button" aria-labelledby="category-title-${category.id}" aria-expanded="false" aria-controls="category-panel-${category.id}"></button>
      <div class="category-panel" id="category-panel-${category.id}" inert aria-hidden="true">
        <ul class="category-links">${groups[category.id].map(label => `<li><a href="#catalog?category=${category.id}&q=${encodeURIComponent(queryAliases[label] || label)}">${label}${icon('arrow-up-right')}</a></li>`).join('')}</ul>
        <span class="category-exploded" role="img" aria-label="${category.name}: детали узла в разборе"></span>
        <a class="button dark category-catalog-link" href="#catalog?category=${category.id}">В каталог${icon('arrow-right')}</a>
        <button type="button" class="category-close" aria-label="Свернуть категорию ${category.name}" title="Свернуть">${icon('x')}</button>
      </div>
    </article>`;
  });
  return `<div class="category-grid">${Array.from({ length: Math.ceil(cards.length / 3) }, (_, row) => `<div class="category-row">${cards.slice(row * 3, row * 3 + 3).join('')}</div>`).join('')}</div>`;
}

function initCategoryCards() {
  const grid = main.querySelector('.category-grid');
  if (!grid) return;
  const canHover = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 761px)');
  let hoverTimer;
  let leaveTimer;
  let activeCard = null;

  function closeCard(restoreFocus = false) {
    clearTimeout(hoverTimer);
    clearTimeout(leaveTimer);
    if (!activeCard) return;
    const card = activeCard;
    activeCard = null;
    card.classList.remove('is-open');
    card.querySelector('.category-trigger').setAttribute('aria-expanded', 'false');
    card.querySelector('.category-panel').inert = true;
    card.querySelector('.category-panel').setAttribute('aria-hidden', 'true');
    card.parentElement.classList.remove('has-open');
    if (restoreFocus) card.querySelector('.category-trigger').focus({ preventScroll: true });
  }

  function openCard(card) {
    clearTimeout(leaveTimer);
    if (card === activeCard) return;
    closeCard();
    activeCard = card;
    card.classList.add('is-open');
    card.parentElement.classList.add('has-open');
    card.querySelector('.category-trigger').setAttribute('aria-expanded', 'true');
    card.querySelector('.category-panel').inert = false;
    card.querySelector('.category-panel').setAttribute('aria-hidden', 'false');
  }

  grid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'mouse' || !canHover.matches) return;
      clearTimeout(leaveTimer);
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => openCard(card), 150);
    });
    card.addEventListener('pointerleave', () => clearTimeout(hoverTimer));
    card.querySelector('.category-trigger').addEventListener('click', () => {
      if (activeCard === card) closeCard();
      else openCard(card);
    });
    card.querySelector('.category-close').addEventListener('click', () => closeCard(true));
  });
  grid.querySelectorAll('.category-row').forEach(row => {
    row.addEventListener('pointerenter', () => clearTimeout(leaveTimer));
    row.addEventListener('pointerleave', () => {
      clearTimeout(hoverTimer);
      if (canHover.matches && activeCard?.parentElement === row && !row.contains(document.activeElement)) leaveTimer = setTimeout(() => closeCard(), 180);
    });
    row.addEventListener('focusout', event => {
      if (activeCard?.parentElement === row && !row.contains(event.relatedTarget)) closeCard();
    });
  });
  grid.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeCard) { event.preventDefault(); closeCard(true); }
  });
  // Reset disclosures when the interaction mode or row layout changes.
  canHover.onchange = () => closeCard();
  const layout = matchMedia('(min-width: 761px)');
  layout.onchange = () => closeCard();
  cleanupCategoryCards = () => {
    clearTimeout(hoverTimer);
    clearTimeout(leaveTimer);
    canHover.onchange = null;
    layout.onchange = null;
  };
}

function assistance() {
  return `<section class="assist-band"><div class="container assist-inner">${icon('scan-line').replace('<i ', '<i class="assist-icon" ')}<div class="assist-copy"><h2>Не знаете артикул? Это наша работа.</h2><p>Подберём деталь по фото, образцу или серийному номеру техники.</p></div><button class="button dark" data-request="Подбор по фото или серийному номеру">Помочь с подбором${icon('arrow-up-right')}</button></div></section>`;
}

function company() {
  return `<section class="company-section"><div class="container company-inner"><div class="company-intro"><span class="section-index">ЭЛЬТОРГ · САНКТ-ПЕТЕРБУРГ</span><h2>За каждой деталью<br>стоит человек,<br>который разберётся.</h2><a class="text-link" href="#about">Ближе к Эльторг${icon('arrow-right')}</a></div><div class="company-copy"><p>Когда техника стоит, важна не просто запчасть. Важна уверенность, что она подойдёт.</p><p>Разбираемся в вашей задаче, проверяем совместимость и помогаем выбрать нужное исполнение. Для механика, владельца техники и отдела снабжения.</p><div class="company-facts"><div>${icon('scan-line')}<strong>Точный подбор</strong><small>По артикулу и серийному номеру</small></div><div>${icon('messages-square')}<strong>Личный контакт</strong><small>Менеджер на связи по вашей задаче</small></div></div></div></div><div class="machine-banner"><img src="assets/machine-banner-v2.jpg" alt="Жёлтый экскаватор-погрузчик на фоне цельной бетонной стены" loading="lazy" width="2048" height="768"><div class="container machine-caption"><span>ДЕТАЛИ ДЛЯ БОЛЬШОЙ РАБОТЫ</span><strong>JCB 3CX / 4CX / 5CX</strong><button class="text-link" data-request="Подбор запчастей для JCB">Подбор для вашей техники${icon('arrow-up-right')}</button></div></div></section>`;
}

function contactBand() {
  return `<section class="contact-band" id="selection-request"><div class="container contact-band-inner"><div class="contact-copy"><span class="section-index">ПОДКЛЮЧИМСЯ К ВАШЕЙ ЗАДАЧЕ</span><h2>Начнём<br>с вашей детали.</h2><p>Номер, фотография или описание.<br>Остальное уточним вместе.</p><div class="contact-direct"><span class="contact-avatar">${icon('headset')}</span><div><small>Наталья · отдел запчастей</small><a href="tel:+79650894699">+7 (965) 089-46-99</a></div></div><a class="text-link" href="https://t.me/EltorgJCB" target="_blank" rel="noopener">Обсудить в Telegram${icon('arrow-up-right')}</a></div><div class="inline-request"><h3>Заявка на подбор</h3>${requestFields()}</div></div></section>`;
}

function locationBand() {
  const benefits = [
    ['scan-line', 'Подбор начинается с точности', 'Ищем по артикулу, фотографии или образцу. Уточняем модель и серийный номер техники.'],
    ['component', 'От детали до целого узла', 'Двигатель, гидравлика, трансмиссия и другие системы JCB — в одном каталоге.'],
    ['badge-check', 'Проверяем совместимость', 'Согласуем исполнение и комплектацию до заказа, чтобы деталь подошла вашей машине.'],
    ['messages-square', 'На связи живые люди', 'Обсуждаем задачу напрямую. Помогаем разобраться в вариантах и условиях получения.'],
  ];
  return `<section class="location-band" id="petersburg" aria-labelledby="location-title"><div class="container">
    <header class="location-heading"><span class="section-index">ЭЛЬТОРГ · БЛИЖЕ К ВАШЕЙ ТЕХНИКЕ</span><h2 id="location-title">Петербург — наш город.<br><span>Запчасти — наше дело.</span></h2><p>Помогаем найти нужную деталь для JCB и разобраться в её исполнении.<br> От первого вопроса до получения заказа — на связи с вами.</p></header>
    <div class="location-layout">
      <div class="location-benefits">${benefits.map(([symbol,title,text])=>`<article class="location-benefit"><span class="location-benefit-icon">${icon(symbol)}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join('')}<a class="text-link" href="#about">Больше об Эльторг${icon('arrow-up-right')}</a></div>
      <div class="location-city">
        <div class="location-city-art"><img src="assets/petersburg-relief.png" alt="Объёмная художественная иллюстрация Санкт-Петербурга: Нева, острова и миниатюрный экскаватор" width="1254" height="1254" loading="lazy"><a class="location-city-pin" href="#contacts" aria-label="Контакты магазина Эльторг"><span>${icon('map-pin')}</span><strong>ЭЛЬТОРГ</strong></a><span class="location-city-label">Санкт-Петербург</span></div>
        <aside class="location-shop" aria-label="Магазин в Санкт-Петербурге"><span class="location-shop-kicker">${icon('map-pin')}МАГАЗИН ЭЛЬТОРГ</span><h3>Домостроительная, 16</h3><a class="location-shop-phone" href="tel:+79650894699">+7 (965) 089-46-99</a><p>Перед поездкой уточните часы работы и наличие нужной детали.</p><a class="text-link" href="https://yandex.ru/maps/?text=Санкт-Петербург%20Домостроительная%2016" target="_blank" rel="noopener">Построить маршрут${icon('arrow-up-right')}</a></aside>
      </div>
    </div>
    <div class="location-steps"><div><span>01</span><p>Расскажите о задаче<strong>Артикул, фото или модель техники</strong></p></div><div><span>02</span><p>Согласуем деталь<strong>Исполнение, цену и наличие</strong></p></div><div><span>03</span><p>Обсудим получение<strong>Самовывоз или условия отправки</strong></p></div></div>
  </div></section>`;
}

function home() {
  searchMode = 'article';
  return `<section class="hero"><picture><source media="(max-width:700px)" srcset="assets/hero-machinery-mobile-v2.jpg"><img class="hero-photo" src="assets/hero-machinery-v2.jpg" alt="Жёлтый экскаватор-погрузчик на светлой промышленной площадке" fetchpriority="high" width="2098" height="749"></picture><div class="container hero-inner"><span class="eyebrow">ЭЛЬТОРГ · ЗАПЧАСТИ ДЛЯ JCB</span><h1>Запчасти<br>для техники <em>JCB.</em></h1><p class="hero-copy">Всё начинается с правильной детали.<br>Подберём её для вашей машины.</p><div class="hero-actions"><button class="button dark" data-scroll="#parts-catalog">Каталог запчастей${icon('arrow-down')}</button><button class="hero-search" data-scroll="#part-finder" title="Поиск по артикулу" aria-label="Поиск по артикулу">${icon('search')}</button></div><div class="hero-bottom"><span>ДВИГАТЕЛЬ · ГИДРАВЛИКА · ТРАНСМИССИЯ</span><a href="#catalog?category=transmission">Детали трансмиссии${icon('arrow-up-right')}</a></div></div></section>${finder()}<section class="container section categories-section" id="parts-catalog" tabindex="-1"><div class="section-top"><div><span class="section-index">ОТ МАЛОГО К БОЛЬШОМУ</span><h2>Найдётся для каждого узла.</h2></div><a class="text-link" href="#catalog">Все категории${icon('arrow-right')}</a></div>${categoryGrid()}</section>${productShowcases()}${company()}${locationBand()}${contactBand()}${brandStrip()}`;
}

function matchingProducts(params) {
  const category = params.get('category');
  const tokens = (params.get('q') || '').trim().toLowerCase().split(/\s+/).map(normalize).filter(Boolean);
  const list = products.filter(product => {
    const haystack = normalize([product.name, product.article, product.brand, categories.find(item => item.id === product.category)?.name].join(' '));
    return (!category || product.category === category) && tokens.every(token => haystack.includes(token));
  });
  if (sortMode === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (sortMode === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (sortMode === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  return list;
}

function resultMarkup(params) {
  const list = matchingProducts(params);
  const query = params.get('q') || '';
  const category = categories.find(item => item.id === params.get('category'));
  if (!list.length) return `<div class="empty-state">${icon('search-x')}<h2>${query ? 'Такую деталь пока не нашли' : 'Подберём нужную деталь'}</h2><p>${query ? `По запросу «${escapeHtml(query)}» нет совпадений. Отправьте номер менеджеру: проверим другие варианты.` : 'Не все позиции представлены в каталоге. Уточним ассортимент и подберём запчасть для вашей техники.'}</p><div class="empty-actions"><button class="button yellow" data-request="${escapeHtml(query ? `Поиск детали: ${query}` : category?.request || 'Подбор запчасти')}">Запросить подбор${icon('arrow-up-right')}</button><a class="button outline" href="#catalog">Все запчасти</a></div></div>`;
  return list.map(product => productCard(product)).join('');
}

function catalog(params) {
  const category = categories.find(item => item.id === params.get('category'));
  const query = params.get('q') || '';
  const heading = query ? `Результаты поиска` : category?.name || 'Каталог запчастей';
  const resultCount = matchingProducts(params).length;
  return `<div class="container">${breadcrumbs(category ? [{ name: 'Каталог', href: '#catalog' }, { name: category.name }] : [{ name: heading }])}<div class="inner-heading"><span class="section-index">ЗАПЧАСТИ ДЛЯ ТЕХНИКИ JCB</span><h1>${heading}</h1><p>${query ? `По запросу «${escapeHtml(query)}»` : 'Найдите нужную деталь или обратитесь к нам за подбором.'}</p></div><div class="catalog-layout"><aside class="catalog-sidebar"><div class="filter-title">КАТЕГОРИИ</div><nav class="category-filter" aria-label="Категории каталога"><a href="#catalog" class="${!category ? 'active' : ''}">Все запчасти<span>${products.length}</span></a>${categories.map(item => `<a href="#catalog?category=${item.id}" class="${category?.id === item.id ? 'active' : ''}" ${category?.id === item.id ? 'aria-current="page"' : ''}>${item.name}</a>`).join('')}</nav><div class="sidebar-help"><h3>Нужна помощь?</h3><p>Проверим номер и совместимость детали с вашей техникой.</p><button class="button yellow" data-request="Подбор запчасти">Помочь с подбором${icon('arrow-up-right')}</button></div></aside><div class="catalog-results"><form class="search-large" data-search>${icon('search')}<input name="q" type="search" aria-label="Поиск запчастей" placeholder="Артикул или название" value="${escapeHtml(query)}" autocomplete="off">${category ? `<input name="category" type="hidden" value="${category.id}">` : ''}<button class="button dark">Найти${icon('arrow-right')}</button></form><div class="catalog-toolbar"><span role="status" id="result-count">Найдено позиций: ${resultCount}</span><select id="sort" aria-label="Сортировка"><option value="default">По умолчанию</option><option value="price-asc" ${sortMode === 'price-asc' ? 'selected' : ''}>Сначала дешевле</option><option value="price-desc" ${sortMode === 'price-desc' ? 'selected' : ''}>Сначала дороже</option><option value="name" ${sortMode === 'name' ? 'selected' : ''}>По названию</option></select></div><div id="catalog-items">${resultMarkup(params)}</div><p class="price-note">Актуальную цену, наличие и совместимость подтвердит менеджер перед заказом.</p></div></div></div>${assistance()}`;
}

function productPage(params) {
  const product = products.find(item => item.id === params.get('id'));
  if (!product) return notFound();
  const category = categories.find(item => item.id === product.category);
  const studio = ['valve','crankshaft','starter','gear','alternator','tensioner'].includes(product.id);
  return `<div class="container">${breadcrumbs([{ name: 'Каталог', href: '#catalog' }, { name: category.name, href: '#catalog?category=' + category.id }, { name: product.name }])}<div class="product-detail"><div class="detail-gallery"><div class="detail-image"><img id="detail-photo" src="assets/${studio ? product.id + '-studio.jpg' : product.image}" alt="${escapeHtml(product.name)}${studio ? ' — визуализация' : ''}" width="600" height="600"></div>${studio ? `<div class="gallery-controls" role="group" aria-label="Изображения товара"><button data-gallery="studio" aria-pressed="true" aria-label="Студийная визуализация" title="Студийная визуализация"><img src="assets/${product.id}-studio.jpg" alt="" width="66" height="66"></button><button data-gallery="original" aria-pressed="false" aria-label="Исходное фото товара" title="Исходное фото товара"><img src="assets/${product.image}" alt="" width="66" height="66"></button></div>` : ''}<p class="gallery-caption" aria-live="polite">${studio ? 'Студийная ИИ-визуализация. Точное исполнение смотрите на исходном фото.' : 'Фото из каталога Эльторг.'}</p></div><div class="detail-info"><span class="section-index">${category.name.toUpperCase()}</span><h1>${escapeHtml(product.name)}</h1><div class="stock">Наличие уточняется у менеджера</div><dl class="detail-specs"><div><dt>Артикул</dt><dd>${product.article || 'Уточним при подборе'}</dd></div>${product.brand ? `<div><dt>Производитель</dt><dd>${product.brand}</dd></div>` : ''}<div><dt>Применимость</dt><dd>Проверим по серийному номеру</dd></div><div><dt>Получение</dt><dd>Магазин в Санкт-Петербурге</dd></div></dl><div class="price">${money(product.price)}<small>Цена из каталога. Актуальную стоимость подтвердит менеджер.</small></div><button class="button yellow" data-product="${product.id}">Оставить заявку на деталь${icon('arrow-up-right')}</button><p class="detail-note">Уточним комплектацию, совместимость и условия получения. Для точного подбора подготовьте серийный номер техники.</p></div></div></div>${assistance()}`;
}

function contacts() {
  return `<section class="container content-page">${breadcrumbs([{ name: 'Контакты' }])}<div class="inner-heading"><span class="section-index">НА СВЯЗИ</span><h1>Давайте разберёмся в деталях.</h1><p>Приезжайте в магазин или свяжитесь с отделом запчастей.</p></div><div class="info-grid"><div><div class="contact-person"><a href="tel:+79650894699">+7 (965) 089-46-99</a><span>Наталья · запчасти и подбор</span></div><div class="contact-person"><a href="tel:+79650894128">+7 (965) 089-41-28</a><span>Антон · запчасти и подбор</span></div><div class="contact-socials"><a class="button dark" href="https://t.me/EltorgJCB" target="_blank" rel="noopener">Написать в Telegram${icon('send')}</a><a class="button outline" href="https://wa.me/79650894699" target="_blank" rel="noopener">WhatsApp${icon('message-circle')}</a></div></div><div class="address-panel">${icon('map-pin')}<span class="section-index">МАГАЗИН ЭЛЬТОРГ</span><h2>Санкт-Петербург,<br>Домостроительная, 16</h2><p>Перед поездкой уточните часы работы и наличие нужной детали по телефону.</p><a class="text-link" href="https://yandex.ru/maps/?text=Санкт-Петербург%20Домостроительная%2016" target="_blank" rel="noopener">Открыть на карте${icon('arrow-up-right')}</a></div></div></section>${contactBand()}`;
}

function delivery() {
  return `<section class="container content-page">${breadcrumbs([{ name: 'Доставка и оплата' }])}<div class="inner-heading"><span class="section-index">ОТ ЗАЯВКИ ДО ПОЛУЧЕНИЯ</span><h1>Уточним. Подберём. Согласуем.</h1><p>Все условия подтверждаем с вами до оформления заказа.</p></div><div class="info-grid"><div class="info-block"><span class="section-index">01 / ПОДБОР</span><h2>Начнём с нужной детали</h2><p>Пришлите артикул, фотографию или серийный номер техники. Менеджер проверит совместимость, наличие и актуальную цену.</p><button class="button yellow" data-request="Подбор и условия получения">Обсудить заказ${icon('arrow-up-right')}</button></div><div class="info-block"><span class="section-index">02 / ПОЛУЧЕНИЕ</span><h2>Самовывоз из магазина</h2><p>Санкт-Петербург, Домостроительная, 16. Перед поездкой согласуйте готовность заказа. Возможность отправки в ваш город, сроки и стоимость доставки уточните у менеджера.</p><a class="text-link" href="#contacts">Адрес и контакты${icon('arrow-up-right')}</a></div><div class="info-block"><span class="section-index">03 / ОПЛАТА</span><h2>Условия под ваш заказ</h2><p>Способ оплаты, документы для организации и окончательную стоимость согласуем до покупки. На сайте оплата не требуется.</p></div><div class="info-block"><span class="section-index">04 / ПРОВЕРКА</span><h2>Совместимость имеет значение</h2><p>Детали могут отличаться в зависимости от года выпуска и комплектации техники. Серийный номер поможет исключить ошибку при подборе.</p></div></div></section>${assistance()}`;
}

function notFound() {
  return `<section class="container section content-page"><span class="section-index">404</span><div class="empty-state">${icon('route-off')}<h1>Здесь пока нет страницы</h1><p>Перейдите в каталог или оставьте заявку на подбор запчасти.</p><a class="button yellow" href="#catalog">Открыть каталог${icon('arrow-right')}</a></div></section>`;
}

function currentRoute() {
  const hash = location.hash.slice(1) || 'home';
  const split = hash.indexOf('?');
  return { page: split === -1 ? hash : hash.slice(0, split), params: new URLSearchParams(split === -1 ? '' : hash.slice(split + 1)) };
}

function renderRoute() {
  cleanupCategoryCards();
  cleanupPopularCarousel();
  main.innerHTML = home();
  document.title = 'Запчасти для JCB — Эльторг';
  document.querySelector('.navigation').classList.remove('open');
  document.querySelector('.mobile-menu').setAttribute('aria-expanded', 'false');
  setCatalogOpen(false);
  refreshIcons();
  initCategoryCards();
  initPopularCarousel();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function openRequest(subject, productId) {
  const product = products.find(item => item.id === productId);
  returnFocus = document.activeElement;
  const selected = product ? `<div class="request-selection"><img src="assets/${product.image}" alt=""><div><strong>${escapeHtml(product.name)}</strong><small>${product.article ? `Артикул ${product.article} · ` : ''}${money(product.price)}</small></div></div>` : '';
  const message = product ? `${product.name}${product.article ? ', артикул ' + product.article : ''}` : subject || '';
  document.querySelector('#request-body').innerHTML = `<div class="dialog-kicker">ЭЛЬТОРГ / ПОДБОР ЗАПЧАСТЕЙ</div><h2 id="request-title" class="request-heading">Разберёмся в деталях.</h2><p class="request-intro">Оставьте контакт и расскажите, что нужно вашей технике.</p>${selected}${requestFields(message, product?.id || '')}`;
  refreshIcons();
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.querySelector('input[name="name"]').focus({ preventScroll: true });
}

function closeRequest() { dialog.close(); }

const catalogDisclosure = document.querySelector('.catalog-disclosure');
const catalogToggle = catalogDisclosure.querySelector('.catalog-button');
const catalogMenu = document.querySelector('#catalog-menu');
catalogMenu.innerHTML = `<div class="catalog-menu-heading"><span>ЗАПЧАСТИ ПО УЗЛАМ</span><a class="text-link" href="#catalog">Весь каталог${icon('arrow-up-right')}</a></div><div class="catalog-menu-grid">${categories.map((category, index) => `<a href="#catalog?category=${category.id}" data-category="${category.id}"><span class="menu-preview" aria-hidden="true" style="--category-sheet:url('assets/categories${index >= 6 ? '-extra' : ''}.jpg');--art-x:${index % 3 * 50}%;--art-y:${Math.floor(index % 6 / 3) * 100}%"></span><span class="menu-copy"><strong>${category.name}</strong><small>${category.sub}</small></span>${icon('arrow-up-right')}</a>`).join('')}</div><div class="catalog-menu-footer"><span>Не нашли нужную деталь?</span><button class="text-link" data-request="Подбор запчасти">Поможем с подбором${icon('arrow-up-right')}</button></div>`;
let catalogCloseTimer;
let catalogPinned = false;

function setCatalogOpen(open) {
  clearTimeout(catalogCloseTimer);
  catalogMenu.hidden = !open;
  catalogToggle.setAttribute('aria-expanded', String(open));
  if (!open) catalogPinned = false;
}

catalogToggle.addEventListener('click', () => {
  if (catalogPinned) setCatalogOpen(false);
  else { setCatalogOpen(true); catalogPinned = true; }
});
catalogDisclosure.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) setCatalogOpen(true);
});
catalogDisclosure.addEventListener('pointerleave', event => {
  if (event.pointerType === 'mouse' && !catalogPinned) catalogCloseTimer = setTimeout(() => {
    if (!catalogDisclosure.contains(document.activeElement) || document.activeElement === catalogToggle) setCatalogOpen(false);
  }, 180);
});
catalogDisclosure.addEventListener('focusout', event => {
  if (!catalogDisclosure.contains(event.relatedTarget)) setCatalogOpen(false);
});

document.addEventListener('click', event => {
  const galleryButton = event.target.closest('[data-gallery]');
  if (galleryButton) {
    const product = products.find(item => item.id === currentRoute().params.get('id'));
    if (!product) return;
    const studio = galleryButton.dataset.gallery === 'studio';
    const photo = document.querySelector('#detail-photo');
    photo.src = 'assets/' + (studio ? product.id + '-studio.jpg' : product.image);
    photo.alt = product.name + (studio ? ' — визуализация' : '');
    document.querySelectorAll('[data-gallery]').forEach(button => button.setAttribute('aria-pressed', String(button === galleryButton)));
    document.querySelector('.gallery-caption').textContent = studio ? 'Студийная ИИ-визуализация. Точное исполнение смотрите на исходном фото.' : 'Исходное фото товара из каталога Эльторг.';
    return;
  }
  if (!event.target.closest('.catalog-disclosure') || event.target.closest('#catalog-menu a, #catalog-menu button')) setCatalogOpen(false);
  const scrollButton = event.target.closest('[data-scroll]');
  if (scrollButton) {
    const section = document.querySelector(scrollButton.dataset.scroll);
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    return;
  }
  if (event.target.closest('.skip-link')) {
    event.preventDefault();
    main.focus();
    main.scrollIntoView();
    return;
  }
  const previewLink = event.target.closest('a[href^="#"]');
  if (previewLink && previewLink.getAttribute('href') !== '#home') {
    event.preventDefault();
    const href = previewLink.getAttribute('href');
    const selector = href.startsWith('#catalog') || href.startsWith('#product')
      ? '#parts-catalog'
      : href === '#about'
        ? '.company-section'
        : href === '#contacts' || href === '#delivery'
          ? '.contact-band'
          : null;
    const section = selector ? document.querySelector(selector) : null;
    section?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    return;
  }
  const productButton = event.target.closest('[data-product]');
  if (productButton) return openRequest('', productButton.dataset.product);
  const requestButton = event.target.closest('[data-request]');
  if (requestButton) return openRequest(requestButton.dataset.request);
  const queryButton = event.target.closest('[data-query]');
  if (queryButton) { openRequest(`Поиск: ${queryButton.dataset.query}`); return; }
  const modeButton = event.target.closest('[data-mode]');
  if (modeButton) {
    searchMode = modeButton.dataset.mode;
    document.querySelectorAll('[data-mode]').forEach(button => {
      const selected = button === modeButton;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    const panel = document.querySelector('#finder-panel');
    panel.setAttribute('aria-labelledby', modeButton.id);
    panel.innerHTML = searchPanel(searchMode);
    refreshIcons();
  }
  if (event.target.closest('.dialog-close')) closeRequest();
  if (event.target.closest('.mobile-menu')) {
    const isOpen = document.querySelector('.navigation').classList.toggle('open');
    document.querySelector('.mobile-menu').setAttribute('aria-expanded', String(isOpen));
  }
  if (event.target.closest('[data-focus-search]')) {
    const search = document.querySelector('.header-search');
    search.classList.add('expanded');
    window.scrollTo({ top: 0, behavior: 'instant' });
    search.querySelector('input').focus();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !catalogMenu.hidden) {
    setCatalogOpen(false);
    catalogToggle.focus();
    return;
  }
  if (event.target === catalogToggle && event.key === 'ArrowDown') {
    event.preventDefault();
    setCatalogOpen(true);
    catalogMenu.querySelector('a').focus();
    return;
  }
  const tab = event.target.closest('[role="tab"]');
  if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const tabs = [...tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
  const index = tabs.indexOf(tab);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].click();
  tabs[next].focus();
});

document.addEventListener('submit', event => {
  if (event.target.matches('[data-search]')) {
    event.preventDefault();
    const data = new FormData(event.target);
    const query = String(data.get('q') || '').trim();
    openRequest(query ? `Поиск: ${query}` : 'Подбор запчасти');
  }
  if (event.target.matches('[data-model-form]')) {
    event.preventDefault();
    openRequest('Подбор запчастей для ' + new FormData(event.target).get('model'));
  }
  if (event.target.matches('.request-form')) {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const message = String(data.get('message') || '').trim();
    const digits = phone.replace(/\D/g, '');
    const error = event.target.querySelector('.error-message');
    if (name.length < 2 || !message || digits.length < 10 || digits.length > 15 || !/^[+\d\s()\-]+$/.test(phone)) {
      error.textContent = name.length < 2 ? 'Укажите имя: минимум два символа.' : !message ? 'Укажите деталь или задачу.' : 'Проверьте телефон: нужно от 10 до 15 цифр.';
      error.hidden = false;
      return;
    }
    const result = event.target.closest('.inline-request') || document.querySelector('#request-body');
    const titleId = dialog.contains(result) ? 'request-title' : 'inline-result-title';
    result.innerHTML = `<div class="form-success"><h2 id="${titleId}" tabindex="-1">Заявка подготовлена</h2><p>Заявка ещё не отправлена. Свяжитесь с нами в Telegram или по телефону, чтобы передать запрос менеджеру.</p><div class="form-summary"><strong>${escapeHtml(name)}</strong><span>${escapeHtml(phone)}</span><span>${escapeHtml(message)}</span></div><a class="button yellow" href="https://t.me/EltorgJCB" target="_blank" rel="noopener">Открыть Telegram${icon('arrow-up-right')}</a><p class="form-note">Телефон отдела запчастей: <a href="tel:+79650894699">+7 (965) 089-46-99</a></p><button class="text-link" data-edit-request>Изменить заявку${icon('arrow-left')}</button></div>`;
    const editButton = result.querySelector('[data-edit-request]');
    editButton.addEventListener('click', () => {
      result.innerHTML = requestFields(message, String(data.get('productId') || ''));
      result.querySelector('[name="name"]').value = name;
      result.querySelector('[name="phone"]').value = phone;
      if (dialog.contains(result)) result.insertAdjacentHTML('afterbegin', '<h2 id="request-title" class="request-heading">Ваша заявка</h2>');
      refreshIcons();
      result.querySelector('[name="name"]').focus();
    });
    refreshIcons();
    result.querySelector('h2').focus();
  }
});

document.addEventListener('change', event => {
  if (event.target.id === 'sort') {
    sortMode = event.target.value;
    document.querySelector('#catalog-items').innerHTML = resultMarkup(currentRoute().params);
    refreshIcons();
  }
});

dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeRequest();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  if (returnFocus?.isConnected) returnFocus.focus();
});
const header = document.querySelector('.site-header');
const updateHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();
window.addEventListener('hashchange', () => {
  if (dialog.open) closeRequest();
  if (location.hash !== '#home') history.replaceState(null, '', '#home');
});
renderRoute();
