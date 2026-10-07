const categories = [
  { id: 'engine', name: 'Двигатель', sub: 'Детали и комплектующие', request: 'Детали двигателя' },
  { id: 'hydraulics', name: 'Гидравлика', sub: 'Насосы, цилиндры, РВД', request: 'Гидравлическая система' },
  { id: 'filters', name: 'Фильтры и масла', sub: 'Фильтры, масла и жидкости', request: 'Фильтры и масла' },
  { id: 'transmission', name: 'Трансмиссия', sub: 'Мосты, коробки передач и ступицы', request: 'Детали трансмиссии' },
  { id: 'electrics', name: 'Электрика', sub: 'Стартеры, генераторы, электромоторы', request: 'Электрооборудование' },
  { id: 'equipment', name: 'Рабочее оборудование', sub: 'Ковши, коронки и зубья', request: 'Рабочее оборудование' },
  { id: 'undercarriage', name: 'Ходовая часть', sub: 'Гусеницы и опорные ролики', request: 'Детали ходовой части' },
  { id: 'fuel', name: 'Топливная система', sub: 'Насосы, форсунки и инструмент', request: 'Детали топливной системы' },
  { id: 'wheels', name: 'Шины и диски', sub: 'Шины, диски и камеры', request: 'Шины и диски' },
  { id: 'pins', name: 'Пальцы и втулки', sub: 'Соединения рабочих узлов', request: 'Пальцы и втулки' },
  { id: 'seals', name: 'Сальники', sub: 'Уплотнения и манжеты', request: 'Сальники и уплотнения' },
  { id: 'cabin', name: 'Кабина и стёкла', sub: 'Стёкла, двери и наборы для вклейки', request: 'Детали кабины и стёкла JCB' },
];

// Only the source-confirmed article is supplied. Other part numbers and fitment need a client export.
const products = [
  // Model families listed at https://jcb-volvo.ru/jcb/ekskavator-pogruzchik-3cx-3cx-super-4cx/gidravlika/elementy-gidrosistemy/valve_25-222579. Serial-number fitment still needs checking.
  { id: 'valve', name: 'Распределитель передний Husco', article: '25/222579', category: 'hydraulics', price: 260000, brand: 'Husco', image: 'valve.jpg', equipmentModels: ['JCB 3CX', 'JCB 4CX'] },
  { id: 'crankshaft', name: 'Вал коленчатый', article: '', category: 'engine', price: 65000, brand: '', image: 'crankshaft.jpg' },
  { id: 'starter', name: 'Стартер', article: '', category: 'electrics', price: 21000, brand: '', image: 'starter.jpg' },
  { id: 'alternator', name: 'Генератор', article: '', category: 'electrics', price: 16000, brand: '', image: 'alternator.jpg' },
  { id: 'tensioner', name: 'Натяжитель Gates', article: '', category: 'engine', price: 5000, brand: 'Gates', image: 'tensioner.jpg' },
  { id: 'gear', name: 'Главная пара', article: '', category: 'transmission', price: 19000, brand: '', image: 'gear.jpg' },
  { id: 'bucket', name: 'Ковш 40 см', article: '', category: 'equipment', price: 39000, brand: '', image: 'bucket.jpg' },
  { id: 'switch', name: 'Подрулевой переключатель', article: '', category: 'electrics', price: 15000, brand: '', image: 'switch.jpg' },
  { id: 'belt', name: 'Ремни генератора', article: '', category: 'engine', price: 2500, brand: '', image: 'belt.jpg' },
].map(product => ({ ...product, equipmentBrands: ['JCB'] }));
// Illustrative inventory for the client preview, not verified articles or fitment.
products.push(...[
  ["filter-kit","Комплект фильтров ТО","filters",6800,"JCB",""],
  ["hydraulic-pump","Насос гидравлический","hydraulics",48500,"Case",""],
  ["bucket-teeth","Зубья ковша, комплект","equipment",7400,"Caterpillar (CAT)",""],
  ["track-roller","Ролик опорный","undercarriage",12900,"Komatsu",""],
  ["injector","Форсунки топливные, комплект","fuel",32000,"New Holland",""],
  ["wheel-set","Колесо в сборе","wheels",46500,"Terex",""],
  ["pin-kit","Палец и втулки, комплект","pins",5900,"Hidromek",""],
  ["seal-kit","Комплект сальников","seals",2800,"MST",""],
  ["cab-glass","Стекло кабины","cabin",18500,"JCB",""],
  ["engine-assembly","Двигатель в сборе","engine",385000,"JCB",""],
  ["starter-heavy","Стартер редукторный","electrics",24500,"Case","starter-studio.jpg"],
  ["alternator-24","Генератор 24 В","electrics",21900,"Terex","alternator-studio.jpg"],
  ["bucket-60","Ковш 600 мм","equipment",47500,"JCB","bucket.jpg"],
  ["gear-set","Главная пара моста","transmission",28700,"Hidromek","gear-studio.jpg"],
  ["belt-kit","Комплект приводных ремней","engine",3900,"New Holland","belt.jpg"],
  ["tensioner-assembly","Натяжитель ремня в сборе","engine",6500,"MST","tensioner-studio.jpg"],
  ["control-valve","Распределитель гидравлический","hydraulics",178000,"Komatsu","valve-studio.jpg"],
  ["crankshaft-assembly","Коленчатый вал двигателя","engine",78000,"Caterpillar (CAT)","crankshaft-studio.jpg"],
  ["filter-service","Фильтры для обслуживания","filters",8200,"Case",""],
  ["axle-assembly","Мост ведущий в сборе","transmission",196000,"Terex",""],
  ["track-roller-heavy","Опорный ролик усиленный","undercarriage",16700,"Caterpillar (CAT)",""],
  ["injectors-service","Комплект форсунок двигателя","fuel",36500,"Komatsu",""],
  ["wheel-industrial","Колесо индустриальное","wheels",52000,"New Holland",""],
  ["pin-service","Комплект шарнирного соединения","pins",7200,"JCB",""],
  ["seal-service","Уплотнения гидроцилиндра","seals",3400,"Hidromek",""],
  ["glass-side","Боковое стекло кабины","cabin",12900,"MST",""],
  ["bucket-crowns","Коронки ковша, комплект","equipment",9600,"Terex",""],
  ["hydraulic-oil","Гидравлическое масло","filters",5900,"JCB",""],
  ["wheel-hub","Ступица ведущего моста","transmission",24700,"Case",""],
  ["glass-bond-kit","Набор для вклейки стекла","cabin",3800,"JCB",""],
  ["electric-motor","Электромотор","electrics",19600,"Terex",""],
  ["injection-pump-tool","Инструмент для снятия ТНВД","fuel",11200,"Komatsu",""],
  ["loader-valve-three-spool","Распределитель передний, 3 секции","hydraulics",192000,"JCB","valve-studio.jpg"],
  ["loader-valve-assembly","Распределитель погрузчика в сборе","hydraulics",214000,"JCB","valve-studio.jpg"],
  ["bucket-control-valve","Распределитель управления ковшом","hydraulics",228000,"JCB","valve-studio.jpg"],
].map(([id, name, category, price, equipmentBrand, image], index) => ({
  id, name, category, price, image, brand: '', demo: true,
  article: 'DEMO-' + String(index + 1001),
  equipmentBrands: [equipmentBrand]
})));
const main = document.querySelector('#main');
const dialog = document.querySelector('#request-dialog');
const photoDialog = document.querySelector('#photo-dialog');
const money = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const normalize = value => value.toLocaleLowerCase('ru-RU').replace(/ё/g, 'е').replace(/[\s/\-_.]/g, '');
const refreshIcons = () => window.lucide?.createIcons();
let searchMode = 'article';
let sortMode = 'default';
const sortOptions = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'name', label: 'По названию' }
];
let returnFocus = null;
let cleanupCategoryCards = () => {};
let cleanupPopularCarousel = () => {};
let galleryIndex = 0;
let galleryReturnFocus = null;

