// ============================================================
// SHARED HTML COMPONENTS
// Inject these into pages via innerHTML or JS
// ============================================================

const TOPBAR_HTML = `
<div class="topbar">
  <div class="topbar-inner">
    <div class="topbar-left">
      <span class="topbar-hotline">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"/></svg>
        Hotline: <a href="tel:18006236">1800 6236</a>
      </span>
      <a href="#">Cửa hàng</a>
      <a href="about.html">Giới thiệu</a>
    </div>
    <div class="topbar-right">
      <a href="#">Chính sách đổi trả</a>
      <a href="#">Tra cứu đơn hàng</a>
      <a href="login-register.html">Đăng nhập</a>
    </div>
  </div>
</div>`;

const HEADER_HTML = `
<header class="main-header">
  <div class="header-inner">
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <a href="index.html" class="logo">
      <div class="logo-icon">B</div>
      <div class="logo-text">BookStore<span>Nhà sách trực tuyến</span></div>
    </a>
    <div class="header-search">
      <input type="text" placeholder="Tìm kiếm sách, tác giả, nhà xuất bản..." id="searchInput" autocomplete="off" />
      <button class="search-btn" aria-label="Tìm kiếm">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/></svg>
      </button>
    </div>
    <div class="header-icons">
      <a href="login-register.html" class="header-icon-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z"/></svg>
        <span>Tài khoản</span>
      </a>
      <a href="cart.html" class="header-icon-btn" style="position:relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
        <span class="cart-badge" style="display:none">0</span>
        <span>Giỏ hàng</span>
      </a>
    </div>
  </div>
</header>`;

const NAV_HTML = `
<nav class="main-nav">
  <div class="nav-inner">
    <div class="nav-item">
      <a href="index.html" class="nav-link">🏠 Trang chủ</a>
    </div>
    <div class="nav-item">
      <a href="category.html" class="nav-link">
        📚 Sách
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
      </a>
      <div class="mega-dropdown">
        <div class="mega-col">
          <h4>Văn học</h4>
          <a href="#">Tiểu thuyết</a>
          <a href="#">Truyện ngắn</a>
          <a href="#">Thơ ca</a>
          <a href="#">Kịch bản</a>
          <a href="#">Văn học dịch</a>
          <a href="#">Văn học Việt Nam</a>
        </div>
        <div class="mega-col">
          <h4>Kinh tế - Kinh doanh</h4>
          <a href="#">Quản trị kinh doanh</a>
          <a href="#">Marketing</a>
          <a href="#">Tài chính - Kế toán</a>
          <a href="#">Khởi nghiệp</a>
          <a href="#">Phát triển bản thân</a>
          <a href="#">Lãnh đạo</a>
        </div>
        <div class="mega-col">
          <h4>Thiếu nhi</h4>
          <a href="#">Truyện tranh</a>
          <a href="#">Truyện cổ tích</a>
          <a href="#">Sách tô màu</a>
          <a href="#">Khoa học dành cho trẻ</a>
          <a href="#">Học tiếng Anh</a>
        </div>
        <div class="mega-col">
          <h4>Khoa học - Kỹ thuật</h4>
          <a href="#">Công nghệ thông tin</a>
          <a href="#">Y học</a>
          <a href="#">Tâm lý học</a>
          <a href="#">Lịch sử</a>
          <a href="#">Địa lý</a>
        </div>
      </div>
    </div>
    <div class="nav-item">
      <a href="flash-sale.html" class="nav-link" style="color:var(--red);font-weight:700">
        ⚡ Flash Sale
      </a>
    </div>
    <div class="nav-item">
      <a href="#" class="nav-link">
        🎁 Combo tiết kiệm
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
      </a>
      <div class="simple-dropdown">
        <a href="#">Combo 2 cuốn</a>
        <a href="#">Combo 3 cuốn</a>
        <a href="#">Combo theo tác giả</a>
        <a href="#">Combo tặng kèm</a>
      </div>
    </div>
    <div class="nav-item">
      <a href="blog.html" class="nav-link">✍️ Blog sách</a>
    </div>
    <div class="nav-item">
      <a href="about.html" class="nav-link">ℹ️ Giới thiệu</a>
    </div>
    <div class="nav-item">
      <a href="contact.html" class="nav-link">📞 Liên hệ</a>
    </div>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer class="main-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="logo">
          <div class="logo-icon">B</div>
          <div class="logo-text">BookStore<span>Nhà sách trực tuyến</span></div>
        </a>
        <p>BookStore – Nhà sách trực tuyến hàng đầu Việt Nam với hơn 1 triệu đầu sách chính hãng, giao hàng toàn quốc, đổi trả dễ dàng.</p>
        <div class="footer-socials">
          <a href="#" class="social-btn" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>
          </a>
          <a href="#" class="social-btn" aria-label="Zalo">Z</a>
          <a href="#" class="social-btn" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/></svg>
          </a>
          <a href="#" class="social-btn" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Hỗ trợ khách hàng</h4>
        <a href="#">Chính sách đổi trả</a>
        <a href="#">Chính sách bảo mật</a>
        <a href="#">Điều khoản sử dụng</a>
        <a href="#">Hướng dẫn mua hàng</a>
        <a href="#">Hướng dẫn thanh toán</a>
        <a href="contact.html">Liên hệ</a>
      </div>
      <div class="footer-col">
        <h4>Về BookStore</h4>
        <a href="about.html">Giới thiệu</a>
        <a href="blog.html">Blog sách</a>
        <a href="#">Tuyển dụng</a>
        <a href="#">Đối tác xuất bản</a>
        <a href="#">Hệ thống cửa hàng</a>
        <a href="#">Nhượng quyền</a>
      </div>
      <div class="footer-col">
        <h4>Nhận ưu đãi mới nhất</h4>
        <p style="font-size:0.85rem;margin-bottom:10px">Đăng ký nhận email để không bỏ lỡ ưu đãi và sách mới.</p>
        <div class="newsletter-form">
          <input type="email" placeholder="Email của bạn..." />
          <button>Đăng ký</button>
        </div>
        <div style="margin-top:16px">
          <p style="font-size:0.82rem;margin-bottom:8px;font-weight:600;color:#aaa">PHƯƠNG THỨC THANH TOÁN</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <span style="background:rgba(255,255,255,0.1);padding:4px 10px;border-radius:4px;font-size:0.75rem">💳 Visa</span>
            <span style="background:rgba(255,255,255,0.1);padding:4px 10px;border-radius:4px;font-size:0.75rem">🏦 ATM</span>
            <span style="background:rgba(255,255,255,0.1);padding:4px 10px;border-radius:4px;font-size:0.75rem">📱 MoMo</span>
            <span style="background:rgba(255,255,255,0.1);padding:4px 10px;border-radius:4px;font-size:0.75rem">💵 COD</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2025 BookStore. Được cấp phép kinh doanh số 0123456789 – Sở KH&ĐT TP.HCM.</p>
  </div>
</footer>`;

