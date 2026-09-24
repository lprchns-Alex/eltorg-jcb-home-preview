'use strict';

// Overview data only: production articles and fitment must be mapped from verified catalogues.
const assemblies = [
  { id: 'bucket', title: 'Передний ковш', label: 'Передний ковш', anchor: [260, 253], marker: [65, 125], elbow: [65, 253], parts: [['Пальцы крепления ковша', 'pin'], ['Втулки проушин ковша', 'bush'], ['Зубья переднего ковша', 'teeth'], ['Крепёж ковша', 'bolt']] },
  { id: 'loader', title: 'Передняя стрела', label: 'Передняя стрела', anchor: [479, 346], marker: [445, 65], elbow: [445, 260], parts: [['Палец крепления подъёмного цилиндра', 'pin'], ['Втулка подъёмного цилиндра', 'bush'], ['Палец соединения рычагов', 'pin'], ['Регулировочные шайбы', 'washer'], ['Стопоры и крепёж пальцев', 'bolt']] },
  { id: 'engine', title: 'Двигатель', label: 'Двигатель', anchor: [435, 458], marker: [65, 525], elbow: [195, 525], parts: [['Масляный фильтр', 'filter'], ['Топливный фильтр', 'filter'], ['Воздушный фильтр', 'filter'], ['Приводной ремень', 'belt'], ['Натяжитель ремня', 'tensioner'], ['Вал коленчатый', 'crankshaft'], ['Стартер', 'starter'], ['Генератор', 'alternator']] },
  { id: 'cabin', title: 'Кабина', label: 'Кабина', anchor: [621, 370], marker: [645, 65], elbow: [645, 255], parts: [['Лобовое стекло', 'glass'], ['Боковое стекло', 'glass'], ['Стекло двери', 'glass'], ['Заднее стекло', 'glass'], ['Уплотнения кабины', 'seal']] },
  { id: 'backhoe', title: 'Задняя стрела', label: 'Задняя стрела', anchor: [725, 384], marker: [870, 120], elbow: [815, 255], parts: [['Палец основания стрелы', 'pin'], ['Втулки шарнира стрелы', 'bush'], ['Палец соединения рукояти', 'pin'], ['Ремкомплект гидроцилиндра', 'seal'], ['Регулировочные шайбы', 'washer']] },
  { id: 'rear-bucket', title: 'Задний ковш', label: 'Задний ковш', anchor: [813, 526], marker: [953, 540], elbow: [915, 540], parts: [['Палец крепления ковша', 'pin'], ['Втулки ковшевого соединения', 'bush'], ['Зуб ковша', 'teeth'], ['Крепёж заднего ковша', 'bolt']] },
  { id: 'chassis', title: 'Мосты и колёса', label: 'Мосты и колёса', anchor: [521, 576], marker: [570, 705], elbow: [570, 652], parts: [['Главная пара', 'gear'], ['Уплотнение ступицы', 'seal'], ['Регулировочные шайбы моста', 'washer'], ['Колёсный крепёж', 'bolt']] },
  { id: 'hydraulics', title: 'Гидравлика', label: 'Гидравлика', anchor: [383, 387], marker: [65, 365], elbow: [210, 365], parts: [['Рукава высокого давления', 'hose'], ['Уплотнения гидроцилиндров', 'seal'], ['Гидравлический фильтр', 'filter'], ['Гидрораспределитель', 'valve'], ['Уплотнительные кольца', 'seal']] }
];
const previewTiles = { pin: 0, bush: 1, washer: 2, bolt: 3, hose: 4, seal: 5, filter: 6, glass: 7, teeth: 8, belt: 9, tensioner: 10, crankshaft: 11, starter: 12, alternator: 13, gear: 14, valve: 15 };
// Known product metadata from the homepage catalogue; fitment is checked by VIN.
const productDetails = {
  'Гидрораспределитель': { article: '25/222579', manufacturer: 'Husco' },
  'Натяжитель ремня': { article: '', manufacturer: 'Gates' }
};
// Fictional combinations for the layout preview, not verified product references.
Object.assign(productDetails, {
  'Пальцы крепления ковша': { article: '811/90427', manufacturer: 'JCB', demo: true },
  'Втулки проушин ковша': { article: '809/01763', manufacturer: 'CARRARO', demo: true },
  'Зубья переднего ковша': { article: '531/08642', manufacturer: '', demo: true },
  'Палец крепления подъёмного цилиндра': { article: '811/03285', manufacturer: 'JCB', demo: true },
  'Втулка подъёмного цилиндра': { article: '', manufacturer: 'CARRARO', demo: true },
  'Регулировочные шайбы': { article: '819/00674', manufacturer: '', demo: true },
  'Масляный фильтр': { article: 'LF-3827', manufacturer: 'Fleetguard', demo: true },
  'Топливный фильтр': { article: 'FF-5718', manufacturer: 'Fleetguard', demo: true },
  'Воздушный фильтр': { article: '', manufacturer: 'Donaldson', demo: true },
  'Приводной ремень': { article: '8PK-1746', manufacturer: 'Gates', demo: true },
  'Стартер': { article: 'ST-24816', manufacturer: 'Bosch', demo: true },
  'Генератор': { article: 'ALT-12073', manufacturer: '', demo: true },
  'Лобовое стекло': { article: '827/04816', manufacturer: 'JCB', demo: true },
  'Стекло двери': { article: '827/06239', manufacturer: '', demo: true },
  'Палец основания стрелы': { article: '811/07526', manufacturer: 'JCB', demo: true },
  'Ремкомплект гидроцилиндра': { article: '991/02468', manufacturer: 'SKF', demo: true },
  'Зуб ковша': { article: '531/07924', manufacturer: 'JCB', demo: true },
  'Главная пара': { article: 'CA-148273', manufacturer: 'CARRARO', demo: true },
  'Уплотнение ступицы': { article: '', manufacturer: 'SKF', demo: true },
  'Рукава высокого давления': { article: 'R2-12480', manufacturer: 'Gates', demo: true },
  'Гидравлический фильтр': { article: 'HF-62418', manufacturer: 'Fleetguard', demo: true }
});
const totalParts = assemblies.reduce((sum, node) => sum + node.parts.length, 0);
// Illustrative prices for the layout experiment, not a commercial offer.
const previewPrices = { pin: 4200, bush: 1850, washer: 450, bolt: 780, hose: 3600, seal: 2450, filter: 2900, glass: 18500, teeth: 3200, belt: 2500, tensioner: 5000, crankshaft: 65000, starter: 21000, alternator: 16000, gear: 19000, valve: 260000 };
const priceFormat = new Intl.NumberFormat('ru-RU');
const $ = selector => document.querySelector(selector);
const number = index => String(index + 1).padStart(2, '0');
let selected = assemblies.findIndex(node => node.id === location.hash.slice(1));
if (selected < 0) selected = null;
let requestText = '';