function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="#home">Главная</a>${items.map(item => `${icon('chevron-right')}${item.href ? `<a href="${item.href}">${escapeHtml(item.name)}</a>` : `<span aria-current="page">${escapeHtml(item.name)}</span>`}`).join('')}</nav>`;
}

function productRow(product, compact = false) {
  const meta = product.article ? `<code>${product.article}</code>` : '<span>Артикул уточним при подборе</span>';
  return `<article class="product-row"><a class="product-image" href="#product?id=${product.id}" aria-label="${escapeHtml(product.name)}"><img src="assets/${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" width="100" height="86"></a><div><a class="product-title" href="#product?id=${product.id}">${escapeHtml(product.name)}</a><div class="product-meta">${meta}${product.brand ? `<span>${product.brand}</span>` : ''}</div>${compact ? '<div class="stock">Наличие уточняется</div>' : ''}</div>${compact ? '' : '<div class="stock">Уточнить наличие</div>'}<div class="price">${money(product.price)}<small>цена из каталога</small></div><button class="row-request" data-cart-add="${product.id}" aria-label="В корзину: ${escapeHtml(product.name)}">В корзину${icon('shopping-cart')}</button></article>`;
}

const equipmentBrandOptions = ['JCB', 'Case', 'Terex', 'Caterpillar (CAT)', 'Komatsu', 'Hidromek', 'New Holland', 'MST'];
const equipmentBrandLogos = {
  JCB: 'jcb.svg',
  Case: 'case.svg',
  Terex: 'terex.png',
  'Caterpillar (CAT)': 'cat.svg',
  Komatsu: 'komatsu.svg',
  Hidromek: 'hidromek.svg',
  'New Holland': 'new-holland.svg',
  MST: 'mst.svg'
};

function finder() {
  return `<section class="finder" id="part-finder" aria-labelledby="finder-title" tabindex="-1"><div class="container finder-inner"><div class="finder-heading"><h2 id="finder-title">Точный подбор запчасти — любым удобным способом</h2></div><div class="finder-workspace"><div class="finder-tabs" role="tablist" aria-label="Способ подбора"><button id="tab-article" role="tab" aria-controls="finder-panel" aria-selected="true" data-mode="article">${icon('scan-barcode')}<span>По артикулу</span></button><button id="tab-name" role="tab" aria-controls="finder-panel" aria-selected="false" tabindex="-1" data-mode="name">${icon('text-search')}<span>По названию</span></button><button id="tab-model" role="tab" aria-controls="finder-panel" aria-selected="false" tabindex="-1" data-mode="model">${icon('tractor')}<span>По модели</span></button><button id="tab-brand" role="tab" aria-controls="finder-panel" aria-selected="false" tabindex="-1" data-mode="brand">${icon('badge-check')}<span>По бренду</span></button></div><div id="finder-panel" role="tabpanel" aria-labelledby="tab-article">${searchPanel('article')}</div></div><div class="finder-contact"><div><h3>Сверхбыстрый подбор без лишних действий!</h3><p>Свяжитесь с нами любым удобным способом — менеджер за 5 минут подберёт нужную деталь, предложит аналоги и подробно ответит на все вопросы.</p></div><button type="button" class="button dark" data-scroll="#selection-request">Связаться${icon('arrow-down')}</button></div></div></section>`;
}

function searchPanel(mode) {
  const examples = {
    article: { label: 'Примеры артикулов:', values: ['1P1808', '8U2398', '6736-51-5142'] },
    brand: { label: 'Примеры брендов:', values: ['JCB', 'Case', 'Komatsu'] },
    name: { label: 'Примеры названий:', values: ['Генератор', 'Стартер', 'Натяжитель Gates'] },
    model: { label: 'Примеры моделей:', values: ['JCB 3CX', 'JCB 4CX', 'JCB 5CX'] }
  }[mode];
  return `${searchForm(mode)}<div class="finder-examples" role="group" aria-label="${examples.label}"><span>${examples.label}</span>${examples.values.map(value => `<button type="button" data-finder-example="${escapeHtml(value)}">${escapeHtml(value)}</button>`).join('')}</div>`;
}

function finderDropdown(name, label, values, selected = '') {
  const options = values.map(option => typeof option === 'string' ? { value: option, label: option } : option);
  const selectedLabel = options.find(option => option.value === selected)?.label;
  return `<div class="finder-dropdown"><input type="hidden" name="${name}" value="${escapeHtml(selected)}"><button type="button" class="finder-select-trigger" role="combobox" aria-label="${escapeHtml(label)}" aria-haspopup="listbox" aria-expanded="false" aria-controls="finder-options-${name}"><span class="finder-select-value${selectedLabel ? '' : ' is-placeholder'}">${escapeHtml(selectedLabel || 'Выберите бренд спецтехники')}</span>${icon('chevron-down')}</button><div class="finder-options" id="finder-options-${name}" role="listbox" aria-label="${escapeHtml(label)}" hidden>${options.map((option, index) => `<button type="button" role="option" tabindex="-1" id="finder-option-${name}-${index}" aria-selected="${option.value === selected}" data-finder-option="${escapeHtml(option.value)}"><span>${escapeHtml(option.label)}</span>${icon('check')}</button>`).join('')}</div></div>`;
}

function setFinderDropdownOpen(dropdown, open) {
  const trigger = dropdown.querySelector('.finder-select-trigger');
  const listbox = dropdown.querySelector('.finder-options');
  trigger.setAttribute('aria-expanded', String(open));
  listbox.hidden = !open;
  if (open) {
    const bounds = trigger.getBoundingClientRect();
    const mobileBar = document.querySelector('.mobile-bottom');
    const bottomInset = mobileBar && getComputedStyle(mobileBar).display !== 'none' ? mobileBar.getBoundingClientRect().height : 0;
    const below = window.innerHeight - bottomInset - bounds.bottom - 20;
    const above = bounds.top - document.querySelector('.site-header').getBoundingClientRect().height - 20;
    const opensUp = below < 180 && above > below;
    dropdown.classList.toggle('opens-up', opensUp);
    listbox.style.maxHeight = Math.max(100, Math.min(328, opensUp ? above : below)) + 'px';
    const options = [...dropdown.querySelectorAll('[role="option"]')];
    highlightFinderOption(dropdown, options.find(option => option.getAttribute('aria-selected') === 'true') || options[0]);
  } else {
    trigger.removeAttribute('aria-activedescendant');
    dropdown.querySelectorAll('.is-highlighted').forEach(option => option.classList.remove('is-highlighted'));
  }
}

function highlightFinderOption(dropdown, option) {
  dropdown.querySelectorAll('[role="option"]').forEach(item => item.classList.toggle('is-highlighted', item === option));
  dropdown.querySelector('.finder-select-trigger').setAttribute('aria-activedescendant', option.id);
  option.scrollIntoView({ block: 'nearest', behavior: 'instant' });
}

function selectFinderOption(dropdown, value) {
  const options = [...dropdown.querySelectorAll('[role="option"]')];
  const selectedOption = options.find(option => option.dataset.finderOption === value);
  if (!selectedOption) return;
  const input = dropdown.querySelector('input');
  input.value = value;
  const label = dropdown.querySelector('.finder-select-value');
  label.textContent = selectedOption.querySelector('span').textContent;
  label.classList.remove('is-placeholder');
  options.forEach(option => option.setAttribute('aria-selected', String(option.dataset.finderOption === value)));
  if (input.name === 'sort') {
    sortMode = value;
    document.querySelector('#catalog-items').innerHTML = resultMarkup(currentRoute().params);
    refreshIcons();
  } else {
    dropdown.closest('form').querySelector('[type="submit"]').disabled = false;
  }
  setFinderDropdownOpen(dropdown, false);
  dropdown.querySelector('.finder-select-trigger').focus({ preventScroll: true });
}

document.addEventListener('click', event => {
  document.querySelectorAll('.finder-dropdown').forEach(dropdown => {
    if (!dropdown.contains(event.target)) setFinderDropdownOpen(dropdown, false);
  });
  const trigger = event.target.closest('.finder-select-trigger');
  if (trigger) setFinderDropdownOpen(trigger.closest('.finder-dropdown'), trigger.getAttribute('aria-expanded') !== 'true');
  const option = event.target.closest('[data-finder-option]');
  if (option) selectFinderOption(option.closest('.finder-dropdown'), option.dataset.finderOption);
});

document.addEventListener('focusin', event => {
  document.querySelectorAll('.finder-dropdown').forEach(dropdown => {
    if (!dropdown.contains(event.target)) setFinderDropdownOpen(dropdown, false);
  });
});

document.addEventListener('keydown', event => {
  const trigger = event.target.closest('.finder-select-trigger');
  if (!trigger) return;
  const dropdown = trigger.closest('.finder-dropdown');
  const open = trigger.getAttribute('aria-expanded') === 'true';
  if (event.key === 'Tab' || event.key === 'Escape') {
    if (event.key === 'Escape' && open) event.preventDefault();
    setFinderDropdownOpen(dropdown, false);
    return;
  }
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key) && !(event.key.length === 1 && /[a-zа-я0-9]/i.test(event.key))) return;
  event.preventDefault();
  const options = [...dropdown.querySelectorAll('[role="option"]')];
  if (!open) setFinderDropdownOpen(dropdown, true);
  const index = options.findIndex(option => option.id === trigger.getAttribute('aria-activedescendant'));
  if (event.key === 'Enter' || event.key === ' ') {
    if (open) selectFinderOption(dropdown, options[index].dataset.finderOption);
    return;
  }
  let next = index;
  if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = options.length - 1;
  else if (event.key === 'ArrowDown') next = open ? Math.min(index + 1, options.length - 1) : index;
  else if (event.key === 'ArrowUp') next = open ? Math.max(index - 1, 0) : index;
  else {
    const match = [...options.slice(index + 1), ...options.slice(0, index + 1)].find(option => option.textContent.trim().toLowerCase().startsWith(event.key.toLowerCase()));
    if (match) next = options.indexOf(match);
  }
  highlightFinderOption(dropdown, options[next]);
});

function searchForm(mode) {
  if (mode === 'brand') return `<form class="search-large finder-search" data-brand-form>${finderDropdown('brand', 'Бренд спецтехники', equipmentBrandOptions)}<button class="button finder-submit" type="submit" aria-label="Найти запчасть по бренду" title="Найти запчасть по бренду" disabled>${icon('search')}<span>Найти запчасть</span></button></form>`;
  const submit = `<button class="button finder-submit" type="submit" aria-label="${mode === 'model' ? 'Найти запчасть по модели' : 'Найти запчасть'}" title="${mode === 'model' ? 'Найти запчасть по модели' : 'Найти запчасть'}">${icon('search')}<span>Найти запчасть</span></button>`;
  if (mode === 'model') return `<form class="search-large finder-search" data-model-form>${finderDropdown('model', 'Модель техники', ['JCB 3CX', 'JCB 4CX', 'JCB 5CX', 'Телескопический погрузчик JCB', 'Другая модель JCB'], 'JCB 3CX')}${submit}</form>`;
  return `<form class="search-large finder-search" data-search><label class="finder-input"><span class="sr-only">${mode === 'article' ? 'Артикул запчасти' : 'Название запчасти'}</span><input name="q" type="search" placeholder="${mode === 'article' ? 'Введите артикул запчасти' : 'Введите название детали'}" autocomplete="off" required></label>${submit}</form>`;
}

function productPreview(product) {
  if (product.demo && !product.image) {
    const index = categories.findIndex(category => category.id === product.category);
    return `<span class="part-sprite" role="img" aria-label="${escapeHtml(product.name)} — иллюстрация">${categoryArtwork(index)}</span>`;
  }
  const studio = ['valve','crankshaft','starter','gear','alternator','tensioner'].includes(product.id);
  return `<img src="assets/${studio ? product.id + '-studio.jpg' : product.image}" alt="${escapeHtml(product.name)}" loading="lazy" width="500" height="500">`;
}

function productCard(product, kind = 'catalog') {
  const badge = { popular: 'Выбор покупателей', new: 'Новинка', special: 'Особые условия' }[kind] || '';
  return `<article class="part-card part-card--${kind}"><a class="part-visual" href="#product?id=${product.id}" aria-label="${escapeHtml(product.name)}">${badge ? `<span class="part-badge">${badge}</span>` : ''}${productPreview(product)}<span class="part-view">${icon('arrow-up-right')}</span></a><div class="part-body"><div class="part-article">${product.article ? `Артикул <code>${product.article}</code>` : 'Артикул уточняется'}</div><h3><a href="#product?id=${product.id}">${escapeHtml(product.name)}</a></h3><div class="part-bottom"><div class="part-price">${kind === 'special' ? 'По запросу' : money(product.price)}<small>${kind === 'special' ? 'Условия у менеджера' : 'Наличие уточняется'}</small></div><button class="part-request" data-cart-add="${product.id}" aria-label="В корзину: ${escapeHtml(product.name)}" title="Добавить в корзину">${icon('plus')}</button></div></div></article>`;
}

function productShowcases() {
  // Editorial demo selections, not verified sales rankings or arrival dates.
  const cards = (ids,kind) => ids.map(id=>productCard(products.find(product=>product.id===id),kind)).join('');
  return `${popularCarousel(cards(['valve','crankshaft','starter','gear','alternator','tensioner'],'popular'))}<section class="new-section" id="new" aria-labelledby="new-title"><div class="container new-inner"><div class="new-copy"><span class="section-index">ЗНАКОМИМСЯ БЛИЖЕ</span><h2 id="new-title">Новинки</h2><p>Комплектующие для вашей следующей задачи. Подберём исполнение под конкретную машину.</p><a class="text-link" href="#catalog">Смотреть запчасти${icon('arrow-right')}</a><div class="new-caption">${icon('component')}<span>От отдельных деталей<br>до комплектующих узла</span></div></div><div class="new-products">${cards(['alternator','tensioner','starter'],'new')}</div></div></section><section class="special-section" id="offers" aria-labelledby="special-title"><div class="container special-inner"><div class="special-copy"><span class="section-index">РАЗУМНЫЙ ПОДХОД К ОБСЛУЖИВАНИЮ</span><h2 id="special-title">Спецпредложения</h2><p>Обсудим специальные условия на детали для двигателя и регулярного обслуживания.</p><button class="button yellow" data-request="Специальные предложения на запчасти">Уточнить условия${icon('arrow-up-right')}</button></div><div class="special-products">${cards(['tensioner','crankshaft','valve'],'special')}</div></div></section>`;
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

  const pageStart = index => Math.min(index * perPage, Math.max(0, cards.length - perPage));

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
    const start = pageStart(current);
    viewport.scrollTo({ left: start * distance, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    if (manual) section.querySelector('.popular-announcement').textContent = `Товары ${start + 1}–${Math.min(start + perPage, cards.length)} из ${cards.length}`;
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
    if (pages.children.length !== total) pages.innerHTML = Array.from({ length: total }, (_, index) => { const start = pageStart(index); return `<button type="button" data-page="${index}" aria-label="Товары ${start + 1}–${Math.min(start + perPage, cards.length)}" aria-controls="popular-slides"><span></span></button>`; }).join('');
    const distance = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(viewport).columnGap);
    viewport.scrollTo({ left: pageStart(current) * distance, behavior: 'instant' });
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

function equipmentBrands() {
  return `<div class="equipment-brands"><div class="container equipment-brands-inner"><div class="equipment-brand-window" id="equipment-brand-window" tabindex="0" role="region" aria-label="Бренды техники"><div class="equipment-brand-track">${equipmentBrandOptions.map(brand => `<a class="equipment-brand" href="${catalogHref(new URLSearchParams(), { equipmentBrand: brand })}" aria-label="Запчасти для ${brand}" title="${brand}"><span class="equipment-brand-logo" aria-hidden="true" style="--brand-logo:url('assets/equipment-brands/${equipmentBrandLogos[brand]}')"></span></a>`).join('')}</div></div></div></div>`;
}

function brandStrip() {
  // Additional manufacturers are an editorial selection pending assortment approval.
  const brands = ['JCB', 'Perkins', 'Gates', 'TIMKEN', 'HUSCO', 'CARRARO', 'ZF', 'SKF', 'Donaldson', 'BOSCH'];
  return `<section class="brands-band" aria-label="Бренды запчастей"><div class="container"><div class="equipment-brand-window" tabindex="0" role="region" aria-label="Производители запчастей"><div class="equipment-brand-track">${brands.map(brand => `<button class="equipment-brand parts-brand" data-request="Подбор запчастей ${brand}" aria-label="Подобрать запчасти ${brand}" title="${brand}"><span class="equipment-brand-logo" aria-hidden="true" style="--brand-logo:url('assets/${brand === 'JCB' ? 'equipment-brands' : 'parts-brands'}/${brand.toLowerCase()}.svg')"></span></button>`).join('')}</div></div></div></section>`;
}

function requestFields(subject = '', productId = '') {
  return `<form class="request-form"><input type="hidden" name="productId" value="${escapeHtml(productId)}"><div class="request-fields-row"><label>Ваше имя<input name="name" placeholder="Как к вам обращаться" autocomplete="given-name" required maxlength="80"></label><label>Телефон<input name="phone" type="tel" placeholder="+7 (___) ___-__-__" autocomplete="tel" required maxlength="24"></label></div><label>Что нужно вашей технике?<textarea name="message" placeholder="Артикул, название детали или модель техники" maxlength="1500" required>${escapeHtml(subject)}</textarea></label><div class="error-message" role="alert" hidden></div><button class="button yellow" type="submit">Отправить заявку${icon('arrow-up-right')}</button><p class="form-note">Отправка через сайт пока недоступна. Связаться с нами можно по телефону или в Telegram.</p></form>`;
}

function categoryGrid() {
  // Navigation groups for the prototype; not inventory or compatibility claims.
  const groups = {
    engine: ['Блок и головка цилиндров', 'Поршни и гильзы', 'Коленчатые валы', 'Детали ГРМ', 'Насосы и охлаждение', 'Прокладки и ремкомплекты'],
    hydraulics: ['Гидронасосы', 'Гидроцилиндры', 'Распределители', 'Рукава высокого давления', 'Клапаны', 'Ремкомплекты'],
    filters: ['Масляные фильтры', 'Топливные фильтры', 'Воздушные фильтры', 'Гидравлические фильтры', 'Моторные масла', 'Трансмиссионные масла', 'Гидравлическое масло'],
    transmission: ['Коробки передач', 'Мосты', 'Главные пары', 'Полуоси', 'Подшипники', 'Фрикционные диски', 'Ступицы'],
    electrics: ['Стартеры', 'Генераторы', 'Датчики', 'Реле и предохранители', 'Переключатели', 'Проводка', 'Электромоторы'],
    equipment: ['Ковши', 'Коронки и зубья', 'Адаптеры', 'Режущие кромки', 'Крепёж', 'Быстросъёмные соединения'],
    undercarriage: ['Гусеницы', 'Опорные катки', 'Поддерживающие ролики', 'Ведущие звёздочки', 'Направляющие колёса', 'Натяжители'],
    fuel: ['Топливные насосы', 'Форсунки', 'ТНВД', 'Топливопроводы', 'Насосы подкачки', 'Ремкомплекты', 'Инструмент для снятия ТНВД'],
    wheels: ['Шины', 'Колёсные диски', 'Камеры', 'Колёсный крепёж', 'Вентили'],
    pins: ['Пальцы стрелы', 'Пальцы ковша', 'Втулки', 'Шайбы', 'Стопоры', 'Пресс-маслёнки'],
    seals: ['Сальники валов', 'Уплотнительные кольца', 'Манжеты', 'Пыльники', 'Направляющие кольца', 'Комплекты уплотнений'],
    cabin: ['Лобовые стёкла', 'Боковые стёкла', 'Двери и замки', 'Зеркала', 'Стеклоочистители', 'Уплотнители', 'Набор для вклейки'],
  };
  const queryAliases = { 'Коленчатые валы': 'коленчатый', 'Стартеры': 'стартер', 'Генераторы': 'генератор', 'Главные пары': 'главная пара', 'Распределители': 'распределитель', 'Ковши': 'ковш', 'Переключатели': 'переключатель', 'Гидравлическое масло': 'гидравлическое масло', 'Ступицы': 'ступица', 'Набор для вклейки': 'набор для вклейки', 'Электромоторы': 'электромотор', 'Инструмент для снятия ТНВД': 'инструмент для снятия ТНВД' };
  const cards = categories.map((category, index) => {
    return `<article class="category-card" data-category="${category.id}" style="--slot:${index % 3}">
      <div class="category-heading"><span class="category-number">${String(index + 1).padStart(2, '0')}<span> / 12</span></span><h3 id="category-title-${category.id}">${category.name}</h3><p>${category.sub}</p></div>
      <span class="category-art" aria-hidden="true">${categoryArtwork(index)}</span>
      <span class="category-open-icon" aria-hidden="true">${icon('arrow-up-right')}</span>
      <div class="category-rail" aria-hidden="true"><span class="category-rail-number">${String(index + 1).padStart(2, '0')}</span><span class="category-rail-title">${category.name}</span></div>
      <button class="category-trigger" type="button" aria-labelledby="category-title-${category.id}" aria-expanded="false" aria-controls="category-panel-${category.id}"></button>
      <div class="category-panel" id="category-panel-${category.id}" inert aria-hidden="true">
        <ul class="category-links">${groups[category.id].map(label => `<li><a href="#catalog?category=${category.id}&q=${encodeURIComponent(queryAliases[label] || label)}">${label}${icon('arrow-up-right')}</a></li>`).join('')}</ul>
        <span class="category-exploded" role="img" aria-label="${category.name}: детали узла в разборе">${categoryArtwork(index, true)}</span>
        <a class="button dark category-catalog-link" href="#catalog?category=${category.id}">В каталог${icon('arrow-right')}</a>
        <button type="button" class="category-close" aria-label="Свернуть категорию ${category.name}" title="Свернуть">${icon('x')}</button>
      </div>
    </article>`;
  });
  return `<div class="category-grid">${Array.from({ length: Math.ceil(cards.length / 4) }, (_, row) => `<div class="category-row">${cards.slice(row * 4, row * 4 + 4).join('')}</div>`).join('')}</div>`;
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
      hoverTimer = setTimeout(() => openCard(card), 240);
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
      if (canHover.matches && activeCard?.parentElement === row && !row.contains(document.activeElement)) leaveTimer = setTimeout(() => closeCard(), 300);
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
  return `<section class="company-section"><div class="container company-inner"><div class="company-intro"><span class="section-index">ЭЛЬТОРГ · САНКТ-ПЕТЕРБУРГ</span><h2>За каждой деталью<br>стоит человек,<br>который разберётся.</h2><a class="text-link" href="#about">Подробнее о компании${icon('arrow-right')}</a></div><div class="company-copy"><p>Когда техника стоит, важна не просто запчасть. Важна уверенность, что она подойдёт.</p><p>Разбираемся в вашей задаче, проверяем совместимость и помогаем выбрать нужное исполнение. Для механика, владельца техники и отдела снабжения.</p><div class="company-facts"><div>${icon('scan-line')}<strong>Точный подбор</strong><small>По артикулу и серийному номеру</small></div><div>${icon('messages-square')}<strong>Личный контакт</strong><small>Менеджер на связи по вашей задаче</small></div></div></div></div><div class="machine-banner"><picture><source media="(max-width:700px)" srcset="assets/machine-jcb-mobile-v3.png"><img src="assets/machine-jcb-v3.png" alt="JCB 4CX: экскаватор-погрузчик с ковшом влево на бетонной площадке" loading="lazy" width="2163" height="727"></picture><div class="container machine-caption"><span>ДЕТАЛИ ДЛЯ БОЛЬШОЙ РАБОТЫ</span><strong>JCB 3CX / 4CX / 5CX</strong><button class="text-link" data-request="Подбор запчастей для JCB">Подбор для вашей техники${icon('arrow-up-right')}</button></div></div></section>`;
}

function contactBand() {
  return `<section class="contact-band" id="selection-request" tabindex="-1"><div class="container contact-band-inner"><div class="contact-copy"><span class="section-index">ПОДКЛЮЧИМСЯ К ВАШЕЙ ЗАДАЧЕ</span><h2>Подберём запчасть за 5 минут, подробно ответим на все вопросы</h2><p>Для быстрого и точного подбора запчасти вам достаточно обратиться к нам!</p><div class="contact-direct"><span class="contact-avatar">${icon('headset')}</span><div><small>Наталья · отдел запчастей</small><a href="tel:+79650894699">+7 (965) 089-46-99</a></div></div><a class="text-link" href="https://t.me/EltorgJCB" target="_blank" rel="noopener">Обсудить в Telegram${icon('arrow-up-right')}</a></div><div class="inline-request"><h3>Заявка на подбор</h3>${requestFields()}</div></div></section>`;
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
        <aside class="location-shop" aria-label="Магазин в Санкт-Петербурге"><span class="location-shop-kicker">${icon('map-pin')}МАГАЗИН ЭЛЬТОРГ</span><h3>Домостроительная, 16</h3><a class="location-shop-phone" href="tel:+79650894699">+7 (965) 089-46-99</a><p>Перед поездкой уточните часы работы и наличие нужной детали.</p><a class="text-link" href="https://yandex.ru/maps/?rtext=~60.072751%2C30.373307&rtt=auto" target="_blank" rel="noopener">Построить маршрут${icon('arrow-up-right')}</a></aside>
      </div>
    </div>
    <div class="location-steps"><div><span>01</span><p>Расскажите о задаче<strong>Артикул, фото или модель техники</strong></p></div><div><span>02</span><p>Согласуем деталь<strong>Исполнение, цену и наличие</strong></p></div><div><span>03</span><p>Обсудим получение<strong>Самовывоз или условия отправки</strong></p></div><div><span>04</span><p>Доставим<strong>В согласованный срок и удобным способом</strong></p></div></div>
  </div></section>`;
}