const BOTTOM_NAV_HTML = `
<nav class="bottom-nav">
  <div class="bottom-nav-inner">
    <a href="index.html" class="bottom-nav-item active">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6-.093.1V14.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V10h2v4.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V7.246l-.093-.1-6-6z"/></svg>
      <span>Trang chủ</span>
    </a>
    <a href="category.html" class="bottom-nav-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/></svg>
      <span>Danh mục</span>
    </a>
    <a href="flash-sale.html" class="bottom-nav-item" style="color:var(--red)">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/></svg>
      <span>Flash Sale</span>
    </a>
    <a href="cart.html" class="bottom-nav-item" style="position:relative">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
      <span class="bnav-badge" style="display:none">0</span>
      <span>Giỏ hàng</span>
    </a>
    <a href="login-register.html" class="bottom-nav-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z"/></svg>
      <span>Tài khoản</span>
    </a>
  </div>
</nav>`;

const MOBILE_MENU_HTML = `
<div class="mobile-overlay"></div>
<div class="mobile-menu">
  <div class="mobile-menu-header">
    <h3>📚 BookStore Menu</h3>
    <button class="mobile-close">✕</button>
  </div>
  <div class="mobile-menu-items">
    <a href="index.html">🏠 Trang chủ</a>
    <a href="category.html">📚 Tất cả sách</a>
    <a href="flash-sale.html">⚡ Flash Sale</a>
    <a href="cart.html">🛒 Giỏ hàng</a>
    <a href="blog.html">✍️ Blog sách</a>
    <a href="about.html">ℹ️ Giới thiệu</a>
    <a href="contact.html">📞 Liên hệ</a>
    <a href="login-register.html">👤 Đăng nhập / Đăng ký</a>
  </div>
</div>`;

