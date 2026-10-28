/**
 * ═══════════════════════════════════════════════════════════
 *  TEMPLATES.JS — Bộ render: config → HTML
 *  Giao diện "Xenon Follow-Spot" — viết cho điện thoại 390px trước,
 *  mở rộng lên máy tính bằng tiền tố sm: / md: / lg: / xl:.
 *
 *  Quy ước:
 *  - Mọi nội dung lấy từ site.config.js, luôn escape bằng esc().
 *  - Class Tailwind viết nguyên chuỗi (không ghép động) để Tailwind quét được.
 *  - Nội dung thu gọn vẫn nằm sẵn trong HTML (gắn data-extra); JS chỉ ẩn/hiện.
 * ═══════════════════════════════════════════════════════════
 */

// ─── ICONS (SVG inline, nét mảnh) ───────────────────────
const SVG = (body, fill = false) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${fill ? `fill="currentColor"` : `fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`}>${body}</svg>`;

const ICONS = {
  wedding: SVG(`<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`),
  corporate: SVG(`<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 13h20"/>`),
  event: SVG(`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`),
  ceremony: SVG(`<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>`),
  award: SVG(`<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>`),
  bilingual: SVG(`<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`),
  mic: SVG(`<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 17v5"/><path d="M8 22h8"/>`),
  phone: SVG(`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`),
  email: SVG(`<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/>`),
  facebook: SVG(`<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>`, true),
  youtube: SVG(`<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>`, true),
  zalo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M12.5 6C9.46 6 7 8.46 7 11.5v25C7 39.54 9.46 42 12.5 42h23c3.04 0 5.5-2.46 5.5-5.5v-25C41 8.46 38.54 6 35.5 6h-23zm2.14 11h18.72c.87 0 1.34 1.01.78 1.67L22.97 31.5h8.87c.74 0 1.16.83.71 1.39-.15.18-.37.29-.61.29H13.36c-.87 0-1.34-1.01-.78-1.67L23.75 18.7h-9.1a.82.82 0 0 1-.72-.43.81.81 0 0 1 .71-1.27z"/></svg>`,
  play: SVG(`<path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/>`, true),
  star: SVG(`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`, true),
  close: SVG(`<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`),
  plus: SVG(`<path d="M12 5v14"/><path d="M5 12h14"/>`),
  chevronDown: SVG(`<polyline points="6 9 12 15 18 9"/>`),
  arrowLeft: SVG(`<polyline points="15 18 9 12 15 6"/>`),
  arrowRight: SVG(`<polyline points="9 18 15 12 9 6"/>`),
  arrowUp: SVG(`<polyline points="18 15 12 9 6 15"/>`),
  arrowUpRight: SVG(`<path d="M7 17 17 7"/><path d="M8 7h9v9"/>`),
  location: SVG(`<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`),
  clock: SVG(`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`),
  send: SVG(`<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/>`),
  image: SVG(`<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>`),
};

// ─── TIỆN ÍCH ──────────────────────────────────────────

