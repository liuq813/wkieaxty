/* ========================================
   電動工具の匠 — App
   Products, Cart, Filters, Modals
   ======================================== */

// ======== Data ========
const PRODUCTS_DEFAULT = [

  {
    id: 1,
    name: 'コードレスインパクトドライバー',
    nameEn: 'ID-1800PRO',
    category: 'drill',
    catLabel: '電動ドリル',
    emoji: '🔧',
    price: 12800,
    badge: '人気No.1',
    desc: '18Vリチウムイオンバッテリー搭載。最大トルク180N·mで、あらゆるネジ締め作業に対応。',
    specs: { '電圧': '18V', '最大トルク': '180N·m', 'バッテリー': 'リチウムイオン 4.0Ah', '重量': '1.5kg', '付属品': 'バッテリー×2、充電器、ケース' }
  },
  {
    id: 2,
    name: '電動ドリルセット',
    nameEn: 'DR-700Pro',
    category: 'drill',
    catLabel: '電動ドリル',
    emoji: '🛠️',
    price: 9800,
    badge: 'おすすめ',
    desc: '31点のビットセット付き。DIYからプロの現場まで幅広く活躍する一台。',
    specs: { '電圧': '12V', 'チャック': '1.5-13mm キーレス', '回転数': '0-1500rpm', '重量': '1.2kg', '付属品': '31点ビットセット、ケース' }
  },
  {
    id: 3,
    name: 'アングルグラインダー',
    nameEn: 'AG-125PRO',
    category: 'grinder',
    catLabel: 'グラインダー',
    emoji: '⚙️',
    price: 6800,
    badge: null,
    desc: '125mmディスク対応。スリムグリップで長時間作業でも疲れにくい。',
    specs: { 'ディスク径': '125mm', '回転数': '11000rpm', '出力': '800W', '重量': '1.9kg', '特徴': 'スリムグリップ、スピンドルロック' }
  },
  {
    id: 4,
    name: '電動丸ノコ',
    nameEn: 'CS-185PRO',
    category: 'saw',
    catLabel: '切断機',
    emoji: '🔪',
    price: 14200,
    badge: '新発売',
    desc: '165mmブレード搭載。レーザーガイドラインで正確な切断を実現。',
    specs: { 'ブレード径': '165mm', '切断深さ': '0-55mm', '回転数': '5000rpm', '出力': '1200W', '重量': '3.8kg' }
  },
  {
    id: 5,
    name: '電動ジグソー',
    nameEn: 'JS-65PRO',
    category: 'saw',
    catLabel: '切断機',
    emoji: '🪚',
    price: 7600,
    badge: null,
    desc: '無段変速トリガー搭載。曲線切りもスムーズな高精度ジグソー。',
    specs: { '切断能力(木)': '65mm', '切断能力(鋼)': '6mm', '回転数': '500-3100rpm', '出力': '600W', '重量': '2.1kg' }
  },
  {
    id: 6,
    name: 'オービタルサンダー',
    nameEn: 'OS-125PRO',
    category: 'sander',
    catLabel: 'サンダー',
    emoji: '✨',
    price: 5900,
    badge: null,
    desc: '125mmペーパー対応。防振設計で長時間作業でも快適。',
    specs: { 'ペーパーサイズ': '125mm', '軌道径': '2.5mm', '回転数': '6000-12000rpm', '出力': '250W', '重量': '1.3kg' }
  },
  {
    id: 7,
    name: 'エアコンプレッサー',
    nameEn: 'AC-24PRO',
    category: 'outdoor',
    catLabel: 'アウトドア',
    emoji: '💨',
    price: 22400,
    badge: '送料無料',
    desc: '24Lタンク搭載の静音設計。タイヤ充填からエアツールまで幅広く使用可能。',
    specs: { 'タンク容量': '24L', '吐出圧力': '0.8MPa', '吐出量': '180L/min', '騒音値': '58dB', '重量': '18kg' }
  },
  {
    id: 8,
    name: '充電式草刈り機',
    nameEn: 'BC-36PRO',
    category: 'outdoor',
    catLabel: 'アウトドア',
    emoji: '🌿',
    price: 16800,
    badge: null,
    desc: '36Vハイパワー。静かで排気ガスゼロの環境に優しい草刈り機。',
    specs: { '電圧': '36V', 'バッテリー': 'リチウムイオン 5.0Ah', '刃長': '300mm', '充電時間': '約90分', '重量': '3.8kg' }
  },
  {
    id: 9,
    name: 'レーザー距離計',
    nameEn: 'LM-50PRO',
    category: 'drill',
    catLabel: '電動ドリル',
    emoji: '📏',
    price: 4800,
    badge: '割引中',
    desc: '最長50m計測可能。精度±1.5mmのハイコスパ距離計。',
    specs: { '測定範囲': '0.05-50m', '精度': '±1.5mm', 'レーザー': 'クラス2', '防水': 'IP54', '重量': '120g' }
  },
  {
    id: 10,
    name: 'ベンチグラインダー',
    nameEn: 'BG-150PRO',
    category: 'grinder',
    catLabel: 'グラインダー',
    emoji: '⚡',
    price: 9200,
    badge: null,
    desc: '150mm両刃砥石。作業現場に欠かせない定番ベンチグラインダー。',
    specs: { '砥石径': '150mm', '回転数': '2950rpm', '出力': '370W', '重量': '7.5kg', '付属品': '砥石×2' }
  },
  {
    id: 11,
    name: '振動ドリル',
    nameEn: 'VD-13PRO',
    category: 'drill',
    catLabel: '電動ドリル',
    emoji: '🔨',
    price: 8200,
    badge: null,
    desc: 'ハンマー機能搭載でコンクリートもラクラク穿孔。',
    specs: { '電圧': '13mm', 'ハンマー回数': '48000回/分', '回転数': '0-2800rpm', '出力': '700W', '重量': '2.0kg' }
  },
  {
    id: 12,
    name: 'マルチツール',
    nameEn: 'MT-35PRO',
    category: 'saw',
    catLabel: '切断機',
    emoji: '🔩',
    price: 5500,
    badge: '限定特価',
    desc: '1台6役のマルチツール。切断・研磨・スクレイピングに対応。',
    specs: { '発振数': '11000-20000回/分', '発振角': '3.2°', '出力': '350W', '付属品': 'ブレード6種、レンチ', '重量': '1.2kg' }
  }
];