// ============================================================
// SAMPLE PRODUCT DATA
// ============================================================
const SAMPLE_BOOKS = [
  {
    id: 'b001', name: 'Đắc Nhân Tâm', author: 'Dale Carnegie',
    price: 68000, originalPrice: 95000, discount: 28, category: 'Kỹ năng sống',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80',
    rating: 4.8, sold: 1200, badge: 'hot',
    description: '<b>Đắc Nhân Tâm</b> là cuốn sách kỹ năng sống bán chạy nhất mọi thời đại với hơn 30 triệu bản được tiêu thụ trên toàn cầu. Dale Carnegie đúc kết những nguyên tắc vàng giúp bạn chinh phục lòng người, xây dựng mối quan hệ bền vững và trở thành người có sức ảnh hưởng trong cuộc sống lẫn công việc.<br><br>Dù bạn là ai — nhà quản lý, nhân viên hay sinh viên — những bài học trong cuốn sách này sẽ thay đổi cách bạn giao tiếp và tư duy mãi mãi.',
  },
  {
    id: 'b002', name: 'Nhà Giả Kim', author: 'Paulo Coelho',
    price: 75000, originalPrice: 105000, discount: 29, category: 'Văn học',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80',
    rating: 4.9, sold: 980, badge: null,
    description: '<b>Nhà Giả Kim</b> là hành trình tâm linh đầy mê hoặc của Santiago — chàng chăn cừu người Tây Ban Nha dám từ bỏ tất cả để đi tìm kho báu của mình tận Kim Tự Tháp Ai Cập. Trên con đường đó, anh khám phá ra rằng kho báu thực sự không nằm ở điểm đến, mà ở chính hành trình và những con người anh gặp gỡ.<br><br>Cuốn tiểu thuyết triết lý của Paulo Coelho đã chạm đến triệu triệu trái tim với thông điệp bất hủ: <b>Hãy lắng nghe trái tim và theo đuổi vận mệnh của mình.</b>',
  },
  {
    id: 'b003', name: 'Tuổi Thơ Dữ Dội', author: 'Phùng Quán',
    price: 89000, originalPrice: 120000, discount: 26, category: 'Văn học Việt Nam',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    rating: 4.7, sold: 756, badge: 'new',
    description: '<b>Tuổi Thơ Dữ Dội</b> là tác phẩm kinh điển của nhà văn Phùng Quán, tái hiện chân thực và xúc động hình ảnh những cậu bé trinh sát nhỏ tuổi trong cuộc kháng chiến chống Pháp gian khổ. Giữa bom đạn và hy sinh, tình bạn, lòng dũng cảm và tình yêu quê hương vẫn bừng sáng như ngọn lửa không bao giờ tắt.<br><br>Đây là cuốn sách mà mỗi người Việt Nam nên đọc ít nhất một lần trong đời — để hiểu, để nhớ và để trân trọng hòa bình hôm nay.',
  },
  {
    id: 'b004', name: 'Sapiens: Lược Sử Loài Người', author: 'Yuval Noah Harari',
    price: 145000, originalPrice: 199000, discount: 27, category: 'Lịch sử',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80',
    rating: 4.8, sold: 2100, badge: 'hot',
    description: '<b>Sapiens</b> dẫn dắt người đọc qua hành trình 70.000 năm của loài người — từ buổi bình minh của ngôn ngữ, qua Cách mạng Nông nghiệp, Cách mạng Công nghiệp cho đến kỷ nguyên trí tuệ nhân tạo ngày nay. Yuval Noah Harari đặt ra những câu hỏi lớn: <b>Điều gì khiến Homo Sapiens thống trị Trái Đất?</b> Tiến bộ có thực sự mang lại hạnh phúc?<br><br>Được Bill Gates, Barack Obama và hàng triệu độc giả toàn cầu ca ngợi, đây là cuốn sách phi hư cấu xuất sắc nhất thập kỷ.',
  },
  {
    id: 'b005', name: 'Atomic Habits', author: 'James Clear',
    price: 115000, originalPrice: 160000, discount: 28, category: 'Kỹ năng sống',
    image: 'https://images.unsplash.com/photo-1476275466078-4cad320bc4e7?w=400&q=80',
    rating: 4.9, sold: 1800, badge: null,
    description: '<b>Atomic Habits</b> tiết lộ bí mật đằng sau sự thành công của những vận động viên Olympic, CEO hàng đầu và các nghệ sĩ xuất chúng: không phải tài năng hay ý chí, mà là <b>hệ thống thói quen nhỏ được xây dựng đúng cách</b>. James Clear chứng minh rằng chỉ cần cải thiện 1% mỗi ngày, sau một năm bạn sẽ giỏi hơn 37 lần.<br><br>Cuốn sách cung cấp một framework thực tế, dễ áp dụng ngay lập tức để định hình lại cuộc sống của bạn từ những thay đổi tưởng chừng không đáng kể.',
  },
  {
    id: 'b006', name: 'Bố Già', author: 'Mario Puzo',
    price: 98000, originalPrice: 130000, discount: 25, category: 'Tiểu thuyết',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80',
    rating: 4.7, sold: 645, badge: null,
    description: '<b>Bố Già</b> — kiệt tác của Mario Puzo — kể về đế chế tội phạm của gia tộc Corleone hùng mạnh nhất nước Mỹ dưới sự dẫn dắt của Vito Corleone, người đàn ông mà ai cũng phải kiêng nể và gọi là "Bố Già". Đây không đơn thuần là câu chuyện về mafia, mà là sử thi về quyền lực, lòng trung thành, sự phản bội và cái giá của tham vọng.<br><br>Từ trang sách đến màn bạc, <b>Bố Già</b> đã trở thành một trong những tác phẩm văn hóa đại chúng vĩ đại nhất thế kỷ 20.',
  },
  {
    id: 'b007', name: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman',
    price: 125000, originalPrice: 175000, discount: 29, category: 'Tâm lý học',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&q=80',
    rating: 4.6, sold: 430, badge: 'new',
    description: 'Nhà tâm lý học đoạt giải Nobel <b>Daniel Kahneman</b> tiết lộ hai hệ thống tư duy chi phối toàn bộ quyết định của con người: <b>Hệ thống 1</b> — nhanh, bản năng và cảm xúc; <b>Hệ thống 2</b> — chậm, lý trí và có chủ đích. Hiểu được cơ chế này giúp bạn nhận ra những thiên kiến nhận thức đang âm thầm dẫn dắt mình mỗi ngày.<br><br>Một cuốn sách bắt buộc đọc cho bất kỳ ai muốn đưa ra quyết định sáng suốt hơn trong công việc, đầu tư và cuộc sống.',
  },
  {
    id: 'b008', name: 'Người Đua Diều', author: 'Khaled Hosseini',
    price: 79000, originalPrice: 110000, discount: 28, category: 'Văn học',
    image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&q=80',
    rating: 4.8, sold: 870, badge: null,
    description: '<b>Người Đua Diều</b> là câu chuyện xúc động về tình bạn, tội lỗi và sự chuộc lỗi giữa hai cậu bé lớn lên ở Kabul — Amir và Hassan — trên nền đất nước Afghanistan đang chìm trong biến động. Một ngày mùa đông năm 1975, Amir đã chứng kiến điều mình không bao giờ có thể quên, và nó ám ảnh anh suốt ba mươi năm sau.<br><br>Khaled Hosseini đã viết một trong những tiểu thuyết đẹp và đau lòng nhất của thế kỷ 21 — cuốn sách khiến bạn khóc, suy nghĩ và trân trọng hơn những mối quan hệ của mình.',
  },
  {
    id: 'b009', name: 'The Lean Startup', author: 'Eric Ries',
    price: 135000, originalPrice: 180000, discount: 25, category: 'Kinh doanh',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80',
    rating: 4.5, sold: 520, badge: null,
    description: '<b>The Lean Startup</b> đã cách mạng hóa cách thế giới xây dựng và vận hành doanh nghiệp. Eric Ries giới thiệu phương pháp khởi nghiệp tinh gọn: thay vì lập kế hoạch dài hạn rồi mới ra thị trường, hãy <b>xây dựng — đo lường — học hỏi</b> liên tục để tránh lãng phí nguồn lực và nhanh chóng tìm ra mô hình kinh doanh thực sự hiệu quả.<br><br>Được các startup Silicon Valley lẫn tập đoàn Fortune 500 áp dụng rộng rãi, đây là cuốn cẩm nang không thể thiếu cho bất kỳ người nào muốn khởi nghiệp hoặc đổi mới sáng tạo.',
  },
  {
    id: 'b010', name: 'Hoàng Tử Bé', author: 'Antoine de Saint-Exupéry',
    price: 45000, originalPrice: 65000, discount: 31, category: 'Thiếu nhi',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
    rating: 4.9, sold: 3200, badge: 'hot',
    description: '<b>Hoàng Tử Bé</b> là tác phẩm được dịch ra nhiều thứ tiếng nhất thế giới sau Kinh Thánh — nhưng đây không chỉ là sách cho trẻ em. Câu chuyện về cậu bé đến từ tiểu hành tinh B-612 chứa đựng những triết lý sâu sắc nhất về tình yêu, sự cô đơn, trách nhiệm và cái nhìn trong sáng mà người lớn đã đánh mất.<br><br><i>"Điều quan trọng nhất thì mắt không nhìn thấy được"</i> — câu nói bất hủ này một mình đủ để khiến bạn muốn đọc ngay cuốn sách nhỏ bé mà vĩ đại này.',
  },
];