function drawing() {
  return `<div class="machine-drawing"><img src="assets/assembly-jcb-3cx-v2.png" width="1536" height="1024" alt="Иллюстрация по фотографии настоящего JCB 3CX-14: поднятый передний ковш, кабина и задняя стрела с маркировкой JCB"><svg class="leader-lines" viewBox="0 0 1000 760" aria-hidden="true">${assemblies.map((node, index) => `<g data-line="${index}"><polyline class="node-line" points="${node.marker.join(',')} ${node.elbow.join(',')} ${node.anchor.join(',')}"></polyline><circle class="node-end" cx="${node.anchor[0]}" cy="${node.anchor[1]}" r="5"></circle></g>`).join('')}</svg>${assemblies.map((node, index) => `<button class="machine-node" style="left:${node.marker[0] / 10}%;top:${node.marker[1] / 7.6}%" data-node="${index}" aria-label="${number(index)}. ${node.title}" aria-pressed="false" title="${node.title}">${number(index)}</button>`).join('')}</div>`;
}

function row(node, index, part) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'part-row';
  const [name, preview] = part;
  const details = productDetails[name] || {};
  const tile = previewTiles[preview];
  const thumbnail = `<span class="part-thumbnail tile-photo" data-preview="${preview}" style="--photo-x:${tile % 4 / 3 * 100}%;--photo-y:${Math.floor(tile / 4) / 3 * 100}%" aria-hidden="true"></span>`;
  button.innerHTML = `${thumbnail}<span class="part-copy"><strong></strong><span class="part-metadata"><span>Артикул: <span class="part-article"></span></span><span>Производитель: <span class="part-manufacturer"></span></span></span></span><span class="part-commercial"><span class="part-availability">Наличие уточняется</span><span class="part-price">${priceFormat.format(previewPrices[preview])} ₽</span></span>`;
  button.querySelector('strong').textContent = name;
  button.querySelector('.part-article').textContent = details.article || 'Уточняется';
  button.querySelector('.part-manufacturer').textContent = details.manufacturer || 'Уточняется';
  const description = [name, details.article, details.manufacturer].filter(Boolean).join(' · ');
  button.setAttribute('aria-label', `Запросить подбор: ${description}, ${node.title}`);
  button.addEventListener('click', () => openContact(description, index, details.demo, true));
  return button;
}