// ======== Dynamic Products (load from localStorage) ========
let products = [...PRODUCTS_DEFAULT];

function loadProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem('denkiProducts'));
    if (saved && saved.length > 0) products = saved;
  } catch {}
}

function saveProducts() {
  localStorage.setItem('denkiProducts', JSON.stringify(products));
}

// ======== Cart State ========
let cart = JSON.parse(localStorage.getItem('denkiCart') || '[]');

function saveCart() {
  localStorage.setItem('denkiCart', JSON.stringify(cart));
}

// ======== DOM refs ========
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartBody = document.getElementById('cartBody');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const checkoutSummary = document.getElementById('checkoutSummary');
const checkoutForm = document.getElementById('checkoutForm');
const detailModal = document.getElementById('detailModal');
const detailOverlay = document.getElementById('detailOverlay');
const detailTitle = document.getElementById('detailTitle');
const detailBody = document.getElementById('detailBody');
const detailClose = document.getElementById('detailClose');
const toast = document.getElementById('toast');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const newsletterForm = document.getElementById('newsletterForm');
const contactForm = document.getElementById('contactForm');


// ======== Render Products ========
function renderProducts(cat = 'all') {
  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
  productGrid.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="openDetail(${p.id})" data-id="${p.id}">
      <div class="product-image" onclick="openDetail(${p.id})">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <span>${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-code">${p.nameEn}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc.slice(0, 36)}…</p>
        <div class="product-bottom">
          <span class="product-price">¥${p.price.toLocaleString()}<span class="product-price-tax">（税込）</span></span>
          <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})" aria-label="カートに追加">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/></svg>
          </button>
        </div>
      </div>
    </div>

  `).join('');
}

// ======== Add to Cart ========
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`${product.name} をカートに追加しました`);
}

// ======== Remove from Cart ========
function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
}

// ======== Update Quantity ========
function updateQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
}

// ======== Update Cart UI ========
function updateCartUI() {
  // Count badge
  const totalQty = cart.reduce((sum, c) => sum + c.qty, 0);
  cartCount.textContent = totalQty;
  cartCount.classList.toggle('show', totalQty > 0);

  // Cart items
  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartItems.innerHTML = '';
    cartFooter.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'block';

  cartItems.innerHTML = cart.map(c => {
    const p = products.find(pr => pr.id === c.id);
    if (!p) return '';
    const subtotal = p.price * c.qty;
    return `
      <div class="cart-item">
        <div class="cart-item-image">${p.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">¥${p.price.toLocaleString()}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateQty(${c.id}, -1)">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-btn" onclick="updateQty(${c.id}, 1)">+</button>
            <button class="cart-item-remove" onclick="removeFromCart(${c.id})">削除</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const total = cart.reduce((sum, c) => {
    const p = products.find(pr => pr.id === c.id);
    return sum + (p ? p.price * c.qty : 0);
  }, 0);

  cartTotal.textContent = `¥${total.toLocaleString()}`;
}