function renderProductCard(book, cls = '') {
  const badge = book.badge ? `<div class="product-badge ${book.badge}">${book.badge === 'hot' ? '🔥 Hot' : book.badge === 'new' ? '✨ Mới' : `-${book.discount}%`}</div>` : `<div class="product-badge">-${book.discount}%</div>`;
  return `
    <div class="product-card ${cls}" style="cursor:pointer" data-product data-product-id="${book.id}" data-product-name="${book.name}" data-product-price="${book.price}" data-product-image="${book.image}" data-product-author="${book.author}">
      <div class="product-img-wrap">
        <img src="${book.image}" alt="${book.name}" loading="lazy">
        ${badge}
        <div class="product-actions">
          <button class="action-btn" title="Yêu thích">♥</button>
          <button class="action-btn" data-add-cart title="Thêm vào giỏ">🛒</button>
          <a href="product-detail.html?id=${book.id}" class="action-btn" title="Xem chi tiết">👁</a>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${book.category}</div>
        <div class="product-name">${book.name}</div>
        <div class="product-author">${book.author}</div>
        <div class="product-price">
          <span class="price-sale">${formatPrice(book.price)}</span>
          <span class="price-original">${formatPrice(book.originalPrice)}</span>
          <span class="price-discount">-${book.discount}%</span>
        </div>
        <div class="product-rating">
          <span class="stars">${generateStars(book.rating)}</span>
          <span class="rating-count">(${book.sold})</span>
        </div>
        <button class="btn-add-cart" data-add-cart>Thêm vào giỏ</button>
      </div>
    </div>`;
}