/** Escape HTML để chống XSS */
export function esc(str) {
  if (typeof str !== "string") return String(str ?? "");
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Kiểm tra giá trị có phải placeholder [IN_HOA] không */
export function isPlaceholder(val) {
  if (typeof val !== "string") return false;
  return /\[[A-Z0-9_]+\]/.test(val);
}

/** Trả SVG icon inline (trang trí → aria-hidden) */
export function icon(name, cls = "") {
  const svg = ICONS[name];
  if (!svg) return `<!-- icon "${name}" không tìm thấy -->`;
  const clsAttr = cls ? ` class="${esc(cls)}"` : "";
  return svg.replace("<svg ", `<svg${clsAttr} aria-hidden="true" focusable="false" `);
}

/**
 * Thẻ ảnh mobile-first:
 * - `src` (ảnh điện thoại) là nguồn MẶC ĐỊNH của <img>.
 * - `desktopSrc` chỉ nạp qua <source media="(min-width: …)"> khi bố cục máy tính khác hẳn.
 * - Luôn có width/height (giữ chỗ, chống nhảy bố cục), alt, decoding async.
 * - lazy-load mặc định; ảnh màn hình đầu dùng priority (fetchpriority="high", không lazy).
 * - Ảnh lỗi/chưa có sẽ tự ẩn (onerror) để lộ nền khung .media-frame phía sau.
 */
export function media({ src, alt = "", cls = "", width, height, lazy = true, priority = false, desktopSrc, desktopWidth, desktopHeight, desktopMin = 768, style = "" }) {
  if (!src && !desktopSrc) return "";
  const loadAttr = priority ? ` fetchpriority="high"` : lazy ? ` loading="lazy"` : "";
  const imgCls = cls ? ` class="${esc(cls)}"` : "";
  const styleAttr = style ? ` style="${esc(style)}"` : "";
  const size = (w, h) => `${w ? ` width="${w}"` : ""}${h ? ` height="${h}"` : ""}`;
  const img = `<img src="${esc(src || desktopSrc)}" alt="${esc(alt)}"${imgCls}${styleAttr}${size(width, height)}${loadAttr} decoding="async" onerror="this.hidden=true">`;

  if (!desktopSrc || desktopSrc === src) return img;
  return `<picture class="contents"><source media="(min-width: ${desktopMin}px)" srcset="${esc(desktopSrc)}"${size(desktopWidth, desktopHeight)}>${img}</picture>`;
}

/** Thuộc tính href (+ target/rel nếu là link ngoài) */
function linkAttrs(href) {
  const external = /^https?:\/\//.test(href);
  return `href="${esc(href)}"${external ? ` target="_blank" rel="noopener noreferrer"` : ""}`;
}

/** Xuống dòng \n trong config → <br> */
function lines(text) {
  // Giữ một dấu cách trước <br> để khi <br> bị ẩn trên điện thoại, chữ không dính nhau
  return esc(text || "").replace(/\n/g, " <br>");
}

/** Số thứ tự 2 chữ số: 1 → "01" */
const pad = (n) => String(n).padStart(2, "0");

// ─── HELPERS ────────────────────────────────────────────

/** Tạo các link tel/zalo/mailto/mạng xã hội — nếu còn placeholder thì trỏ về #contact */
export function createHelpers(config) {
  const c = config.contact || {};

  function safeLink(value, prefix = "") {
    if (!value || isPlaceholder(value)) return "#contact";
    if (prefix === "tel:") return `tel:${value.replace(/[^\d+]/g, "")}`;
    if (prefix === "mailto:") return `mailto:${value}`;
    if (prefix === "zalo:") return /^(https?:\/\/|#)/.test(value) ? value : `https://zalo.me/${value.replace(/[^\d]/g, "")}`;
    return value;
  }

  const hasPhone = c.phone && !isPlaceholder(c.phone);
  const hasEmail = c.email && !isPlaceholder(c.email);

  return {
    phoneLink: safeLink(c.phone, "tel:"),
    phoneDisplay: hasPhone ? c.phone : "Đang cập nhật",
    zaloLink: safeLink(c.zalo, "zalo:"),
    emailLink: safeLink(c.email, "mailto:"),
    emailDisplay: hasEmail ? c.email : "Đang cập nhật",
    emailRaw: hasEmail ? c.email : "",
    facebookLink: safeLink(c.facebook),
    youtubeLink: safeLink(c.youtube),
    ctaLink: safeLink(config.header?.ctaButton?.href || c.zalo, "zalo:"),
    heroCtaLink: safeLink(config.hero?.ctaPrimary?.href || c.zalo, "zalo:"),
    floatingLink: safeLink(config.floatingButton?.href || c.zalo, "zalo:"),
  };
}

// ─── RENDERERS ──────────────────────────────────────────

export function createRenderers(config) {
  const h = createHelpers(config);
  const ui = { showMore: "Xem thêm", showLess: "Thu gọn", ...(config.ui || {}) };

  /** Tiêu đề chung của mỗi section: số thứ tự + nhãn, tiêu đề lớn, 1 câu mô tả */
  function sectionHead(sec, num, fallbackLabel, extraCls = "") {
    return `<header class="section-head reveal ${extraCls}">
          <p class="eyebrow"><span class="eyebrow-num">${pad(num)}</span>${esc(sec.sectionLabel || fallbackLabel)}</p>
          <h2 class="h-section">${lines(sec.heading)}</h2>
          ${sec.subheading ? `<p class="lead">${esc(sec.subheading)}</p>` : ""}
        </header>`;
  }

  /**
   * Nút "Xem thêm (N)" / "Thu gọn" cho danh sách dài.
   * scope "mobile": chỉ thu gọn dưới 1024px; "all": thu gọn mọi kích thước.
   * Nút bị ẩn khi không có JS (CSS .js .more-btn) → danh sách hiện đầy đủ.
   */
  function moreButton(listId, hiddenCount, scope = "mobile", label = ui.showMore) {
    if (hiddenCount <= 0) return "";
    return `<div class="more-wrap ${scope === "mobile" ? "lg:hidden" : ""}">
          <button type="button" class="more-btn" data-more aria-expanded="false" aria-controls="${listId}"
            data-label-more="${esc(`${label} (${hiddenCount})`)}" data-label-less="${esc(ui.showLess)}">
            <span data-more-text>${esc(`${label} (${hiddenCount})`)}</span>
            ${icon("chevronDown", "w-5 h-5 more-chevron")}
          </button>
        </div>`;
  }

  /** Thuộc tính đánh dấu mục bị thu gọn */
  const extra = (i, visible) => (i >= visible ? " data-extra" : "");

  /** Giới hạn số hiện sẵn, mặc định = tất cả */
  const visibleOf = (sec, fallback) => {
    const n = Number(sec.mobileVisible);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
  };

  return {
    // ─── SEO HEAD ─────────────────────────────────────
    seoHead() {
      const seo = config.seo || {};
      const siteUrl = seo.url && !isPlaceholder(seo.url) ? seo.url.replace(/\/?$/, "/") : "";
      // og:image cần URL tuyệt đối — chỉ ghép được khi đã có seo.url
      const ogImage = siteUrl ? siteUrl + (seo.ogImage || "") : seo.ogImage || "";
      const hero = config.hero || {};
      const heroMobile = hero.image?.mobile || hero.backgroundMobile;
      return `<title>${esc(seo.title || "MC Portfolio")}</title>
  <meta name="description" content="${esc(seo.description || "")}">
  <meta name="keywords" content="${esc(seo.keywords || "")}">
  ${siteUrl ? `<link rel="canonical" href="${esc(siteUrl)}">\n  <meta property="og:url" content="${esc(siteUrl)}">` : ""}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${esc(seo.locale || "vi_VN")}">
  <meta property="og:site_name" content="${esc(config.brand?.name || "")}">
  <meta property="og:title" content="${esc(seo.title || "")}">
  <meta property="og:description" content="${esc(seo.description || "")}">
  <meta property="og:image" content="${esc(ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(seo.ogImageAlt || "")}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(seo.title || "")}">
  <meta name="twitter:description" content="${esc(seo.description || "")}">
  <meta name="twitter:image" content="${esc(ogImage)}">
  <meta name="theme-color" content="${esc(seo.themeColor || "#07090D")}">
  <meta name="color-scheme" content="dark">
  <link rel="icon" type="image/svg+xml" href="public/icons/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="public/icons/favicon-32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="public/icons/apple-touch-icon.png">
  ${heroMobile ? `<link rel="preload" as="image" href="${esc(heroMobile)}" media="(max-width: 767px)" fetchpriority="high">` : ""}`;
    },

    // ─── CTA HEADER (thuộc tính href đã xử lý placeholder) ─
    ctaAttrs() {
      return linkAttrs(h.ctaLink);
    },

    // ─── HEADER NAV (máy tính) ────────────────────────
    headerNav() {
      return (config.header?.menuItems || [])
        .map((item) => `<a href="${esc(item.href)}" class="nav-link">${esc(item.label)}</a>`)
        .join("\n        ");
    },

    // ─── MOBILE NAV (menu toàn màn hình) ──────────────
    mobileNav() {
      return (config.header?.menuItems || [])
        .map(
          (item, i) =>
            `<li><a href="${esc(item.href)}" class="mnav-link" data-menu-link><span class="mnav-num">${pad(i + 1)}</span><span>${esc(item.label)}</span></a></li>`
        )
        .join("\n        ");
    },

    // ─── HERO — THE SPOTLIGHT REVEAL ──────────────────
    // Lớp dưới cùng: ảnh + tên MC (luôn có trong HTML, đọc được khi không có JS).
    // Lớp tối có "lỗ sáng" (spot-dark) + chùm sáng (spot-beam) chỉ di chuyển bằng transform → mượt, không repaint.
    heroSection() {
      const hero = config.hero || {};
      const brand = config.brand || {};
      const img = hero.image || {};
      const pos = hero.imagePosition || {};
      const hint = hero.revealHint || {};
      const mobileSrc = img.mobile || hero.backgroundMobile || "";
      const desktopSrc = img.desktop || hero.backgroundDesktop || "";
      const auto = Number(hero.autoRevealSeconds) > 0 ? Number(hero.autoRevealSeconds) : 2.6;

      return `<section id="hero" class="hero" data-spotlight data-auto="${auto}" aria-labelledby="hero-title"
      style="--pos-m: ${esc(pos.mobile || "50% 25%")}; --pos-d: ${esc(pos.desktop || "50% 35%")};">
      <!-- Lớp 1: sân khấu (ảnh chân dung) -->
      <div class="hero-stage media-frame">
        ${media({
          src: mobileSrc,
          desktopSrc,
          alt: hero.backgroundAlt || "",
          cls: "hero-img",
          width: 720,
          height: 1280,
          desktopWidth: 1920,
          desktopHeight: 1280,
          lazy: false,
          priority: true,
        })}
        <span class="hero-shade" aria-hidden="true"></span>
      </div>

      <!-- Lớp 2: tên MC & lời giới thiệu (được đèn soi rõ) -->
      <div class="hero-inner">
        <div class="hero-copy">
          <p class="hero-eyebrow"><span class="hero-eyebrow-line" aria-hidden="true"></span>${esc(brand.tagline || "")}</p>
          <h1 id="hero-title" class="hero-name">${esc(brand.name || "")}</h1>
          <p class="hero-line">${lines(hero.heading)}</p>
          <p class="hero-sub">${esc(hero.subheading || "")}</p>
        </div>

        <!-- Lớp 4: nút hành động — tự phát sáng, luôn thấy kể cả khi sân khấu còn tối -->
        <div class="hero-actions">
          <a ${linkAttrs(h.heroCtaLink)} class="btn-glow hero-cta">
            ${icon("zalo", "w-6 h-6")}
            <span>${esc(hero.ctaPrimary?.label || "Đặt lịch")}</span>
          </a>
          <a href="${esc(hero.ctaSecondary?.href || "#videos")}" class="btn-line hero-cta-2">
            ${icon("play", "w-4 h-4")}
            <span>${esc(hero.ctaSecondary?.label || "Xem showreel")}</span>
          </a>
        </div>
      </div>

      <!-- Lớp 3: bóng tối + đèn follow-spot (chỉ bật khi có JS) -->
      <div class="spot-layer" aria-hidden="true">
        <div class="spot-dark"></div>
        <div class="spot-beam"></div>
      </div>
      <div class="spot-veil" aria-hidden="true"></div>
      <p class="spot-teaser" aria-hidden="true">${esc(hero.revealTeaser || "Sẵn sàng tỏa sáng...")}</p>
      <p class="spot-hint" aria-hidden="true">
        <span class="spot-hint-dot"></span>
        <span class="hint-touch">${esc(hint.touch || "Chạm để bật đèn")}</span>
        <span class="hint-mouse">${esc(hint.mouse || "Di chuột để bật đèn")}</span>
      </p>
      ${hero.scrollIndicator ? `<a href="#about" class="hero-scroll" aria-label="Cuộn xuống phần giới thiệu"><span></span></a>` : ""}
    </section>`;
    },

    // ─── GIỚI THIỆU ──────────────────────────────────
    aboutSection() {
      const about = config.about || {};
      const paragraphs = (about.story || "")
        .split(/\n\s*\n/)
        .map((p) => `<p>${lines(p.trim())}</p>`)
        .join("\n              ");

      const statsHtml = (about.stats || [])
        .map(
          (s) => `<li class="stat">
              <span class="stat-num ${isPlaceholder(s.number) ? "is-placeholder" : ""}">${esc(s.number)}</span>
              <span class="stat-label">${esc(s.label)}</span>
            </li>`
        )
        .join("\n            ");

      return `<section id="about" class="section section-fade">
      <div class="wrap grid gap-8 lg:grid-cols-12 lg:gap-14 lg:items-center">
        <div class="lg:col-span-7 lg:order-2 min-w-0">
          ${sectionHead(about, 1, "Về Tôi")}
          <p class="summary reveal">${esc(about.summary || "")}</p>

          ${paragraphs ? `<details class="fold reveal">
            <summary class="fold-summary">
              <span>${esc(about.storyToggleLabel || "Đọc câu chuyện")}</span>
              ${icon("plus", "w-5 h-5 fold-icon")}
            </summary>
            <div class="fold-body prose-x">
              ${paragraphs}
            </div>
          </details>` : ""}

          <ul class="stats reveal" aria-label="Số liệu nổi bật">
            ${statsHtml}
          </ul>
        </div>

        <figure class="lg:col-span-5 lg:order-1 reveal">
          <div class="portrait media-frame aspect-[4/5] lg:aspect-[3/4]" data-label="Ảnh chân dung">
            ${media({
              src: about.portraitMobile || about.portrait || "",
              desktopSrc: about.portrait || "",
              desktopMin: 1024,
              alt: about.portraitAlt || "Ảnh chân dung",
              cls: "absolute inset-0 w-full h-full object-cover",
              width: 400,
              height: 500,
              desktopWidth: 600,
              desktopHeight: 800,
            })}
          </div>
        </figure>
      </div>
    </section>`;
    },

    // ─── DỊCH VỤ ─────────────────────────────────────
    servicesSection() {
      const svc = config.services || {};
      const items = svc.items || [];
      const visible = visibleOf(svc, items.length);

      const cardsHtml = items
        .map(
          (item, i) => `<li class="svc"${extra(i, visible)} data-glow>
            <div class="svc-media media-frame" data-label="">
              ${media({
                src: item.image || "",
                alt: item.imageAlt || item.title || "",
                cls: "absolute inset-0 w-full h-full object-cover",
                width: 600,
                height: 400,
              })}
              <span class="svc-icon-fallback">${icon(item.icon || "event", "w-8 h-8")}</span>
            </div>
            <div class="svc-body">
              <p class="svc-num">${pad(i + 1)}</p>
              <h3 class="svc-title">${esc(item.title)}</h3>
              <p class="svc-desc">${esc(item.description)}</p>
            </div>
          </li>`
        )
        .join("\n          ");

      return `<section id="services" class="section">
      <div class="wrap">
        ${sectionHead(svc, 2, "Dịch Vụ")}
        <ul id="services-list" class="svc-grid" data-collapse="mobile">
          ${cardsHtml}
        </ul>
        ${moreButton("services-list", items.length - visible)}
      </div>
    </section>`;
    },

    // ─── VIDEO SHOWREEL ───────────────────────────────
    videosSection() {
      const vid = config.videos || {};
      const featured = vid.featured || {};
      const items = vid.items || [];
      const visible = visibleOf(vid, items.length);
      const hasUrl = (url) => url && !isPlaceholder(url);
      const clip = featured.previewClip && !isPlaceholder(featured.previewClip) ? featured.previewClip : "";

      // Có link → nút mở trình phát; chưa có link → dẫn về mục Liên hệ (không mở khung rỗng)
      const trigger = (v, cls, inner, label) =>
        hasUrl(v.videoUrl)
          ? `<button type="button" class="${cls}" data-video="${esc(v.videoUrl)}" data-title="${esc(v.title || "")}" aria-label="Phát video: ${esc(v.title || "")}">${inner}</button>`
          : `<a href="#contact" class="${cls}" aria-label="${esc(label)}">${inner}</a>`;

      const smallVideos = items
        .map(
          (v, i) => `<li class="vid"${extra(i, visible)}>
            ${trigger(
              v,
              "vid-trigger",
              `<span class="vid-thumb media-frame">
                ${media({ src: v.thumbnail || "", alt: "", cls: "absolute inset-0 w-full h-full object-cover", width: 640, height: 360 })}
                <span class="play-dot">${icon("play", "w-4 h-4")}</span>
                ${v.duration ? `<span class="vid-dur">${esc(v.duration)}</span>` : ""}
              </span>
              <span class="vid-title">${esc(v.title)}</span>`,
              `${v.title} — video đang cập nhật, liên hệ để xem`
            )}
          </li>`
        )
        .join("\n          ");

      return `<section id="videos" class="section section-reel">
      <div class="wrap">
        ${sectionHead(vid, 3, "Video")}
      </div>

      <!-- Showreel tràn viền: clip ngắn không tiếng tự phát (nếu có) + nút xem bản đầy đủ -->
      <div class="reel reveal">
        <div class="reel-frame media-frame" data-label="Poster showreel">
          ${media({ src: featured.thumbnail || "", alt: `Ảnh xem trước ${featured.title || "showreel"}`, cls: "absolute inset-0 w-full h-full object-cover", width: 1280, height: 720 })}
          ${clip ? `<video class="reel-clip" muted playsinline loop preload="none" data-src="${esc(clip)}" aria-hidden="true" tabindex="-1"></video>` : ""}
          <span class="reel-shade" aria-hidden="true"></span>
          ${trigger(
            featured,
            "reel-trigger",
            `<span class="reel-play">${icon("play", "w-7 h-7")}</span>
            <span class="reel-meta">
              <span class="reel-title">${esc(featured.title || "Showreel")}</span>
              ${featured.duration ? `<span class="reel-dur">${esc(featured.duration)}</span>` : ""}
            </span>`,
            `${featured.title || "Showreel"} — đang cập nhật, liên hệ để xem`
          )}
        </div>
      </div>

      <div class="wrap">
        <ul id="videos-list" class="vid-grid" data-collapse="mobile">
          ${smallVideos}
        </ul>
        ${moreButton("videos-list", items.length - visible)}
      </div>

      <!-- Trình phát video (chỉ tạo iframe/video khi người xem bấm) -->
      <dialog id="video-modal" class="modal" aria-label="Trình phát video">
        <div class="modal-inner">
          <button type="button" class="modal-close" data-close aria-label="Đóng video">${icon("close", "w-6 h-6")}</button>
          <div data-player class="aspect-video w-full bg-black rounded-xl overflow-hidden"></div>
        </div>
      </dialog>
    </section>`;
    },

    // ─── GALLERY ──────────────────────────────────────
    gallerySection() {
      const gal = config.gallery || {};
      const items = gal.items || [];
      const visible = visibleOf(gal, items.length);

      const galleryItems = items
        .map(
          (item, i) => `<li class="gal"${extra(i, visible)}>
            <button type="button" class="gal-btn media-frame" data-lightbox="${esc(item.src || "")}" data-alt="${esc(item.alt || "")}" data-label="${esc(item.category || "Ảnh")}" aria-label="Phóng to ảnh: ${esc(item.alt || "")}">
              ${media({ src: item.src || "", alt: item.alt || "", cls: "absolute inset-0 w-full h-full object-cover", width: 800, height: 1000 })}
              <span class="gal-cap" aria-hidden="true">${esc(item.category || "")}</span>
            </button>
          </li>`
        )
        .join("\n          ");

      return `<section id="gallery" class="section">
      <div class="wrap">
        ${sectionHead(gal, 4, "Hình Ảnh")}
        <ul id="gallery-list" class="gal-grid" data-collapse="all">
          ${galleryItems}
        </ul>
        ${moreButton("gallery-list", items.length - visible, "all", gal.moreLabel || ui.showMore)}
      </div>

      <!-- Lightbox: vuốt trái/phải, phím mũi tên, Esc -->
      <dialog id="lightbox" class="modal modal-full" aria-label="Xem ảnh">
        <button type="button" class="modal-close" data-close aria-label="Đóng">${icon("close", "w-6 h-6")}</button>
        <figure class="lb-figure">
          <img alt="" class="lb-img" width="1200" height="900">
          <figcaption class="lb-cap"><span data-caption></span> <span data-count class="lb-count"></span></figcaption>
        </figure>
        <div class="lb-nav">
          <button type="button" class="icon-btn" data-prev aria-label="Ảnh trước">${icon("arrowLeft", "w-6 h-6")}</button>
          <button type="button" class="icon-btn" data-next aria-label="Ảnh sau">${icon("arrowRight", "w-6 h-6")}</button>
        </div>
      </dialog>
    </section>`;
    },

    // ─── ĐỐI TÁC — dải logo đơn sắc chạy ngang ───────
    partnersSection() {
      const par = config.partners || {};
      const items = par.items || [];
      const seconds = Number(par.marqueeSeconds) > 0 ? Number(par.marqueeSeconds) : 30;

      const logo = (p) => `<li class="logo">
              ${media({ src: p.logo || "", alt: p.name || "Đối tác", cls: "logo-img", width: 200, height: 80 })}
              <span class="logo-name">${esc(p.name || "")}</span>
            </li>`;
      const row = items.map(logo).join("\n            ");

      return `<section id="partners" class="section section-tight" aria-labelledby="partners-title">
      <div class="wrap">
        <p class="eyebrow justify-center reveal"><span class="eyebrow-num">${pad(5)}</span>${esc(par.sectionLabel || "Đối Tác")}</p>
        <h2 id="partners-title" class="h-small reveal">${esc(par.heading || "Tin Tưởng Bởi")}</h2>
      </div>
      <div class="marquee" style="--marquee: ${seconds}s">
        <ul class="marquee-track">
            ${row}
        </ul>
        <ul class="marquee-track" aria-hidden="true">
            ${row}
        </ul>
      </div>
    </section>`;
    },

    // ─── CẢM NHẬN — slider vuốt (scroll-snap gốc) ─────
    testimonialsSection() {
      const test = config.testimonials || {};
      const limit = Number(test.sliderLimit) > 0 ? Number(test.sliderLimit) : 3;
      const items = (test.items || []).slice(0, limit);

      const slides = items
        .map((t, i) => {
          const rating = Math.max(0, Math.min(5, t.rating || 5));
          const stars = Array.from({ length: rating }, () => icon("star", "w-4 h-4")).join("");
          const initial = (t.name || "?").trim().split(/\s+/).pop().charAt(0);
          return `<li class="quote" id="quote-${i + 1}" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${items.length}">
            <figure class="quote-card">
              <span class="quote-mark" aria-hidden="true">“</span>
              <span class="quote-stars" role="img" aria-label="${rating} trên 5 sao">${stars}</span>
              <blockquote class="quote-text">${esc(t.content || "")}</blockquote>
              <figcaption class="quote-who">
                <span class="avatar media-frame" data-initial="${esc(initial)}">
                  ${media({ src: t.avatar || "", alt: "", cls: "absolute inset-0 w-full h-full object-cover", width: 100, height: 100 })}
                </span>
                <span class="min-w-0">
                  <span class="block font-medium text-fg">${esc(t.name || "")}</span>
                  <span class="block text-fg-muted">${esc(t.role || "")}</span>
                </span>
              </figcaption>
            </figure>
          </li>`;
        })
        .join("\n          ");

      const dots = items
        .map((_, i) => `<button type="button" class="dot" data-dot="${i}" aria-label="Xem cảm nhận ${i + 1}" aria-current="${i === 0}"><span></span></button>`)
        .join("");

      return `<section id="testimonials" class="section">
      <div class="wrap">
        ${sectionHead(test, 6, "Cảm Nhận")}
        <div class="slider reveal" data-slider aria-roledescription="carousel" aria-label="Cảm nhận khách hàng">
          <ul class="slider-track" data-track tabindex="0" aria-label="Vuốt ngang để xem thêm">
          ${slides}
          </ul>
          ${items.length > 1 ? `<div class="slider-nav">
            <button type="button" class="icon-btn" data-slide-prev aria-label="Cảm nhận trước">${icon("arrowLeft", "w-5 h-5")}</button>
            <div class="dots">${dots}</div>
            <button type="button" class="icon-btn" data-slide-next aria-label="Cảm nhận sau">${icon("arrowRight", "w-5 h-5")}</button>
          </div>` : ""}
        </div>
      </div>
    </section>`;
    },

    // ─── CÂU HỎI THƯỜNG GẶP (accordion <details>) ────
    faqSection() {
      const faq = config.faq || {};
      const items = faq.items || [];
      if (!items.length) return "";

      const list = items
        .map(
          (q) => `<details class="faq reveal" name="faq">
            <summary class="faq-q">
              <span>${esc(q.question)}</span>
              ${icon("plus", "w-5 h-5 fold-icon")}
            </summary>
            <div class="faq-a"><p>${lines(q.answer)}</p></div>
          </details>`
        )
        .join("\n          ");

      return `<section id="faq" class="section">
      <div class="wrap max-w-3xl">
        ${sectionHead(faq, 7, "Hỏi Đáp")}
        <div class="faq-list">
          ${list}
        </div>
      </div>
    </section>`;
    },

    // ─── LIÊN HỆ ─────────────────────────────────────
    contactSection() {
      const c = config.contact || {};
      const form = c.form || {};

      const row = (href, iconName, label, value) => {
        const inner = `<span class="row-icon">${icon(iconName, "w-5 h-5")}</span>
              <span class="min-w-0 flex-1">
                <span class="block text-fg-muted">${esc(label)}</span>
                <span class="block text-fg break-words">${esc(value)}</span>
              </span>
              ${href ? icon("arrowUpRight", "w-5 h-5 text-fg-muted shrink-0") : ""}`;
        return href
          ? `<li><a ${linkAttrs(href)} class="contact-row">${inner}</a></li>`
          : `<li><div class="contact-row">${inner}</div></li>`;
      };

      const eventOptions = (form.eventTypes || []).map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join("");

      return `<section id="contact" class="section section-contact">
      <div class="wrap grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div class="min-w-0">
          ${sectionHead(c, 8, "Liên Hệ")}

          <!-- 2 nút chính: trong tầm ngón cái -->
          <div class="contact-cta reveal">
            <a ${linkAttrs(h.phoneLink)} class="btn-glow">${icon("phone", "w-5 h-5")}<span>Gọi ngay</span></a>
            <a ${linkAttrs(h.zaloLink)} class="btn-line btn-line-strong">${icon("zalo", "w-6 h-6")}<span>Chat Zalo</span></a>
          </div>

          <ul class="contact-list reveal">
            ${row(h.phoneLink, "phone", "Điện thoại", h.phoneDisplay)}
            ${row(h.emailLink, "email", "Email", h.emailDisplay)}
            ${row(h.facebookLink, "facebook", "Facebook", "Theo dõi Fanpage")}
            ${row(h.youtubeLink, "youtube", "YouTube", "Xem kênh")}
            ${c.address && !isPlaceholder(c.address) ? row(null, "location", "Khu vực", c.address) : ""}
            ${c.workingHours ? row(null, "clock", "Giờ làm việc", c.workingHours) : ""}
          </ul>
        </div>

        <!-- Form báo giá: thu gọn sẵn trên điện thoại, gửi qua ứng dụng email (không cần máy chủ) -->
        <details class="form-fold reveal" data-form-fold>
          <summary class="fold-summary">
            <span class="flex items-center gap-3">${icon("send", "w-5 h-5 text-xenon")}${esc(form.toggleLabel || form.heading || "Gửi yêu cầu báo giá")}</span>
            ${icon("plus", "w-5 h-5 fold-icon")}
          </summary>
          <form id="contact-form" data-email="${esc(h.emailRaw)}" class="form" novalidate>
            <h3 class="text-xl font-medium text-fg">${esc(form.heading || "Gửi Yêu Cầu Báo Giá")}</h3>
            <p class="text-fg-muted">${esc(form.note || "")}</p>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="field"><span>Họ và tên *</span>
                <input name="name" type="text" autocomplete="name" required placeholder="Nguyễn Văn A">
              </label>
              <label class="field"><span>Số điện thoại *</span>
                <input name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="[0-9+ .]{9,15}" placeholder="0901 234 567">
              </label>
              <label class="field"><span>Loại sự kiện</span>
                <select name="eventType">${eventOptions}</select>
              </label>
              <label class="field"><span>Ngày dự kiến</span>
                <input name="date" type="date">
              </label>
              <label class="field sm:col-span-2"><span>Nội dung</span>
                <textarea name="message" rows="4" placeholder="Địa điểm, số lượng khách, mong muốn của bạn..."></textarea>
              </label>
            </div>
            <button type="submit" class="btn-glow w-full sm:w-auto">${icon("send", "w-5 h-5")}<span>${esc(form.submitLabel || "Gửi Yêu Cầu")}</span></button>
            <p data-form-status role="status" class="min-h-6 text-xenon"></p>
          </form>
        </details>
      </div>
    </section>`;
    },

    // ─── FOOTER ───────────────────────────────────────
    footerSection() {
      const f = config.footer || {};
      const brand = config.brand || {};
      return `<footer class="footer">
    <div class="wrap flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div class="min-w-0">
        <p class="footer-brand">${esc(brand.name || "")}</p>
        <p class="text-fg-muted">${esc(f.madeWith || brand.tagline || "")}</p>
      </div>
      <div class="flex flex-col gap-3 sm:items-end">
        ${f.backToTop ? `<a href="#hero" class="footer-top">${icon("arrowUp", "w-4 h-4")}Lên đầu trang</a>` : ""}
        <p class="text-fg-muted">${esc(f.copyright || "")}</p>
      </div>
    </div>
  </footer>`;
    },

    // ─── NÚT LIÊN HỆ NỔI (neon) ───────────────────────
    floatingButton() {
      const fb = config.floatingButton || {};
      if (fb.enabled === false) return "";
      return `<div id="floating" class="floating" aria-label="Liên hệ nhanh" role="group">
    ${fb.showPhone ? `<a ${linkAttrs(h.phoneLink)} class="neon neon-phone" aria-label="${esc(fb.phoneLabel || "Gọi điện")}">${icon("phone", "w-6 h-6")}</a>` : ""}
    <a ${linkAttrs(h.floatingLink)} class="neon neon-zalo" aria-label="${esc(fb.label || "Chat Zalo")}">${icon("zalo", "w-8 h-8")}</a>
  </div>`;
    },
  };
}

// ─── RENDER PAGE ────────────────────────────────────────

/**
 * Ghép template + config → HTML hoàn chỉnh
 * @param {string} template — Nội dung index.html (file khung)
 * @param {object} config — SITE_CONFIG
 * @returns {{ html: string, missing: string[] }}
 */
export function renderPage(template, config) {
  const renderers = createRenderers(config);
  const missing = [];

  // Xóa comment hướng dẫn ở đầu file
  let html = template.replace(/<!--\s*ĐÂY LÀ FILE KHUNG[\s\S]*?-->\s*\n?/, "");

  // 1) Thay thế renderer blocks: {{{ @tenRenderer }}}
  html = html.replace(/\{\{\{\s*@(\w+)\s*\}\}\}/g, (match, name) => {
    if (typeof renderers[name] === "function") {
      return renderers[name]();
    }
    missing.push(`@${name}`);
    return "";
  });

  // 2) Thay thế giá trị: {{ duong.dan }}
  html = html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, path) => {
    const val = path.split(".").reduce((obj, key) => (obj == null ? undefined : obj[key]), config);
    if (val === undefined || val === null || typeof val === "object") {
      missing.push(path);
      return "";
    }
    return esc(String(val));
  });

  return { html, missing };
}
