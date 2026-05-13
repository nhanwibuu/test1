/* ============================================================
   BOOKSTORE - GLOBAL JAVASCRIPT
   ============================================================ */

// ============================================================
// CART SYSTEM (localStorage)
// ============================================================
const Cart = {
  get() {
    return JSON.parse(localStorage.getItem('bookstore_cart') || '[]');
  },
  save(items) {
    localStorage.setItem('bookstore_cart', JSON.stringify(items));
    Cart.updateBadge();
    Cart.syncCartPage();
  },
  add(product) {
    const items = Cart.get();
    const idx = items.findIndex(i => i.id === product.id);
    if (idx > -1) {
      items[idx].qty = (items[idx].qty || 1) + (product.qty || 1);
    } else {
      items.push({ ...product, qty: product.qty || 1 });
    }
    Cart.save(items);
    Toast.show(`✅ Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
  },
  remove(id) {
    Cart.save(Cart.get().filter(i => i.id !== id));
  },
  updateQty(id, qty) {
    const items = Cart.get();
    const idx = items.findIndex(i => i.id === id);
    if (idx > -1) {
      if (qty < 1) { Cart.remove(id); return; }
      items[idx].qty = qty;
      Cart.save(items);
    }
  },
  total() {
    return Cart.get().reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  },
  count() {
    return Cart.get().reduce((sum, i) => sum + (i.qty || 1), 0);
  },
  updateBadge() {
    const count = Cart.count();
    document.querySelectorAll('.cart-badge, .bnav-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },
  syncCartPage() {
    if (typeof window.renderCartPage === 'function') window.renderCartPage();
  },
  clear() {
    Cart.save([]);
  }
};

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
const Toast = {
  container: null,
  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  show(message, type = 'success', duration = 3000) {
    this.init();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    this.container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// ============================================================
// BANNER SLIDER
// ============================================================
function initBannerSlider(wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  const track = wrapper.querySelector('.slides-track');
  const dots = wrapper.querySelectorAll('.slider-dot');
  const slides = wrapper.querySelectorAll('.slide');
  if (!slides.length) return;
  let current = 0, total = slides.length, timer;

  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  wrapper.querySelector('.prev')?.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  wrapper.querySelector('.next')?.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetTimer(); }));

  function resetTimer() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 4500); }
  resetTimer();

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) { dx < 0 ? goTo(current + 1) : goTo(current - 1); resetTimer(); }
  });
}

// ============================================================
// PRODUCT SLIDER
// ============================================================
function initProductSlider(wrapperId, itemsPerView) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  const track = wrapper.querySelector('.product-slider-track');
  const items = track ? track.querySelectorAll('.product-card') : [];
  if (!items.length) return;
  let current = 0;

  function updateSlider() {
    const liveItems = track.querySelectorAll('.product-card');
    if (!liveItems.length) return;
    const itemWidth = liveItems[0].offsetWidth + 16;
    track.style.transform = `translateX(-${current * itemWidth}px)`;
  }

  wrapper.querySelector('.pslider-btn.prev')?.addEventListener('click', () => {
    const liveTotal = Math.max(0, track.querySelectorAll('.product-card').length - itemsPerView);
    if (current > 0) { current--; updateSlider(); }
  });
  wrapper.querySelector('.pslider-btn.next')?.addEventListener('click', () => {
    const liveTotal = Math.max(0, track.querySelectorAll('.product-card').length - itemsPerView);
    if (current < liveTotal) { current++; updateSlider(); }
  });

  window.addEventListener('resize', updateSlider);
}

// ============================================================
// COUNTDOWN TIMER
// ============================================================
function initCountdown(endTimestamp, prefix) {
  function update() {
    const now = Date.now();
    const diff = Math.max(0, endTimestamp - now);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const set = (id, val) => {
      const el = document.getElementById(prefix + id);
      if (el) el.textContent = String(val).padStart(2, '0');
    };
    set('h', h); set('m', m); set('s', s);
    if (diff <= 0) { clearInterval(timer); }
  }
  update();
  const timer = setInterval(update, 1000);
}

// ============================================================
// TAB SWITCHING
// ============================================================
function initTabs(containerSelector) {
  document.querySelectorAll(containerSelector).forEach(container => {
    const btns = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-tab-panel]');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        btns.forEach(b => b.classList.toggle('active', b.dataset.tab === target));
        panels.forEach(p => p.classList.toggle('active', p.dataset.tabPanel === target));
      });
    });
  });
}

// ============================================================
// MOBILE MENU
// ============================================================
function initMobileMenu() {
  const overlay = document.querySelector('.mobile-overlay');
  const menu = document.querySelector('.mobile-menu');
  const hamburger = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.mobile-close');
  if (!overlay || !menu) return;

  hamburger?.addEventListener('click', () => {
    overlay.classList.add('open');
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    overlay.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  };

  overlay.addEventListener('click', closeMenu);
  closeBtn?.addEventListener('click', closeMenu);
}

// ============================================================
// ADD TO CART BUTTON HANDLER
// ============================================================
function initAddToCart() {
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    if (btn.dataset.addCartInit === 'true') return;
    btn.dataset.addCartInit = 'true';

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('[data-product]');
      if (!card) return;
      const product = {
        id: card.dataset.productId || Math.random().toString(36).substr(2, 9),
        name: card.dataset.productName || 'Sản phẩm',
        price: parseFloat(card.dataset.productPrice) || 0,
        image: card.dataset.productImage || '',
        author: card.dataset.productAuthor || '',
        qty: 1
      };
      Cart.add(product);

      const original = btn.innerHTML;
      btn.innerHTML = '✓ Đã thêm';
      btn.style.background = '#27ae60';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
      }, 1500);
    });
  });
}

// ============================================================
// QTY CONTROLS (generic)
// ============================================================
function initQtyControls() {
  document.querySelectorAll('.qty-control').forEach(ctrl => {
    const input = ctrl.querySelector('.qty-input');
    ctrl.querySelector('.qty-btn.minus')?.addEventListener('click', () => {
      const v = parseInt(input.value) - 1;
      if (v >= 1) input.value = v;
    });
    ctrl.querySelector('.qty-btn.plus')?.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
    });
  });
}

// ============================================================
// UTILS
// ============================================================
function formatPrice(n) {
  return n.toLocaleString('vi-VN') + '₫';
}

function generateStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= Math.round(rating) ? '★' : '☆';
  }
  return stars;
}

// ============================================================
// ANIMATED COUNTER  [extracted from about.html]
// ============================================================
function animateCounter(id, end, suffix, duration) {
  suffix = suffix || '';
  duration = duration || 2000;
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const step = end / (duration / 16);
  const timer = setInterval(function () {
    start += step;
    if (start >= end) {
      el.textContent = end.toLocaleString('vi-VN') + suffix;
      clearInterval(timer);
      return;
    }
    el.textContent = Math.floor(start).toLocaleString('vi-VN') + suffix;
  }, 16);
}

function initAboutCounters() {
  const statsSection = document.querySelector('.about-stats');
  if (!statsSection) return;
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter('statBooks',     1000000, '+');
        animateCounter('statCustomers', 2000000, '+');
        animateCounter('statOrders',    5000000, '+');
        animateCounter('statStores',    48,      '');
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// ============================================================
// BLOG PAGE  [extracted from blog.html]
// ============================================================
const blogCategories = {
  'Văn học': 'review',
  'Kinh doanh': 'review',
  'Thiếu nhi': 'tips',
  'Tâm lý học': 'tips',
  'Lịch sử': 'news',
  'Khoa học': 'review',
  'Ngoại ngữ': 'news',
  'Kỹ năng sống': 'tips',
};

const blogPostsFromBooks = booksData.map((book, i) => ({
  id: book.id,
  cat: blogCategories[book.category] || 'review',
  tag: 
    book.category === 'Văn học' ? 'Điểm sách' :
    book.category === 'Kinh doanh' ? 'Mẹo kinh doanh' :
    book.category === 'Thiếu nhi' ? 'Sách thiếu nhi' :
    book.category === 'Tâm lý học' ? 'Tâm lý & Tình yêu' :
    book.category === 'Lịch sử' ? 'Tin xuất bản' :
    'Đánh giá sách',
  title: `Bộ sách "${book.name}" – ${book.author}`,
  excerpt: (book.description || '').replace(/<[^>]*>/g, '').substring(0, 150) + '...',
  fullDesc: book.description || `<p><strong>${book.name}</strong> là một tác phẩm của tác giả <strong>${book.author}</strong>, xuất bản bởi <strong>${book.publisher}</strong> năm ${book.year}.</p><p>Cuốn sách có ${book.pages} trang, với rating ${book.rating}/5 từ ${book.sold} độc giả. Giá bán: ${formatPrice(book.price)}.</p>`,
  img: book.image,
  author: book.author,
  date: new Date(2025, 3, 15 - Math.floor(i * 2.5)).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' }),
  views: Math.floor(Math.random() * 5000) + 2000,
  read: Math.floor(Math.random() * 5) + 5,
  rating: book.rating || 0,
  category: book.category,
  sold: book.sold || 0,
}));

function initFeaturedPost() {
  const section = document.getElementById('featuredPostSection');
  if (!section) return;

  // Chọn cuốn sách có rating cao nhất làm featured post
  const featured = [...booksData].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];
  if (!featured) return;

  const featuredPost = blogPostsFromBooks.find(p => p.id === featured.id);
  const discount = Math.round((1 - featured.price / featured.originalPrice) * 100);

  section.innerHTML = `
    <div class="container">
      <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:32px;align-items:center;max-height:360px">
        <div style="border-radius:var(--radius-lg);overflow:hidden;height:320px;position:relative">
          <img src="${featured.image}" alt="${featured.name}" style="width:100%;height:100%;object-fit:cover">
          <span style="position:absolute;top:12px;left:12px;background:var(--red);color:#fff;padding:6px 12px;border-radius:6px;font-size:.75rem;font-weight:700">-${discount}%</span>
        </div>
        <div>
          <span class="blog-tag" style="margin-bottom:14px;display:inline-block">⭐ Nổi bật</span>
          <h2 style="font-family:var(--font-display);font-size:1.7rem;font-weight:700;line-height:1.3;margin-bottom:12px">
            <a href="product-detail.html?id=${featured.id}" style="color:var(--gray-900);transition:color .25s" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--gray-900)'">
              ${featured.name}
            </a>
          </h2>
          <p style="font-size:.92rem;color:var(--gray-500);line-height:1.7;margin-bottom:12px"><strong>${featured.author}</strong> | Năm ${featured.year}</p>
          <p style="font-size:.92rem;color:var(--gray-500);line-height:1.7;margin-bottom:16px">${(featured.description || '').replace(/<[^>]*>/g, '').substring(0, 180)}...</p>
          <div class="blog-meta" style="margin-bottom:16px">
            <span>✍️ ${featured.author}</span>
            <span>📅 ${featuredPost.date}</span>
            <span>👁 ${featuredPost.views.toLocaleString('vi-VN')} lượt xem</span>
            <span>⭐ ${featured.rating}/5 (${featured.sold} đã bán)</span>
          </div>
          <a href="product-detail.html?id=${featured.id}" class="btn-primary" style="display:inline-flex;padding:11px 22px;font-size:.88rem">Xem chi tiết →</a>
        </div>
      </div>
    </div>
  `;
}

function initBlogPage() {
  if (!document.getElementById('blogList')) return;

  function renderBlog(filter) {
    const filtered = filter === 'all' 
      ? blogPostsFromBooks 
      : blogPostsFromBooks.filter(p => p.cat === filter);
    
    const list = document.getElementById('blogList');
    list.innerHTML = filtered.map(post => `
      <article class="blog-card">
        <div class="blog-card-img">
          <a href="product-detail.html?id=${post.id}"><img src="${post.img}" alt="${post.title}" loading="lazy"></a>
        </div>
        <div class="blog-card-body">
          <span class="blog-tag">${post.tag}</span>
          <h2 class="blog-card-title"><a href="product-detail.html?id=${post.id}">${post.title}</a></h2>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <div class="blog-meta">
            <span>✍️ ${post.author}</span>
            <span>📅 ${post.date}</span>
            <span>👁 ${post.views.toLocaleString('vi-VN')} lượt xem</span>
            <span>⏱ ${post.read} phút đọc</span>
          </div>
          <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
            <span style="font-size:.75rem;background:rgba(212, 48, 48, 0.1);color:var(--red);padding:3px 8px;border-radius:12px">⭐ ${post.rating}/5</span>
            <span style="font-size:.75rem;background:var(--gray-100);color:var(--gray-600);padding:3px 8px;border-radius:12px">📚 ${post.category}</span>
            <span style="font-size:.75rem;background:var(--gray-100);color:var(--gray-600);padding:3px 8px;border-radius:12px">🔥 ${post.sold} đã bán</span>
          </div>
          <a href="product-detail.html?id=${post.id}" style="display:inline-flex;align-items:center;gap:4px;margin-top:12px;font-size:.85rem;color:var(--red);font-weight:600">Xem chi tiết →</a>
        </div>
      </article>`).join('');
  }

  // Delegate filter button clicks
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const filterType = this.textContent.trim();
      const categoryMap = {
        'Tất cả': 'all',
        'Điểm sách': 'review',
        'Tin xuất bản': 'news',
        'Tác giả': 'author',
        'Mẹo đọc sách': 'tips',
      };
      const filter = categoryMap[filterType] || 'all';
      
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderBlog(filter);
    });
  });

  // Pagination active state
  document.querySelectorAll('.pagination .page-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.pagination .page-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  renderBlog('all');
}

function filterBlog(btn, cat) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  const categoryMap = {
    'all': 'all',
    'review': 'review',
    'news': 'news',
    'author': 'author',
    'tips': 'tips',
  };
  const filter = categoryMap[cat] || 'all';
  const filtered = filter === 'all' 
    ? blogPostsFromBooks 
    : blogPostsFromBooks.filter(p => p.cat === filter);
  
  const list = document.getElementById('blogList');
  list.innerHTML = filtered.map(post => `
    <article class="blog-card">
      <div class="blog-card-img">
        <a href="product-detail.html?id=${post.id}"><img src="${post.img}" alt="${post.title}" loading="lazy"></a>
      </div>
      <div class="blog-card-body">
        <span class="blog-tag">${post.tag}</span>
        <h2 class="blog-card-title"><a href="product-detail.html?id=${post.id}">${post.title}</a></h2>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <div class="blog-meta">
          <span>✍️ ${post.author}</span>
          <span>📅 ${post.date}</span>
          <span>👁 ${post.views.toLocaleString('vi-VN')} lượt xem</span>
          <span>⏱ ${post.read} phút đọc</span>
        </div>
        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
          <span style="font-size:.75rem;background:rgba(212, 48, 48, 0.1);color:var(--red);padding:3px 8px;border-radius:12px">⭐ ${post.rating}/5</span>
          <span style="font-size:.75rem;background:var(--gray-100);color:var(--gray-600);padding:3px 8px;border-radius:12px">📚 ${post.category}</span>
          <span style="font-size:.75rem;background:var(--gray-100);color:var(--gray-600);padding:3px 8px;border-radius:12px">🔥 ${post.sold} đã bán</span>
        </div>
        <a href="product-detail.html?id=${post.id}" style="display:inline-flex;align-items:center;gap:4px;margin-top:12px;font-size:.85rem;color:var(--red);font-weight:600">Xem chi tiết →</a>
      </div>
    </article>`).join('');
}


// ============================================================
// CART PAGE  [extracted from cart.html]
// ============================================================
let discountAmount = 0;
let _lastCouponCode = '';
let _lastCouponMsg  = '';

window.renderCartPage = function renderCartPage() {
  const cartMain = document.getElementById('cartMain');
  if (!cartMain) return;

  const items    = Cart.get();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 150000 ? 0 : 30000;
  const total    = subtotal + shipping - discountAmount;

  if (!items.length) {
    cartMain.innerHTML = `
      <div style="text-align:center;padding:80px 20px">
        <div style="font-size:5rem;margin-bottom:20px">🛒</div>
        <h2 style="font-size:1.4rem;color:var(--gray-700);margin-bottom:10px">Giỏ hàng trống</h2>
        <p style="color:var(--gray-500);margin-bottom:28px">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
        <a href="category.html" class="btn-primary" style="display:inline-flex;padding:14px 32px">Tiếp tục mua sắm →</a>
      </div>`;
    return;
  }

  cartMain.innerHTML = `
    <div class="cart-layout">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h3 style="font-size:1rem;font-weight:700">Sản phẩm (${items.length} mục)</h3>
          <button id="clearCartBtn" style="font-size:.83rem;color:var(--red);padding:6px 12px;border:1px solid var(--red);border-radius:6px;transition:all .2s">🗑 Xóa tất cả</button>
        </div>
        <div class="cart-table-wrap">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th><th></th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr data-item-id="${item.id}">
                  <td>
                    <div class="cart-product">
                      <img src="${item.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&q=80'}" alt="${item.name}">
                      <div>
                        <div class="cart-product-name">${item.name}</div>
                        <div class="cart-product-author">${item.author || ''}</div>
                        <a href="product-detail.html" style="font-size:.75rem;color:var(--red)">Xem chi tiết</a>
                      </div>
                    </div>
                  </td>
                  <td><span class="cart-unit-price">${formatPrice(item.price)}</span></td>
                  <td>
                    <div class="qty-control" style="width:fit-content">
                      <button class="qty-btn minus" data-id="${item.id}" data-qty="${item.qty - 1}">−</button>
                      <input class="qty-input" type="number" value="${item.qty}" min="1" style="width:46px" data-id="${item.id}">
                      <button class="qty-btn plus" data-id="${item.id}" data-qty="${item.qty + 1}">+</button>
                    </div>
                  </td>
                  <td><span class="cart-subtotal">${formatPrice(item.price * item.qty)}</span></td>
                  <td>
                    <button class="cart-delete" data-remove-id="${item.id}" title="Xóa">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                    </button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <a href="category.html" style="display:flex;align-items:center;gap:6px;font-size:.87rem;color:var(--red);font-weight:500">← Tiếp tục mua sắm</a>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span style="font-size:.82rem;color:var(--gray-500);background:var(--gray-100);padding:6px 12px;border-radius:6px">✅ Sách chính hãng 100%</span>
            <span style="font-size:.82rem;color:var(--gray-500);background:var(--gray-100);padding:6px 12px;border-radius:6px">🚚 Freeship từ 150.000đ</span>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h3>Tóm tắt đơn hàng</h3>
        <p style="font-size:.83rem;font-weight:600;color:var(--gray-700);margin-bottom:8px">Mã giảm giá</p>
        <div class="coupon-form">
          <input type="text" id="couponInput" placeholder="Nhập mã..." />
          <button id="applyCouponBtn">Áp dụng</button>
        </div>
        <div id="couponMsg" style="font-size:.82rem;margin-bottom:12px;display:none"></div>

        <div class="summary-row">
          <span>Tạm tính (${items.length} sản phẩm)</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>Phí vận chuyển</span>
          <span style="color:${shipping === 0 ? '#27ae60' : 'inherit'}">${shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
        </div>
        ${discountAmount > 0 ? `<div class="summary-row" style="color:#27ae60"><span>Giảm giá mã coupon</span><span>-${formatPrice(discountAmount)}</span></div>` : ''}
        ${subtotal < 150000 ? `<div style="background:#fff8e1;border-radius:6px;padding:10px;margin:8px 0;font-size:.8rem;color:#e67e22">🚚 Mua thêm <b>${formatPrice(150000 - subtotal)}</b> để freeship!</div>` : ''}

        <div class="summary-total">
          <span>Tổng cộng</span>
          <span>${formatPrice(total)}</span>
        </div>

        <a href="checkout.html" class="checkout-btn" style="display:block;text-align:center;text-decoration:none">Tiến hành thanh toán →</a>

        <div style="margin-top:14px;text-align:center">
          <p style="font-size:.75rem;color:var(--gray-400)">🔒 Thanh toán an toàn & bảo mật</p>
          <div style="display:flex;justify-content:center;gap:8px;margin-top:8px">
            <span style="font-size:1.2rem">💳</span><span style="font-size:1.2rem">📱</span><span style="font-size:1.2rem">🏦</span><span style="font-size:1.2rem">💵</span>
          </div>
        </div>
      </div>
    </div>`;

  // Restore coupon state after re-render
  if (_lastCouponCode) {
    const inp = document.getElementById('couponInput');
    const msg = document.getElementById('couponMsg');
    if (inp) inp.value = _lastCouponCode;
    if (msg && _lastCouponMsg) { msg.innerHTML = _lastCouponMsg; msg.style.display = 'block'; }
  }

  // Bind cart table events (delegated, replaces inline onclick)
  cartMain.querySelector('#clearCartBtn')?.addEventListener('click', () => {
    discountAmount = 0; _lastCouponCode = ''; _lastCouponMsg = '';
    Cart.save([]);
  });

  cartMain.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => Cart.updateQty(btn.dataset.id, parseInt(btn.dataset.qty)));
  });

  cartMain.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', () => Cart.updateQty(input.dataset.id, parseInt(input.value)));
  });

  cartMain.querySelectorAll('[data-remove-id]').forEach(btn => {
    btn.addEventListener('click', () => Cart.remove(btn.dataset.removeId));
  });

  cartMain.querySelector('#applyCouponBtn')?.addEventListener('click', applyCoupon);
};

function applyCoupon() {
  const code     = document.getElementById('couponInput').value.trim().toUpperCase();
  const subtotal = Cart.get().reduce((s, i) => s + i.price * i.qty, 0);
  _lastCouponCode = code;

  const msg = document.getElementById('couponMsg');

  if (code === 'BOOK10') {
    discountAmount  = Math.round(subtotal * 0.1);
    _lastCouponMsg  = `<span style="color:#27ae60">✅ Áp dụng thành công! Giảm 10% = ${formatPrice(discountAmount)}</span>`;
  } else if (code === 'SALE20') {
    discountAmount  = Math.round(subtotal * 0.2);
    _lastCouponMsg  = `<span style="color:#27ae60">✅ Áp dụng thành công! Giảm 20% = ${formatPrice(discountAmount)}</span>`;
  } else if (code === 'FREESHIP') {
    discountAmount  = 30000;
    _lastCouponMsg  = `<span style="color:#27ae60">✅ Miễn phí vận chuyển!</span>`;
  } else {
    discountAmount  = 0;
    _lastCouponMsg  = `<span style="color:var(--red)">❌ Mã không hợp lệ. Thử: BOOK10, SALE20, FREESHIP</span>`;
  }

  window.renderCartPage();
}

function initCartPage() {
  if (!document.getElementById('cartMain')) return;
  window.renderCartPage();

  // Suggested products
  const sugGrid = document.getElementById('suggestedGrid');
  if (sugGrid) {
    const suggested = booksData.slice(4, 8);
    suggested.forEach(b => { sugGrid.innerHTML += renderProductCard(b); });
    initAddToCart();
  }
}

// ============================================================
// CATEGORY PAGE  [extracted from category.html]
// ============================================================

function initCategoryPage() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;   // not on category.html — bail out silently

  const ITEMS_PER_PAGE = 6; // số sách hiển thị mỗi trang
  let currentPage = 1;
  let lastResults = [];

  // ── Price range boundaries ────────────────────────────────────────
  const PRICE_RANGES = {
    p1: () => true,
    p2: p => p < 50000,
    p3: p => p >= 50000  && p < 100000,
    p4: p => p >= 100000 && p <= 200000,
    p5: p => p > 200000,
  };

  // ── Read active filters ───────────────────────────────────────────
  function getActiveCategories() {
    const allBox = document.getElementById('cat0');
    if (!allBox || allBox.checked) return [];
    const checked = [];
    document.querySelectorAll('#catFilters input[type="checkbox"]:checked').forEach(cb => {
      if (cb.id === 'cat0') return;
      const label = cb.closest('.filter-option')?.querySelector('label');
      if (label) checked.push(label.textContent.trim());
    });
    return checked;
  }

  function getActivePriceFilter() {
    const selected = document.querySelector('input[name="price"]:checked');
    return PRICE_RANGES[selected?.id] ?? PRICE_RANGES.p1;
  }

  function getActiveSortOrder() {
    return document.getElementById('sortSelect')?.value ?? 'default';
  }

  // ── Render pagination buttons ─────────────────────────────────────
  function renderPagination(totalItems, page) {
    const paginationEl = document.querySelector('.pagination');
    if (!paginationEl) return;

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }

    let html = '';

    // Nút "‹ Trước"
    html += `<button class="page-btn page-prev" ${page <= 1 ? 'disabled' : ''}>‹</button>`;

    for (let p = 1; p <= totalPages; p++) {
      const start = (p - 1) * ITEMS_PER_PAGE + 1;
      const end   = Math.min(p * ITEMS_PER_PAGE, totalItems);
      const count = end - start + 1;

      // Tính số sách còn lại SAU trang này
      const remaining = totalItems - end;

      let badge = '';
      if (p !== page && remaining > 0 && p === page + 1) {
        // Badge "còn X" chỉ hiển thị ở trang kế tiếp
        badge = `<span class="page-remaining">còn ${remaining}</span>`;
      }

      html += `<button class="page-btn ${p === page ? 'active' : ''}" data-page="${p}">
                 ${p}${badge}
               </button>`;
    }

    // Nút "› Sau"
    const remainingAfterCurrent = totalItems - page * ITEMS_PER_PAGE;
    const nextLabel = remainingAfterCurrent > 0
      ? `› <span class="page-remaining">${remainingAfterCurrent} sách</span>`
      : '›';
    html += `<button class="page-btn page-next" ${page >= totalPages ? 'disabled' : ''}>${nextLabel}</button>`;

    paginationEl.innerHTML = html;

    // Gán sự kiện click cho từng nút trang
    paginationEl.querySelectorAll('.page-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        goToPage(parseInt(btn.dataset.page));
      });
    });

    paginationEl.querySelector('.page-prev')?.addEventListener('click', () => {
      if (currentPage > 1) goToPage(currentPage - 1);
    });
    paginationEl.querySelector('.page-next')?.addEventListener('click', () => {
      if (currentPage < totalPages) goToPage(currentPage + 1);
    });
  }

  // ── Chuyển trang ──────────────────────────────────────────────────
  function goToPage(page) {
    currentPage = page;
    renderPage(lastResults, page);
    // Scroll lên đầu vùng sản phẩm
    document.querySelector('.products-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Render một trang sách ─────────────────────────────────────────
  function renderPage(results, page) {
    const totalItems = results.length;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end   = start + ITEMS_PER_PAGE;
    const pageItems = results.slice(start, end);

    // Cập nhật dòng "Hiển thị X–Y / Z kết quả"
    const countEl = document.getElementById('resultCount');
    if (countEl) {
      const from = totalItems === 0 ? 0 : start + 1;
      const to   = Math.min(end, totalItems);
      countEl.innerHTML = totalItems === 0
        ? '0'
        : `${from}–${to} / <b>${totalItems}</b>`;
    }

    if (pageItems.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--gray-500)">
          <div style="font-size:3rem;margin-bottom:12px">🔍</div>
          <p style="font-size:1rem;font-weight:500">Không tìm thấy sách phù hợp với bộ lọc hiện tại.</p>
          <p style="font-size:.85rem;margin-top:6px">Thử bỏ chọn một số bộ lọc hoặc nhấn "Xóa bộ lọc".</p>
        </div>`;
    } else {
      grid.innerHTML = pageItems.map(b => renderProductCard(b)).join('');
    }

    renderPagination(totalItems, page);
    initAddToCart();
    initProductCardLinks();
  }

  // ── Core filter + sort ────────────────────────────────────────────
  function applyFilters() {
    const activeCategories = getActiveCategories();
    const priceOk          = getActivePriceFilter();
    const sort             = getActiveSortOrder();

    let results = booksData.filter(book => {
      const catOk = activeCategories.length === 0 || activeCategories.includes(book.category);
      return catOk && priceOk(book.price);
    });

    switch (sort) {
      case 'price_asc':  results.sort((a, b) => a.price - b.price); break;
      case 'price_desc': results.sort((a, b) => b.price - a.price); break;
      case 'popular':    results.sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0)); break;
      case 'newest':     results = [...results].reverse(); break;
    }

    lastResults = results;
    currentPage = 1; // reset về trang 1 mỗi khi filter thay đổi
    renderPage(results, 1);
  }

  // ── Wire up filter controls ───────────────────────────────────────
  document.querySelectorAll('input[name="price"]')
    .forEach(radio => radio.addEventListener('change', applyFilters));

  document.getElementById('sortSelect')
    ?.addEventListener('change', applyFilters);

  const resetBtn = document.querySelector('.sidebar button');
  if (resetBtn) {
    resetBtn.removeAttribute('onclick');
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('#catFilters input[type="checkbox"]')
        .forEach(cb => { cb.checked = false; });
      const p1 = document.getElementById('p1');
      if (p1) p1.checked = true;
      const sortSel = document.getElementById('sortSelect');
      if (sortSel) sortSel.value = 'default';
      applyFilters();
    });
  }

  document.getElementById('cat0')?.addEventListener('change', function () {
    if (this.checked) {
      document.querySelectorAll('#catFilters input[type="checkbox"]')
        .forEach(cb => { if (cb.id !== 'cat0') cb.checked = false; });
    }
    applyFilters();
  });

  document.querySelectorAll('#catFilters input[type="checkbox"]:not(#cat0)')
    .forEach(cb => cb.addEventListener('change', function () {
      if (this.checked) document.getElementById('cat0').checked = false;
      applyFilters();
    }));

  // ── Initial render ────────────────────────────────────────────────
  applyFilters();
}

