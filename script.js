const watches = [
  {
    id: 1,
    brand: "Rolex",
    name: "Submariner Date",
    description: "Классические дайверские часы, сталь, чёрный циферблат.",
    price: 1_250_000,
    image: "images/1-rolex.svg",
    details: {
      movement: "Автоматический калибр 3235",
      case: "Oystersteel, 41 мм",
      waterResistance: "300 м",
      crystal: "Сапфировое стекло",
      bracelet: "Oyster, трёхзвенный",
      fullText:
        "Submariner Date — эталон дайверских часов. Корпус из нержавеющей стали Oystersteel, однонаправленный безель Cerachrom и надёжный автоматический механизм. Подходит и для дайвинга, и для повседневной носки.",
    },
  },
  {
    id: 2,
    brand: "Omega",
    name: "Speedmaster Moonwatch",
    description: "Хронограф с ручным заводом — легенда космической программы.",
    price: 780_000,
    image: "images/2-omega.svg",
    details: {
      movement: "Ручной завод, калибр 3861",
      case: "Нержавеющая сталь, 42 мм",
      waterResistance: "50 м",
      crystal: "Хезалитовое стекло",
      bracelet: "Стальной браслет",
      fullText:
        "Speedmaster Professional — часы, которые побывали на Луне. Ручной хронограф с хезалитовым стеклом и узнаваемым чёрным циферблатом. Настоящая икона часовой индустрии.",
    },
  },
  {
    id: 3,
    brand: "TAG Heuer",
    name: "Carrera Chronograph",
    description: "Спортивный хронограф для города и трека.",
    price: 420_000,
    image: "images/3-tag.svg",
    details: {
      movement: "Автоматический хронограф Heuer 02",
      case: "Сталь, 44 мм",
      waterResistance: "100 м",
      crystal: "Сапфировое стекло",
      bracelet: "Кожаный ремешок",
      fullText:
        "Carrera Chronograph сочетает мотоспортивное наследие и современный дизайн. Прозрачная задняя крышка, точный хронограф и спортивный силуэт для активного образа жизни.",
    },
  },
  {
    id: 4,
    brand: "Tissot",
    name: "PRX Powermatic 80",
    description: "Интегрированный браслет, сапфир, швейцарский автомат.",
    price: 68_000,
    image: "images/4-tissot.svg",
    details: {
      movement: "Powermatic 80, 80 ч запаса хода",
      case: "Нержавеющая сталь, 40 мм",
      waterResistance: "100 м",
      crystal: "Сапфировое стекло",
      bracelet: "Интегрированный стальной браслет",
      fullText:
        "PRX — стиль 70-х в современном исполнении. Тонкий корпус, интегрированный браслет и автоматический механизм с запасом хода 80 часов. Отличный выбор на каждый день.",
    },
  },
  {
    id: 5,
    brand: "Seiko",
    name: "Prospex Diver",
    description: "Надёжные дайверские часы с отличным соотношением цены и качества.",
    price: 52_000,
    image: "images/5-seiko.svg",
    details: {
      movement: "Автоматический 4R36",
      case: "Сталь, 42.5 мм",
      waterResistance: "200 м",
      crystal: "Hardlex",
      bracelet: "Силиконовый ремешок",
      fullText:
        "Seiko Prospex — проверенные дайверские часы с безелем, люминесцентными метками и надёжным автоматом. Идеальны для плавания, путешествий и повседневной носки.",
    },
  },
  {
    id: 6,
    brand: "Citizen",
    name: "Eco-Drive Titanium",
    description: "Лёгкий титановый корпус, питание от света, без замены батареи.",
    price: 38_500,
    image: "images/6-citizen.svg",
    details: {
      movement: "Eco-Drive (солнечная энергия)",
      case: "Супер-титан, 42 мм",
      waterResistance: "100 м",
      crystal: "Сапфировое стекло",
      bracelet: "Титановый браслет",
      fullText:
        "Citizen Eco-Drive Titanium — лёгкие часы, которые заряжаются от любого источника света. Титановый корпус не вызывает аллергии, не тускнеет и комфортен при длительной носке.",
    },
  },
];