// ======== Toast ========
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ======== Cart Drawer ========
function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ======== Product Detail Modal ========
function openDetail(id) {
  const p = products.find(pr => pr.id === id);
  if (!p) return;
  detailTitle.textContent = p.name;
  detailBody.innerHTML = `
    <div class="detail-content">
      <div class="detail-image">${p.emoji}</div>
      <div class="detail-info">
        <span class="detail-cat">${p.catLabel}</span>
        <h3>${p.name} <span style="font-weight:400;font-size:15px;color:var(--gray-600)">${p.nameEn}</span></h3>
        <div class="detail-price">¥${p.price.toLocaleString()} <span>（税込）</span></div>
        <p class="detail-desc">${p.desc}</p>
        <dl class="detail-specs">
          ${Object.entries(p.specs).map(([k,v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}
        </dl>
        <button class="btn btn-primary" onclick="addToCart(${p.id}); closeDetail();" style="margin-top:12px;">
          カートに追加する — ¥${p.price.toLocaleString()}
        </button>
      </div>
    </div>
  `;
  detailModal.classList.add('open');
  detailOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetail() {
  detailModal.classList.remove('open');
  detailOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

detailClose.addEventListener('click', closeDetail);
detailOverlay.addEventListener('click', closeDetail);

// ======== Checkout Modal ========

modalClose.addEventListener('click', closeCheckout);
modalOverlay.addEventListener('click', closeCheckout);

checkoutForm.addEventListener('submit', (e) => {
  const selectedPayment = document.querySelector('.payment-option input:checked');
  const paymentMethod = selectedPayment ? selectedPayment.value : 'credit';
  const paymentLabels = { credit: 'クレジットカード', bank: '銀行振込', cod: '代金引換', convenience: 'コンビニ払い', paypal: 'PayPal' };
  e.preventDefault();
  const name = document.getElementById('checkoutName').value;
  const email = document.getElementById('checkoutEmail').value;
  const address = document.getElementById('checkoutAddress').value;
  const phone = document.getElementById('checkoutPhone').value;

  // Simulate order
  const total = cart.reduce((s, c) => {
    const p = products.find(pr => pr.id === c.id);
    return s + (p ? p.price * c.qty : 0);
  }, 0);

  const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();

  showToast(`ご注文ありがとうございます！（${paymentLabels[paymentMethod]}）注文番号: ${orderId}`);

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();
  closeCheckout();
  checkoutForm.reset();
});

// ======== Category Filter ========
// ======== Nav Category Filter ========
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    renderProducts(link.dataset.cat || 'all');
  });
});


// ======== Hamburger ========
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

// Close nav on link click (mobile)
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// ======== Scroll Header ========
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.classList.toggle('scrolled', current > 20);
  lastScroll = current;
});

// ======== Intersection Observer for fade-in ========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// ======== Contact Form ========
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('お問い合わせを受け付けました。担当者よりご連絡いたします。');
  contactForm.reset();
});

// ======== Newsletter Form ========
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('メルマガ登録ありがとうございます！500円クーポンをメールでお送りいたします。');
  newsletterForm.reset();
});

// ======== Search (placeholder) ========
document.getElementById('searchBtn').addEventListener('click', () => {
  showToast('🔍 検索機能は準備中です');
});