// ============================================================
// CHECKOUT PAGE  [extracted from checkout.html]
// ============================================================
function initCheckoutPage() {
  if (!document.getElementById('checkoutItems')) return;

  function getShippingCost() {
    const sel      = document.querySelector('input[name="shipping"]:checked');
    const val      = sel ? sel.value : 'standard';
    const subtotal = Cart.get().reduce((s, i) => s + i.price * i.qty, 0);
    if (val === 'express')  return 50000;
    if (val === 'same_day') return 80000;
    return subtotal >= 150000 ? 0 : 30000;
  }

  function renderSummary() {
    const items    = Cart.get();
    const itemsDiv = document.getElementById('checkoutItems');
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = getShippingCost();

    itemsDiv.innerHTML = items.length
      ? items.map(item => `
          <div style="display:flex;gap:10px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--gray-100)">
            <img src="${item.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&q=80'}" style="width:50px;height:65px;object-fit:cover;border-radius:4px;flex-shrink:0" alt="">
            <div style="flex:1;min-width:0">
              <div style="font-size:.83rem;font-weight:500;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${item.name}</div>
              <div style="font-size:.78rem;color:var(--gray-400)">x${item.qty}</div>
            </div>
            <div style="font-size:.88rem;font-weight:700;color:var(--red);flex-shrink:0">${formatPrice(item.price * item.qty)}</div>
          </div>`).join('')
      : '<p style="text-align:center;color:var(--gray-400);font-size:.87rem;padding:20px 0">Giỏ hàng trống</p>';

    document.getElementById('checkoutSubtotal').textContent   = formatPrice(subtotal);
    const shippingEl = document.getElementById('checkoutShipping');
    shippingEl.textContent  = shipping === 0 ? 'Miễn phí' : formatPrice(shipping);
    shippingEl.style.color  = shipping === 0 ? '#27ae60' : 'inherit';
    document.getElementById('checkoutTotal').textContent = formatPrice(subtotal + shipping);
  }

  function selectOption(el, group) {
    el.closest('.radio-options').querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    const radio = el.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
    if (group === 'shipping') renderSummary();
    if (group === 'payment') {
      const bankInfo = document.getElementById('bankInfo');
      if (bankInfo) bankInfo.style.display = (radio && radio.value === 'bank') ? 'block' : 'none';
    }
  }

  function placeOrder() {
    const required = ['fullName', 'phone', 'email', 'address'];
    let valid = true;
    required.forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) { el.style.borderColor = 'var(--red)'; valid = false; }
      else el.style.borderColor = '';
    });
    if (!valid)           { Toast.show('⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!', 'error'); return; }
    if (!Cart.get().length) { Toast.show('⚠️ Giỏ hàng trống!', 'error'); return; }

    const btn = document.getElementById('placeOrderBtn');
    btn.textContent = '⏳ Đang xử lý...';
    btn.disabled = true;

    setTimeout(() => {
      const code = 'BS' + Date.now().toString().slice(-7);
      document.getElementById('orderCode').textContent = '#' + code;
      document.getElementById('successModal').style.display = 'flex';
      Cart.save([]);
      btn.textContent = '✅ Đặt hàng ngay';
      btn.disabled = false;
    }, 1500);
  }

  // Payment method toggle (replaces inline radio change listener)
  document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const bankInfo = document.getElementById('bankInfo');
      if (bankInfo) bankInfo.style.display = radio.value === 'bank' ? 'block' : 'none';
    });
  });

  // Radio option click (replaces inline onclick="selectOption(this, 'group')")
  document.querySelectorAll('.radio-option[data-option-group]').forEach(el => {
    el.addEventListener('click', () => selectOption(el, el.dataset.optionGroup));
  });

  // Place order button (replaces inline onclick="placeOrder()")
  document.getElementById('placeOrderBtn')?.addEventListener('click', placeOrder);

  renderSummary();
}

