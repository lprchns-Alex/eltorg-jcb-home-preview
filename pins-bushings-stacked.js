'use strict';

document.querySelector('.machine-section').addEventListener('click', event => {
  if (!event.target.closest('[data-node], [data-all-nodes]')) return;
  document.querySelector('.parts-section').scrollIntoView({
    block: 'start',
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });
});