function renderParts() {
  const query = $('#part-search').value.trim().toLocaleLowerCase('ru');
  const node = selected === null ? null : assemblies[selected];
  $('#parts-title').textContent = node ? node.title : 'Запчасти JCB 3CX';
  $('#parts-eyebrow').textContent = node ? `УЗЕЛ ${number(selected)} · JCB 3CX` : 'КАТАЛОГ МОДЕЛИ';
  const list = $('#parts-list');
  list.replaceChildren();
  list.scrollTop = 0;
  let count = 0;
  assemblies.forEach((group, index) => {
    if (selected !== null && index !== selected) return;
    const matches = group.parts.filter(part => {
      const details = productDetails[part[0]] || {};
      return `${part[0]} ${group.title} ${details.article || ''} ${details.manufacturer || ''}`.toLocaleLowerCase('ru').includes(query);
    });
    if (!matches.length) return;
    const section = document.createElement('section');
    section.className = 'part-group';
    const heading = document.createElement('h3');
    heading.className = 'part-group-heading';
    heading.innerHTML = `<span><b>${number(index)}</b> ${group.title}</span><span>${matches.length}</span>`;
    section.append(heading);
    matches.forEach(part => section.append(row(group, index, part)));
    list.append(section);
    count += matches.length;
  });
  $('#parts-summary').textContent = selected === null && !query ? `Все узлы · ${totalParts} позиций` : `Найдено ${count} из ${totalParts} позиций${query ? ` · «${$('#part-search').value.trim()}»` : ''}`;
  $('#results-total').textContent = count;
  $('#clear-filters').hidden = selected === null && !query;
  if (!count) {
    const empty = document.createElement('p');
    empty.className = 'no-results';
    empty.textContent = 'Совпадений нет. Попробуйте другое название или обратитесь к менеджеру.';
    list.append(empty);
  }
  lucide.createIcons();
}

