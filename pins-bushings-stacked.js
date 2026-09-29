'use strict';

const stackedHeader = document.querySelector('.site-header');
const updateStackedHeader = () => stackedHeader.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', updateStackedHeader, { passive: true });
updateStackedHeader();
// Account for the expanded mobile menu/search when jumping to filtered parts.
new ResizeObserver(() => {
  document.documentElement.style.scrollPaddingTop = (stackedHeader.getBoundingClientRect().height + 16) + 'px';
}).observe(stackedHeader);

document.querySelector('.machine-section').addEventListener('click', event => {
  if (!event.target.closest('[data-node], [data-all-nodes]')) return;
  document.querySelector('.parts-section').scrollIntoView({
    block: 'start',
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });
});