// ======== Keyboard Escape ========
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (detailModal.classList.contains('open')) closeDetail();
    else if (checkoutModal.classList.contains('open')) closeCheckout();
    else if (cartDrawer.classList.contains('open')) closeCart();
  }
});

// ======== Init ========
loadProducts();
renderProducts();
updateCartUI();

// Observe fade-in elements
document.querySelectorAll('.service-item, .product-card, .newsletter-inner, .contact-form').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ========================================
//   支払い方法 & 管理設定
// ========================================

const PAYMENT_METHODS = [
  { id: 'credit', label: 'クレジットカード', icon: '💳', desc: 'Visa / Mastercard / JCB / Amex' },
  { id: 'bank', label: '銀行振込', icon: '🏦', desc: '先払い（振込手数料はお客様負担）' },
  { id: 'cod', label: '代金引換', icon: '📮', desc: '配達時にお支払い（代引手数料330円）' },
  { id: 'convenience', label: 'コンビニ払い', icon: '🏪', desc: 'セブン-イレブン / ファミリーマート / ローソン' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️', desc: 'PayPalアカウントで簡単決済' }
];

const PAYMENT_DETAILS = {
  credit: `
    <div style="margin-bottom:6px;"><strong>クレジットカード情報</strong></div>
    <div class="payment-card-row">
      <input type="text" placeholder="カード番号" style="grid-column:1/-1;" inputmode="numeric">
      <input type="text" placeholder="有効期限 (MM/YY)">
      <input type="text" placeholder="セキュリティコード">
    </div>
  `,
  bank: `
    <strong>お振込先</strong><br>
    楽天銀行（0033）<br>
    支店名：東京支店（201）<br>
    口座番号：普通 1234567<br>
    口座名義：デンキコウグノタクミ（カ<br>
    ※ご入金確認後の発送となります（営業日3日程度）
  `,
  cod: `
    代金引換手数料：<strong>330円</strong>（税込）<br>
    配達時に現金またはカードでお支払いください。<br>
    ご用意いただく金額：商品代金 + 送料 + 330円
  `,
  convenience: `
    ご注文完了後、お支払い番号をメールにてお送りいたします。<br>
    下記のコンビニエンスストアでお支払いいただけます。<br>
    • セブン-イレブン<br>
    • ファミリーマート<br>
    • ローソン / ミニストップ<br>
    ※お支払い期限：ご注文日より7日以内
  `,
  paypal: `
    PayPal決済画面にてお支払い手続きを進めます。<br>
    PayPalアカウントをお持ちでない方も<br>
    クレジットカードでお支払いいただけます。
  `
};

// ======== Admin Settings ========
const ADMIN_DEFAULTS = {
  storeName: '電動工具の匠',
  email: 'info@denki-takumi.jp',
  phone: '03-1234-5678',
  shippingFee: 800,
  freeShippingThreshold: 10000,
  enabledPayments: ['credit', 'bank', 'cod', 'convenience', 'paypal']
};

function loadAdminSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('denkiAdmin') || '{}');
    return { ...ADMIN_DEFAULTS, ...saved };
  } catch { return { ...ADMIN_DEFAULTS }; }
}

function saveAdminSettings(settings) {
  localStorage.setItem('denkiAdmin', JSON.stringify(settings));
}

// ======== Shipping Calc ========
function calcShipping(subtotal) {
  const settings = loadAdminSettings();
  if (subtotal >= settings.freeShippingThreshold) return 0;
  return settings.shippingFee;
}

// ======== Cart total helpers ========
function getCartSubtotal() {
  return cart.reduce((s, c) => {
    const p = products.find(pr => pr.id === c.id);
    return s + (p ? p.price * c.qty : 0);
  }, 0);
}

function getCartGrandTotal() {
  return getCartSubtotal() + calcShipping(getCartSubtotal());
}

