(() => {
  'use strict';
  const key = 'eltorg-cart-v1';
  const lifetime = 10 * 24 * 60 * 60 * 1000;
  const validId = id => typeof id === 'string' && /^[a-z][a-z0-9-]{0,79}$/.test(id);
  const quantity = value => Math.max(1, Math.min(99, Math.trunc(Number(value)) || 1));
  const empty = () => ({ version: 2, updatedAt: Date.now(), items: [] });
  let state = empty();
  let memoryOnly = false;
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(state)); memoryOnly = false; return true; }
    catch { memoryOnly = true; return false; }
  }
  function read() {
    if (memoryOnly) return Date.now() - state.updatedAt < lifetime ? state : empty();
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return empty();
      const data = JSON.parse(raw);
      const legacy = Array.isArray(data);
      const updatedAt = legacy ? Date.now() : data?.updatedAt;
      if ((!legacy && data?.version !== 2) || !Number.isFinite(updatedAt) || updatedAt > Date.now()
        || Date.now() - updatedAt >= lifetime || !Array.isArray(legacy ? data : data.items)) {
        localStorage.removeItem(key);
        return empty();
      }
      const items = new Map();
      (legacy ? data : data.items).slice(0, 200).forEach(item => {
        if (item && validId(item.id)) items.set(item.id, { id: item.id, quantity: quantity(item.quantity) });
      });
      const next = { version: 2, updatedAt, items: [...items.values()] };
      // Existing carts get one ten-day period at migration, not at every visit.
      if (legacy) {
        state = next;
        persist();
      }
      return next;
    } catch { return Date.now() - state.updatedAt < lifetime ? state : empty(); }
  }
  state = read();
  function update() {
    const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('[data-cart-link]').forEach(link => {
      link.setAttribute('aria-label', 'Корзина: ' + count);
      const badge = link.querySelector('[data-cart-count]');
      if (badge) { badge.textContent = count > 99 ? '99+' : count; badge.hidden = !count; }
    });
    window.dispatchEvent(new Event('eltorg-cart-change'));
  }
  function change(edit) {
    state = read();
    edit(state.items);
    state.updatedAt = Date.now();
    const persisted = persist();
    update();
    return persisted;
  }
  window.eltorgCart = {
    getItems() { state = read(); return state.items.map(item => ({ ...item })); },
    add(id) {
      if (!validId(id)) return false;
      return change(items => {
        const item = items.find(item => item.id === id);
        if (item) item.quantity = quantity(item.quantity + 1);
        else if (items.length < 200) items.push({ id, quantity: 1 });
      });
    },
    setQuantity(id, value) { return change(items => { const item = items.find(item => item.id === id); if (item) item.quantity = quantity(value); }); },
    remove(id) { return change(items => { const index = items.findIndex(item => item.id === id); if (index >= 0) items.splice(index, 1); }); },
    removeOrdered(ordered) {
      return change(items => ordered.forEach(sent => {
        const index = items.findIndex(item => item.id === sent.id);
        if (index < 0) return;
        items[index].quantity -= sent.quantity;
        if (items[index].quantity <= 0) items.splice(index, 1);
      }));
    }
  };
  const sync = () => { state = read(); update(); };
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) { memoryOnly = false; sync(); }
  });
  window.addEventListener('pageshow', sync);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) sync(); });
  update();
})();
