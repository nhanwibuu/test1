// ============================================================
// BOOKSTORE – DYNAMIC PRODUCT DETAIL RENDERER
// Replace the existing initProductDetailPage() in main.js with
// this version.  Requires books-data.js to be loaded first.
// ============================================================

// ── Helpers ──────────────────────────────────────────────────

function getBookIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function findBookById(id) {
  // booksData is defined in books-data.js (loaded before main.js)
  return booksData.find(book => book.id === id) ?? null;
}

/**
 * Formats a Vietnamese price number into "145.000đ".
 */
function formatDetailPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ';
}

// ── Main renderer ────────────────────────────────────────────

function renderBookDetail(book) {
  // ── <title> ────────────────────────────────────────────────
  document.title = `${book.name} – BookStore`;

  // ── Main image ─────────────────────────────────────────────
  const mainImg = document.getElementById('mainImg');
  if (mainImg) {
    mainImg.src = book.image;
    mainImg.alt = book.name;
  }

  // ── Title ──────────────────────────────────────────────────
  const titleEl = document.querySelector('.product-detail-title');
  if (titleEl) titleEl.innerText = book.name;

  // ── Author (inside the meta row) ───────────────────────────
  // The HTML has: <span>Tác giả: <b>Yuval Noah Harari</b></span>
  // We target the <b> inside the first .product-detail-meta span.
  const authorEl = document.querySelector('.product-detail-meta span b');
  if (authorEl) authorEl.innerText = book.author;

  // ── Category ───────────────────────────────────────────────
  const categoryEl = document.querySelector('.product-detail-category');
  if (categoryEl) categoryEl.innerText = `📚 ${book.category}`;

  // ── Prices ─────────────────────────────────────────────────
  const salePriceEl = document.querySelector('.detail-price-sale');
  if (salePriceEl) salePriceEl.innerText = formatDetailPrice(book.price);

  const origPriceEl = document.querySelector('.detail-price-original');
  if (origPriceEl) origPriceEl.innerText = formatDetailPrice(book.originalPrice);

  const discountEl = document.querySelector('.detail-discount-tag');
  if (discountEl) discountEl.innerText = `-${book.discount}%`;

  // ── Description ────────────────────────────────────────────
  const descEl = document.querySelector('.detail-description');
  if (descEl) descEl.innerHTML = book.description;

  // ── Sync the data-product-* attributes used by Cart ────────
  // The detail page has a wrapper div#detailProduct with data attributes.
  // We keep those in sync so initAddToCart() picks up the right product.
  const productWrapper = document.getElementById('detailProduct');
  if (productWrapper) {
    productWrapper.dataset.productId     = book.id;
    productWrapper.dataset.productName   = book.name;
    productWrapper.dataset.productPrice  = book.price;
    productWrapper.dataset.productImage  = book.image;
    productWrapper.dataset.productAuthor = book.author;
  }

  // ── Return the resolved book so callers can reuse it ───────
  return book;
}

/**
 * Shows a friendly "not found" state when the URL id is missing or invalid.
 */
function renderBookNotFound() {
  const titleEl = document.querySelector('.product-detail-title');
  if (titleEl) titleEl.innerText = 'Không tìm thấy sản phẩm';

  const mainImg = document.getElementById('mainImg');
  if (mainImg) mainImg.src = '';

  const descEl = document.querySelector('.detail-description');
  if (descEl) descEl.innerText = 'Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.';

  document.title = 'Sản phẩm không tồn tại – BookStore';
}

// ── Updated initProductDetailPage ────────────────────────────

/**
 * Drop-in replacement for the existing initProductDetailPage() in main.js.
 *
 * Changes vs. the original:
 *  • Reads ?id=... from the URL and looks up the book in booksData.
 *  • Calls renderBookDetail() to populate all dynamic fields.
 *  • Falls back gracefully when the id is missing / unknown.
 *  • DETAIL_PRODUCT is built from the resolved book, so Add-to-Cart
 *    and Buy-Now always reflect the correct item.
 */
function initProductDetailPage() {
  // Guard: only run on the detail page
  if (!document.getElementById('mainImg')) return;

  // ── Step 3a: resolve the book from the URL ──────────────────
  const bookId = getBookIdFromURL();
  const book   = bookId ? findBookById(bookId) : null;

  if (!book) {
    renderBookNotFound();
    return;
  }

  // ── Step 3b: populate the page ─────────────────────────────
  renderBookDetail(book);

  // ── Thumbnail gallery (unchanged) ──────────────────────────
  document.querySelectorAll('.thumb[data-src]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('mainImg').src = el.dataset.src;
    });
  });

  // ── Qty controls (unchanged) ───────────────────────────────
  document.querySelector('.qty-btn.minus')?.addEventListener('click', () => {
    const input = document.getElementById('detailQty');
    if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
  });
  document.querySelector('.qty-btn.plus')?.addEventListener('click', () => {
    const input = document.getElementById('detailQty');
    input.value = parseInt(input.value) + 1;
  });

  // ── Cart object built from the resolved book ───────────────
  const DETAIL_PRODUCT = {
    id:     book.id,
    name:   book.name,
    price:  book.price,
    image:  book.image,
    author: book.author,
  };

  // ── Add to cart ────────────────────────────────────────────
  document.getElementById('addToCartBtn')?.addEventListener('click', () => {
    Cart.add({ ...DETAIL_PRODUCT, qty: parseInt(document.getElementById('detailQty').value) });
  });

  // ── Buy now ────────────────────────────────────────────────
  document.getElementById('buyNowBtn')?.addEventListener('click', () => {
    Cart.add({ ...DETAIL_PRODUCT, qty: parseInt(document.getElementById('detailQty').value) });
    window.location.href = 'checkout.html';
  });

  // ── Detail tabs (unchanged) ────────────────────────────────
  document.querySelectorAll('.detail-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.detail-tab-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.tab === target));
      document.querySelectorAll('.detail-tab-panel').forEach(p =>
        p.classList.toggle('active', p.dataset.tabPanel === target));
    });
  });

  // ── Related products (exclude the current book) ────────────
  const grid = document.getElementById('relatedGrid');
  if (grid) {
    booksData
      .filter(b => b.id !== book.id)
      .slice(0, 4)
      .forEach(b => { grid.innerHTML += renderProductCard(b); });
    initAddToCart();
    initProductCardLinks(); // make related cards clickable too
  }
}