// ======== Override updateCartUI to show shipping ========
const _origUpdateCart = updateCartUI;
updateCartUI = function() {
  const totalQty = cart.reduce((sum, c) => sum + c.qty, 0);
  cartCount.textContent = totalQty;
  cartCount.classList.toggle('show', totalQty > 0);

  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartItems.innerHTML = '';
    cartFooter.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'block';

  cartItems.innerHTML = cart.map(c => {
    const p = products.find(pr => pr.id === c.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-image">${p.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">¥${p.price.toLocaleString()}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateQty(${c.id}, -1)">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-btn" onclick="updateQty(${c.id}, 1)">+</button>
            <button class="cart-item-remove" onclick="removeFromCart(${c.id})">削除</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const subtotal = getCartSubtotal();
  const shipping = calcShipping(subtotal);
  const settings = loadAdminSettings();

  let html = `<div class="cart-total"><span>小計</span><span>¥${subtotal.toLocaleString()}</span></div>`;
  if (shipping === 0) {
    html += `<div class="cart-total" style="font-size:13px;color:#22C55E;"><span>送料</span><span>無料</span></div>`;
  } else {
    html += `<div class="cart-total" style="font-size:13px;color:var(--gray-600);"><span>送料</span><span>¥${shipping.toLocaleString()}</span></div>`;
    if (subtotal < settings.freeShippingThreshold) {
      const remaining = settings.freeShippingThreshold - subtotal;
      html += `<div style="font-size:11px;color:var(--orange);text-align:right;margin-bottom:8px;">あと¥${remaining.toLocaleString()}で送料無料</div>`;
    }
  }
  html += `<div class="cart-total"><span>合計</span><span class="cart-total-amount">¥${(subtotal + shipping).toLocaleString()}</span></div>`;

  document.querySelector('.cart-total').outerHTML = html;
};

// ======== Render Payment Methods in Checkout ========
function renderPaymentMethods() {
  const settings = loadAdminSettings();
  const container = document.getElementById('paymentMethods');
  const detail = document.getElementById('paymentDetail');

  const enabled = PAYMENT_METHODS.filter(p => settings.enabledPayments.includes(p.id));

  if (enabled.length === 0) {
    container.innerHTML = '<div style="font-size:13px;color:var(--gray-600);padding:8px 0;">利用可能な支払い方法がありません</div>';
    detail.classList.remove('show');
    return;
  }

  container.innerHTML = enabled.map((p, i) => `
    <label class="payment-option ${i === 0 ? 'active' : ''}">
      <input type="radio" name="payment" value="${p.id}" ${i === 0 ? 'checked' : ''}>
      <span class="payment-option-icon">${p.icon}</span>
      <span class="payment-option-label">${p.label}</span>
      <span class="payment-option-desc">${p.desc}</span>
    </label>
  `).join('');

  // Show first payment detail
  if (enabled.length > 0) {
    detail.innerHTML = PAYMENT_DETAILS[enabled[0].id] || '';
    detail.classList.add('show');
  }

  // Radio change handler
  container.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      container.querySelectorAll('.payment-option').forEach(el => el.classList.remove('active'));
      radio.closest('.payment-option').classList.add('active');
      detail.innerHTML = PAYMENT_DETAILS[radio.value] || '';
      detail.classList.add('show');
    });
  });
}

// ======== Override checkout opening to include shipping + payment ========
const _origCheckoutListener = checkoutBtn._listeners ? checkoutBtn._listeners : null;