function selectNode(index, updateHash = true) {
  const resultsAboveViewport = $('.parts-section').getBoundingClientRect().top < $('.site-header').getBoundingClientRect().bottom;
  selected = index;
  document.querySelectorAll('[data-node]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.node) === selected)));
  document.querySelectorAll('[data-line]').forEach(line => line.classList.toggle('selected', Number(line.dataset.line) === selected));
  document.querySelectorAll('[data-all-nodes]').forEach(button => button.setAttribute('aria-pressed', String(selected === null)));
  $('#expanded-selection').textContent = selected === null ? `Все узлы · ${totalParts} позиций` : `${number(selected)} · ${assemblies[selected].title}`;
  if (updateHash) history.replaceState(null, '', selected === null ? '#all' : `#${assemblies[selected].id}`);
  renderParts();
  if (updateHash && resultsAboveViewport && matchMedia('(max-width: 980px)').matches && !$('#scheme-dialog').open) {
    $('.parts-section').scrollIntoView({ block: 'start', behavior: 'instant' });
  }
}

function openContact(part, index = selected, demo = false, demoPrice = false) {
  const nodeTitle = index === null ? 'Уточнить по VIN' : assemblies[index].title;
  const title = part || (index === null ? 'Подбор запчастей' : nodeTitle);
  requestText = `Здравствуйте! Нужен подбор для JCB 3CX. Узел: ${nodeTitle}. Деталь: ${title}. VIN: `;
  if (demo) requestText += '(Артикул и производитель из демонстрационного макета, требуют проверки.)';
  $('.contact-note').textContent = demo
    ? 'Артикул и производитель показаны для примера. Сообщите менеджеру VIN для проверки детали.'
    : 'Сообщите менеджеру VIN или серийный номер машины.';
  if (demoPrice) $('.contact-note').textContent += ' Цена в макете демонстрационная. Актуальную стоимость подтвердит менеджер.';
  $('#contact-selection').textContent = `JCB 3CX · ${title}`;
  $('#copy-status').textContent = '';
  $('#assembly-contact').showModal();
}

$('#scheme-mount').innerHTML = drawing();
$('#expanded-scheme').innerHTML = drawing();
$('#assembly-legend').innerHTML = assemblies.map((node, index) => `<button type="button" data-node="${index}" aria-pressed="false"><b>${number(index)}</b><span>${node.label}</span><small>${node.parts.length}</small></button>`).join('');
document.querySelectorAll('[data-node]').forEach(button => button.addEventListener('click', () => {
  const index = Number(button.dataset.node);
  selectNode(selected === index ? null : index);
}));
document.querySelectorAll('[data-all-nodes]').forEach(button => button.addEventListener('click', () => selectNode(null)));
$('#clear-filters').addEventListener('click', () => {
  $('#part-search').value = '';
  selectNode(null);
});
$('#expand-scheme').addEventListener('click', () => $('#scheme-dialog').showModal());
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => openContact()));
$('#part-search').addEventListener('input', renderParts);
$('#assembly-search').addEventListener('submit', event => {
  event.preventDefault();
  renderParts();
  if (matchMedia('(max-width: 980px)').matches) {
    $('.parts-section').scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
});
$('#copy-request').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(requestText);
    $('#copy-status').textContent = 'Запрос скопирован. Добавьте VIN перед отправкой.';
  } catch {
    $('#copy-status').textContent = requestText;
  }
});
window.addEventListener('hashchange', () => {
  const index = assemblies.findIndex(node => node.id === location.hash.slice(1));
  selectNode(index >= 0 ? index : null, false);
});
const headerCategories = [
  ['engine', 'Двигатель', 'Детали и комплектующие'],
  ['hydraulics', 'Гидравлика', 'Насосы, цилиндры, РВД'],
  ['filters', 'Фильтры и масла', 'Всё для обслуживания'],
  ['transmission', 'Трансмиссия', 'Мосты и коробки передач'],
  ['electrics', 'Электрика', 'Стартеры, генераторы, датчики'],
  ['equipment', 'Рабочее оборудование', 'Ковши, коронки и зубья'],
  ['undercarriage', 'Ходовая часть', 'Гусеницы и опорные ролики'],
  ['fuel', 'Топливная система', 'Насосы и форсунки'],
  ['wheels', 'Шины и диски', 'Колёса для спецтехники'],
  ['pins', 'Пальцы и втулки', 'Соединения рабочих узлов'],
  ['seals', 'Сальники', 'Уплотнения и манжеты'],
  ['cabin', 'Кабина и стёкла', 'Остекление и детали кузова']
];
$('#catalog-menu').innerHTML = `<div class="catalog-menu-heading"><span>ЗАПЧАСТИ ПО УЗЛАМ</span><a class="text-link" href="index.html#catalog">Весь каталог<i data-lucide="arrow-up-right"></i></a></div><div class="catalog-menu-grid">${headerCategories.map(([id, name, sub], index) => `<a href="index.html#catalog?category=${id}" data-category="${id}"><span class="menu-preview" aria-hidden="true" style="--category-sheet:url('assets/categories${index >= 6 ? '-extra' : ''}.jpg');--art-x:${index % 3 * 50}%;--art-y:${Math.floor(index % 6 / 3) * 100}%"></span><span class="menu-copy"><strong>${name}</strong><small>${sub}</small></span><i data-lucide="arrow-up-right"></i></a>`).join('')}</div><div class="catalog-menu-footer"><span>Не нашли нужную деталь?</span><button class="text-link" data-request="Подбор запчасти">Поможем с подбором<i data-lucide="arrow-up-right"></i></button></div>`;
function setCatalogOpen(open) {
  $('.catalog-button').setAttribute('aria-expanded', String(open));
  $('#catalog-menu').hidden = !open;
}
$('.catalog-button').addEventListener('click', () => setCatalogOpen($('#catalog-menu').hidden));
$('.mobile-menu').addEventListener('click', () => {
  const open = $('#main-nav').classList.toggle('open');
  $('.mobile-menu').setAttribute('aria-expanded', String(open));
  if (!open) setCatalogOpen(false);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.catalog-disclosure') || event.target.closest('#catalog-menu a, #catalog-menu button')) setCatalogOpen(false);
  const request = event.target.closest('[data-request]');
  if (request) openContact(request.dataset.request, null);
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (!$('#catalog-menu').hidden) {
    setCatalogOpen(false);
    $('.catalog-button').focus();
  } else if ($('#main-nav').classList.contains('open')) {
    $('#main-nav').classList.remove('open');
    $('.mobile-menu').setAttribute('aria-expanded', 'false');
    $('.mobile-menu').focus();
  }
});
$('[data-focus-search]').addEventListener('click', () => {
  $('.header-search').classList.add('expanded');
  $('#part-search').focus();
});
selectNode(selected, false);
