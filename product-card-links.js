// ============================================================
// BOOKSTORE – PRODUCT CARD CLICK NAVIGATION
// Paste this function into components.js (after renderProductCard),
// then call initProductCardLinks() inside the DOMContentLoaded
// block in main.js (after initAddToCart()).
// ============================================================

function initProductCardLinks() {
  document.querySelectorAll('.product-card[data-product-id]').forEach(card => {
    card.style.cursor = 'pointer'; // visual affordance

    card.addEventListener('click', (e) => {
      // Bail out when the click originated from any button or the
      // "quick view" anchor inside the card actions overlay.
      if (e.target.closest('[data-add-cart]') || e.target.closest('a')) return;

      const bookId = card.dataset.productId;
      if (bookId) {
        window.location.href = `product-detail.html?id=${bookId}`;
      }
    });
  });
}