checkoutBtn.addEventListener('click', function openCheckoutWithPayment() {
  if (cart.length === 0) {
    showToast('カートに商品がありません');
    return;
  }
  closeCart();

  const subtotal = getCartSubtotal();
  const shipping = calcShipping(subtotal);
  const grandTotal = subtotal + shipping;
  const settings = loadAdminSettings();

  checkoutSummary.innerHTML = `
    <h3>注文商品</h3>
    ${cart.map(c => {
      const p = products.find(pr => pr.id === c.id);
      return p ? `<div class="checkout-item"><span>${p.name} × ${c.qty}</span><span>¥${(p.price * c.qty).toLocaleString()}</span></div>` : '';
    }).join('')}
    <div class="checkout-payment-line">
      <span>送料</span>
      <span>${shipping === 0 ? '無料' : '¥' + shipping.toLocaleString()}</span>
    </div>
    <div class="checkout-total">
      <span>合計（税込）</span>
      <span class="checkout-total-amount">¥${grandTotal.toLocaleString()}</span>
    </div>
  `;

  renderPaymentMethods();

  checkoutModal.classList.add('open');
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

// ======== Admin Modal Logic ========
function openAdmin() {
  const settings = loadAdminSettings();

  document.getElementById('adminStoreName').value = settings.storeName;
  document.getElementById('adminEmail').value = settings.email;
  document.getElementById('adminPhone').value = settings.phone;
  document.getElementById('adminShippingFee').value = settings.shippingFee;
  document.getElementById('adminFreeShipping').value = settings.freeShippingThreshold;

  // Render payment toggles
  const panel = document.getElementById('adminPayment');
  panel.innerHTML = PAYMENT_METHODS.map(p => `
    <div class="toggle-row">
      <div class="toggle-info">
        <span class="toggle-icon">${p.icon}</span>
        <div>
          <div class="toggle-label">${p.label}</div>
          <div class="toggle-desc">${p.desc}</div>
        </div>
      </div>
      <label class="toggle-switch">
        <input type="checkbox" class="admin-payment-toggle" data-id="${p.id}" ${settings.enabledPayments.includes(p.id) ? 'checked' : ''}>
        <span class="toggle-slider"></span>
      </label>
    </div>
  `).join('');

  // Tab switching
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('hidden'));
      const target = document.getElementById('admin' + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1));
      if (target) target.classList.remove('hidden');
    });
  });

  document.getElementById('adminSaved').classList.remove('show');

  adminModal.classList.add('open');
  adminOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAdmin() {
  adminModal.classList.remove('open');
  adminOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Save admin settings
document.getElementById('adminSaveBtn').addEventListener('click', () => {
  const toggles = document.querySelectorAll('.admin-payment-toggle');
  const enabledPayments = [];
  toggles.forEach(t => { if (t.checked) enabledPayments.push(t.dataset.id); });

  const settings = {
    storeName: document.getElementById('adminStoreName').value.trim() || ADMIN_DEFAULTS.storeName,
    email: document.getElementById('adminEmail').value.trim() || ADMIN_DEFAULTS.email,
    phone: document.getElementById('adminPhone').value.trim() || ADMIN_DEFAULTS.phone,
    shippingFee: parseInt(document.getElementById('adminShippingFee').value) || ADMIN_DEFAULTS.shippingFee,
    freeShippingThreshold: parseInt(document.getElementById('adminFreeShipping').value) || ADMIN_DEFAULTS.freeShippingThreshold,
    enabledPayments
  };

  // Handle password change
  const newPwd = document.getElementById('adminNewPwd').value.trim();
  if (newPwd) {
    localStorage.setItem('denkiAdminPassword', newPwd);
    document.getElementById('adminNewPwd').value = '';
  }

  saveAdminSettings(settings);

  // Update logo if store name changed
  const logoTexts = document.querySelectorAll('.logo-text, .footer-brand .logo-text');
  logoTexts.forEach(el => {
    el.innerHTML = el.innerHTML.replace(/電動工具の匠/g, settings.storeName);
  });

  document.getElementById('adminSaved').classList.add('show');
  setTimeout(() => document.getElementById('adminSaved').classList.remove('show'), 3000);

  showToast('設定を保存しました');
  updateCartUI();
});

// Admin open/close
document.getElementById('adminLink').addEventListener('click', (e) => {
  e.preventDefault();
  // Show password prompt first
  document.getElementById('pwdInput').value = '';
  document.getElementById('pwdError').textContent = '';
  pwdModal.classList.add('open');
  pwdOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('pwdInput').focus(), 100);
});
document.getElementById('adminClose').addEventListener('click', closeAdmin);
document.getElementById('adminOverlay').addEventListener('click', closeAdmin);

// ======== Extended Escape handler ========
const _origEscape = document._escapeHandler;
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (adminModal.classList.contains('open')) closeAdmin();
    else if (detailModal.classList.contains('open')) closeDetail();
    else if (checkoutModal.classList.contains('open')) closeCheckout();
    else if (cartDrawer.classList.contains('open')) closeCart();
  }
});

// ======== Password Modal ========
function closePwdModal() {
  pwdModal.classList.remove('open');
  pwdOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('pwdForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('pwdInput').value;
  const storedPwd = localStorage.getItem('denkiAdminPassword') || 'admin123';
  if (input === storedPwd) {
    closePwdModal();
    openAdmin();
  } else {
    document.getElementById('pwdError').textContent = 'パスワードが違います';
    document.getElementById('pwdInput').value = '';
    document.getElementById('pwdInput').focus();
  }
});

