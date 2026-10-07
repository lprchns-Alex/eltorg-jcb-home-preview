const test = require('node:test');
const assert = require('node:assert/strict');
const { validate, send } = require('../order.js');
const example = () => ({ customer: { type: 'individual', name: 'Тестовый покупатель', phone: '+7 (900) 000-00-00', email: 'test@example.com' }, items: [{ id: 'valve', quantity: 2 }], comment: '' });
test('individual requires name, phone and email but no INN', () => {
  assert.deepEqual(validate(example()).errors, {});
  const order = example(); order.customer = { type: 'individual' };
  assert.deepEqual(Object.keys(validate(order).errors), ['name', 'phone', 'email']);
});
test('business requires 10- or 12-digit INN and rejects letters', () => {
  const order = example(); order.customer.type = 'business';
  assert.ok(validate(order).errors.inn);
  for (const inn of ['1234567890', '123456789012']) { order.customer.inn = inn; assert.deepEqual(validate(order).errors, {}); }
  order.customer.inn = 'abcdefghij'; assert.ok(validate(order).errors.inn);
  order.customer.type = 'individual'; assert.equal(validate(order).value.customer.inn, '');
});
test('normalizes whitespace and rejects invalid contact data', () => {
  const order = example(); order.customer.name = ' Тестовый покупатель ';
  assert.equal(validate(order).value.customer.name, 'Тестовый покупатель');
  order.customer.phone = '+7 (abc) 000-00-00'; order.customer.email = 'broken@';
  assert.ok(validate(order).errors.phone); assert.ok(validate(order).errors.email);
});
test('rejects empty, duplicate and invalid item quantities', () => {
  for (const items of [[], null, [{ id: 'valve', quantity: 0 }], [{ id: 'valve', quantity: 1.5 }], [{ id: 'valve', quantity: 100 }], [{ id: '../x', quantity: 1 }], [{ id: 'valve', quantity: 1 }, { id: 'valve', quantity: 1 }]]) {
    assert.ok(validate({ ...example(), items }).errors.items);
  }
});
test('does not accept client prices as order data', () => {
  const order = example(); order.items[0].price = 1;
  assert.deepEqual(validate(order).value.items, [{ id: 'valve', quantity: 2 }]);
});
test('missing endpoint never pretends to submit or makes a request', async () => {
  await assert.rejects(send('', example(), 'test-id', () => { throw Error('unexpected fetch'); }), /не подключена/);
});
test('requires explicit server acknowledgement, not just HTTP 200', async () => {
  for (const result of [{}, { status: 'accepted' }, { status: 'queued', orderId: 'ORDER-123' }]) {
    await assert.rejects(send('/orders', example(), 'test-id', async () => ({ ok: true, json: async () => result })), /подтвердить не удалось/);
  }
});
test('sends IDs and contacts with idempotency key and accepts a valid receipt', async () => {
  const receipt = await send('/orders', example(), 'test-id', async (url, options) => {
    assert.equal(url, '/orders'); assert.equal(options.headers['Idempotency-Key'], 'test-id');
    assert.equal(options.credentials, 'omit'); assert.deepEqual(JSON.parse(options.body), example());
    return { ok: true, json: async () => ({ status: 'accepted', orderId: 'ORDER-123' }) };
  });
  assert.equal(receipt.orderId, 'ORDER-123');
});
test('network failure and rate limits remain failures', async () => {
  await assert.rejects(send('/orders', example(), 'test-id', async () => { throw new TypeError('offline'); }), /offline/);
  await assert.rejects(send('/orders', example(), 'test-id', async () => ({ ok: false, status: 429, json: async () => ({}) })), /Слишком много/);
});
