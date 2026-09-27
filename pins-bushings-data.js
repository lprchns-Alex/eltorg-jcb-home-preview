'use strict';

// Visual prototype: anchors refer to visible hinge centers, not verified OEM fitment.
window.pinJoints = [
  { id: 'lift-cylinder-base', title: 'Основание цилиндра подъёма', label: 'Цилиндр подъёма', anchor: [640, 378], marker: [620, 585], elbow: [620, 445] },
  { id: 'loader-frame', title: 'Передняя стрела — рама', label: 'Стрела — рама', anchor: [640, 318], marker: [650, 190], elbow: [650, 285] },
  { id: 'loader-rocker-top', title: 'Верхний шарнир рычага', label: 'Верхний рычаг', anchor: [711, 313], marker: [750, 205], elbow: [735, 275] },
  { id: 'loader-rocker-bottom', title: 'Нижний шарнир рычага', label: 'Нижний рычаг', anchor: [722, 378], marker: [850, 255], elbow: [810, 330] },
  { id: 'bucket-cylinder-rod', title: 'Шток цилиндра — рычаг ковша', label: 'Шток — рычаг', anchor: [811, 393], marker: [945, 335], elbow: [880, 365] },
  { id: 'loader-bucket', title: 'Передняя стрела — ковш', label: 'Стрела — ковш', anchor: [845, 478], marker: [925, 585], elbow: [870, 535] },
  { id: 'backhoe-base', title: 'Основание задней стрелы', label: 'Основание стрелы', anchor: [373, 414], marker: [325, 585], elbow: [325, 475] },
  { id: 'backhoe-dipper', title: 'Задняя стрела — рукоять', label: 'Стрела — рукоять', anchor: [226, 220], marker: [235, 95], elbow: [235, 165] },
  { id: 'backhoe-linkage', title: 'Рукоять — рычаг ковша', label: 'Рукоять — рычаг', anchor: [126, 371], marker: [65, 285], elbow: [75, 345] },
  { id: 'backhoe-bucket', title: 'Рукоять — задний ковш', label: 'Задний ковш', anchor: [106, 401], marker: [70, 585], elbow: [35, 470] }
].map((joint, index) => ({ ...joint, parts: [
  ['Палец шарнира', 'pin', { article: index % 3 ? `811/90${421 + index}` : '', manufacturer: 'JCB', demo: true }],
  ['Втулка шарнира', 'bush', { article: `809/00${173 + index}`, manufacturer: index % 2 ? 'CARRARO' : '', demo: true }],
  ['Шайба регулировочная', 'washer', { article: '', manufacturer: '', demo: true }],
  ['Фиксатор пальца', 'bolt', { article: index % 2 ? '' : `826/00${814 + index}`, manufacturer: '', demo: true }]
] }));
