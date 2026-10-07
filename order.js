(function (root) {
  'use strict';
  const clean = value => typeof value === 'string' ? value.trim() : '';
  function validate(input) {
    const customer = {
      type: input?.customer?.type,
      name: clean(input?.customer?.name),
      phone: clean(input?.customer?.phone),
      email: clean(input?.customer?.email),
      inn: input?.customer?.type === 'business' ? clean(input?.customer?.inn) : ''
    };
    const errors = {};
    if (!['individual', 'business'].includes(customer.type)) errors.type = 'Выберите тип покупателя.';
    if (customer.name.length < 2 || customer.name.length > 160 || /[\r\n]/.test(customer.name)) errors.name = 'Укажите ФИО или название организации (от 2 до 160 символов).';
    if (!/^[+\d\s()\-]{10,24}$/.test(customer.phone) || !/^\d{10,15}$/.test(customer.phone.replace(/\D/g, ''))) errors.phone = 'Укажите телефон: от 10 до 15 цифр.';
    if (customer.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(customer.email)) errors.email = 'Проверьте адрес электронной почты.';
    if (customer.type === 'business' && !/^(\d{10}|\d{12})$/.test(customer.inn)) errors.inn = 'ИНН организации содержит 10 цифр, ИП — 12.';
    const comment = clean(input?.comment);
    if (comment.length > 1500) errors.comment = 'Комментарий должен быть не длиннее 1500 символов.';
    const items = input?.items;
    if (!Array.isArray(items) || !items.length || items.length > 200 || items.some(item =>
      !item || !/^[a-z][a-z0-9-]{0,79}$/.test(item.id) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99
    ) || new Set(items.map(item => item.id)).size !== items.length) errors.items = 'Проверьте состав корзины и количество товаров.';
    return { errors, value: { customer, comment, items: Array.isArray(items) ? items.map(item => ({ id: item?.id, quantity: item?.quantity })) : [] } };
  }
  async function send(endpoint, payload, requestId, fetcher = root.fetch.bind(root)) {
    if (!endpoint) throw new Error('Отправка заказов на почту ещё не подключена. Заказ не отправлен, товары остались в корзине. Свяжитесь с отделом запчастей: +7 (965) 089-46-99.');
    const response = await fetcher(endpoint, {
      method: 'POST', credentials: 'omit', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(30000)
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.status !== 'accepted' || !/^[a-zA-Z0-9-]{6,80}$/.test(result?.orderId || '')) {
      throw new Error(response.status === 429 ? 'Слишком много попыток. Попробуйте через несколько минут.'
        : response.status === 409 ? 'Отправка этого заказа ещё проверяется. Не создавайте повторный заказ; свяжитесь с менеджером.'
        : 'Отправку заказа подтвердить не удалось. Товары сохранены. Повторите попытку или свяжитесь с менеджером.');
    }
    return result;
  }
  const api = { validate, send };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.eltorgOrder = api;
})(typeof window === 'undefined' ? globalThis : window);
