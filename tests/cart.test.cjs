const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync(require.resolve('../cart.js'), 'utf8');
const day = 86400000;
const key = 'eltorg-cart-v1';
function browser(raw = null, options = {}) {
  let now = 1791320000000;
  const storage = options.storage || new Map(raw === null ? [] : [[key, JSON.stringify(raw)]]);
  const events = {};
  const badge = {};
  const localStorage = {
    getItem: key => { if (options.blocked) throw Error('blocked'); return storage.get(key) || null; },
    setItem: (key, value) => { if (options.blocked) throw Error('blocked'); storage.set(key, value); },
    removeItem: key => storage.delete(key)
  };
  const window = { addEventListener: (name, fn) => { events[name] = fn; }, dispatchEvent() {} };
  const document = { addEventListener: (name, fn) => { events[name] = fn; }, querySelectorAll: () => [{ setAttribute() {}, querySelector: () => badge }] };
  vm.runInNewContext(code, { window, document, localStorage, Date: { now: () => now }, Event: class { constructor(type) { this.type = type; } } });
  return { cart: window.eltorgCart, storage, badge, advance: days => { now += days * day; }, events,
    items: () => JSON.parse(JSON.stringify(window.eltorgCart.getItems())) };
}
test('adds multiple products, sums repeated IDs, clamps and removes quantities', () => {
  const b = browser();
  b.cart.add('valve'); b.cart.add('starter'); b.cart.add('valve');
  assert.deepEqual(b.items(), [{ id: 'valve', quantity: 2 }, { id: 'starter', quantity: 1 }]);
  b.cart.setQuantity('valve', 999); assert.equal(b.items()[0].quantity, 99);
  b.cart.setQuantity('valve', 0); assert.equal(b.items()[0].quantity, 1);
  b.cart.remove('starter'); assert.equal(b.items().length, 1);
  assert.equal(b.cart.add('../invalid'), false);
});
test('migration retains old carts and persists a single migration timestamp', () => {
  const b = browser([{ id: 'valve', quantity: 2 }]);
  assert.equal(JSON.parse(b.storage.get(key)).version, 2);
  const timestamp = JSON.parse(b.storage.get(key)).updatedAt;
  b.advance(9); assert.equal(b.items().length, 1);
  assert.equal(JSON.parse(b.storage.get(key)).updatedAt, timestamp);
  b.advance(1); assert.deepEqual(b.items(), []);
});
test('ten-day TTL refreshes on cart change, not on read', () => {
  const b = browser(); b.cart.add('valve'); b.advance(9); b.cart.add('starter');
  b.advance(9); assert.equal(b.items().length, 2);
  b.advance(1); assert.equal(b.items().length, 0);
});
test('reload and storage events restore the same cart without renewing TTL', () => {
  const first = browser(); first.cart.add('valve');
  const second = browser(null, { storage: first.storage });
  assert.equal(second.items()[0].id, 'valve');
  first.cart.add('starter'); second.events.storage({ key });
  assert.equal(second.items().length, 2);
  second.cart.add('belt'); assert.equal(first.items().length, 3);
});
test('blocked storage keeps in-memory cart and reports that persistence failed', () => {
  const b = browser(null, { blocked: true });
  assert.equal(b.cart.add('valve'), false); b.cart.add('starter');
  assert.equal(b.items().length, 2); b.advance(10); assert.deepEqual(b.items(), []);
});
test('successful order removes only ordered quantities, keeping new additions', () => {
  const b = browser(); b.cart.add('valve'); b.cart.add('valve'); b.cart.add('starter');
  b.cart.removeOrdered([{ id: 'valve', quantity: 1 }]);
  assert.deepEqual(b.items(), [{ id: 'valve', quantity: 1 }, { id: 'starter', quantity: 1 }]);
});
test('malformed, expired and future-dated storage is not restored', () => {
  assert.deepEqual(browser({ version: 2, updatedAt: 0, items: [{ id: 'valve', quantity: 2 }] }).items(), []);
  assert.deepEqual(browser({ version: 2, updatedAt: 9999999999999, items: [] }).items(), []);
  const b = browser(); b.storage.set(key, '{broken'); assert.deepEqual(b.items(), []);
});
test('badge hides for an empty cart and caps displayed count', () => {
  const b = browser(); assert.equal(b.badge.hidden, true);
  b.cart.add('valve'); b.cart.setQuantity('valve', 99); b.cart.add('starter');
  assert.equal(b.badge.textContent, '99+');
  b.cart.remove('valve'); b.cart.remove('starter'); assert.equal(b.badge.hidden, true);
});