function home() {
  searchMode = 'article';
  return `<section class="hero hero-equipment"><picture><source media="(max-width:700px)" srcset="assets/hero-jcb-brands-mobile-v3.png"><img class="hero-photo" src="assets/hero-jcb-brands-v3.png" alt="JCB 3CX с маркировкой JCB на стреле и кабине, на светлой бетонной площадке" fetchpriority="high" width="2164" height="727"></picture><div class="container hero-inner"><span class="eyebrow">ЭЛЬТОРГ · ЗАПЧАСТИ ДЛЯ СПЕЦТЕХНИКИ</span><h1>Запчасти<br>для спецтехники</h1><p class="hero-copy">Всё начинается с правильной детали.<br>Подберём её для вашей машины.</p><div class="hero-actions"><button class="button dark" data-scroll="#parts-catalog">Каталог запчастей${icon('arrow-down')}</button><button class="hero-search" data-scroll="#part-finder" title="Поиск по артикулу" aria-label="Поиск по артикулу">${icon('search')}</button></div></div>${equipmentBrands()}</section>${finder()}<section class="container section categories-section" id="parts-catalog" tabindex="-1"><div class="section-top"><div><span class="section-index">ОТ МАЛОГО К БОЛЬШОМУ</span><h2>Найдётся для каждого узла.</h2></div><a class="text-link" href="#catalog">Все категории${icon('arrow-right')}</a></div>${categoryGrid()}</section>${productShowcases()}${company()}${locationBand()}${contactBand()}${brandStrip()}`;
}

