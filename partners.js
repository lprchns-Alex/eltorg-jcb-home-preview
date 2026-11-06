(() => {
  const standalone = document.body.hasAttribute('data-partners-preview');
  const entryVariant = new URLSearchParams(location.search).get('partner-entry');
  const showHeaderEntry = entryVariant !== 'footer';
  const symbol = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  let entryFocus = null;

  window.eltorgPartnersPage = () => `
    <section class="container partners-page" aria-labelledby="partners-title">
      <nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="#home">Главная</a>${symbol('chevron-right')}<span aria-current="page">Партнёрам</span></nav>
      <header class="partners-heading">
        <div><h1 id="partners-title">Партнёрам</h1><p>Запчасти для спецтехники. Для задач вашего бизнеса.</p></div>
        <button class="button outline" type="button" data-partner-login>${symbol('log-in')}Войти в кабинет</button>
      </header>
      <div class="partners-overview">
        <div class="partners-business">
          <img class="partners-equipment" src="assets/machine-jcb-v3.png" alt="Экскаватор-погрузчик JCB 4CX" width="2163" height="727" fetchpriority="high">
          <ul class="partners-services" aria-label="Работа с запчастями">
            <li>${symbol('scan-line')}<span>Подбор<br>запчастей</span></li>
            <li>${symbol('badge-check')}<span>Проверка<br>совместимости</span></li>
            <li>${symbol('messages-square')}<span>Помощь<br>с заказом</span></li>
          </ul>
        </div>
        <section class="partners-contact" aria-labelledby="partners-contact-title">
          <span class="section-index">НАПРЯМУЮ С ЭЛЬТОРГ</span>
          <h2 id="partners-contact-title">Обсудим сотрудничество</h2>
          <p>Расскажите, какие запчасти нужны вашей компании. Обсудим вашу задачу и условия работы.</p>
          <a class="partners-phone" href="tel:+78120894699">+7 (812) 089-46-99</a>
          <span class="partners-contact-label">Отдел запчастей</span>
          <a class="button yellow" href="https://t.me/EltorgJCB" target="_blank" rel="noopener">Связаться в Telegram${symbol('send')}</a>
        </section>
      </div>
    </section>`;

  const footerSections = document.querySelector('[data-footer-sections]') || document.querySelector('.footer a[href$="#about"]')?.parentElement;
  if (footerSections) {
    const partnerLink = document.createElement('a');
    partnerLink.href = standalone ? 'partners-preview.html' : 'index.html#partners';
    partnerLink.textContent = 'Партнёрам';
    footerSections.querySelector('button')?.before(partnerLink);
  }

  document.querySelector('.footer-bottom')?.insertAdjacentHTML('beforeend', `<button type="button" class="partner-footer-entry" data-partner-login>${symbol('user-round')}Войти в кабинет</button>`);
  if (showHeaderEntry) {
    document.body.classList.add('partner-header-preview');
    document.querySelector('.main-header .header-search')?.insertAdjacentHTML('afterend', `<button type="button" class="icon-button partner-header-entry" data-partner-login aria-label="Войти в кабинет" aria-haspopup="dialog" aria-controls="partner-login-dialog" title="Войти в кабинет">${symbol('log-in')}<span class="partner-entry-tooltip" aria-hidden="true">Войти в кабинет</span></button>`);
  }

  document.body.insertAdjacentHTML('beforeend', `
    <dialog id="partner-login-dialog" class="partner-dialog" aria-labelledby="partner-login-title" aria-describedby="partner-login-description">
      <button class="icon-button partner-dialog-close" type="button" data-partner-close aria-label="Закрыть кабинет" title="Закрыть">${symbol('x')}</button>
      <span class="information-icon">${symbol('user-round')}</span>
      <h2 id="partner-login-title">Личный кабинет</h2>
      <p id="partner-login-description">Вход пока недоступен. По вопросам доступа и сотрудничества свяжитесь с отделом запчастей.</p>
      <a class="button yellow" href="tel:+78120894699">+7 (812) 089-46-99${symbol('phone')}</a>
      <a class="text-link" href="https://t.me/EltorgJCB" target="_blank" rel="noopener">Написать в Telegram${symbol('send')}</a>
    </dialog>`);
  const loginDialog = document.querySelector('#partner-login-dialog');

  document.addEventListener('click', event => {
    const entry = event.target.closest('[data-partner-login]');
    if (entry) {
      entryFocus = entry;
      loginDialog.showModal();
      document.body.classList.add('modal-open');
      loginDialog.querySelector('[data-partner-close]').focus({ preventScroll: true });
    }
    if (event.target.closest('[data-partner-close]')) loginDialog.close();

    // Keep the chosen review variant when moving between the two HTML entry points.
    const link = event.target.closest('a[href]');
    if (standalone || entryVariant !== 'header' || !link) return;
    const url = new URL(link.href, location.href);
    const siblingPages = ['index.html', 'pins-bushings-stacked.html'];
    if (url.origin === location.origin && siblingPages.includes(url.pathname.split('/').pop())) {
      url.searchParams.set('partner-entry', 'header');
      link.href = url.href;
    }
  });

  loginDialog.addEventListener('click', event => {
    if (event.target !== loginDialog) return;
    const bounds = loginDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) loginDialog.close();
  });
  loginDialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    if (entryFocus?.isConnected) entryFocus.focus({ preventScroll: true });
  });
  window.addEventListener('hashchange', () => {
    if (loginDialog.open) loginDialog.close();
  });
  window.lucide?.createIcons();
})();