// ============================================================
// COMPONENT INJECTION HELPER
// Standardised mount-point IDs used by every page:
//   <div id="topbar-mount"></div>
//   <div id="header-mount"></div>
//   <div id="nav-mount"></div>
//   <div id="mobile-menu-mount"></div>
//   <div id="footer-mount"></div>
//   <div id="bottom-nav-mount"></div>
// Pages that previously injected components inline (return-policy.html,
// shopping-guide.html) should call injectComponents() instead of
// duplicating the assignment logic in their own <script> blocks.
// ============================================================
function injectComponents() {
  const set = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };
  set('topbar-mount',      TOPBAR_HTML);
  set('header-mount',      HEADER_HTML);
  set('nav-mount',         NAV_HTML);
  set('mobile-menu-mount', MOBILE_MENU_HTML);
  set('footer-mount',      FOOTER_HTML);
  set('bottom-nav-mount',  BOTTOM_NAV_HTML);
}

// ============================================================
// BLOG CARD RENDERER
// Extracted from blog.html inline script.
// Returns an <article> HTML string for a blog post object.
// ============================================================
function renderBlogCard(post) {
  return `
    <article class="blog-card">
      <div class="blog-card-img">
        <a href="#"><img src="${post.img}" alt="${post.title}" loading="lazy"></a>
      </div>
      <div class="blog-card-body">
        <span class="blog-tag">${post.tag}</span>
        <h2 class="blog-card-title"><a href="#">${post.title}</a></h2>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <div class="blog-meta">
          <span>✍️ ${post.author}</span>
          <span>📅 ${post.date}</span>
          <span>👁 ${post.views.toLocaleString('vi-VN')}</span>
          <span>⏱ ${post.read} phút đọc</span>
        </div>
        <a href="#" style="display:inline-flex;align-items:center;gap:4px;margin-top:12px;font-size:.85rem;color:var(--red);font-weight:600">Đọc tiếp →</a>
      </div>
    </article>`;
}

function initProductCardLinks() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Bỏ qua nếu bấm vào nút thêm giỏ hàng hoặc các thẻ <a> có sẵn
      if (e.target.closest('[data-add-cart]') || e.target.closest('a')) return;
      
      const id = card.getAttribute('data-product-id');
      if (id) {
        window.location.href = `product-detail.html?id=${id}`;
      }
    });
  });
}