let cart = [];

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function getWatchById(id) {
  return watches.find((w) => w.id === id);
}

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = watches
    .map(
      (watch) => `
        <article class="product-card">
          <div class="product-card__image-wrap">
            <img
              class="product-card__image"
              src="${watch.image}"
              alt="${watch.brand} ${watch.name}"
              loading="lazy"
            >
          </div>
          <div class="product-card__body">
            <p class="product-card__brand">${watch.brand}</p>
            <h3 class="product-card__name">${watch.name}</h3>
            <p class="product-card__desc">${watch.description}</p>
            <div class="product-card__footer">
              <p class="product-card__price">
                ${formatPrice(watch.price)} <span>₽</span>
              </p>
              <div class="product-card__actions">
                <button type="button" class="product-card__btn" data-details="${watch.id}">
                  Подробнее
                </button>
                <button type="button" class="product-card__btn product-card__btn--cart" data-add-cart="${watch.id}">
                  В корзину
                </button>
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function openDetailsModal(watchId) {
  const watch = getWatchById(watchId);
  const modal = document.getElementById("details-modal");
  const content = document.getElementById("modal-content");
  if (!watch || !modal || !content) return;

  const { details } = watch;

  content.innerHTML = `
    <div class="modal__grid">
      <img class="modal__image" src="${watch.image}" alt="${watch.brand} ${watch.name}">
      <div class="modal__info">
        <p class="modal__brand">${watch.brand}</p>
        <h2 class="modal__title" id="modal-title">${watch.name}</h2>
        <p class="modal__price">${formatPrice(watch.price)} ₽</p>
        <p class="modal__text">${details.fullText}</p>
        <ul class="modal__specs">
          <li><span>Механизм</span><strong>${details.movement}</strong></li>
          <li><span>Корпус</span><strong>${details.case}</strong></li>
          <li><span>Водозащита</span><strong>${details.waterResistance}</strong></li>
          <li><span>Стекло</span><strong>${details.crystal}</strong></li>
          <li><span>Браслет</span><strong>${details.bracelet}</strong></li>
        </ul>
        <button type="button" class="btn btn--primary modal__add-btn" data-add-cart="${watch.id}">
          Добавить в корзину
        </button>
      </div>
    </div>
  `;

  modal.classList.add("modal--open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDetailsModal() {
  const modal = document.getElementById("details-modal");
  if (!modal) return;

  modal.classList.remove("modal--open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function addToCart(watchId) {
  const watch = getWatchById(watchId);
  if (!watch) return;

  const existing = cart.find((item) => item.id === watchId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: watch.id, qty: 1 });
  }

  updateCartUI();
  showToast(`${watch.name} добавлен в корзину`);
}

function removeFromCart(watchId) {
  cart = cart.filter((item) => item.id !== watchId);
  updateCartUI();
}

function changeQty(watchId, delta) {
  const item = cart.find((i) => i.id === watchId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(watchId);
  } else {
    updateCartUI();
  }
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const watch = getWatchById(item.id);
    return sum + (watch ? watch.price * item.qty : 0);
  }, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCartItems() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="cart-panel__empty">Корзина пуста. Добавьте часы из каталога.</p>`;
    return;
  }

  container.innerHTML = cart
    .map((item) => {
      const watch = getWatchById(item.id);
      if (!watch) return "";

      return `
        <div class="cart-item">
          <img class="cart-item__image" src="${watch.image}" alt="${watch.name}">
          <div class="cart-item__info">
            <p class="cart-item__brand">${watch.brand}</p>
            <p class="cart-item__name">${watch.name}</p>
            <p class="cart-item__price">${formatPrice(watch.price)} ₽</p>
            <div class="cart-item__controls">
              <button type="button" class="cart-item__qty-btn" data-qty-minus="${watch.id}">−</button>
              <span class="cart-item__qty">${item.qty}</span>
              <button type="button" class="cart-item__qty-btn" data-qty-plus="${watch.id}">+</button>
              <button type="button" class="cart-item__remove" data-remove-cart="${watch.id}">Удалить</button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function updateCartUI() {
  const countEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");

  if (countEl) {
    const count = getCartCount();
    countEl.textContent = count;
    countEl.classList.toggle("cart-btn__badge--hidden", count === 0);
  }

  if (totalEl) {
    totalEl.textContent = `${formatPrice(getCartTotal())} ₽`;
  }

  renderCartItems();
}

function openCart() {
  const panel = document.getElementById("cart-panel");
  if (!panel) return;

  panel.classList.add("cart-panel--open");
  panel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  const panel = document.getElementById("cart-panel");
  if (!panel) return;

  panel.classList.remove("cart-panel--open");
  panel.setAttribute("aria-hidden", "true");

  const modal = document.getElementById("details-modal");
  if (!modal?.classList.contains("modal--open")) {
    document.body.style.overflow = "";
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("toast--visible");

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 2200);
}

function initEventListeners() {
  document.getElementById("products")?.addEventListener("click", (e) => {
    const detailsBtn = e.target.closest("[data-details]");
    const addBtn = e.target.closest("[data-add-cart]");

    if (detailsBtn) {
      openDetailsModal(Number(detailsBtn.dataset.details));
    } else if (addBtn) {
      addToCart(Number(addBtn.dataset.addCart));
    }
  });

  document.getElementById("details-modal")?.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-modal]")) {
      closeDetailsModal();
      return;
    }

    const addBtn = e.target.closest("[data-add-cart]");
    if (addBtn) {
      addToCart(Number(addBtn.dataset.addCart));
    }
  });

  document.getElementById("cart-toggle")?.addEventListener("click", openCart);
  document.getElementById("cart-close")?.addEventListener("click", closeCart);
  document.getElementById("cart-overlay")?.addEventListener("click", closeCart);

  document.getElementById("cart-items")?.addEventListener("click", (e) => {
    const minus = e.target.closest("[data-qty-minus]");
    const plus = e.target.closest("[data-qty-plus]");
    const remove = e.target.closest("[data-remove-cart]");

    if (minus) changeQty(Number(minus.dataset.qtyMinus), -1);
    else if (plus) changeQty(Number(plus.dataset.qtyPlus), 1);
    else if (remove) removeFromCart(Number(remove.dataset.removeCart));
  });

  document.getElementById("cart-checkout")?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Корзина пуста");
      return;
    }
    showToast("Заказ оформлен! Мы свяжемся с вами.");
    cart = [];
    updateCartUI();
    closeCart();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDetailsModal();
      closeCart();
    }
  });
}

function updateMskTime() {
  const timeEl = document.getElementById("msk-time");
  if (!timeEl) return;

  const msk = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

  timeEl.textContent = msk;
}

function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("header--scrolled", window.scrollY > 20);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

renderProducts();
updateCartUI();
initEventListeners();
updateMskTime();
setInterval(updateMskTime, 1000);
initHeaderScroll();