// ============================================================
// CONTACT PAGE  [extracted from contact.html]
// ============================================================
function initContactPage() {
  const faqList = document.getElementById('faqList');
  if (!faqList) return;

  const faqs = [
    { q: 'Làm sao để theo dõi đơn hàng?',   a: 'Vào mục "Tra cứu đơn hàng" trên website hoặc gọi hotline 1800 6236.' },
    { q: 'Chính sách đổi trả như thế nào?',  a: 'Đổi trả trong vòng 30 ngày, sách còn nguyên vẹn, có hóa đơn. Hoàn tiền 100%.' },
    { q: 'Khi nào thì nhận được sách?',       a: 'Giao tiêu chuẩn: 3-5 ngày. Giao nhanh: 1-2 ngày. Nội thành TP.HCM: trong ngày.' },
    { q: 'Có giao hàng quốc tế không?',       a: 'Hiện tại chúng tôi chỉ giao hàng trong nước. Dự kiến mở rộng sang Đông Nam Á vào 2026.' },
  ];

  faqs.forEach((faq, i) => {
    const div = document.createElement('div');
    div.style.cssText = 'border-bottom:1px solid var(--gray-200);margin-bottom:8px';
    div.innerHTML = `
      <button class="faq-toggle" data-faq-index="${i}" style="width:100%;text-align:left;padding:12px 4px;font-size:.87rem;font-weight:600;color:var(--gray-900);display:flex;justify-content:space-between;align-items:center">
        ${faq.q} <span id="faq-icon-${i}" style="color:var(--red);font-size:1.1rem;flex-shrink:0;margin-left:8px">+</span>
      </button>
      <div id="faq-ans-${i}" style="display:none;padding:0 4px 12px;font-size:.85rem;color:var(--gray-600);line-height:1.6">${faq.a}</div>`;
    faqList.appendChild(div);
  });

  // Replaces inline onclick="toggleFaq(i)"
  faqList.addEventListener('click', e => {
    const btn = e.target.closest('.faq-toggle');
    if (!btn) return;
    const i   = parseInt(btn.dataset.faqIndex);
    const ans  = document.getElementById('faq-ans-' + i);
    const icon = document.getElementById('faq-icon-' + i);
    const isOpen = ans.style.display !== 'none';
    ans.style.display  = isOpen ? 'none' : 'block';
    icon.textContent   = isOpen ? '+' : '−';
  });

  // Submit contact form (replaces inline onclick="submitContact()")
  document.querySelector('.contact-form-card .btn-primary')?.addEventListener('click', submitContact);
}

