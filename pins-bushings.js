'use strict';

const previewTiles = { pin: 0, bush: 1, washer: 2, bolt: 3, hose: 4, seal: 5, filter: 6, glass: 7, teeth: 8, belt: 9, tensioner: 10, crankshaft: 11, starter: 12, alternator: 13, gear: 14, valve: 15 };
const assemblies = window.pinJoints;
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
  return `<div class="machine-drawing"><img src="assets/jcb-profile-extended-v2.png" width="1536" height="1024" alt="Визуализация JCB 3CX на основе фотографии: вид сбоку с развёрнутой задней стрелой и указателями шарниров"><svg class="leader-lines" viewBox="0 0 1000 666.6667" aria-hidden="true">${assemblies.map((node, index) => `<g data-line="${index}"><polyline class="node-line" points="${node.marker.join(',')} ${node.elbow.join(',')} ${node.anchor.join(',')}"></polyline><circle class="node-end" cx="${node.anchor[0]}" cy="${node.anchor[1]}" r="5"></circle></g>`).join('')}</svg>${assemblies.map((node, index) => `<button class="machine-node" style="left:${node.marker[0] / 10}%;top:${node.marker[1] / 6.666667}%" data-node="${index}" aria-label="${number(index)}. ${node.title}" aria-pressed="false" title="${node.title}">${number(index)}</button>`).join('')}</div>`;
}

function row(node, index, part) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'part-row';
  const [name, preview, details = {}] = part;
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
  $('#parts-title').textContent = node ? node.title : 'Пальцы и втулки JCB 3CX';
  $('#parts-eyebrow').textContent = node ? `СОЕДИНЕНИЕ ${number(selected)} · JCB 3CX` : 'ДЕТАЛИ ШАРНИРНЫХ СОЕДИНЕНИЙ';
  const list = $('#parts-list');
  list.replaceChildren();
  list.scrollTop = 0;
  let count = 0;
  assemblies.forEach((group, index) => {
    if (selected !== null && index !== selected) return;
    const matches = group.parts.filter(part => {
      const details = part[2] || {};
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
  $('#parts-summary').textContent = selected === null && !query ? `Все соединения · ${totalParts} позиций` : `Найдено ${count} из ${totalParts} позиций${query ? ` · «${$('#part-search').value.trim()}»` : ''}`;
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
  $('#expanded-selection').textContent = selected === null ? `Все соединения · ${totalParts} позиций` : `${number(selected)} · ${assemblies[selected].title}`;
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
