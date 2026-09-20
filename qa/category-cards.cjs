const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE });
  const errors = [];
  try {
    for (const width of [1440, 1920, 1024, 768, 760, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, isMobile: width <= 760, hasTouch: width <= 760 });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
      await page.goto('http://127.0.0.1:8768/#home');
      await page.evaluate(() => document.fonts.ready);
      const cards = page.locator('.category-card');
      assert.equal(await cards.count(), 12);
      await page.locator('#parts-catalog').scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      await page.waitForTimeout(250);
      if (width === 1440) await page.locator('.category-row').first().screenshot({ path: path.join(__dirname, 'categories-desktop-closed.png') });
      const rowBefore = await page.locator('.category-row').first().boundingBox();
      const nextRowBefore = await page.locator('.category-row').nth(1).boundingBox();
      for (const index of [0, 1, 2, 5, 8, 11]) {
        const card = cards.nth(index);
        const trigger = card.locator('.category-trigger');
        if (width > 760) await trigger.hover();
        else await trigger.tap();
        await page.waitForTimeout(800);
        assert.equal(await trigger.getAttribute('aria-expanded'), 'true', `${width}: card ${index} opens`);
        assert.equal(await card.locator('.category-panel').evaluate(el => el.inert), false);
        assert.equal(await card.locator('.category-links a').count(), 6);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(overflow, false, `${width}: horizontal overflow`);
        const bounds = await card.evaluate(el => {
          const box = selector => { const r = el.querySelector(selector).getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right }; };
          return { heading: box('h3'), links: box('.category-links'), art: box('.category-exploded'), cta: box('.category-catalog-link') };
        });
        assert.ok(bounds.heading.bottom < bounds.links.top, `${width}: heading and links overlap`);
        assert.ok(bounds.art.bottom <= bounds.cta.top + 1, `${width}: art and CTA overlap`);
        if (width <= 760) assert.ok(bounds.links.bottom <= bounds.cta.top, `${width}: links and CTA overlap`);
        if (width === 1440 && index === 0) await card.screenshot({ path: path.join(__dirname, 'categories-desktop-open.png') });
        if (width === 390 && index === 0) await card.screenshot({ path: path.join(__dirname, 'categories-mobile-open.png') });
        if (width === 1440 && index === 0) {
          assert.equal((await page.locator('.category-row').first().boundingBox()).height, rowBefore.height);
          assert.equal((await page.locator('.category-row').nth(1).boundingBox()).y, nextRowBefore.y);
        }
        await card.locator('.category-close').click();
        assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
        await page.mouse.move(0, 0);
        await page.waitForTimeout(600);
      }
      if (width === 1440) {
        const trigger = cards.first().locator('.category-trigger');
        await trigger.focus();
        await page.keyboard.press('Enter');
        await page.waitForTimeout(700);
        await page.keyboard.press('Tab');
        assert.equal(await page.locator(':focus').evaluate(el => el.closest('.category-links') !== null), true);
        await page.keyboard.press('Escape');
        assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
        assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
        await page.mouse.move(0, 0);
        await page.locator('.section-top .text-link').first().focus();
        await trigger.hover();
        await page.waitForTimeout(750);
        await page.mouse.move(0, 0);
        await page.waitForTimeout(800);
        assert.equal(await trigger.getAttribute('aria-expanded'), 'false', 'Pointer leave collapses row');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await trigger.focus();
        await page.keyboard.press('Enter');
        assert.equal(await cards.first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
        await cards.first().locator('.category-catalog-link').click();
        await page.waitForURL('**/#catalog?category=engine');
        assert.equal(await page.locator('.inner-heading h1').textContent(), 'Двигатель');
      }
      console.log(`PASS ${width}px: cards, disclosure, links, layout, overflow`);
      await context.close();
    }
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