function catalogHref(params = new URLSearchParams(), changes = {}) {
  const next = new URLSearchParams(params);
  Object.entries(changes).forEach(([key, value]) => {
    if (value) next.set(key, value);
    else next.delete(key);
  });
  return '#catalog' + (next.size ? '?' + next.toString() : '');
}

function matchingProducts(params) {
  const category = params.get('category');
  const equipmentBrand = params.get('equipmentBrand');
  const tokens = (params.get('q') || '').trim().toLowerCase().split(/\s+/).map(normalize).filter(Boolean);
  const list = products.filter(product => {
    const haystack = normalize([product.name, product.article, product.brand, categories.find(item => item.id === product.category)?.name].join(' '));
    return (!category || product.category === category) && (!equipmentBrand || product.equipmentBrands.includes(equipmentBrand)) && tokens.every(token => haystack.includes(token));
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
  const equipmentBrand = params.get('equipmentBrand');
  if (!list.length && equipmentBrand) return `<div class="empty-state">${icon('search-x')}<h2>В этой подборке пока нет деталей</h2><p>${escapeHtml(equipmentBrand)}${query ? ` · ${escapeHtml(query)}` : ''}${category ? ` · ${category.name}` : ''}. Уточним артикул, совместимость и возможность поставки у менеджера.</p><div class="empty-actions"><button class="button yellow" data-request="${escapeHtml(`Подбор запчастей для техники ${equipmentBrand}${query ? ': ' + query : ''}${category ? ', ' + category.name : ''}`)}">Запросить подбор${icon('arrow-up-right')}</button><a class="button outline" href="${catalogHref(params, { equipmentBrand: '', category: '', q: '' })}">Все запчасти</a></div></div>`;
  if (!list.length) return `<div class="empty-state">${icon('search-x')}<h2>${query ? 'Такую деталь пока не нашли' : 'Подберём нужную деталь'}</h2><p>${query ? `По запросу «${escapeHtml(query)}» нет совпадений. Отправьте номер менеджеру: проверим другие варианты.` : 'Не все позиции представлены в каталоге. Уточним ассортимент и подберём запчасть для вашей техники.'}</p><div class="empty-actions"><button class="button yellow" data-request="${escapeHtml(query ? `Поиск детали: ${query}` : category?.request || 'Подбор запчасти')}">Запросить подбор${icon('arrow-up-right')}</button><a class="button outline" href="#catalog">Все запчасти</a></div></div>`;
  return list.map(product => productCard(product)).join('');
}

function catalog(params) {
  const category = categories.find(item => item.id === params.get('category'));
  const query = params.get('q') || '';
  const equipmentBrand = params.get('equipmentBrand') || '';
  const heading = equipmentBrand ? `Запчасти для ${escapeHtml(equipmentBrand)}` : query ? 'Результаты поиска' : category?.name || 'Каталог запчастей';
  const resultCount = matchingProducts(params).length;
  const brandOptions = ['', ...equipmentBrandOptions];
  return `<div class="container">
    ${breadcrumbs([{ name: 'Каталог запчастей', ...(equipmentBrand || category || query ? { href: '#catalog' } : {}) }, ...(equipmentBrand ? [{ name: equipmentBrand }] : [])])}
    <div class="inner-heading"><h1>${heading}</h1><p>${query ? `По запросу «${escapeHtml(query)}»` : 'Выберите деталь. Точное исполнение и совместимость проверим по серийному номеру техники.'}</p></div>
    <nav class="catalog-brands" aria-label="Бренды техники">${brandOptions.map(brand => `<a href="${catalogHref(params, { equipmentBrand: brand })}" ${brand === equipmentBrand ? 'aria-current="true"' : ''}>${brand || 'Все бренды'}</a>`).join('')}</nav>
    <div class="catalog-layout">
      <aside class="catalog-sidebar"><div class="filter-title">Категории</div><nav class="category-filter" aria-label="Категории каталога"><a href="${catalogHref(params, { category: '' })}" class="${!category ? 'active' : ''}">Все запчасти</a>${categories.map(item => `<a href="${catalogHref(params, { category: item.id })}" class="${category?.id === item.id ? 'active' : ''}" ${category?.id === item.id ? 'aria-current="page"' : ''}>${item.name}</a>`).join('')}</nav></aside>
      <div class="catalog-results">
        <div class="catalog-toolbar"><span role="status" id="result-count">Найдено позиций: ${resultCount}</span>${finderDropdown('sort', 'Сортировка', sortOptions, sortMode)}</div>
        <div id="catalog-items">${resultMarkup(params)}</div><p class="price-note">Часть позиций добавлена для примера: фото, артикулы, цены и применимость условные. Актуальные данные подтвердит менеджер.</p>
      </div>
    </div>
  </div>${assistance()}`;
}

const equipmentModelImages = {
  'JCB 3CX': 'assets/fitment-jcb-3cx-cutout.png',
  'JCB 4CX': 'assets/fitment-jcb-4cx-cutout.png'
};

function productPhotos(product) {
  if (!product.image) return [];
  const original = { src: 'assets/' + product.image, label: product.demo ? 'Иллюстрация товара' : 'Фото из каталога' };
  const studio = ['valve', 'crankshaft', 'starter', 'gear', 'alternator', 'tensioner'].includes(product.id);
  return studio ? [{ src: `assets/${product.id}-studio.jpg`, label: 'Основное изображение' }, original] : [original];
}

// Candidate groups share a part type, not confirmed fitment. Never infer analogs from category alone.
const analogGroups = [
  ['valve', 'control-valve', 'loader-valve-three-spool', 'loader-valve-assembly', 'bucket-control-valve'],
  ['crankshaft', 'crankshaft-assembly'],
  ['starter', 'starter-heavy'], ['alternator', 'alternator-24'],
  ['tensioner', 'tensioner-assembly'], ['gear', 'gear-set'],
  ['belt', 'belt-kit'], ['filter-kit', 'filter-service'],
  ['track-roller', 'track-roller-heavy'], ['injector', 'injectors-service'],
  ['wheel-set', 'wheel-industrial'], ['pin-kit', 'pin-service'],
  ['bucket-teeth', 'bucket-crowns']
];
const companionCategories = {
  engine: ['filters', 'seals', 'fuel'], hydraulics: ['seals', 'filters', 'pins'],
  filters: ['engine', 'seals', 'fuel'], transmission: ['seals', 'wheels', 'pins'],
  electrics: ['engine', 'filters'], equipment: ['pins', 'seals', 'hydraulics'],
  undercarriage: ['pins', 'seals', 'wheels'], fuel: ['filters', 'seals', 'engine'],
  wheels: ['transmission', 'seals'], pins: ['seals', 'equipment', 'filters'],
  seals: ['filters', 'hydraulics', 'pins'], cabin: ['electrics', 'filters']
};

function productRecommendations(product) {
  const analogIds = analogGroups.find(group => group.includes(product.id)) || [];
  const analogs = products.filter(item => item.id !== product.id && analogIds.includes(item.id));
  const curated = product.id === 'valve' ? ['seal-service', 'filter-kit', 'belt', 'pin-service'] : [];
  const companions = curated.length ? curated.map(id => products.find(item => item.id === id)) : products.filter(item =>
    item.id !== product.id && !analogIds.includes(item.id) && companionCategories[product.category].includes(item.category)
  ).slice(0, 4);
  return `<section class="detail-related" aria-labelledby="companions-title">
    <div class="detail-section-heading"><h2 id="companions-title">С этим товаром покупают</h2><a class="text-link" href="#catalog">Весь каталог${icon('arrow-right')}</a></div>
    <div class="detail-products">${companions.map(item => productCard(item)).join('')}</div>
    <p class="detail-selection-note">Пример подборки. Комплектацию и применимость сопутствующих деталей подтвердит менеджер.</p>
  </section><section class="detail-related" aria-labelledby="analogs-title">
    <div class="detail-section-heading"><div><h2 id="analogs-title">Аналоги</h2><p>Пример подборки: фото, артикулы и цены условные. Взаимозаменяемость проверим по серийному номеру.</p></div><button class="text-link" data-request="${escapeHtml(`Подобрать аналог: ${product.name}${product.article ? ', артикул ' + product.article : ''}`)}">Подобрать аналог${icon('arrow-up-right')}</button></div>
    ${analogs.length ? `<div class="detail-products">${analogs.map(item => productCard(item)).join('')}</div>` : '<p class="detail-selection-note detail-no-analogs">Подтверждённых аналогов пока нет. Уточним варианты замены для вашей техники.</p>'}
  </section>`;
}

function deliveryMethods() {
  return `<section class="detail-delivery"><h2>Способы доставки</h2><div class="detail-fulfillment"><div>${icon('map-pin')}<p><strong>Самовывоз</strong><span>Доступен в Москве и Санкт-Петербурге.</span></p></div><div>${icon('truck')}<p><strong>Транспортной компанией</strong><span>Бесплатно доставим вашу запчасть до терминала любой транспортной компании. Стоимость дальнейшей доставки зависит от условий выбранной вами ТК.</span></p></div></div></section>
    <section class="detail-delivery"><h2>Способы оплаты</h2><div class="detail-fulfillment"><div>${icon('file-text')}<p><strong>Безналичный расчёт</strong><span>По счёту для юридических лиц и ИП.</span></p></div><div>${icon('credit-card')}<p><strong>Картой или наличными</strong><span>Банковской картой или наличными денежными средствами.</span></p></div></div></section>`;
}

function cartEntries() {
  return window.eltorgCart.getItems().map(item => ({ ...item, product: products.find(product => product.id === item.id) })).filter(item => item.product);
}

const orderDemo = document.querySelector('meta[name="order-mode"]')?.content === 'demo';
let checkoutDraft = { type: 'individual' };
let orderReceipt = null;
let orderPending = false;
let orderAttempt = null;

function checkoutSummary(entries) {
  return `<h2>Ваш заказ</h2><ul class="checkout-products">${entries.map(({ product, quantity }) => `<li><div class="checkout-photo">${productPreview(product)}</div><div><strong>${escapeHtml(product.name)}</strong><small>${quantity} шт. × ${money(product.price)}</small></div><b>${money(product.price * quantity)}</b></li>`).join('')}</ul><p class="cart-total"><span>Итого</span><strong>${money(entries.reduce((sum, item) => sum + item.product.price * item.quantity, 0))}</strong></p><small>Без стоимости доставки. Цены и наличие подтвердит менеджер.</small>`;
}

function checkoutPage() {
  if (orderReceipt) return orderConfirmation();
  const entries = cartEntries();
  return `<section class="container checkout-page">${breadcrumbs([{ name: 'Корзина', href: '#cart' }, { name: 'Оформление заказа' }])}<div class="cart-heading"><h1>Оформление заказа</h1></div>${entries.length ? `
    <div class="checkout-layout"><div class="checkout-contact"><h2>Контактные данные</h2><p class="checkout-intro">Менеджер свяжется с вами, подтвердит наличие и согласует оплату и доставку.</p>
    <form class="checkout-form" novalidate><fieldset class="checkout-fields" ${orderPending ? 'disabled' : ''}><legend class="sr-only">Данные покупателя</legend>
      <fieldset class="customer-type"><legend>Покупатель</legend><label><input type="radio" name="type" value="individual" checked><span>Частное лицо</span></label><label><input type="radio" name="type" value="business"><span>Организация / ИП</span></label></fieldset>
      <label class="checkout-field"><span id="order-label-name" data-customer-name-label>ФИО</span><input name="name" autocomplete="name" maxlength="160" required aria-labelledby="order-label-name" aria-describedby="order-error-name"><small class="field-error" id="order-error-name" hidden></small></label>
      <div class="checkout-fields-row"><label class="checkout-field"><span id="order-label-phone">Телефон</span><input name="phone" type="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" maxlength="24" required aria-labelledby="order-label-phone" aria-describedby="order-error-phone"><small class="field-error" id="order-error-phone" hidden></small></label><label class="checkout-field"><span id="order-label-email">Электронная почта</span><input name="email" type="email" autocomplete="email" placeholder="name@company.ru" maxlength="254" required aria-labelledby="order-label-email" aria-describedby="order-error-email"><small class="field-error" id="order-error-email" hidden></small></label></div>
      <label class="checkout-field" data-inn-field hidden><span id="order-label-inn">ИНН</span><input name="inn" inputmode="numeric" maxlength="12" pattern="[0-9]{10}|[0-9]{12}" disabled aria-labelledby="order-label-inn" aria-describedby="order-error-inn"><small class="field-error" id="order-error-inn" hidden></small></label>
      <label class="checkout-field"><span id="order-label-comment">Комментарий к заказу</span><span class="optional-label">Необязательно</span><textarea name="comment" rows="3" maxlength="1500" placeholder="Модель техники, серийный номер или пожелания" aria-labelledby="order-label-comment" aria-describedby="order-error-comment"></textarea><small class="field-error" id="order-error-comment" hidden></small></label>
    </fieldset><div class="error-message" role="alert" data-order-error hidden></div>
    ${orderDemo ? '<p class="checkout-test-note">Тестовое оформление: заявка не будет отправлена менеджеру.</p>' : ''}
    <button class="button yellow" type="submit" ${orderPending ? 'disabled' : ''}>${orderPending ? 'Отправляем заказ…' : 'Оформить заказ'}${icon('arrow-right')}</button><p class="form-note">Оплачивать на сайте ничего не нужно. Контакты нужны менеджеру для согласования заказа.</p></form></div>
    <aside class="cart-summary checkout-summary"><div data-checkout-summary>${checkoutSummary(entries)}</div><a class="text-link" href="#cart">Изменить состав заказа${icon('arrow-left')}</a></aside></div>` : '<div class="empty-state"><h2>В корзине нет товаров</h2><p>Добавьте запчасти перед оформлением заказа.</p><a class="button yellow" href="#catalog">Перейти в каталог</a></div>'}</section>`;
}

function setCustomerType(form) {
  const business = form.elements.type.value === 'business';
  form.querySelector('[data-customer-name-label]').textContent = business ? 'Название организации / ФИО ИП' : 'ФИО';
  form.elements.name.autocomplete = business ? 'organization' : 'name';
  form.querySelector('[data-inn-field]').hidden = !business;
  form.elements.inn.disabled = !business;
  form.elements.inn.required = business;
}

function restoreCheckout() {
  const form = main.querySelector('.checkout-form');
  if (!form) return;
  for (const [name, value] of Object.entries(checkoutDraft)) if (form.elements[name]) form.elements[name].value = value;
  setCustomerType(form);
}

function orderConfirmation() {
  const { orderId, demo, customer, entries, comment } = orderReceipt;
  return `<section class="container checkout-page">${breadcrumbs([{ name: demo ? 'Тестовый заказ' : 'Заказ оформлен' }])}<div class="checkout-layout"><div class="order-confirmation"><span class="order-confirmation-icon">${icon('check')}</span><h1 tabindex="-1">${demo ? 'Тестовый заказ оформлен' : 'Заказ отправлен'}</h1><p class="order-number">№ ${escapeHtml(orderId)}</p><p>${demo ? 'Это проверка оформления. Заявка не отправлена менеджеру, звонка по этому заказу не будет.' : 'Менеджер свяжется с вами, подтвердит наличие и согласует способы оплаты и доставки.'}</p><dl class="order-contact-details"><div><dt>${customer.type === 'business' ? 'Организация / ИП' : 'Покупатель'}</dt><dd>${escapeHtml(customer.name)}</dd></div><div><dt>Телефон</dt><dd>${escapeHtml(customer.phone)}</dd></div><div><dt>Email</dt><dd>${escapeHtml(customer.email)}</dd></div>${customer.inn ? `<div><dt>ИНН</dt><dd>${escapeHtml(customer.inn)}</dd></div>` : ''}${comment ? `<div><dt>Комментарий</dt><dd>${escapeHtml(comment)}</dd></div>` : ''}</dl><a class="button yellow" href="#catalog">Продолжить покупки${icon('arrow-right')}</a></div><aside class="cart-summary checkout-summary">${checkoutSummary(entries)}</aside></div></section>`;
}

document.addEventListener('input', event => {
  const form = event.target.closest('.checkout-form');
  if (!form) return;
  if (event.target.name === 'type') setCustomerType(form);
  checkoutDraft = Object.fromEntries(new FormData(form));
  event.target.removeAttribute('aria-invalid');
  const error = form.querySelector(`#order-error-${event.target.name}`);
  if (error) error.hidden = true;
});

document.addEventListener('submit', async event => {
  const form = event.target;
  if (!form.matches('.checkout-form')) return;
  event.preventDefault();
  if (orderPending) return;
  const data = Object.fromEntries(new FormData(form));
  const entries = cartEntries();
  const { errors, value } = window.eltorgOrder.validate({ customer: data, comment: data.comment, items: entries.map(({ id, quantity }) => ({ id, quantity })) });
  const notice = form.querySelector('[data-order-error]');
  notice.hidden = true;
  form.querySelectorAll('.field-error').forEach(error => { error.hidden = true; });
  form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
  if (Object.keys(errors).length) {
    for (const [name, message] of Object.entries(errors)) {
      const error = form.querySelector(`#order-error-${name}`);
      if (error) { error.textContent = message; error.hidden = false; form.elements[name].setAttribute('aria-invalid', 'true'); }
    }
    notice.textContent = errors.items || 'Проверьте отмеченные поля.';
    notice.hidden = false;
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }
  orderPending = true;
  const button = form.querySelector('[type="submit"]');
  form.querySelector('.checkout-fields').disabled = true;
  button.disabled = true;
  button.textContent = orderDemo ? 'Оформляем…' : 'Отправляем заказ…';
  try {
    const fingerprint = JSON.stringify(value);
    if (orderAttempt?.fingerprint !== fingerprint) orderAttempt = { fingerprint, id: crypto.randomUUID() };
    const result = orderDemo ? { orderId: 'TEST-' + orderAttempt.id.slice(0, 8).toUpperCase() }
      : await window.eltorgOrder.send(document.querySelector('meta[name="order-endpoint"]')?.content, value, orderAttempt.id);
    orderReceipt = { ...result, demo: orderDemo, customer: value.customer, comment: value.comment, entries };
    checkoutDraft = { type: 'individual' };
    window.eltorgCart.removeOrdered(value.items);
    if (currentRoute().page === 'checkout') {
      main.innerHTML = orderConfirmation();
      refreshIcons();
      main.querySelector('h1').focus();
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  } catch (error) {
    notice.textContent = error.name === 'TimeoutError' || error instanceof TypeError
      ? 'Не удалось подтвердить отправку. Корзина сохранена. Проверьте соединение и повторите попытку.' : error.message;
    notice.hidden = false;
  } finally {
    orderPending = false;
    form.querySelector('.checkout-fields').disabled = false;
    button.disabled = false;
    button.innerHTML = `Оформить заказ${icon('arrow-right')}`;
    if (!form.isConnected && !orderReceipt && currentRoute().page === 'checkout') { main.innerHTML = checkoutPage(); restoreCheckout(); }
    refreshIcons();
  }
});

function cartPage() {
  const entries = cartEntries();
  const total = entries.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return `<section class="container cart-page">${breadcrumbs([{ name: 'Корзина' }])}<div class="cart-heading"><h1 tabindex="-1">Корзина</h1></div>
    ${entries.length ? `<div class="cart-layout"><div class="cart-items">${entries.map(({ product, quantity }) => `<article class="cart-item">
      <a class="cart-photo" href="#product?id=${product.id}" aria-label="${escapeHtml(product.name)}">${productPreview(product)}</a>
      <div class="cart-copy"><p>Артикул ${escapeHtml(product.article || 'уточняется')}</p><h2><a href="#product?id=${product.id}">${escapeHtml(product.name)}</a></h2><small>${money(product.price)} за шт.</small></div>
      <div class="cart-quantity"><button type="button" data-cart-step="-1" data-cart-id="${product.id}" aria-label="Уменьшить количество: ${escapeHtml(product.name)}" title="Уменьшить количество" ${quantity <= 1 ? 'disabled' : ''}>${icon('minus')}</button><input type="number" min="1" max="99" step="1" value="${quantity}" data-cart-quantity="${product.id}" aria-label="Количество: ${escapeHtml(product.name)}"><button type="button" data-cart-step="1" data-cart-id="${product.id}" aria-label="Увеличить количество: ${escapeHtml(product.name)}" title="Увеличить количество" ${quantity >= 99 ? 'disabled' : ''}>${icon('plus')}</button></div>
      <strong class="cart-line-total">${money(product.price * quantity)}</strong><button class="icon-button cart-remove" data-cart-remove="${product.id}" aria-label="Удалить: ${escapeHtml(product.name)}" title="Удалить товар">${icon('trash-2')}</button>
    </article>`).join('')}</div><aside class="cart-summary"><h2>Ваш заказ</h2><p><span>Товаров</span><strong>${entries.reduce((sum, item) => sum + item.quantity, 0)}</strong></p><p class="cart-total"><span>Итого</span><strong>${money(total)}</strong></p><small>Без стоимости доставки. Цены и наличие подтвердит менеджер.</small><a class="button yellow" href="#checkout" data-checkout-start>Оформить заказ${icon('arrow-right')}</a><small class="cart-retention">Корзина сохраняется на 10 дней после изменения в этом браузере.</small></aside></div><div class="cart-information">${deliveryMethods()}</div>` : `<div class="empty-state">${icon('shopping-cart')}<h2>Ваша корзина пока пуста</h2><p>Выберите нужные запчасти в каталоге.</p><a class="button yellow" href="#catalog">Перейти в каталог${icon('arrow-right')}</a></div>`}
  </section>`;
}

function refreshCartPage() {
  if (currentRoute().page === 'checkout' && !orderReceipt) {
    const summary = main.querySelector('[data-checkout-summary]');
    if (summary) { summary.innerHTML = checkoutSummary(cartEntries()); refreshIcons(); }
    return;
  }
  if (currentRoute().page !== 'cart') return;
  const active = document.activeElement;
  const selector = active?.matches('[data-cart-quantity]') ? `[data-cart-quantity="${active.dataset.cartQuantity}"]`
    : active?.matches('[data-cart-step]') ? `[data-cart-id="${active.dataset.cartId}"][data-cart-step="${active.dataset.cartStep}"]` : null;
  const scroll = window.scrollY;
  main.innerHTML = cartPage();
  refreshIcons();
  if (selector) {
    const next = main.querySelector(selector);
    (next?.disabled ? next.parentElement.querySelector('input') : next)?.focus({ preventScroll: true });
  }
  window.scrollTo({ top: scroll, behavior: 'instant' });
}
window.addEventListener('eltorg-cart-change', refreshCartPage);
document.addEventListener('change', event => {
  const input = event.target.closest('[data-cart-quantity]');
  if (input) window.eltorgCart.setQuantity(input.dataset.cartQuantity, input.value);
});
let cartFeedbackTimer;
document.addEventListener('click', event => {
  const add = event.target.closest('[data-cart-add]');
  if (add) {
    const product = products.find(item => item.id === add.dataset.cartAdd);
    if (!product) return;
    const saved = window.eltorgCart.add(product.id);
    let feedback = document.querySelector('.cart-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'cart-feedback';
      feedback.setAttribute('role', 'status');
      document.body.append(feedback);
    }
    feedback.innerHTML = `<span>${escapeHtml(product.name)} добавлен в корзину.${saved ? '' : ' Сохранение между посещениями недоступно.'}</span><a href="#cart">В корзину${icon('arrow-right')}</a>`;
    feedback.hidden = false;
    refreshIcons();
    clearTimeout(cartFeedbackTimer);
    cartFeedbackTimer = setTimeout(() => { feedback.hidden = true; }, 5000);
  }
  const step = event.target.closest('[data-cart-step]');
  if (step) {
    const item = window.eltorgCart.getItems().find(item => item.id === step.dataset.cartId);
    if (item) window.eltorgCart.setQuantity(item.id, item.quantity + Number(step.dataset.cartStep));
  }
  const remove = event.target.closest('[data-cart-remove]');
  if (remove) {
    window.eltorgCart.remove(remove.dataset.cartRemove);
    main.querySelector('.cart-heading h1')?.focus({ preventScroll: true });
  }
  if (event.target.closest('[data-checkout-start]') && orderReceipt) { orderReceipt = null; orderAttempt = null; }
});

function productPage(params) {
  const product = products.find(item => item.id === params.get('id'));
  if (!product) return notFound();
  const category = categories.find(item => item.id === product.category);
  const photos = productPhotos(product);
  const label = `${product.name}${product.article ? ', артикул ' + product.article : ''}`;
  return `<div class="container product-page">
    ${breadcrumbs([{ name: 'Каталог', href: '#catalog' }, { name: category.name, href: '#catalog?category=' + category.id }, { name: product.name }])}
    <article class="product-detail" aria-labelledby="product-title">
      <header class="detail-heading"><p class="detail-article">Артикул <strong>${product.article || 'уточняется'}</strong></p><h1 id="product-title">${escapeHtml(product.name)}</h1></header>
      <div class="detail-gallery">
        ${photos.length ? `<button class="detail-image" data-photo-open aria-label="Увеличить фото: ${escapeHtml(product.name)}"><img id="detail-photo" src="${photos[0].src}" alt="${escapeHtml(product.name)} — ${photos[0].label}" width="700" height="600"><span class="detail-zoom" aria-hidden="true">${icon('expand')}</span><span class="gallery-count" aria-hidden="true">1 / ${photos.length}</span></button>
        <div class="gallery-controls" role="group" aria-label="Изображения товара">${photos.map((photo, index) => `<button type="button" data-gallery="${index}" aria-pressed="${index === 0}" aria-label="${photo.label}" title="${photo.label}"><img src="${photo.src}" alt="" width="80" height="72"></button>`).join('')}</div>` : `<div class="detail-image detail-illustration">${productPreview(product)}</div>`}
        ${product.demo ? '<p class="detail-demo-note">Демонстрационная позиция: фото, артикул, цена и применимость условные.</p>' : ''}
      </div>
      <div class="detail-info">
        <div class="detail-purchase"><div class="detail-price-row"><div class="price">${money(product.price)}</div><span class="detail-availability">${icon('clock-3')}Наличие уточняется</span></div><p class="detail-price-note">Актуальную цену и срок поставки подтвердит менеджер.</p><button class="button yellow detail-order" data-cart-add="${product.id}">В корзину${icon('shopping-cart')}</button></div>
        <section class="detail-characteristics" aria-labelledby="specs-title"><h2 id="specs-title">Характеристики</h2><dl class="detail-specs">
          <div><dt>Категория</dt><dd>${category.name}</dd></div>
          <div><dt>Производитель</dt><dd>${product.brand || 'Уточняется'}</dd></div>
          <div><dt>Бренд техники</dt><dd>${product.equipmentBrands.map(escapeHtml).join(', ')}</dd></div>
          <div><dt>Комплектация</dt><dd>Уточняется при заказе</dd></div>
        </dl></section>
        <section class="detail-fitment" aria-labelledby="fitment-title"><div class="detail-fitment-heading">${icon('tractor')}<h2 id="fitment-title">Совместимость с техникой</h2></div>
          ${product.equipmentModels?.length ? `<ul class="detail-fitment-models" aria-label="Модели техники">${product.equipmentModels.map(model => `<li>${equipmentModelImages[model] ? `<div class="detail-fitment-photo"><img src="${equipmentModelImages[model]}" alt="Экскаватор-погрузчик ${escapeHtml(model)}" width="800" height="600" loading="lazy"></div>` : ''}<div class="detail-fitment-copy"><strong>${escapeHtml(model)}</strong><span>Экскаватор-погрузчик</span></div></li>`).join('')}</ul>` : `<dl class="detail-fitment-list"><div><dt>Техника</dt><dd>${product.equipmentBrands.map(escapeHtml).join(', ')}</dd></div><div><dt>Модели</dt><dd>Требуют уточнения по серийному номеру</dd></div></dl>`}
          <p>Точное исполнение и применимость проверим по серийному номеру до заказа.</p><button class="text-link" data-request="${escapeHtml('Проверить совместимость: ' + label + '. Модель техники и серийный номер: ')}">Проверить по серийному номеру${icon('arrow-up-right')}</button></section>
        ${deliveryMethods()}
        <details class="detail-terms"><summary>Гарантия и возврат${icon('chevron-down')}</summary><p>Документы, условия гарантии и возврата уточните у менеджера до оформления заказа. Оплата на сайте не требуется.</p></details>
      </div>
    </article>
    ${productRecommendations(product)}
  </div>`;
}

function selectProductPhoto(index) {
  const product = products.find(item => item.id === currentRoute().params.get('id'));
  if (!product) return;
  const photos = productPhotos(product);
  if (!photos[index]) return;
  galleryIndex = index;
  const photo = photos[index];
  const image = document.querySelector('#detail-photo');
  image.src = photo.src;
  image.alt = `${product.name} — ${photo.label}`;
  document.querySelectorAll('[data-gallery]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.gallery) === index)));
  document.querySelector('.gallery-count').textContent = `${index + 1} / ${photos.length}`;
  if (photoDialog.open) {
    setPhotoZoom(false);
    const zoomImage = photoDialog.querySelector('img');
    zoomImage.src = photo.src;
    zoomImage.alt = image.alt;
    photoDialog.querySelector('[data-photo-caption]').textContent = `${photo.label} · ${index + 1} / ${photos.length}`;
    photoDialog.querySelectorAll('[data-photo-step]').forEach(button => { button.hidden = photos.length < 2; });
  }
}

function setPhotoZoom(zoomed) {
  const frame = photoDialog.querySelector('.photo-dialog-image');
  const button = photoDialog.querySelector('[data-photo-zoom]');
  frame.classList.toggle('is-zoomed', zoomed);
  button.setAttribute('aria-pressed', String(zoomed));
  button.setAttribute('aria-label', zoomed ? 'Уменьшить масштаб' : 'Увеличить масштаб');
  button.title = button.getAttribute('aria-label');
  frame.scrollLeft = zoomed ? (frame.scrollWidth - frame.clientWidth) / 2 : 0;
  frame.scrollTop = zoomed ? (frame.scrollHeight - frame.clientHeight) / 2 : 0;
}

function openProductPhoto() {
  const product = products.find(item => item.id === currentRoute().params.get('id'));
  if (!product || !productPhotos(product).length) return;
  galleryReturnFocus = document.activeElement;
  photoDialog.querySelector('#photo-title').textContent = product.name;
  photoDialog.showModal();
  document.body.classList.add('modal-open');
  selectProductPhoto(galleryIndex);
  photoDialog.querySelector('[data-photo-close]').focus({ preventScroll: true });
}

function stepProductPhoto(step) {
  const product = products.find(item => item.id === currentRoute().params.get('id'));
  if (!product) return;
  const count = productPhotos(product).length;
  if (count) selectProductPhoto((galleryIndex + step + count) % count);
}

photoDialog.addEventListener('close', () => {
  if (!dialog.open) document.body.classList.remove('modal-open');
  if (galleryReturnFocus?.isConnected) galleryReturnFocus.focus({ preventScroll: true });
});
photoDialog.addEventListener('click', event => {
  if (event.target.closest('[data-photo-close]')) photoDialog.close();
  const zoom = event.target.closest('[data-photo-zoom]');
  if (zoom) setPhotoZoom(zoom.getAttribute('aria-pressed') !== 'true');
  const step = event.target.closest('[data-photo-step]');
  if (step) stepProductPhoto(Number(step.dataset.photoStep));
  if (event.target !== photoDialog) return;
  const bounds = photoDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoDialog.close();
});
photoDialog.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  stepProductPhoto(event.key === 'ArrowRight' ? 1 : -1);
});

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
  const { page, params } = currentRoute();
  galleryIndex = 0;
  main.innerHTML = page === 'catalog' ? catalog(params) : page === 'product' ? productPage(params) : page === 'cart' ? cartPage() : page === 'checkout' ? checkoutPage() : home();
  if (page === 'checkout') restoreCheckout();
  const cartFeedback = document.querySelector('.cart-feedback');
  if (cartFeedback) cartFeedback.hidden = true;
  document.title = (page === 'home' ? 'Запчасти для спецтехники' : main.querySelector('h1')?.textContent || 'Запчасти для спецтехники') + ' — Эльторг';
  document.querySelector('.navigation').classList.remove('open');
  document.querySelector('.header-search input[name="q"]').value = page === 'catalog' ? params.get('q') || '' : '';
  document.querySelector('.mobile-menu').setAttribute('aria-expanded', 'false');
  setCatalogOpen(false);
  refreshIcons();
  initCategoryCards();
  initPopularCarousel();
  window.scrollTo({ top: 0, behavior: 'instant' });
  const target = { about: '.company-section', delivery: '.contact-band', contacts: '.contact-band' }[page];
  if (target) document.querySelector(target)?.scrollIntoView({ block: 'start', behavior: 'instant' });
}

function openRequest(subject, productId) {
  const product = products.find(item => item.id === productId);
  returnFocus = document.activeElement;
  const selected = product ? `<div class="request-selection">${productPreview(product)}<div><strong>${escapeHtml(product.name)}</strong><small>${product.demo ? 'Демо · ' : ''}${product.article ? `Артикул ${product.article} · ` : ''}${money(product.price)}</small></div></div>` : '';
  const message = product ? `${product.name}${product.article ? ', артикул ' + product.article : ''}` : subject || '';
  document.querySelector('#request-body').innerHTML = `<div class="dialog-kicker">ЭЛЬТОРГ / ПОДБОР ЗАПЧАСТЕЙ</div><h2 id="request-title" class="request-heading">Быстрый и точный подбор запчастей</h2><p class="request-intro">Оставьте контакт и расскажите, что нужно вашей технике.</p>${selected}${requestFields(message, product?.id || '')}`;
  refreshIcons();
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.querySelector('input[name="name"]').focus({ preventScroll: true });
}

function closeRequest() { dialog.close(); }

const catalogDisclosure = document.querySelector('.catalog-disclosure');
const catalogToggle = catalogDisclosure.querySelector('.catalog-button');
const catalogMenu = document.querySelector('#catalog-menu');
catalogMenu.innerHTML = `<div class="catalog-menu-heading"><span>ЗАПЧАСТИ ПО УЗЛАМ</span><a class="text-link" href="#catalog">Весь каталог${icon('arrow-up-right')}</a></div><div class="catalog-menu-grid">${categories.map((category, index) => `<a href="#catalog?category=${category.id}" data-category="${category.id}"><span class="menu-preview" aria-hidden="true">${categoryArtwork(index)}</span><span class="menu-copy"><strong>${category.name}</strong><small>${category.sub}</small></span>${icon('arrow-up-right')}</a>`).join('')}</div><div class="catalog-menu-footer"><span>Не нашли нужную деталь?</span><button class="text-link" data-request="Подбор запчасти">Поможем с подбором${icon('arrow-up-right')}</button></div>`;
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
    selectProductPhoto(Number(galleryButton.dataset.gallery));
    return;
  }
  if (event.target.closest('[data-photo-open]')) return openProductPhoto();
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
    const destination = previewLink.getAttribute('href');
    if (destination.startsWith('#product') || destination.startsWith('#catalog') || destination === '#cart' || destination === '#checkout') return;
    if (currentRoute().page !== 'home') return;
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
  const requestButton = event.target.closest('[data-request]');
  if (requestButton) return openRequest(requestButton.dataset.request);
  const queryButton = event.target.closest('[data-query]');
  if (queryButton) { openRequest(`Поиск: ${queryButton.dataset.query}`); return; }
  const modeButton = event.target.closest('[data-mode]');
  const exampleButton = event.target.closest('[data-finder-example]');
  if (exampleButton) {
    const dropdown = document.querySelector('#finder-panel .finder-dropdown');
    if (dropdown) {
      selectFinderOption(dropdown, exampleButton.dataset.finderExample);
      return;
    }
    const field = document.querySelector('#finder-panel input, #finder-panel select');
    field.value = exampleButton.dataset.finderExample;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
    field.focus({ preventScroll: true });
  }
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
    const route = currentRoute();
    const params = route.page === 'catalog' ? new URLSearchParams(route.params) : new URLSearchParams();
    for (const key of ['category', 'equipmentBrand']) {
      if (data.get(key)) params.set(key, String(data.get(key)));
    }
    location.hash = catalogHref(params, { q: query });
  }
  if (event.target.matches('[data-model-form]')) {
    event.preventDefault();
    openRequest('Подбор запчастей для ' + new FormData(event.target).get('model'));
  }
  if (event.target.matches('[data-brand-form]')) {
    event.preventDefault();
    const brand = new FormData(event.target).get('brand');
    if (equipmentBrandOptions.includes(brand)) location.hash = catalogHref(new URLSearchParams(), { equipmentBrand: brand });
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
  if (photoDialog.open) photoDialog.close();
  if (!['home', 'catalog', 'product', 'cart', 'checkout'].includes(currentRoute().page)) history.replaceState(null, '', '#home');
  renderRoute();
  main.focus({ preventScroll: true });
});
if (!['home', 'catalog', 'product', 'cart', 'checkout'].includes(currentRoute().page)) history.replaceState(null, '', '#home');
renderRoute();
