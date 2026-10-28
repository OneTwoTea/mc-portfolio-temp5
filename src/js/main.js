/**
 * ═══════════════════════════════════════════════════════════
 *  MAIN.JS — JavaScript phía trình duyệt (thuần, không thư viện)
 *  Giao diện "Xenon Follow-Spot"
 *
 *  1. Khóa cuộn trang         7. Showreel: clip ngắn tự phát khi cuộn tới
 *  2. Header khi cuộn         8. Trình phát video (tải khi bấm)
 *  3. Menu điện thoại         9. Lightbox gallery (vuốt, phím mũi tên)
 *  4. Hero — đèn follow-spot 10. Slider cảm nhận (scroll-snap + chấm)
 *  5. Thu gọn / Xem thêm     11. Form báo giá (mở ứng dụng email)
 *  6. Viền phát sáng thẻ     12. Nút nổi, hiện dần khi cuộn
 *
 *  Không có JS: trang vẫn hiển thị đầy đủ (hero sáng sẵn, danh sách không thu gọn).
 * ═══════════════════════════════════════════════════════════
 */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ─── 1. KHÓA CUỘN TRANG (đếm số lớp đang mở: menu, lightbox…) ───
  let locks = 0;
  function lockScroll() {
    locks += 1;
    document.body.classList.add("is-locked");
  }
  function unlockScroll() {
    locks = Math.max(0, locks - 1);
    if (!locks) document.body.classList.remove("is-locked");
  }

  // ─── 2. HEADER: trong suốt ở đầu trang, có nền mờ khi cuộn ───
  function initHeader() {
    const header = $("#site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  // ─── 3. MENU ĐIỆN THOẠI ───
  function initMobileMenu() {
    const btn = $("#menu-toggle");
    const menu = $("#mobile-menu");
    if (!btn || !menu) return;
    let isOpen = false;
    let hideTimer = 0;

    function setOpen(open, { restoreFocus = true } = {}) {
      if (open === isOpen) return;
      isOpen = open;
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
      clearTimeout(hideTimer);
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(() => menu.classList.add("is-open"));
        lockScroll();
        $("a", menu)?.focus({ preventScroll: true });
      } else {
        menu.classList.remove("is-open");
        unlockScroll();
        hideTimer = setTimeout(() => { if (!isOpen) menu.hidden = true; }, reduceMotion ? 0 : 260);
        if (restoreFocus) btn.focus({ preventScroll: true });
      }
    }

    btn.addEventListener("click", () => setOpen(!isOpen));

    // Chọn một mục → đóng menu (để trình duyệt cuộn tới mục đó)
    $$("[data-menu-link]", menu).forEach((a) => a.addEventListener("click", () => setOpen(false, { restoreFocus: false })));

    // Bấm vào vùng trống của menu hoặc ra ngoài (header) → đóng
    menu.addEventListener("click", (e) => {
      if (e.target === menu || e.target.classList.contains("mobile-menu-inner")) setOpen(false);
    });
    document.addEventListener("click", (e) => {
      if (isOpen && !menu.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });

    // Esc để đóng, Tab xoay vòng trong menu
    document.addEventListener("keydown", (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const items = [btn, ...$$("a", menu)];
        const i = items.indexOf(document.activeElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === items.length - 1 ? 0 : i + 1);
        e.preventDefault();
        items[next].focus();
      }
    });

    // Lên màn hình lớn (menu ngang) → đóng menu điện thoại
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false, { restoreFocus: false });
    });
  }

  // ─── 4. HERO — ĐÈN FOLLOW-SPOT ───
  // Tấm tối 768px có lỗ sáng ở giữa: chỉ đổi transform (translate + scale) trong requestAnimationFrame,
  // vòng lặp tự dừng khi đèn đứng yên và khi hero ra khỏi màn hình → không tốn pin, không giật.
  function initSpotlight() {
    const hero = $("[data-spotlight]");
    if (!hero) return;
    const dark = $(".spot-dark", hero);
    const beam = $(".spot-beam", hero);
    if (reduceMotion || !dark || !beam) {
      hero.classList.add("is-static", "is-lit");
      return;
    }

    const HOLE = 0.09 * 384; // bán kính lỗ sáng trong tấm 768px (khớp mốc 9% trong input.css)
    const autoMs = (parseFloat(hero.dataset.auto) || 2.6) * 1000;
    let w = 0, h = 0, R = 150, srcX = 0, srcY = 0;
    let x = 0, y = 0, s = 1, tx = 0, ty = 0, ts = 1;
    let raf = 0, lit = false, resting = false, visible = true, idleTimer = 0;

    function measure() {
      const r = hero.getBoundingClientRect();
      w = r.width;
      h = r.height;
      R = Math.min(300, Math.max(130, 0.36 * Math.min(w, h)));
      // Giàn đèn đặt ở góc trên bên phải, ngoài khung hình
      srcX = w * 0.86;
      srcY = -h * 0.08;
    }

    // Tư thế "nghỉ": đèn mở rộng phủ cả sân khấu → luôn đọc được tên MC và nút Đặt lịch
    function restPose() {
      tx = w * 0.5;
      ty = h * 0.46;
      ts = (0.62 * Math.hypot(w, h)) / R;
    }

    function apply() {
      const k = (R * s) / HOLE;
      dark.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${k.toFixed(3)})`;
      const dx = x - srcX;
      const dy = y - srcY;
      const angle = Math.atan2(-dx, dy);
      const len = Math.hypot(dx, dy);
      beam.style.transform = `translate3d(${srcX.toFixed(1)}px, ${srcY.toFixed(1)}px, 0) rotate(${angle.toFixed(4)}rad) scale(${((2 * R * s) / 100).toFixed(3)}, ${(len / 100).toFixed(3)})`;
    }

    function tick() {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      s += (ts - s) * 0.07;
      apply();
      const moving = Math.abs(tx - x) + Math.abs(ty - y) > 0.4 || Math.abs(ts - s) > 0.003;
      raf = moving && visible ? requestAnimationFrame(tick) : 0;
    }
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(tick); };

    function light() {
      if (lit) return;
      lit = true;
      hero.classList.add("is-lit");
    }

    function rest() {
      resting = true;
      restPose();
      hero.classList.add("is-resting");
      light();
      kick();
    }

    function aim(clientX, clientY) {
      const r = hero.getBoundingClientRect();
      tx = clientX - r.left;
      ty = clientY - r.top;
      ts = 1;
      resting = false;
      hero.classList.remove("is-resting");
      light();
      kick();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(rest, autoMs + 1400);
    }

    // Vị trí ban đầu: đèn nằm bên trái, chưa bật
    measure();
    x = tx = w * 0.2;
    y = ty = h * 0.38;
    apply();

    // Chuột / bút (máy tính)
    hero.addEventListener("pointermove", (e) => { if (e.pointerType !== "touch") aim(e.clientX, e.clientY); });
    hero.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "touch") return;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(rest, 700);
    });
    // Ngón tay (điện thoại) — passive để không cản cuộn trang
    const onTouch = (e) => { const t = e.touches[0]; if (t) aim(t.clientX, t.clientY); };
    hero.addEventListener("touchstart", onTouch, { passive: true });
    hero.addEventListener("touchmove", onTouch, { passive: true });

    // Không tương tác → đèn tự lướt tới khuôn mặt MC rồi mở rộng
    setTimeout(() => {
      if (lit) return;
      tx = w * 0.5;
      ty = h * 0.3;
      ts = 1;
      light();
      kick();
      idleTimer = setTimeout(rest, 1500);
    }, autoMs);

    // Cuộn trang trước khi bật đèn → bật sáng ngay
    window.addEventListener("scroll", function onScroll() {
      if (window.scrollY > 8) {
        if (!lit) rest();
        window.removeEventListener("scroll", onScroll);
      }
    }, { passive: true });

    window.addEventListener("resize", () => {
      measure();
      if (resting) restPose();
      kick();
      apply();
    }, { passive: true });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
        else if (raf) { cancelAnimationFrame(raf); raf = 0; }
      }).observe(hero);
    }
  }

  // ─── 5. THU GỌN / XEM THÊM ───
  function initCollapse() {
    $$("[data-more]").forEach((btn) => {
      const list = document.getElementById(btn.getAttribute("aria-controls"));
      const text = $("[data-more-text]", btn);
      const section = btn.closest("section");
      if (!list) return;
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        list.classList.toggle("is-open", open);
        if (text) text.textContent = open ? btn.dataset.labelLess : btn.dataset.labelMore;
        // Thu lại → cuộn về đầu section để không bị "lạc" giữa trang
        if (!open) section?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      });
    });
  }

  // ─── 6. VIỀN PHÁT SÁNG CỦA THẺ DỊCH VỤ ───
  // Máy tính: quầng sáng bám theo con trỏ. Điện thoại: thẻ ở giữa màn hình tự sáng viền khi lướt qua.
  function initGlow() {
    const cards = $$("[data-glow]");
    if (!cards.length) return;
    if (canHover) {
      cards.forEach((card) => {
        card.addEventListener("pointermove", (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
      });
    } else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => en.target.classList.toggle("is-lit", en.isIntersecting)),
        { rootMargin: "-42% 0px -42% 0px" }
      );
      cards.forEach((card) => io.observe(card));
    }
  }

  // ─── 7. SHOWREEL: clip ngắn không tiếng, chỉ tải khi cuộn tới ───
  function initReelClip() {
    const clip = $(".reel-clip");
    if (!clip || reduceMotion || navigator.connection?.saveData || !("IntersectionObserver" in window)) return;
    clip.addEventListener("playing", () => clip.classList.add("is-playing"));
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!clip.src) clip.src = clip.dataset.src;
        clip.play().catch(() => {});
      } else {
        clip.pause();
      }
    }, { threshold: 0.25 }).observe(clip);
  }

  // ─── 8. TRÌNH PHÁT VIDEO (chỉ tạo iframe/video khi bấm) ───
  function toEmbed(url) {
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (yt) {
      return `<iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1" title="Video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    }
    const safe = url.replace(/"/g, "&quot;");
    return `<video class="w-full h-full" src="${safe}" controls autoplay playsinline></video>`;
  }

  function setupDialog(dialog, onClose) {
    dialog.addEventListener("close", () => { unlockScroll(); onClose?.(); });
    dialog.addEventListener("click", (e) => { if (e.target === dialog || e.target.closest("[data-close]")) dialog.close(); });
  }

  function initVideoPlayer() {
    const modal = $("#video-modal");
    if (!modal || typeof modal.showModal !== "function") return;
    const player = $("[data-player]", modal);
    let opener = null;
    setupDialog(modal, () => { player.innerHTML = ""; opener?.focus({ preventScroll: true }); });
    $$("[data-video]").forEach((el) =>
      el.addEventListener("click", () => {
        opener = el;
        player.innerHTML = toEmbed(el.dataset.video);
        modal.setAttribute("aria-label", `Video: ${el.dataset.title || ""}`);
        lockScroll();
        modal.showModal();
      })
    );
  }

  // ─── 9. LIGHTBOX GALLERY ───
  function initLightbox() {
    const box = $("#lightbox");
    const triggers = $$("[data-lightbox]");
    if (!box || !triggers.length || typeof box.showModal !== "function") return;
    const img = $(".lb-img", box);
    const caption = $("[data-caption]", box);
    const count = $("[data-count]", box);
    let current = 0;
    let opener = null;

    function show(i) {
      current = (i + triggers.length) % triggers.length;
      const t = triggers[current];
      img.classList.remove("is-missing");
      img.src = t.dataset.lightbox;
      img.alt = t.dataset.alt || "";
      caption.textContent = t.dataset.alt || "";
      count.textContent = `${current + 1} / ${triggers.length}`;
    }
    img.addEventListener("error", () => img.classList.add("is-missing"));

    setupDialog(box, () => opener?.focus({ preventScroll: true }));
    triggers.forEach((t, i) =>
      t.addEventListener("click", () => {
        opener = t;
        show(i);
        lockScroll();
        box.showModal();
      })
    );
    $("[data-prev]", box)?.addEventListener("click", () => show(current - 1));
    $("[data-next]", box)?.addEventListener("click", () => show(current + 1));
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });

    // Vuốt trái/phải để chuyển ảnh
    let x0 = 0, y0 = 0;
    box.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    box.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  // ─── 10. SLIDER CẢM NHẬN (vuốt bằng scroll-snap gốc của trình duyệt) ───
  function initSlider() {
    const root = $("[data-slider]");
    if (!root) return;
    const track = $("[data-track]", root);
    const slides = $$(".quote", track);
    const dots = $$("[data-dot]", root);
    if (slides.length < 2) return;
    let index = 0;

    const go = (i) => {
      index = Math.max(0, Math.min(slides.length - 1, i));
      const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
      track.scrollTo({ left: slides[index].offsetLeft - pad, behavior: reduceMotion ? "auto" : "smooth" });
    };

    let ticking = false;
    track.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
        const pos = track.scrollLeft + pad;
        let best = 0;
        slides.forEach((s, i) => { if (Math.abs(s.offsetLeft - pos) < Math.abs(slides[best].offsetLeft - pos)) best = i; });
        index = best;
        dots.forEach((d, i) => d.setAttribute("aria-current", String(i === best)));
      });
    }, { passive: true });

    dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
    $("[data-slide-prev]", root)?.addEventListener("click", () => go(index - 1));
    $("[data-slide-next]", root)?.addEventListener("click", () => go(index + 1));
  }

  // ─── 11. FORM BÁO GIÁ: mở ứng dụng email với nội dung đã điền ───
  function initForm() {
    const form = $("#contact-form");
    if (!form) return;
    const status = $("[data-form-status]", form);
    const fold = $("[data-form-fold]");
    // Màn hình lớn: form mở sẵn
    if (fold && window.matchMedia("(min-width: 1024px)").matches) fold.open = true;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstInvalid = null;
      $$("input, select, textarea", form).forEach((el) => {
        const ok = el.checkValidity();
        el.setAttribute("aria-invalid", String(!ok));
        if (!ok && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        status.textContent = "Vui lòng điền họ tên và số điện thoại hợp lệ.";
        firstInvalid.focus();
        return;
      }
      const data = Object.fromEntries(new FormData(form));
      const to = form.dataset.email;
      if (!to) {
        status.textContent = "Email nhận yêu cầu chưa được cập nhật — vui lòng gọi điện hoặc nhắn Zalo ở trên.";
        return;
      }
      const subject = `Yêu cầu báo giá MC — ${data.eventType || ""}`;
      const body = [
        `Họ tên: ${data.name}`,
        `Điện thoại: ${data.phone}`,
        `Loại sự kiện: ${data.eventType || ""}`,
        `Ngày dự kiến: ${data.date || "Chưa xác định"}`,
        "",
        data.message || "",
      ].join("\n");
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Đang mở ứng dụng email của bạn...";
    });
  }

  // ─── 12. NÚT NỔI + HIỆN DẦN KHI CUỘN ───
  function initFloating() {
    const floating = $("#floating");
    const watched = [$("#hero"), $(".contact-cta")].filter(Boolean);
    if (!floating || !watched.length || !("IntersectionObserver" in window)) return;
    // Ẩn khi màn hình đầu (đã có nút Đặt lịch) hoặc cụm nút Gọi/Zalo của mục Liên hệ đang hiển thị
    const showing = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? showing.add(en.target) : showing.delete(en.target)));
      floating.classList.toggle("is-hidden", showing.size > 0);
    }, { threshold: 0.35 });
    watched.forEach((el) => io.observe(el));
  }

  function initReveal() {
    const els = $$(".reveal");
    if (!els.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
  }

  // ─── KHỞI ĐỘNG ───
  initHeader();
  initMobileMenu();
  initSpotlight();
  initCollapse();
  initGlow();
  initReelClip();
  initVideoPlayer();
  initLightbox();
  initSlider();
  initForm();
  initFloating();
  initReveal();
})();
