(function () {
  const data = window.TECHNOVA_DATA;
  if (!data) return;

  const PRODUCTS = data.products;
  const CATEGORIES = data.categories;
  const deviceArt = data.deviceArt;

  const FREE_DELIVERY = 15000;
  const DELIVERY_PRICE = 490;
  const MAX_QTY = 9;
  const CART_KEY = 'technova_cart_v2';
  const FAVORITES_KEY = 'technova_favorites_v2';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const money = new Intl.NumberFormat('ru-RU');
  const fmt = (value) => `${money.format(value)} ₽`;

  const heartIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3 4.4 13a5 5 0 0 1 7.1-7.1l.5.5.5-.5A5 5 0 0 1 19.6 13Z"/></svg>';
  const plusIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  const arrowIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function plural(n, forms) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return forms[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
    return forms[2];
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));
  }

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (error) {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      /* localStorage may be unavailable — the site still works for the session */
    }
  }

  const productById = (id) => PRODUCTS.find((product) => product.id === id);

  const productPhotos = (product) =>
    Array.isArray(product.photos) && product.photos.length > 0
      ? product.photos
      : product.photo
        ? [product.photo]
        : [];

  let cart = loadJSON(CART_KEY, []);
  if (!Array.isArray(cart)) cart = [];
  cart = cart
    .filter((item) => item && productById(item.id) && Number.isFinite(Number(item.qty)) && Number(item.qty) > 0)
    .map((item) => ({ id: item.id, qty: Math.min(MAX_QTY, Math.floor(Number(item.qty))) }));

  let favorites = new Set(loadJSON(FAVORITES_KEY, []));
  if (!(favorites instanceof Set)) favorites = new Set();
  favorites = new Set(Array.from(favorites).filter((id) => productById(id)));

  const state = {
    filter: 'Все',
    query: '',
    sort: 'popular',
    expanded: false,
    modalProduct: null,
    modalQty: 1,
    modalPhoto: 0
  };

  const els = {
    header: $('#header'),
    menuToggle: $('.menu-toggle'),
    mobileMenu: $('#mobile-menu'),
    grid: $('#product-grid'),
    chips: $('#filter-chips'),
    results: $('#results-count'),
    empty: $('#catalog-empty'),
    showMore: $('#show-more'),
    searchInput: $('#search-input'),
    searchClear: $('.search-clear'),
    sortSelect: $('#sort-select'),
    cartTrigger: $('.cart-trigger'),
    cartCount: $('#cart-count'),
    favoritesCount: $('#favorites-count'),
    cartDrawer: $('#cart-drawer'),
    cartScrim: $('#cart-scrim'),
    cartTitleCount: $('#cart-title-count'),
    cartItems: $('#cart-items'),
    cartEmpty: $('#cart-empty'),
    cartFoot: $('#cart-foot'),
    cartShipping: $('#cart-shipping'),
    cartShippingText: $('#cart-shipping-text'),
    cartProgress: $('#cart-progress'),
    cartSubtotal: $('#cart-subtotal'),
    cartDelivery: $('#cart-delivery'),
    cartTotal: $('#cart-total'),
    productModal: $('#product-modal'),
    pmMedia: $('#pm-media'),
    pmThumbs: $('#pm-thumbs'),
    pmCategory: $('#pm-category'),
    pmTitle: $('#pm-title'),
    pmRating: $('#pm-rating'),
    pmReviews: $('#pm-reviews'),
    pmDescription: $('#pm-description'),
    pmHighlights: $('#pm-highlights'),
    pmSpecs: $('#pm-specs'),
    pmPrice: $('#pm-price'),
    pmOldPrice: $('#pm-old-price'),
    pmQty: $('#pm-qty'),
    pmAdd: $('#pm-add'),
    checkoutModal: $('#checkout-modal'),
    checkoutFormView: $('#checkout-form-view'),
    checkoutSuccess: $('#checkout-success'),
    checkoutForm: $('#checkout-form'),
    checkoutItems: $('#checkout-items'),
    checkoutSubtotal: $('#checkout-subtotal'),
    checkoutDelivery: $('#checkout-delivery'),
    checkoutTotal: $('#checkout-total'),
    creditsModal: $('#credits-modal'),
    newsletterForm: $('#newsletter-form'),
    newsletterEmail: $('#newsletter-email'),
    newsletterError: $('#newsletter-error'),
    newsletterSuccess: $('#newsletter-success'),
    toast: $('#toast')
  };

  let toastTimer = null;
  let checkoutInProgress = false;
  let lastFocused = null;

  function showToast(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      els.toast.classList.remove('is-visible');
    }, 2800);
  }

  function syncScrollLock() {
    const hasOpenLayer =
      els.mobileMenu.classList.contains('is-open') ||
      els.cartDrawer.classList.contains('is-open') ||
      els.productModal.classList.contains('is-open') ||
      els.checkoutModal.classList.contains('is-open') ||
      els.creditsModal.classList.contains('is-open');
    document.body.classList.toggle('no-scroll', hasOpenLayer);
  }

  function rememberFocus() {
    if (!lastFocused) lastFocused = document.activeElement;
  }

  function restoreFocus() {
    if (lastFocused && document.contains(lastFocused)) {
      try { lastFocused.focus({ preventScroll: true }); } catch (error) { /* noop */ }
    }
    lastFocused = null;
  }

  function scrollToCatalog() {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;
    catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function mediaTemplate(product, size, index = 0, content = '') {
    const photos = productPhotos(product);
    if (photos.length) {
      const url = photos[Math.min(Math.max(0, Math.floor(index || 0)), photos.length - 1)];
      const style = `background-image: url('${url}'); background-color: #000; background-size: cover; background-position: center;`;
      return `<div class="${size}" style="${style}" data-photo="${product.id}" aria-hidden="true">${content}</div>`;
    }
    const style = `--art-bg:${product.art.bg};--art-ink:${product.art.ink};--art-accent:${product.art.accent}`;
    const artClass = size === 'product-modal__media' ? 'product-modal__art' : size === 'cart-item__media' ? 'cart-item__art' : 'product-card__art';
    return `<div class="${size}" style="${style}"><div class="${artClass}" role="img" aria-label="${product.name}">${deviceArt(product.art.type)}</div></div>`;
  }

  /* ---------- CATALOG ---------- */
  function renderCategoryCounts() {
    $$('[data-category-count]').forEach((element) => {
      const category = element.dataset.categoryCount;
      const count = PRODUCTS.filter((product) => product.category === category).length;
      element.textContent = `${count} ${plural(count, ['модель', 'модели', 'моделей'])}`;
    });
  }

  function renderChips() {
    const all = ['Все', ...CATEGORIES.slice(1), 'Избранное'];
    els.chips.innerHTML = all.map((category) => {
      let count = PRODUCTS.length;
      if (category === 'Избранное') count = favorites.size;
      else if (category !== 'Все') count = PRODUCTS.filter((product) => product.category === category).length;
      const active = state.filter === category;
      return `
        <button class="chip${active ? ' is-active' : ''}" type="button" data-action="set-filter" data-category="${category}" aria-pressed="${active}">
          ${category === 'Избранное' ? heartIcon : ''}
          <span>${category}</span>
          <span class="chip__num">${count}</span>
        </button>`;
    }).join('');
  }

  function getFilteredProducts() {
    const query = state.query.trim().toLowerCase();
    const filtered = PRODUCTS.filter((product) => {
      if (state.filter === 'Избранное') {
        if (!favorites.has(product.id)) return false;
      } else if (state.filter !== 'Все' && product.category !== state.filter) {
        return false;
      }
      if (!query) return true;
      const haystack = `${product.name} ${product.brand} ${product.category} ${product.tagline} ${product.description}`.toLowerCase();
      return haystack.includes(query);
    });

    switch (state.sort) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      default:
        return filtered.sort((a, b) => b.popularity - a.popularity);
    }
  }

  function productCard(product, index) {
    const inFavorites = favorites.has(product.id);
    const media = mediaTemplate(product, 'product-card__media', 0);

    return `
      <article class="product-card" style="--i:${index}" data-card-id="${product.id}">
        ${media}
        ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
        <button class="heart-btn${inFavorites ? ' is-active' : ''}" type="button" data-action="toggle-favorite" data-id="${product.id}" aria-label="${inFavorites ? 'Убрать из избранного' : 'Добавить в избранное'}: ${product.name}" aria-pressed="${inFavorites}">
          ${heartIcon}
        </button>
        <div class="product-card__body">

          <p class="product-card__meta"><span>${product.brand}</span><span class="rating">★ ${product.rating.toFixed(1)}</span></p>
          <h3>${product.name}</h3>
          <p class="product-card__tagline">${product.tagline}</p>
          <div class="product-card__bottom">
            <p class="price"><strong>${fmt(product.price)}</strong>${product.oldPrice ? `<s>${fmt(product.oldPrice)}</s>` : ''}</p>
            <button class="add-btn" type="button" data-action="add-to-cart" data-id="${product.id}" aria-label="Добавить ${product.name} в корзину">
              ${plusIcon}
            </button>
          </div>
        </div>
        <button class="product-card__hit" type="button" data-action="open-product" data-id="${product.id}" aria-label="Открыть карточку ${product.name}"></button>
      </article>`;
  }

  function renderEmpty() {
    const isFavorites = state.filter === 'Избранное';
    const query = state.query.trim();
    let title = 'Ничего не нашли';
    let text = 'Попробуйте изменить фильтр или сбросить настройки.';

    if (isFavorites && favorites.size === 0) {
      title = 'В избранном пока пусто';
      text = 'Нажимайте на сердечко в карточке товара — всё, что понравилось, появится здесь.';
    } else if (query) {
      title = 'Ничего не нашли';
      text = `По запросу «${escapeHtml(query)}» ничего нет. Попробуйте другое слово или сбросьте фильтры.`;
    }

    els.empty.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>
      <h3>${title}</h3>
      <p>${text}</p>
      <button class="btn btn--dark" type="button" data-action="reset-filters">Сбросить фильтры</button>`;
  }

  function renderProducts() {
    const filtered = getFilteredProducts();
    const isBaseView = state.filter === 'Все' && !state.query.trim();
    const displayed = isBaseView && !state.expanded ? filtered.slice(0, 9) : filtered;

    els.grid.innerHTML = displayed.map(productCard).join('');
    els.empty.hidden = filtered.length !== 0;
    if (filtered.length === 0) renderEmpty();

    els.results.textContent = `${filtered.length} ${plural(filtered.length, ['товар', 'товара', 'товаров'])}`;
    els.showMore.hidden = !(isBaseView && filtered.length > 9);
    els.showMore.textContent = state.expanded ? 'Свернуть' : `Показать все ${filtered.length}`;
  }

  function renderFavoritesCount() {
    els.favoritesCount.textContent = String(favorites.size);
  }

  function setFilter(category, options = {}) {
    state.filter = category;
    state.expanded = false;
    if (options.clearQuery) {
      state.query = '';
      els.searchInput.value = '';
      updateSearchClear();
    }
    renderChips();
    renderProducts();
    if (options.scroll) scrollToCatalog();
  }

  function updateSearchClear() {
    els.searchClear.hidden = !state.query;
  }

  /* ---------- CART ---------- */
  function getCartLines() {
    return cart
      .map((item) => {
        const product = productById(item.id);
        return product ? { ...product, qty: item.qty } : null;
      })
      .filter(Boolean);
  }

  function getTotals() {
    const lines = getCartLines();
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY ? 0 : DELIVERY_PRICE;
    return { lines, subtotal, count, delivery, total: subtotal + delivery };
  }

  function persistCart() {
    saveJSON(CART_KEY, cart);
  }

  function renderCart() {
    const totals = getTotals();
    els.cartCount.textContent = String(totals.count);
    els.cartTitleCount.textContent = String(totals.count);
    els.cartDrawer.classList.toggle('has-items', totals.lines.length > 0);

    if (totals.lines.length === 0) {
      els.cartItems.innerHTML = '';
      return;
    }

    els.cartItems.innerHTML = totals.lines.map((line) => {
      const media = mediaTemplate(line, 'cart-item__media', 0);
      return `
        <article class="cart-item" data-id="${line.id}">
          ${media}
          <div class="cart-item__info">
            <p class="cart-item__brand">${line.brand} · ${line.category}</p>
            <h3>${line.name}</h3>
            <p class="cart-item__price">${fmt(line.price)}</p>
            <div class="cart-item__controls">
              <div class="qty qty--small" role="group" aria-label="Количество: ${line.name}">
                <button type="button" data-action="cart-minus" data-id="${line.id}" aria-label="Уменьшить количество">−</button>
                <span>${line.qty}</span>
                <button type="button" data-action="cart-plus" data-id="${line.id}" aria-label="Увеличить количество">+</button>
              </div>
              <button class="cart-item__remove" type="button" data-action="remove-cart" data-id="${line.id}">Убрать</button>
            </div>
          </div>
          <p class="cart-item__sum">${fmt(line.price * line.qty)}</p>
        </article>`;
    }).join('');

    const remaining = Math.max(0, FREE_DELIVERY - totals.subtotal);
    if (remaining > 0) {
      els.cartShippingText.innerHTML = `До бесплатной доставки — <strong>${fmt(remaining)}</strong>`;
      els.cartProgress.style.width = `${Math.min(100, (totals.subtotal / FREE_DELIVERY) * 100)}%`;
    } else {
      els.cartShippingText.innerHTML = 'Бесплатная доставка <strong>включена</strong>';
      els.cartProgress.style.width = '100%';
    }

    els.cartSubtotal.textContent = fmt(totals.subtotal);
    els.cartDelivery.textContent = totals.delivery === 0 ? 'Бесплатно' : fmt(totals.delivery);
    els.cartTotal.textContent = fmt(totals.total);
  }

  function addToCart(id, qty = 1) {
    const product = productById(id);
    if (!product) return;
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.qty = Math.min(MAX_QTY, existing.qty + qty);
    } else {
      cart.push({ id, qty: Math.min(MAX_QTY, qty) });
    }
    persistCart();
    renderCart();
    bumpCart();
    showToast(`${product.name} — в корзине`);
  }

  function changeCartQty(id, delta) {
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;
    const product = productById(id);
    item.qty += delta;
    if (item.qty > MAX_QTY) {
      item.qty = MAX_QTY;
      showToast(`Максимум ${MAX_QTY} штук в одном заказе`);
    }
    if (item.qty < 1) {
      cart = cart.filter((entry) => entry.id !== id);
      if (product) showToast(`${product.name} — удалено из корзины`);
    }
    persistCart();
    renderCart();
  }

  function removeFromCart(id) {
    const product = productById(id);
    cart = cart.filter((entry) => entry.id !== id);
    persistCart();
    renderCart();
    if (product) showToast(`${product.name} — удалено из корзины`);
  }

  function bumpCart() {
    els.cartTrigger.classList.remove('is-bumped');
    void els.cartTrigger.offsetWidth;
    els.cartTrigger.classList.add('is-bumped');
  }

  function toggleFavorite(id) {
    const product = productById(id);
    if (!product) return;
    if (favorites.has(id)) {
      favorites.delete(id);
      showToast(`${product.name} — убрано из избранного`);
    } else {
      favorites.add(id);
      showToast(`${product.name} — в избранном`);
    }
    saveJSON(FAVORITES_KEY, Array.from(favorites));
    renderFavoritesCount();
    renderChips();
    renderProducts();
  }

  /* ---------- OVERLAYS ---------- */
  function openCart() {
    rememberFocus();
    renderCart();
    els.cartScrim.classList.add('is-open');
    els.cartDrawer.classList.add('is-open');
    els.cartDrawer.setAttribute('aria-hidden', 'false');
    syncScrollLock();
    const closeButton = els.cartDrawer.querySelector('.cart-drawer__head .icon-btn');
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function closeCart(restore = true) {
    els.cartScrim.classList.remove('is-open');
    els.cartDrawer.classList.remove('is-open');
    els.cartDrawer.setAttribute('aria-hidden', 'true');
    syncScrollLock();
    if (restore) restoreFocus();
  }

  function renderProductMedia(product) {
    const photos = productPhotos(product);
    if (photos.length) {
      const url = photos[Math.min(Math.max(0, state.modalPhoto || 0), photos.length - 1)];
      els.pmMedia.setAttribute('data-photo', product.id);
      els.pmMedia.style.cssText = '';
      els.pmMedia.style.setProperty('background-image', `url('${url}')`);
      els.pmMedia.style.setProperty('background-color', '#000');
      els.pmMedia.style.setProperty('background-size', 'cover');
      els.pmMedia.style.setProperty('background-position', 'center');
      els.pmMedia.setAttribute('role', 'img');
      els.pmMedia.setAttribute('aria-label', `${product.name} — фотография ${(state.modalPhoto || 0) + 1} из ${photos.length}`);
      els.pmMedia.innerHTML = `<span class="product-modal__tag">${product.category}</span>`;
      return;
    }

    els.pmMedia.removeAttribute('data-photo');
    els.pmMedia.style.cssText = '';
    els.pmMedia.style.setProperty('--art-bg', product.art.bg);
    els.pmMedia.style.setProperty('--art-ink', product.art.ink);
    els.pmMedia.style.setProperty('--art-accent', product.art.accent);
    els.pmMedia.setAttribute('role', 'img');
    els.pmMedia.setAttribute('aria-label', `${product.name} — изображение товара`);
    els.pmMedia.innerHTML = `<span class="product-modal__tag">${product.category}</span><div class="product-modal__art" aria-hidden="true">${deviceArt(product.art.type)}</div>`;
  }

  function renderProductThumbs(product) {
    const wrap = els.pmThumbs;
    const photos = productPhotos(product);
    if (!wrap || photos.length === 0) {
      return;
    }
    const active = state.modalPhoto || 0;
    let thumbs = '';
    for (let index = 0; index < photos.length; index += 1) {
      const photo = photos[index];
      const isActive = index === active;
      thumbs += `<button class="product-modal__thumb${isActive ? ' is-active' : ''}" type="button" data-action="set-photo" data-index="${index}" role="tab" aria-selected="${isActive}" aria-label="Фотография ${index + 1}: ${product.name}"><img src="${photo}" alt="" loading="lazy" /></button>`;
    }
    wrap.innerHTML = thumbs;
  }

  function setProductPhoto(index) {
    if (!state.modalProduct) return;
    const photos = productPhotos(state.modalProduct);
    if (!photos.length) return;
    state.modalPhoto = Math.min(Math.max(0, Number(index) || 0), photos.length - 1);
    renderProductMedia(state.modalProduct);
    if (els.pmThumbs) {
      $$('.product-modal__thumb').forEach((button) => {
        const isActive = Number(button.dataset.index) === state.modalPhoto;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-selected', String(isActive));
      });
    }
  }

  function openProduct(id) {
    const product = productById(id);
    if (!product) return;
    rememberFocus();
    state.modalProduct = product;
    state.modalQty = 1;
    els.pmCategory.textContent = `${product.brand} · ${product.category}`;
    els.pmTitle.textContent = product.name;
    els.pmRating.textContent = product.rating.toFixed(1);
    els.pmReviews.textContent = `${product.reviews} ${plural(product.reviews, ['отзыв', 'отзыва', 'отзывов'])}`;
    els.pmDescription.textContent = product.description;
    els.pmHighlights.innerHTML = product.highlights.map((item) => `<span>${item}</span>`).join('');
    els.pmSpecs.innerHTML = product.specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
    els.pmPrice.textContent = fmt(product.price);
    els.pmOldPrice.textContent = product.oldPrice ? fmt(product.oldPrice) : '';
    els.pmOldPrice.hidden = !product.oldPrice;
    els.pmQty.textContent = '1';

    renderProductMedia(product);
    state.modalPhoto = 0;
    renderProductThumbs(product);

    els.productModal.classList.add('is-open');
    els.productModal.setAttribute('aria-hidden', 'false');
    syncScrollLock();
    const closeButton = els.productModal.querySelector('.modal__close');
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function closeProduct() {
    els.productModal.classList.remove('is-open');
    els.productModal.setAttribute('aria-hidden', 'true');
    state.modalProduct = null;
    syncScrollLock();
    restoreFocus();
  }

  function openCheckout() {
    if (getTotals().lines.length === 0) {
      showToast('Корзина пуста');
      return;
    }
    rememberFocus();
    checkoutInProgress = true;
    els.checkoutFormView.hidden = false;
    els.checkoutSuccess.hidden = true;
    fillCheckoutSummary();
    els.checkoutModal.classList.add('is-open');
    els.checkoutModal.setAttribute('aria-hidden', 'false');
    syncScrollLock();
    const closeButton = els.checkoutModal.querySelector('.modal__close');
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function closeCheckout(restore = true) {
    els.checkoutModal.classList.remove('is-open');
    els.checkoutModal.setAttribute('aria-hidden', 'true');
    checkoutInProgress = false;
    syncScrollLock();
    if (restore) restoreFocus();
  }

  function openCredits() {
    rememberFocus();
    els.creditsModal.classList.add('is-open');
    els.creditsModal.setAttribute('aria-hidden', 'false');
    syncScrollLock();
    const closeButton = els.creditsModal.querySelector('.modal__close');
    if (closeButton) closeButton.focus({ preventScroll: true });
  }

  function closeCredits() {
    els.creditsModal.classList.remove('is-open');
    els.creditsModal.setAttribute('aria-hidden', 'true');
    syncScrollLock();
    restoreFocus();
  }

  function toggleMenu(force) {
    const isOpen = typeof force === 'boolean' ? force : !els.mobileMenu.classList.contains('is-open');
    els.mobileMenu.classList.toggle('is-open', isOpen);
    els.mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    els.menuToggle.classList.toggle('is-open', isOpen);
    els.menuToggle.setAttribute('aria-expanded', String(isOpen));
    els.menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    if (isOpen) rememberFocus();
    syncScrollLock();
  }

  function closeTopLayer() {
    if (els.checkoutModal.classList.contains('is-open')) return closeCheckout();
    if (els.productModal.classList.contains('is-open')) return closeProduct();
    if (els.creditsModal.classList.contains('is-open')) return closeCredits();
    if (els.cartDrawer.classList.contains('is-open')) return closeCart();
    if (els.mobileMenu.classList.contains('is-open')) return toggleMenu(false);
  }

  function activeDialog() {
    if (els.checkoutModal.classList.contains('is-open')) return els.checkoutModal.querySelector('.modal__panel');
    if (els.productModal.classList.contains('is-open')) return els.productModal.querySelector('.modal__panel');
    if (els.creditsModal.classList.contains('is-open')) return els.creditsModal.querySelector('.modal__panel');
    if (els.cartDrawer.classList.contains('is-open')) return els.cartDrawer;
    if (els.mobileMenu.classList.contains('is-open')) return els.mobileMenu;
    return null;
  }

  function trapFocus(event) {
    const dialog = activeDialog();
    if (!dialog) return;
    const focusable = $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', dialog)
      .filter((element) => element.getClientRects().length > 0);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ---------- CHECKOUT ---------- */
  function fillCheckoutSummary() {
    const totals = getTotals();
    els.checkoutItems.innerHTML = totals.lines.map((line) => `
      <div class="checkout__item">
        <span><b>${line.name}</b> × ${line.qty}</span>
        <span>${fmt(line.price * line.qty)}</span>
      </div>`).join('');
    els.checkoutSubtotal.textContent = fmt(totals.subtotal);
    els.checkoutDelivery.textContent = totals.delivery === 0 ? 'Бесплатно' : fmt(totals.delivery);
    els.checkoutTotal.textContent = fmt(totals.total);
  }

  function validationError(name, value) {
    const trimmed = value.trim();
    switch (name) {
      case 'name':
        return trimmed.length < 2 ? 'Укажите имя и фамилию' : '';
      case 'phone': {
        const digits = trimmed.replace(/\D/g, '');
        return digits.length < 10 || digits.length > 15 ? 'Введите телефон полностью' : '';
      }
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed) ? '' : 'Проверьте адрес почты';
      case 'city':
        return trimmed.length < 2 ? 'Укажите город' : '';
      case 'address':
        return trimmed.length < 5 ? 'Укажите улицу, дом и квартиру' : '';
      default:
        return '';
    }
  }

  function validateCheckout() {
    let firstInvalid = null;
    $$('.field input', els.checkoutForm).forEach((input) => {
      const field = input.closest('.field');
      const errorElement = field.querySelector('.field__error');
      const message = validationError(input.name, input.value);
      field.classList.toggle('is-invalid', Boolean(message));
      input.setAttribute('aria-invalid', String(Boolean(message)));
      if (errorElement) errorElement.textContent = message;
      if (message && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      firstInvalid.focus({ preventScroll: false });
      showToast('Проверьте выделенные поля');
      return false;
    }
    return true;
  }

  function submitCheckout(event) {
    event.preventDefault();
    if (!validateCheckout()) return;
    const totals = getTotals();
    if (totals.lines.length === 0) {
      closeCheckout();
      showToast('Корзина пуста');
      return;
    }

    const paymentInput = els.checkoutForm.querySelector('input[name="payment"]:checked');
    const paymentLabel = paymentInput && paymentInput.value === 'cash' ? 'При получении' : 'Картой онлайн';
    const email = els.checkoutForm.elements.email.value.trim();
    const orderNumber = `TN-${Math.floor(100000 + Math.random() * 900000)}`;

    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('order-email').textContent = email;
    document.getElementById('success-total').textContent = fmt(totals.total);
    document.getElementById('success-payment').textContent = paymentLabel;

    cart = [];
    persistCart();
    renderCart();

    els.checkoutForm.reset();
    els.checkoutFormView.hidden = true;
    els.checkoutSuccess.hidden = false;
    checkoutInProgress = false;
    els.checkoutModal.querySelector('.modal__panel').scrollTop = 0;
    showToast(`Заказ ${orderNumber} принят — спасибо!`);
  }

  /* ---------- EVENTS ---------- */
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action]');
    if (!trigger) return;
    const action = trigger.dataset.action;
    const id = trigger.dataset.id;

    switch (action) {
      case 'open-product':
        openProduct(id);
        break;
      case 'add-to-cart':
        addToCart(id);
        break;
      case 'toggle-favorite':
        toggleFavorite(id);
        break;
      case 'set-filter':
        setFilter(trigger.dataset.category);
        break;
      case 'filter-category':
        setFilter(trigger.dataset.category, { clearQuery: true, scroll: true });
        break;
      case 'show-favorites':
        setFilter('Избранное', { clearQuery: true, scroll: true });
        break;
      case 'reset-filters':
        state.sort = 'popular';
        els.sortSelect.value = 'popular';
        setFilter('Все', { clearQuery: true });
        break;
      case 'show-more':
        state.expanded = !state.expanded;
        renderProducts();
        break;
      case 'clear-search':
        state.query = '';
        els.searchInput.value = '';
        updateSearchClear();
        renderProducts();
        els.searchInput.focus();
        break;
      case 'focus-search':
        els.searchInput.focus({ preventScroll: true });
        scrollToCatalog();
        break;
      case 'open-cart':
        openCart();
        break;
      case 'close-cart':
        closeCart();
        break;
      case 'checkout':
        closeCart(false);
        openCheckout();
        break;
      case 'go-catalog':
        closeCart(false);
        scrollToCatalog();
        break;
      case 'cart-plus':
        changeCartQty(id, 1);
        break;
      case 'cart-minus':
        changeCartQty(id, -1);
        break;
      case 'remove-cart':
        removeFromCart(id);
        break;
      case 'modal-qty-plus':
        state.modalQty = Math.min(MAX_QTY, state.modalQty + 1);
        els.pmQty.textContent = String(state.modalQty);
        break;
      case 'modal-qty-minus':
        state.modalQty = Math.max(1, state.modalQty - 1);
        els.pmQty.textContent = String(state.modalQty);
        break;
      case 'modal-add': {
        if (!state.modalProduct) break;
        const product = state.modalProduct;
        const qty = state.modalQty;
        closeProduct();
        addToCart(product.id, qty);
        openCart();
        break;
      }
      case 'close-product':
        closeProduct();
        break;
      case 'set-photo':
        setProductPhoto(Number(trigger.dataset.index));
        break;
      case 'close-checkout':
        closeCheckout();
        break;
      case 'close-checkout-success':
        closeCheckout(false);
        scrollToCatalog();
        break;
      case 'open-credits':
        openCredits();
        break;
      case 'close-credits':
        closeCredits();
        break;
      default:
        break;
    }
  });

  els.menuToggle.addEventListener('click', () => toggleMenu());
  $$('.mobile-menu__nav a').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  els.searchInput.addEventListener('input', (event) => {
    state.query = event.target.value;
    state.expanded = false;
    updateSearchClear();
    renderProducts();
  });

  els.sortSelect.addEventListener('change', (event) => {
    state.sort = event.target.value;
    state.expanded = false;
    renderProducts();
  });

  els.checkoutForm.addEventListener('submit', submitCheckout);

  els.checkoutForm.addEventListener('input', (event) => {
    const input = event.target.closest('input');
    if (!input) return;
    const field = input.closest('.field');
    if (field && field.classList.contains('is-invalid')) {
      field.classList.remove('is-invalid');
      input.setAttribute('aria-invalid', 'false');
    }
  });

  els.newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = els.newsletterEmail.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    els.newsletterError.hidden = isValid;
    if (!isValid) {
      els.newsletterEmail.focus();
      return;
    }
    els.newsletterForm.hidden = true;
    els.newsletterSuccess.hidden = false;
    showToast('Готово — вы подписаны на письма');
  });

  els.newsletterEmail.addEventListener('input', () => {
    if (!els.newsletterError.hidden) els.newsletterError.hidden = true;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const hasLayer = activeDialog();
      if (hasLayer) {
        event.preventDefault();
        closeTopLayer();
      }
      return;
    }
    if (event.key === 'Tab') trapFocus(event);
  });

  window.addEventListener('scroll', () => {
    els.header.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });

  window.addEventListener('storage', (event) => {
    if (event.key === CART_KEY) {
      const saved = loadJSON(CART_KEY, []);
      if (Array.isArray(saved)) {
        cart = saved.filter((item) => item && productById(item.id)).map((item) => ({ id: item.id, qty: Math.min(MAX_QTY, Math.max(1, Number(item.qty) || 1)) }));
        renderCart();
      }
    }
    if (event.key === FAVORITES_KEY) {
      const saved = loadJSON(FAVORITES_KEY, []);
      if (Array.isArray(saved)) {
        favorites = new Set(saved.filter((id) => productById(id)));
        renderFavoritesCount();
        renderChips();
        renderProducts();
      }
    }
  });

  /* ---------- 3D TILT ---------- */
  function initTilt() {
    const finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;
    const selectors = '.product-card__media, .hero-card__media, .product-modal__media';
    const reset = (media) => {
      media.style.setProperty('--rx', '0deg');
      media.style.setProperty('--ry', '0deg');
    };
    const handle = (event) => {
      const target = event.target;
      if (!target || typeof target.closest !== 'function') return;
      const media = target.closest(selectors);
      if (!media) return;
      const rect = media.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      media.style.setProperty('--rx', `${(-py * 9).toFixed(2)}deg`);
      media.style.setProperty('--ry', `${(px * 12).toFixed(2)}deg`);
    };
    const clear = (event) => {
      const target = event.target;
      if (!target || typeof target.closest !== 'function') return;
      const media = target.closest(selectors);
      if (media) reset(media);
    };
    document.addEventListener('pointermove', handle, { passive: true });
    document.addEventListener('pointerout', clear, { passive: true });
  }

  /* ---------- REVEAL ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    items.forEach((item) => observer.observe(item));
  }

  /* ---------- INIT ---------- */
  renderCategoryCounts();
  renderFavoritesCount();
  renderChips();
  renderProducts();
  renderCart();
  updateSearchClear();
  initReveal();
  initTilt();
  els.header.classList.toggle('is-scrolled', window.scrollY > 8);

  // Keep checkout helper state referenced for clarity in dev tools.
  window.TECHNOVA = { state, addToCart, toggleFavorite, openProduct, openCart, openCheckout };
})();