function submitContact() {
  const name    = document.getElementById('ctName').value.trim();
  const email   = document.getElementById('ctEmail').value.trim();
  const subject = document.getElementById('ctSubject').value;
  const message = document.getElementById('ctMessage').value.trim();
  const consent = document.getElementById('ctConsent').checked;

  if (!name || !email || !subject || !message) {
    Toast.show('⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!', 'error'); return;
  }
  if (!consent) {
    Toast.show('⚠️ Vui lòng đồng ý với điều khoản liên hệ!', 'error'); return;
  }

  const btn = document.querySelector('.contact-form-card .btn-primary');
  btn.innerHTML = '⏳ Đang gửi...';
  btn.disabled  = true;

  setTimeout(() => {
    Toast.show('✅ Tin nhắn đã được gửi! Chúng tôi sẽ liên hệ trong 24 giờ.', 'success');
    ['ctName', 'ctEmail', 'ctPhone', 'ctSubject', 'ctMessage'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('ctConsent').checked = false;
    btn.innerHTML = '📩 Gửi tin nhắn';
    btn.disabled  = false;
  }, 1200);
}

// ============================================================
// FLASH SALE PAGE  [extracted from flash-sale.html]
// ============================================================
function initFlashSalePage() {
  const flashPageGrid = document.getElementById('flashPageGrid');
  if (!flashPageGrid) return;

  // Tổng kho mỗi sách (ngẫu nhiên 80–200 cuốn, cố định theo index)
  const totalStocks = [150, 120, 80, 200, 100, 180, 90, 160, 110, 140];

  const flashData = booksData.map((b, i) => {
    const soldPct     = [82, 65, 91, 45, 70, 55, 78, 88, 60, 95][i] || 70;
    const total       = totalStocks[i] || 120;
    const remaining   = Math.max(1, Math.round(total * (1 - soldPct / 100)));
    return {
      ...b,
      flashPrice:    Math.round(b.price * (0.4 + Math.random() * 0.2)),
      flashDiscount: [40, 45, 50, 55, 60, 35, 42, 48, 38, 52][i] || 40,
      soldPct,
      totalStock: total,
      remaining,
    };
  });

  function stockBadge(remaining) {
    if (remaining <= 5)  return `<span class="flash-stock-badge very-low">🔥 Còn ${remaining} cuốn!</span>`;
    if (remaining <= 20) return `<span class="flash-stock-badge low">⚡ Còn ${remaining} cuốn</span>`;
    return                      `<span class="flash-stock-badge">Còn ${remaining} cuốn</span>`;
  }

  function renderFlash(filter) {
    const filtered = filter === 'all' ? flashData : flashData.filter(b => b.category === filter);
    const countEl  = document.getElementById('flashCount');
    if (countEl) countEl.textContent = filtered.length;
    flashPageGrid.innerHTML = filtered.map(book => `
      <div class="flash-page-card" data-product data-product-id="${book.id}" data-product-name="${book.name}" data-product-price="${book.flashPrice}" data-product-image="${book.image}" data-product-author="${book.author}">
        <div style="position:relative">
          <img class="flash-page-img" src="${book.image}" alt="${book.name}" loading="lazy">
          <span style="position:absolute;top:8px;left:8px;background:var(--red);color:#fff;font-size:.72rem;font-weight:700;padding:3px 8px;border-radius:4px">-${book.flashDiscount}%</span>
          ${book.remaining <= 5 ? '<span style="position:absolute;top:8px;right:8px;background:#e67e22;color:#fff;font-size:.68rem;font-weight:700;padding:2px 7px;border-radius:4px">🔥 Sắp hết</span>' : ''}
          ${stockBadge(book.remaining)}
        </div>
        <div class="flash-page-body">
          <div class="flash-page-name">${book.name}</div>
          <div style="font-size:.75rem;color:var(--gray-400);margin-bottom:8px">${book.author}</div>
          <div class="flash-page-prices">
            <span class="flash-page-sale">${formatPrice(book.flashPrice)}</span>
            <span class="flash-page-orig">${formatPrice(book.price)}</span>
            <span class="flash-page-disc">-${book.flashDiscount}%</span>
          </div>
          <div class="flash-prog"><div class="flash-prog-fill" style="width:${book.soldPct}%"></div></div>
          <div class="flash-prog-text">Đã bán: ${book.soldPct}% &nbsp;·&nbsp; Còn lại: <b style="color:var(--red)">${book.remaining}</b> cuốn</div>
          <button class="flash-add-btn" data-add-cart>🛒 Mua ngay</button>
        </div>
      </div>`).join('');
    initAddToCart();
  }

  // Filter buttons (replaces inline onclick="filterFlash(this, cat)")
  document.querySelectorAll('[data-flash-filter]').forEach(btn => {
    btn.addEventListener('click', function () {
      const container = this.closest('div');
      container.querySelectorAll('button').forEach(b => {
        b.classList.remove('active');
        b.style.background   = 'transparent';
        b.style.color        = 'var(--gray-700)';
        b.style.borderColor  = 'var(--gray-200)';
      });
      this.classList.add('active');
      this.style.background  = 'var(--red)';
      this.style.color       = '#fff';
      this.style.borderColor = 'var(--red)';
      renderFlash(this.dataset.flashFilter);
    });
  });

  // Session tab buttons (replaces inline onclick="setSession(this, session)")
  document.querySelectorAll('.flash-tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.flash-tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Pagination
  document.querySelectorAll('.pagination .page-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.pagination .page-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  renderFlash('all');
  initCountdown(Date.now() + 5 * 3600000 + 59 * 60000 + 59000, 'fsp_');
}

// ============================================================
// INDEX PAGE  [extracted from index.html]
// ============================================================
const comboBundles = [
  {
    id: 'combo_001',
    combo: true,
    name: 'Combo Tâm lý & Tình yêu',
    items: ['Tử huyệt cảm xúc', 'Bí Mật Hành Trình Tình Yêu'],
    itemIds: ['b001', 'b005'],
    sale: 149000,
    originalPrice: 183000,
    category: 'Combo sách',
    author: 'Nhiều tác giả',
    publisher: 'BookStore',
    year: 2025,
    pages: 610,
    size: 'Mix 2 cuốn',
    cover: 'Bìa mềm',
    language: 'Tiếng Việt',
    rating: 4.7,
    sold: 1080,
    description: '<p>Combo chọn lọc gồm hai cuốn sách phát triển cảm xúc và khám phá tình yêu, giúp bạn cân bằng nội tâm và xây dựng mối quan hệ bền vững.</p><ul><li><strong>Tử huyệt cảm xúc</strong> – Giải mã cách cảm xúc ảnh hưởng đến quyết định và hành động.</li><li><strong>Bí Mật Hành Trình Tình Yêu</strong> – Cẩm nang xây dựng mối quan hệ chân thành, bền vững và ngọt ngào.</li></ul>',
    images: [booksData.find(book => book.id === 'b001')?.image || '', booksData.find(book => book.id === 'b005')?.image || ''],
  },
  {
    id: 'combo_002',
    combo: true,
    name: 'Combo Văn học Việt Nam',
    items: ['Một đứa con đã khôn ngoan', 'Con hoang'],
    itemIds: ['b002', 'b003'],
    sale: 139000,
    originalPrice: 164000,
    category: 'Combo sách',
    author: 'Nhiều tác giả',
    publisher: 'BookStore',
    year: 2025,
    pages: 630,
    size: 'Mix 2 cuốn',
    cover: 'Bìa mềm',
    language: 'Tiếng Việt',
    rating: 4.6,
    sold: 760,
    description: '<p>Bộ đôi văn học Việt Nam truyền cảm hứng về số phận, nghị lực và tinh thần bền bỉ. Phù hợp với độc giả yêu thích câu chuyện sâu sắc và giàu nhân văn.</p><ul><li><strong>Một đứa con đã khôn ngoan</strong> – Hành trình tự lực đầy thông minh của một đứa trẻ nghèo khó.</li><li><strong>Con hoang</strong> – Câu chuyện về tình người, sự kiên cường và sự hồi sinh.</li></ul>',
    images: [booksData.find(book => book.id === 'b002')?.image || '', booksData.find(book => book.id === 'b003')?.image || ''],
  },
  {
    id: 'combo_003',
    combo: true,
    name: 'Combo Lịch sử & Văn hóa',
    items: ['Thần, Người Và Đất Việt', 'Tuyển Tập Truyện Ngắn Vũ Trọng Phụng'],
    itemIds: ['b004', 'b008'],
    sale: 239000,
    originalPrice: 305000,
    category: 'Combo sách',
    author: 'Nhiều tác giả',
    publisher: 'BookStore',
    year: 2025,
    pages: 700,
    size: 'Mix 2 cuốn',
    cover: 'Bìa mềm',
    language: 'Tiếng Việt',
    rating: 4.8,
    sold: 960,
    description: '<p>Combo giàu giá trị sử liệu và văn học, mang đến góc nhìn về đất nước, con người và vẻ đẹp văn hóa Việt Nam.</p><ul><li><strong>Thần, Người Và Đất Việt</strong> – Hồi ức lịch sử và những nhân vật làm nên bản sắc dân tộc.</li><li><strong>Tuyển Tập Truyện Ngắn Vũ Trọng Phụng</strong> – Những câu chuyện châm biếm sắc sảo về xã hội Việt Nam thời kỳ đầu thế kỷ 20.</li></ul>',
    images: [booksData.find(book => book.id === 'b004')?.image || '', booksData.find(book => book.id === 'b008')?.image || ''],
  },
  {
    id: 'combo_004',
    combo: true,
    name: 'Combo Thiếu nhi & Truyền cảm hứng',
    items: ['Hoàng Tử Bé', 'Tuổi thơ dữ dội'],
    itemIds: ['b010', 'b006'],
    sale: 118000,
    originalPrice: 143000,
    category: 'Combo sách',
    author: 'Nhiều tác giả',
    publisher: 'BookStore',
    year: 2025,
    pages: 400,
    size: 'Mix 2 cuốn',
    cover: 'Bìa mềm',
    language: 'Tiếng Việt',
    rating: 4.9,
    sold: 1320,
    description: '<p>Combo dành cho độc giả trẻ và gia đình, kết hợp hai câu chuyện cổ tích và ký ức tuổi thơ đầy cảm xúc.</p><ul><li><strong>Hoàng Tử Bé</strong> – Triết lý giản đơn về tình yêu, sự trưởng thành và lòng nhân ái.</li><li><strong>Tuổi thơ dữ dội</strong> – Hồi ức tuổi thơ can đảm giữa những ngày chiến tranh.</li></ul>',
    images: [booksData.find(book => book.id === 'b010')?.image || '', booksData.find(book => book.id === 'b006')?.image || ''],
  },
];

function findProductById(id) {
  return booksData.find(book => book.id === id) ?? comboBundles.find(bundle => bundle.id === id) ?? null;
}

function initIndexPage() {
  const flashGrid = document.getElementById('flashGrid');
  const comboGrid = document.getElementById('comboGrid');
  const newTrack = document.getElementById('sliderNewTrack');
  const bestTrack = document.getElementById('sliderBestTrack');

  if (flashGrid) {
    const progValues = [82, 65, 91, 74, 88];
    const hotBooks = booksData.filter(b => b.badge === 'hot');
    const extraBooks = booksData.filter(b => b.badge !== 'hot' && b.discount).sort((a, b) => b.discount - a.discount);
    const flashBooks = [...hotBooks, ...extraBooks].slice(0, 5);

    flashGrid.innerHTML = flashBooks.map((book, i) => `
      <div class="product-card flash-product-card" style="cursor:pointer"
           data-product
           data-product-id="${book.id}"
           data-product-name="${book.name}"
           data-product-price="${book.price}"
           data-product-image="${book.image}"
           data-product-author="${book.author}">
        <div class="product-img-wrap">
          <img src="${book.image}" alt="${book.name}" loading="lazy">
          <div class="product-badge">-${book.discount}%</div>
          <div class="product-actions">
            <button class="action-btn" title="Yêu thích">♥</button>
            <button class="action-btn" data-add-cart title="Thêm vào giỏ">🛒</button>
            <a href="product-detail.html?id=${book.id}" class="action-btn" title="Xem chi tiết">👁</a>
          </div>
        </div>
        <div class="product-info">
          <div class="product-name">${book.name}</div>
          <div class="product-author">${book.author}</div>
          <div class="product-price">
            <span class="price-sale">${formatPrice(book.price)}</span>
            <span class="price-original">${formatPrice(book.originalPrice)}</span>
          </div>
          <div class="flash-progress-bar" style="margin:6px 0 2px">
            <div class="flash-progress-fill" style="width:${progValues[i]}%"></div>
          </div>
          <div class="flash-progress-text" style="font-size:.74rem;color:#888;margin-bottom:6px">Đã bán ${progValues[i]}%</div>
          <button class="btn-add-cart" data-add-cart style="font-size:.82rem;padding:8px">Mua ngay</button>
        </div>
      </div>`).join('');

    initAddToCart();
    initProductCardLinks();
  }

  if (comboGrid) {
    const renderComboCard = combo => {
      const discount = Math.round((1 - combo.sale / combo.originalPrice) * 100);
      const itemLabel = combo.items.join(' + ');
      return `
        <div class="combo-card product-card" style="cursor:pointer"
             data-product
             data-product-id="${combo.id}"
             data-product-name="${combo.name}"
             data-product-price="${combo.sale}"
             data-product-image="${combo.images[0]}"
             data-product-author="${combo.author}">
          <div class="combo-images">
            <img src="${combo.images[0]}" alt="${combo.name}" loading="lazy">
            <img src="${combo.images[1]}" alt="${combo.name}" loading="lazy">
            <span class="combo-discount-tag">-${discount}%</span>
            <div class="product-actions">
              <button class="action-btn" title="Yêu thích">♥</button>
              <button class="action-btn" data-add-cart title="Thêm vào giỏ">🛒</button>
              <a href="product-detail.html?id=${combo.id}" class="action-btn" title="Xem chi tiết">👁</a>
            </div>
          </div>
          <div class="combo-info product-info">
            <div>
              <div class="combo-name product-name">${combo.name}</div>
              <div class="combo-items product-author">${itemLabel}</div>
            </div>
            <div>
              <div class="combo-price product-price">
                <span class="combo-sale price-sale">${formatPrice(combo.sale)}</span>
                <span class="combo-original price-original">${formatPrice(combo.originalPrice)}</span>
                <span class="price-discount">-${discount}%</span>
              </div>
              <button class="btn-add-cart" data-add-cart style="margin-top:10px;font-size:.85rem">Mua combo</button>
            </div>
          </div>
        </div>`;
    };

    comboGrid.innerHTML = comboBundles.map(renderComboCard).join('');
    initAddToCart();
    initProductCardLinks();
  }

  if (newTrack || bestTrack) {
    const newBooks  = [...booksData].sort(() => 0.5 - Math.random()).slice(0, 10);
    const bestBooks = [...booksData].sort((a, b) => b.sold - a.sold).slice(0, 10);

    if (newTrack) newTrack.innerHTML = newBooks.map(b => renderProductCard(b)).join('');
    if (bestTrack) bestTrack.innerHTML = bestBooks.map(b => renderProductCard(b)).join('');

    initAddToCart();
    initProductCardLinks();
  }

  const isMobile = window.innerWidth < 768;
  const perView  = isMobile ? 2 : 5;
  initProductSlider('sliderNew', perView);
  initProductSlider('sliderBest', perView);
}

// ============================================================
// LOGIN / REGISTER PAGE  [extracted from login-register.html]
// ============================================================
function initLoginPage() {
  if (!document.getElementById('loginForm')) return;

  // Tab switching (replaces inline onclick="switchAuth('login|register')")
  function switchAuth(mode) {
    const isLogin = mode === 'login';
    document.getElementById('loginForm').style.display    = isLogin ? 'block' : 'none';
    document.getElementById('registerForm').style.display = isLogin ? 'none' : 'block';
    document.getElementById('loginTab').classList.toggle('active', isLogin);
    document.getElementById('registerTab').classList.toggle('active', !isLogin);
    document.getElementById('authHeading').textContent    = isLogin ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới';
    document.getElementById('authSubheading').textContent = isLogin
      ? 'Đăng nhập để theo dõi đơn hàng và nhận ưu đãi'
      : 'Đăng ký để nhận ngay voucher 50.000đ cho đơn đầu tiên';
  }

  // Toggle password visibility (replaces inline onclick="togglePass(id, this)")
  function togglePass(id, btn) {
    const input = document.getElementById(id);
    input.type  = input.type === 'password' ? 'text' : 'password';
    btn.textContent = input.type === 'password' ? '👁' : '🙈';
  }

  function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pass  = document.getElementById('loginPass').value;
    if (!email || !pass) { Toast.show('⚠️ Vui lòng nhập email và mật khẩu!', 'error'); return; }
    const btn = document.querySelector('#loginForm .auth-submit');
    btn.textContent = '⏳ Đang đăng nhập...';
    btn.disabled = true;
    setTimeout(() => {
      Toast.show('✅ Đăng nhập thành công! Chào mừng bạn trở lại.', 'success');
      setTimeout(() => window.location.href = 'index.html', 1200);
    }, 1000);
  }

  function handleRegister() {
    const firstName = document.getElementById('regFirstName').value.trim();
    const email     = document.getElementById('regEmail').value.trim();
    const pass      = document.getElementById('regPass').value;
    const confirm   = document.getElementById('regPassConfirm').value;
    const agree     = document.getElementById('agreeTerms').checked;

    if (!firstName || !email || !pass)  { Toast.show('⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!', 'error'); return; }
    if (pass !== confirm)               { Toast.show('❌ Mật khẩu xác nhận không khớp!', 'error'); return; }
    if (!agree)                         { Toast.show('⚠️ Vui lòng đồng ý với điều khoản sử dụng!', 'error'); return; }

    const btn = document.querySelector('#registerForm .auth-submit');
    btn.textContent = '⏳ Đang tạo tài khoản...';
    btn.disabled = true;
    setTimeout(() => {
      Toast.show('🎉 Tạo tài khoản thành công! Kiểm tra email để xác thực.', 'success');
      setTimeout(() => switchAuth('login'), 1500);
      btn.textContent = 'Tạo tài khoản';
      btn.disabled = false;
    }, 1200);
  }

  function socialLogin(provider) {
    Toast.show(`🔄 Đang kết nối với ${provider}...`);
    setTimeout(() => {
      Toast.show(`✅ Đăng nhập ${provider} thành công!`, 'success');
      setTimeout(() => window.location.href = 'index.html', 1000);
    }, 1200);
  }

  // Password strength checker
  const passInput = document.getElementById('regPass');
  if (passInput) {
    passInput.addEventListener('input', () => {
      const val = passInput.value;
      let strength = 0;
      if (val.length >= 8)          strength++;
      if (/[A-Z]/.test(val))        strength++;
      if (/[0-9]/.test(val))        strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;
      const fill   = document.getElementById('passStrengthFill');
      const label  = document.getElementById('passStrengthLabel');
      const colors = ['', '#e74c3c', '#e67e22', '#f1c40f', '#27ae60'];
      const labels = ['', 'Rất yếu', 'Yếu', 'Trung bình', 'Mạnh'];
      fill.style.width      = (strength * 25) + '%';
      fill.style.background = colors[strength] || '#e74c3c';
      label.textContent     = labels[strength] || '';
      label.style.color     = colors[strength] || '';
    });
  }

  // Tab buttons (replaces inline onclick)
  document.getElementById('loginTab')?.addEventListener('click',    () => switchAuth('login'));
  document.getElementById('registerTab')?.addEventListener('click', () => switchAuth('register'));

  // Auth submit buttons (replaces inline onclick)
  document.querySelector('#loginForm .auth-submit')?.addEventListener('click', handleLogin);
  document.querySelector('#registerForm .auth-submit')?.addEventListener('click', handleRegister);

  // Social login buttons (replaces inline onclick)
  document.querySelectorAll('.social-login-btn[data-provider]').forEach(btn => {
    btn.addEventListener('click', () => socialLogin(btn.dataset.provider));
  });

  // Toggle password buttons (replaces inline onclick)
  document.querySelectorAll('[data-toggle-pass]').forEach(btn => {
    btn.addEventListener('click', () => togglePass(btn.dataset.togglePass, btn));
  });

  // Switch auth links (replaces inline onclick on anchor tags)
  document.querySelectorAll('[data-switch-auth]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); switchAuth(el.dataset.switchAuth); });
  });

  // Hash-based deep link
  if (window.location.hash === '#register') switchAuth('register');
}

// ============================================================
// ORDER LOOKUP PAGE  [extracted from order-lookup.html]
// ============================================================
function initOrderLookupPage() {
  if (!document.getElementById('orderCodeInput')) return;

  const MOCK_ORDERS = {
    'BS2025001': {
      code: 'BS2025001', date: 'Đặt lúc 09:32 – Thứ Ba, 15/04/2025', status: 2,
      address: '123 Lê Lợi, Quận 1, TP. Hồ Chí Minh', phone: '0901 234 567',
      payment: 'Thanh toán khi nhận hàng (COD)', shipping: 'Giao hàng tiêu chuẩn (3–5 ngày)',
      shippingCost: 0, discount: 0,
      contacts: ['0901234567', '0901 234 567', 'test@gmail.com'],
      items: [
        { name: 'Đắc Nhân Tâm',              author: 'Dale Carnegie',           qty: 1, price: 68000,  img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&q=80' },
        { name: 'Sapiens: Lược Sử Loài Người', author: 'Yuval Noah Harari',       qty: 1, price: 145000, img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&q=80' },
        { name: 'Hoàng Tử Bé',               author: 'Antoine de Saint-Exupéry', qty: 2, price: 45000,  img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=80' },
      ]
    },
    'BS2025002': {
      code: 'BS2025002', date: 'Đặt lúc 14:10 – Thứ Năm, 10/04/2025', status: 3,
      address: '45 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh', phone: '0912 345 678',
      payment: 'Chuyển khoản ngân hàng', shipping: 'Giao hàng nhanh (1–2 ngày)',
      shippingCost: 50000, discount: 30000,
      contacts: ['0912345678', '0912 345 678', 'user2@gmail.com'],
      items: [
        { name: 'Atomic Habits', author: 'James Clear',   qty: 1, price: 115000, img: 'https://images.unsplash.com/photo-1476275466078-4cad320bc4e7?w=200&q=80' },
        { name: 'Nhà Giả Kim',   author: 'Paulo Coelho',  qty: 1, price: 75000,  img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&q=80' },
      ]
    }
  };

  const STEPS = [
    { label: 'Chờ xác nhận',    icon: '🕐', date: '15/04 09:32' },
    { label: 'Đang xử lý',      icon: '⚙️', date: '15/04 10:15' },
    { label: 'Đang giao hàng',  icon: '🚚', date: '16/04 08:00' },
    { label: 'Hoàn thành',      icon: '✅', date: '' },
  ];

  const STATUS_CHIPS = [
    { cls: 'pending',  text: '⏳ Chờ xác nhận' },
    { cls: 'pending',  text: '⚙️ Đang xử lý' },
    { cls: 'shipping', text: '🚚 Đang giao hàng' },
    { cls: 'order-status-chip', text: '✅ Hoàn thành' },
  ];

  function normaliseContact(str) {
    return str.replace(/[\s\-\.]/g, '').toLowerCase();
  }

  function renderStepper(activeStep) {
    const stepper = document.getElementById('stepperEl');
    stepper.innerHTML = STEPS.map((s, i) => {
      const isDone   = i < activeStep;
      const isActive = i === activeStep;
      return `
        <div class="stepper-step">
          <div class="step-circle ${isDone ? 'done' : isActive ? 'active' : ''}">${isDone ? '✓' : s.icon}</div>
          <div class="step-label ${isDone ? 'done' : isActive ? 'active' : ''}">${s.label}</div>
          <div class="step-date ${isDone ? 'done' : ''}">${isDone || isActive ? s.date : ''}</div>
        </div>`;
    }).join('');
    const gaps = STEPS.length - 1;
    const pct  = activeStep === 0 ? 0 : (activeStep / gaps) * 100;
    setTimeout(() => {
      document.getElementById('stepperProgress').style.width = pct + '%';
    }, 50);
  }

  function renderResults(order) {
    document.getElementById('lookupEmpty').classList.remove('show');
    const resultsEl = document.getElementById('lookupResults');
    resultsEl.classList.remove('show');
    void resultsEl.offsetWidth;
    resultsEl.classList.add('show');

    document.getElementById('resultOrderCode').textContent = '#' + order.code;
    document.getElementById('resultOrderDate').textContent = order.date;
    const chip = document.getElementById('resultStatusChip');
    chip.className   = 'order-status-chip ' + (STATUS_CHIPS[order.status].cls || '');
    chip.textContent = STATUS_CHIPS[order.status].text;

    renderStepper(order.status);

    const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
    document.getElementById('itemCountLabel').textContent   = order.items.length + ' sản phẩm';
    document.getElementById('orderItemsList').innerHTML = order.items.map(item => `
      <div class="order-item">
        <img class="order-item-img" src="${item.img}" alt="${item.name}" loading="lazy">
        <div class="order-item-info">
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-author">${item.author}</div>
          <span class="order-item-qty">x${item.qty}</span>
        </div>
        <div class="order-item-price">${formatPrice(item.price * item.qty)}</div>
      </div>`).join('');

    document.getElementById('resultAddress').textContent  = order.address;
    document.getElementById('resultPhone').textContent    = order.phone;
    document.getElementById('resultPayment').textContent  = order.payment;
    document.getElementById('resultShipping').textContent = order.shipping;
    document.getElementById('resultSubtotal').textContent = formatPrice(subtotal);

    const discountRow = document.getElementById('resultDiscountRow');
    if (order.discount > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('resultDiscount').textContent = '-' + formatPrice(order.discount);
    } else {
      discountRow.style.display = 'none';
    }
    document.getElementById('resultTotal').textContent = formatPrice(subtotal + order.shippingCost - order.discount);

    setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  function showEmpty() {
    document.getElementById('lookupResults').classList.remove('show');
    const emptyEl = document.getElementById('lookupEmpty');
    emptyEl.classList.remove('show');
    void emptyEl.offsetWidth;
    emptyEl.classList.add('show');
    emptyEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function resetLookup() {
    document.getElementById('lookupResults').classList.remove('show');
    document.getElementById('lookupEmpty').classList.remove('show');
    ['orderCodeInput', 'orderContactInput'].forEach(id => {
      const el = document.getElementById(id);
      el.value = '';
      el.classList.remove('error');
    });
    document.querySelector('.lookup-hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => document.getElementById('orderCodeInput').focus(), 600);
  }

  function handleLookup() {
    const codeRaw    = document.getElementById('orderCodeInput').value.trim().toUpperCase();
    const contactRaw = document.getElementById('orderContactInput').value.trim();

    document.getElementById('orderCodeInput').classList.remove('error');
    document.getElementById('orderContactInput').classList.remove('error');

    if (!codeRaw)    { document.getElementById('orderCodeInput').classList.add('error');    Toast.show('⚠️ Vui lòng nhập mã đơn hàng!', 'error'); return; }
    if (!contactRaw) { document.getElementById('orderContactInput').classList.add('error'); Toast.show('⚠️ Vui lòng nhập số điện thoại hoặc email!', 'error'); return; }

    const btn = document.getElementById('lookupBtn');
    btn.classList.add('loading');
    btn.innerHTML = '<span style="animation:spin .8s linear infinite;display:inline-block">⏳</span> Đang tra cứu...';

    setTimeout(() => {
      btn.classList.remove('loading');
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/></svg> Tra cứu đơn hàng`;
      const order        = MOCK_ORDERS[codeRaw];
      const contactMatch = order && order.contacts.some(c => normaliseContact(c) === normaliseContact(contactRaw));
      (order && contactMatch) ? renderResults(order) : showEmpty();
    }, 900);
  }

  // Lookup button (replaces inline onclick)
  document.getElementById('lookupBtn')?.addEventListener('click', handleLookup);

  // Reset buttons (replaces inline onclick="resetLookup()")
  document.querySelectorAll('[data-reset-lookup]').forEach(btn => {
    btn.addEventListener('click', resetLookup);
  });

  // Enter key support
  ['orderCodeInput', 'orderContactInput'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleLookup();
    });
  });

  // Spin animation keyframe (injected once)
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(style);
}

// ============================================================
// PAYMENT GUIDE PAGE  [extracted from payment-guide.html]
// ============================================================
function initPaymentGuidePage() {
  if (!document.querySelector('.method-card')) return;

  // Accordion (replaces inline onclick="toggleMethod(this)")
  document.querySelectorAll('.method-header').forEach(header => {
    header.addEventListener('click', () => {
      const card   = header.closest('.method-card');
      const isOpen = card.classList.contains('open');
      document.querySelectorAll('.method-card').forEach(c => c.classList.remove('open'));
      if (!isOpen) card.classList.add('open');
    });
  });

  // Copy buttons (replaces inline onclick="copyText('...', this)")
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => copyText(btn.dataset.copy, btn));
  });

  // Active TOC on scroll
  const tocLinks = document.querySelectorAll('.guide-toc-list a');
  const sections  = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute('href')));

  function updateActiveToc() {
    const scrollY = window.scrollY + 120;
    let active = 0;
    sections.forEach((section, i) => { if (section && section.offsetTop <= scrollY) active = i; });
    tocLinks.forEach((link, i) => link.classList.toggle('active', i === active));
  }

  window.addEventListener('scroll', updateActiveToc, { passive: true });
  updateActiveToc();

  // Smooth scroll for TOC
  tocLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
    });
  });
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML    = '✓ Đã sao chép';
    btn.style.background   = '#27ae60';
    btn.style.color        = '#fff';
    btn.style.borderColor  = '#27ae60';
    setTimeout(() => {
      btn.innerHTML    = original;
      btn.style.background   = '';
      btn.style.color        = '';
      btn.style.borderColor  = '';
    }, 2000);
  }).catch(() => {
    const el = document.createElement('textarea');
    el.value = text; document.body.appendChild(el); el.select();
    document.execCommand('copy'); document.body.removeChild(el);
  });
}

// ============================================================
// PRIVACY POLICY PAGE  [extracted from privacy-policy.html]
// ============================================================
function initPrivacyPolicyPage() {
  const sections = ['sec1','sec2','sec3','sec4','sec5','sec6','sec7'];
  const links    = document.querySelectorAll('.toc-link');
  if (!links.length) return;

  // Smooth scroll (replaces inline onclick="scrollToSection('secN')")
  links.forEach((link, i) => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const el = document.getElementById(sections[i]);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Back to top (replaces inline onclick="window.scrollTo(...)")
  document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Active TOC highlight
  function updateActive() {
    let current = sections[0];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    links.forEach((link, i) => link.classList.toggle('active', sections[i] === current));
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}

// ============================================================
// PRODUCT DETAIL PAGE  [dynamic — reads ?id= from URL]
// ============================================================
function initProductDetailPage() {
  if (!document.getElementById('mainImg')) return;

  // ── Step 1: resolve product from URL ─────────────────────────
  const bookId = new URLSearchParams(window.location.search).get('id');
  const book   = bookId ? findProductById(bookId) : null;

  // ── Step 2: not found state ───────────────────────────────────
  if (!book) {
    document.querySelector('.product-detail-title')
      && (document.querySelector('.product-detail-title').innerText = 'Không tìm thấy sản phẩm');
    document.querySelector('.detail-description')
      && (document.querySelector('.detail-description').innerText = 'Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.');
    document.title = 'Sản phẩm không tồn tại – BookStore';
    return;
  }

  // ── Step 3: populate all dynamic fields ──────────────────────
  document.title = `${book.name} – BookStore`;

  const mainImg = document.getElementById('mainImg');
  if (mainImg) { mainImg.src = book.image || book.images?.[0] || ''; mainImg.alt = book.name; }

  const titleEl = document.querySelector('.product-detail-title');
  if (titleEl) titleEl.innerText = book.name;

  const authorEl = document.getElementById('detail-author-name');
  if (authorEl) authorEl.innerText = book.author || (book.combo ? 'Nhiều tác giả' : '');

  const categoryEl = document.querySelector('.product-detail-category');
  if (categoryEl) categoryEl.innerText = `📚 ${book.category || (book.combo ? 'Combo sách' : '')}`;

  const salePriceEl = document.querySelector('.detail-price-sale');
  if (salePriceEl) salePriceEl.innerText = formatPrice(book.sale || book.price);

  const origPriceEl = document.querySelector('.detail-price-original');
  if (origPriceEl) origPriceEl.innerText = formatPrice(book.originalPrice || book.original);

  const discountEl = document.querySelector('.detail-discount-tag');
  if (discountEl) {
    const discountValue = book.discount ?? Math.round((1 - (book.sale || book.price) / (book.originalPrice || book.original || (book.price || 1))) * 100);
    discountEl.innerText = `-${discountValue}%`;
  }

  const descEl = document.querySelector('.detail-description');
  if (descEl) descEl.innerHTML = book.description || '';

  const ratingEl = document.querySelector('.product-rating .stars');
  if (ratingEl) {
    const stars = '★'.repeat(Math.floor(book.rating || 0)) + '☆'.repeat(5 - Math.floor(book.rating || 0));
    ratingEl.innerText = stars;
  }

  const ratingNumEl = document.querySelector('.product-rating span:nth-child(2)');
  if (ratingNumEl) ratingNumEl.innerText = book.rating || '0.0';

  const ratingCountEl = document.querySelector('.rating-count');
  if (ratingCountEl) ratingCountEl.innerText = `(${book.sold || 0} đánh giá)`;

  const publisherEl = document.querySelector('.product-detail-meta span:nth-child(2) b');
  if (publisherEl) publisherEl.innerText = book.publisher || (book.combo ? 'BookStore' : 'Nhà xuất bản');

  const yearEl = document.querySelector('.product-detail-meta span:nth-child(3) b');
  if (yearEl) yearEl.innerText = book.year || 'Năm';

  // Specs table
  const specsTable = document.querySelector('.detail-tab-panel[data-tab-panel="specs"] table');
  if (specsTable) {
    const rows = specsTable.querySelectorAll('tr');
    if (rows[0]) rows[0].querySelector('td:last-child').innerText = book.author;
    if (rows[1]) rows[1].querySelector('td:last-child').innerText = book.publisher;
    if (rows[2]) rows[2].querySelector('td:last-child').innerText = book.year;
    if (rows[3]) rows[3].querySelector('td:last-child').innerText = book.pages;
    if (rows[4]) rows[4].querySelector('td:last-child').innerText = book.size;
    if (rows[5]) rows[5].querySelector('td:last-child').innerText = book.cover;
    if (rows[6]) rows[6].querySelector('td:last-child').innerText = book.language;
    if (rows[7]) rows[7].querySelector('td:last-child').innerText = `ISBN-${book.id.slice(1)}`;
  }

  // Sync data-product-* attributes so initAddToCart() reads the right item
  const wrapper = document.getElementById('detailProduct');
  if (wrapper) {
    wrapper.dataset.productId     = book.id;
    wrapper.dataset.productName   = book.name;
    wrapper.dataset.productPrice  = book.sale || book.price;
    wrapper.dataset.productImage  = book.image || book.images?.[0] || '';
    wrapper.dataset.productAuthor = book.author || (book.combo ? 'Nhiều tác giả' : '');
  }

  // ── Thumbnail gallery ─────────────────────────────────────────
  document.querySelectorAll('.thumb[data-src]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('mainImg').src = el.dataset.src;
    });
  });

  // ── Qty controls ──────────────────────────────────────────────
  document.querySelector('.qty-btn.minus')?.addEventListener('click', () => {
    const input = document.getElementById('detailQty');
    if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
  });
  document.querySelector('.qty-btn.plus')?.addEventListener('click', () => {
    const input = document.getElementById('detailQty');
    input.value = parseInt(input.value) + 1;
  });

  // ── Cart buttons ──────────────────────────────────────────────
  const getQty = () => parseInt(document.getElementById('detailQty').value) || 1;

  document.getElementById('addToCartBtn')?.addEventListener('click', () => {
    Cart.add({ id: book.id, name: book.name, price: book.price, image: book.image, author: book.author, qty: getQty() });
  });

  document.getElementById('buyNowBtn')?.addEventListener('click', () => {
    Cart.add({ id: book.id, name: book.name, price: book.price, image: book.image, author: book.author, qty: getQty() });
    window.location.href = 'checkout.html';
  });

  // ── Detail tabs ───────────────────────────────────────────────
  document.querySelectorAll('.detail-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.detail-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === target));
      document.querySelectorAll('.detail-tab-panel').forEach(p => p.classList.toggle('active', p.dataset.tabPanel === target));
    });
  });

  // ── Related products (exclude current book) ───────────────────
  const grid = document.getElementById('relatedGrid');
  if (grid) {
    booksData.filter(b => b.id !== book.id).slice(0, 4).forEach(b => { grid.innerHTML += renderProductCard(b); });
    initAddToCart();
    initProductCardLinks();
  }
}

// ============================================================
// INIT ON DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  initMobileMenu();
  initAddToCart();
  initQtyControls();
  initTabs('.tab-group');
  initTabs('.detail-tabs');
  initProductCardLinks();

  // Banner slider
  initBannerSlider('mainBanner');

  // Product sliders — fallback; pages call initProductSlider() after rendering
  setTimeout(() => {
    const isMobile = window.innerWidth < 768;
    const perView  = isMobile ? 2 : 5;
    ['sliderNew', 'sliderBest'].forEach(id => initProductSlider(id, perView));
  }, 100);

  // Flash sale countdown: 6h from now
  const endTime = Date.now() + 6 * 3600000;
  initCountdown(endTime, 'fs_');
  initCountdown(endTime, 'fsp_');

  // ── Page-specific initialisers ──────────────────────────
  initAboutCounters();
  initBlogPage();
  initCartPage();
  initCategoryPage();
  initCheckoutPage();
  initContactPage();
  initFlashSalePage();
  initIndexPage();
  initLoginPage();
  initOrderLookupPage();
  initPaymentGuidePage();
  initPrivacyPolicyPage();
  initProductDetailPage();
});