document.getElementById('pwdOverlay').addEventListener('click', closePwdModal);

// Update Escape handler for pwd modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (pwdModal.classList.contains('open')) closePwdModal();
    else if (adminModal.classList.contains('open')) closeAdmin();
    else if (detailModal.classList.contains('open')) closeDetail();
    else if (checkoutModal.classList.contains('open')) closeCheckout();
    else if (cartDrawer.classList.contains('open')) closeCart();
  }
});

// ======== Product Management (Admin) ========
const CATEGORY_OPTIONS = [
  { id: 'drill', label: '電動ドリル' },
  { id: 'saw', label: '切断機' },
  { id: 'grinder', label: 'グラインダー' },
  { id: 'sander', label: 'サンダー' },
  { id: 'outdoor', label: 'アウトドア' }
];

function renderProductMgmt() {
  const container = document.getElementById('adminProducts');
  let editId = container.dataset.editId;

  let html = `
    <div class="prod-mgmt-header">
      <h3>商品一覧（${products.length}点）</h3>
      <button class="btn btn-primary btn-sm" onclick="showProductForm()">+ 新規追加</button>
    </div>
  `;

  // Show add/edit form if active
  if (editId !== undefined) {
    const editing = editId === 'new' ? null : products.find(p => p.id == editId);
    html += renderProductForm(editing);
  }

  html += `
    <table class="prod-table">
      <thead><tr>
        <th style="width:36px">画像</th>
        <th>品番</th>
        <th>商品名</th>
        <th style="width:80px">価格</th>
        <th style="width:80px">カテゴリ</th>
        <th style="width:100px">操作</th>
      </tr></thead>
      <tbody>
  `;

  products.forEach(p => {
    html += `
      <tr>
        <td><span class="prod-emoji">${p.emoji}</span></td>
        <td style="color:var(--gray-600);font-size:11px;">${p.nameEn}</td>
        <td class="prod-name-cell">${p.name}</td>
        <td class="prod-price-cell">¥${p.price.toLocaleString()}</td>
        <td>${p.catLabel}</td>
        <td class="prod-actions">
          <button class="btn-icon-sm" onclick="showProductForm(${p.id})" title="編集">✏️</button>
          <button class="btn-icon-sm danger" onclick="deleteProduct(${p.id})" title="削除">🗑️</button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;

  // Add specs injection CSS for form
  container.innerHTML = html;
}

function showProductForm(id) {
  const container = document.getElementById('adminProducts');
  container.dataset.editId = id !== undefined ? id : 'new';
  renderProductMgmt();
  // Scroll to form
  const form = container.querySelector('.prod-form');
  if (form) form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderProductForm(product) {
  const isNew = !product;
  const p = product || { name: '', nameEn: '', category: 'drill', catLabel: '電動ドリル', emoji: '🔧', price: '', badge: '', desc: '', specs: { '電圧': '', '重量': '' } };

  const catOpts = CATEGORY_OPTIONS.map(c =>
    `<option value="${c.id}" ${p.category === c.id ? 'selected' : ''}>${c.label}</option>`
  ).join('');

  const specKeys = Object.keys(p.specs || {});
  const specHtml = specKeys.map((k, i) => `
    <div class="spec-entry">
      <input class="spec-key" value="${k}" placeholder="項目名">
      <input class="spec-val" value="${p.specs[k]}" placeholder="値">
      ${specKeys.length > 1 ? '<button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--primary);font-size:14px;cursor:pointer;">✕</button>' : ''}
    </div>
  `).join('');

  return `
    <div class="prod-form">
      <div class="prod-form-row">
        <div class="form-group">
          <label>商品名 <span class="required">*</span></label>
          <input id="pf_name" value="${p.name}" placeholder="例：コードレスインパクトドライバー">
        </div>
        <div class="form-group">
          <label>品番 <span class="required">*</span></label>
          <input id="pf_code" value="${p.nameEn}" placeholder="例：ID-1800PRO">
        </div>
      </div>
      <div class="prod-form-row">
        <div class="form-group">
          <label>カテゴリ</label>
          <select id="pf_cat">${catOpts}</select>
        </div>
        <div class="form-group">
          <label>絵文字</label>
          <input id="pf_emoji" value="${p.emoji}" placeholder="例：🔧">
        </div>
      </div>
      <div class="prod-form-row">
        <div class="form-group">
          <label>価格 (円／税込) <span class="required">*</span></label>
          <input id="pf_price" type="number" value="${p.price || ''}" placeholder="12800">
        </div>
        <div class="form-group">
          <label>バッジ（任意）</label>
          <input id="pf_badge" value="${p.badge || ''}" placeholder="例：人気No.1">
        </div>
      </div>
      <div class="prod-form-row">
        <div class="form-group prod-form-full">
          <label>説明文</label>
          <textarea id="pf_desc" rows="2" placeholder="商品の説明">${p.desc}</textarea>
        </div>
      </div>
      <div class="prod-form-row">
        <div class="form-group prod-form-full">
          <label>スペック</label>
          <div id="specContainer">${specHtml}</div>
          <button type="button" class="add-spec-btn" onclick="addSpecRow()">+ スペックを追加</button>
        </div>
      </div>
      <div class="prod-form-actions">
        <button class="btn btn-primary btn-sm" onclick="saveProductForm(${isNew ? 'true' : p.id})">${isNew ? '追加' : '保存'}</button>
        <button class="btn-ghost" onclick="cancelProductForm()">キャンセル</button>
      </div>
    </div>
  `;
}

function addSpecRow() {
  const container = document.getElementById('specContainer');
  const div = document.createElement('div');
  div.className = 'spec-entry';
  div.innerHTML = '<input class="spec-key" placeholder="項目名"><input class="spec-val" placeholder="値"><button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--primary);font-size:14px;cursor:pointer;">✕</button>';
  container.appendChild(div);
}

function saveProductForm(idOrBool) {
  const name = document.getElementById('pf_name').value.trim();
  const nameEn = document.getElementById('pf_code').value.trim();
  const category = document.getElementById('pf_cat').value;
  const catLabel = CATEGORY_OPTIONS.find(c => c.id === category).label;
  const emoji = document.getElementById('pf_emoji').value.trim() || '🔧';
  const price = parseInt(document.getElementById('pf_price').value);
  const badge = document.getElementById('pf_badge').value.trim() || null;
  const desc = document.getElementById('pf_desc').value.trim();

  if (!name || !nameEn || !price) {
    showToast('商品名・品番・価格は必須です');
    return;
  }

  // Collect specs
  const specs = {};
  document.querySelectorAll('.spec-entry').forEach(el => {
    const k = el.querySelector('.spec-key').value.trim();
    const v = el.querySelector('.spec-val').value.trim();
    if (k && v) specs[k] = v;
  });

  if (idOrBool === true) {
    // New product
    const maxId = products.reduce((m, p) => Math.max(m, p.id), 0);
    products.push({ id: maxId + 1, name, nameEn, category, catLabel, emoji, price, badge, desc, specs });
    showToast(`「${name}」を追加しました`);
  } else {
    // Edit existing
    const idx = products.findIndex(p => p.id === idOrBool);
    if (idx !== -1) {
      products[idx] = { ...products[idx], name, nameEn, category, catLabel, emoji, price, badge, desc, specs };
      showToast(`「${name}」を更新しました`);
    }
  }

  saveProducts();
  const container = document.getElementById('adminProducts');
  delete container.dataset.editId;
  renderProductMgmt();
  renderProducts(document.querySelector('.nav-link.active')?.dataset.cat || 'all');
}

function cancelProductForm() {
  const container = document.getElementById('adminProducts');
  delete container.dataset.editId;
  renderProductMgmt();
}

function deleteProduct(id) {
  const p = products.find(pr => pr.id === id);
  if (!p) return;
  if (!confirm(`「${p.name}」を削除してもよろしいですか？`)) return;
  products = products.filter(pr => pr.id !== id);
  saveProducts();
  renderProductMgmt();
  renderProducts(document.querySelector('.nav-link.active')?.dataset.cat || 'all');
  showToast(`「${p.name}」を削除しました`);
}

// Patch openAdmin to also render product mgmt
const _origOpenAdmin = openAdmin;
openAdmin = function() {
  _origOpenAdmin();
  renderProductMgmt();
};
