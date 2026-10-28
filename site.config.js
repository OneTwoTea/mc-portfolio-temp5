/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  SITE.CONFIG.JS — CẤU HÌNH NỘI DUNG WEBSITE                 ║
 * ║  Giao diện "Xenon Follow-Spot" — thiết kế cho điện thoại    ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  Toàn bộ nội dung hiển thị trên website được quản lý        ║
 * ║  tại file này. Muốn đổi nội dung, chỉ cần sửa file này      ║
 * ║  rồi chạy `npm run build` (hoặc để `npm run dev` tự build). ║
 * ║                                                              ║
 * ║  HƯỚNG DẪN:                                                  ║
 * ║  - Thay các giá trị [IN_HOA] bằng thông tin thật             ║
 * ║  - Đường dẫn ảnh viết dạng "public/images/..." (không có /   ║
 * ║    ở đầu)                                                    ║
 * ║  - Ảnh ưu tiên .webp, tên kebab-case: service-01.webp,       ║
 * ║    bản riêng cho điện thoại thêm đuôi -m: service-01-m.webp  ║
 * ║  - Kích thước ảnh ghi ở comment từng mục: ĐIỆN THOẠI trước,  ║
 * ║    MÁY TÍNH sau                                              ║
 * ║  - Ảnh chưa có → trang tự hiện khung thay thế cùng tỉ lệ     ║
 * ║  - Link còn placeholder → nút tự trỏ về mục #contact         ║
 * ║  - Số mục hiện sẵn trên điện thoại: key `mobileVisible`      ║
 * ║    ở từng khu vực (phần còn lại nằm sau nút "Xem thêm")      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

export const SITE_CONFIG = {

  // ─── 0. CHỮ GIAO DIỆN DÙNG CHUNG (MỚI) ─────────────────────
  // Chữ trên các nút thu gọn/mở rộng của mọi danh sách
  ui: {
    showMore: "Xem thêm",                            // nút sẽ hiện "Xem thêm (N)"
    showLess: "Thu gọn",
    skipLink: "Bỏ qua đến nội dung chính",
    menuLabel: "Menu",
  },

  // ─── 1. SEO & META ─────────────────────────────────────────
  seo: {
    title: "MC [TEN_MC] — MC Sự Kiện Chuyên Nghiệp",
    description: "MC dẫn chương trình sự kiện chuyên nghiệp tại TP.HCM và toàn quốc. Hơn [SO_NAM_KINH_NGHIEM] năm kinh nghiệm, [SO_SU_KIEN]+ sự kiện thành công.",
    keywords: "MC sự kiện, MC đám cưới, MC doanh nghiệp, dẫn chương trình, [TEN_MC]",
    ogImage: "public/images/og/og-cover.jpg",        // 1200×630px, JPG (Facebook/Zalo chưa đọc tốt WebP)
    ogImageAlt: "MC [TEN_MC] — Dẫn chương trình sự kiện",
    url: "[WEBSITE_URL]",                            // VD: https://ten-ban.github.io/mc-portfolio/
    locale: "vi_VN",
    themeColor: "#07090D",                           // màu thanh trình duyệt trên điện thoại — trùng màu nền tối của trang
  },

  // ─── 2. THÔNG TIN CÁ NHÂN / THƯƠNG HIỆU ──────────────────
  brand: {
    name: "[TEN_MC]",
    tagline: "MC Sự Kiện Chuyên Nghiệp",
    logo: "public/icons/favicon.svg",                // SVG logo, 40×40px hiển thị
    logoAlt: "Logo [TEN_MC]",
  },

  // ─── 3. HEADER ─────────────────────────────────────────────
  // Điện thoại: logo trái + nút menu (hamburger) phải, nền trong suốt khi ở đầu trang.
  // Máy tính (≥ 1024px): menu ngang + nút CTA bên phải.
  header: {
    menuItems: [
      { label: "Trang chủ", href: "#hero" },
      { label: "Giới thiệu", href: "#about" },
      { label: "Dịch vụ", href: "#services" },
      { label: "Video", href: "#videos" },
      { label: "Gallery", href: "#gallery" },
      { label: "Cảm nhận", href: "#testimonials" },
      { label: "Liên hệ", href: "#contact" },
    ],
    ctaButton: {
      label: "Đặt Lịch Ngay",
      href: "[ZALO_LINK]",                           // Link Zalo hoặc #contact
    },
  },

  // ─── 4. HERO (THE SPOTLIGHT REVEAL) ───────────────────────
  // Màn hình đầu tối mờ + dòng chữ "Sẵn sàng tỏa sáng...". Chạm/di chuột → đèn follow-spot
  // bám theo ngón tay/con trỏ, soi rõ ảnh chân dung, tên MC (brand.name) và nút "Đặt lịch".
  // Ảnh: Điện thoại 720×1280px (dọc 9:16) — Máy tính 1920×1280px (ngang 3:2) hoặc 1920×1080px (16:9)
  // Ảnh hero luôn được tải ngay (không lazy), nên dùng .webp ≤ 150KB.
  hero: {
    heading: "Khoảnh Khắc Đáng Nhớ\nBắt Đầu Từ Sân Khấu",
    subheading: "MC dẫn chương trình chuyên nghiệp cho đám cưới, sự kiện doanh nghiệp và các chương trình nghệ thuật trên toàn quốc.",
    backgroundDesktop: "public/images/hero/hero.jpg",   // 1920×1080px
    backgroundMobile: "public/images/hero/hero_minh.jpg",     // 750×1334px
    backgroundAlt: "MC [TEN_MC] dẫn chương trình trên sân khấu",
    ctaPrimary: {
      label: "Đặt Lịch Qua Zalo",
      href: "[ZALO_LINK]",
    },
    ctaSecondary: {
      label: "Xem Showreel",
      href: "#videos",
    },
    scrollIndicator: true,

    // (MỚI) Ảnh đã tối ưu cho hero. Để "" thì dùng backgroundMobile / backgroundDesktop ở trên.
    image: {
      mobile: "public/images/hero/hero-m.webp",      // 720×1280px (dọc 9:16), ~65KB
      desktop: "public/images/hero/hero-d.webp",     // 1920×1280px (ngang 3:2), ~75KB
    },
    // (MỚI) Điểm lấy nét của ảnh (CSS object-position) — đặt vào khuôn mặt MC
    imagePosition: {
      mobile: "50% 22%",
      desktop: "50% 35%",
    },
    // (MỚI) Dòng chữ mỏng giữa màn hình lúc mới mở trang (trạng thái tối)
    revealTeaser: "Sẵn sàng tỏa sáng...",
    // (MỚI) Gợi ý nhỏ cách tương tác (điện thoại / máy tính)
    revealHint: {
      touch: "Chạm hoặc vuốt để bật đèn",
      mouse: "Di chuột để bật đèn",
    },
    // (MỚI) Sau bao nhiêu giây không tương tác thì đèn tự rọi vào MC (để khách luôn thấy tên + nút Đặt lịch)
    autoRevealSeconds: 2.6,
  },

  // ─── 5. GIỚI THIỆU ────────────────────────────────────────
  // Ảnh chân dung: Điện thoại 400×500px (4:5) — Máy tính 600×800px (3:4)
  // Điện thoại: chỉ hiện `summary` (2–3 câu); `story` nằm trong khối thu gọn "Đọc câu chuyện".
  about: {
    sectionLabel: "Về Tôi",
    heading: "Đồng Hành Cùng\nKhoảnh Khắc Của Bạn",
    // (MỚI) Tóm tắt 2–3 câu, luôn hiển thị
    summary: "Hơn [SO_NAM_KINH_NGHIEM] năm cầm mic, [SO_SU_KIEN]+ sân khấu — từ tiệc cưới ấm cúng đến gala nghìn khách. Tôi chuẩn bị kịch bản riêng cho từng chương trình và giữ nhịp cảm xúc từ lời chào đầu tiên đến khoảnh khắc khép lại.",
    // (MỚI) Chữ trên nút mở phần câu chuyện đầy đủ (story)
    storyToggleLabel: "Đọc câu chuyện của tôi",
    portrait: "public/images/about/portrait.webp",        // 600×800px
    portraitMobile: "public/images/about/portrait-mobile.webp", // 400×500px
    portraitAlt: "MC [TEN_MC] trên sân khấu",
    story: "Với hơn [SO_NAM_KINH_NGHIEM] năm kinh nghiệm trong lĩnh vực dẫn chương trình, tôi đã có vinh dự đồng hành cùng hàng trăm sự kiện — từ những đám cưới ấm cúng đến những gala doanh nghiệp quy mô lớn.\n\nTriết lý của tôi: mỗi sự kiện là duy nhất, và người MC phải là cầu nối cảm xúc giữa chương trình và khán giả. Tôi luôn chuẩn bị kỹ lưỡng, lắng nghe mong muốn của khách hàng, và mang đến năng lượng tích cực cho từng khoảnh khắc trên sân khấu.",
    stats: [
      { number: "[SO_NAM_KINH_NGHIEM]+", label: "Năm Kinh Nghiệm" },
      { number: "[SO_SU_KIEN]+", label: "Sự Kiện Thành Công" },
      { number: "50+", label: "Đối Tác Doanh Nghiệp" },
      { number: "100%", label: "Khách Hàng Hài Lòng" },
    ],
  },

  // ─── 6. DỊCH VỤ ───────────────────────────────────────────
  // Ảnh dịch vụ: Điện thoại 600×400px (3:2) — Máy tính dùng chung ảnh này (thẻ co theo màn hình)
  // Chưa có ảnh → thẻ hiện khung tối cùng tỉ lệ kèm icon.
  services: {
    sectionLabel: "Dịch Vụ",
    heading: "Dịch Vụ Của Tôi",
    subheading: "Mỗi loại hình sự kiện đều được chuẩn bị kịch bản riêng, phù hợp với phong cách và mong muốn của bạn.",
    mobileVisible: 3,                                // (MỚI) số thẻ hiện sẵn trên điện thoại; ≥ 1024px hiện đủ
    items: [
      {
        icon: "wedding",
        title: "MC Đám Cưới",
        description: "Dẫn dắt tiệc cưới ấm cúng, lãng mạn với kịch bản cá nhân hóa cho từng cặp đôi.",
        image: "public/images/services/service-01.webp",  // 600×400px
      },
      {
        icon: "corporate",
        title: "MC Doanh Nghiệp",
        description: "Gala dinner, hội nghị khách hàng, lễ kỷ niệm — chuyên nghiệp và đẳng cấp.",
        image: "public/images/services/service-02.webp",
      },
      {
        icon: "event",
        title: "MC Sự Kiện",
        description: "Festival, concert, gameshow — tạo không khí sôi động và kết nối khán giả.",
        image: "public/images/services/service-03.webp",
      },
      {
        icon: "ceremony",
        title: "MC Lễ Khai Trương",
        description: "Lễ khai trương, động thổ, khánh thành — trang trọng và chuyên nghiệp.",
        image: "public/images/services/service-04.webp",
      },
      {
        icon: "award",
        title: "MC Lễ Trao Giải",
        description: "Vinh danh, trao giải thưởng — tạo cảm xúc và khoảnh khắc đáng nhớ.",
        image: "public/images/services/service-05.webp",
      },
      {
        icon: "bilingual",
        title: "MC Song Ngữ",
        description: "Dẫn chương trình Việt — Anh cho sự kiện quốc tế và đa văn hóa.",
        image: "public/images/services/service-06.webp",
      },
    ],
  },

  // ─── 7. VIDEO SHOWREEL ─────────────────────────────────────
  // Poster: showreel Điện thoại 1280×720px (dùng chung Máy tính), video nhỏ 640×360px (16:9)
  // videoUrl: link YouTube (https://youtu.be/... hoặc https://www.youtube.com/watch?v=...)
  //           hoặc file tự host "public/videos/ten-video.mp4". Video đầy đủ chỉ tải khi người xem bấm.
  videos: {
    sectionLabel: "Video",
    heading: "Khoảnh Khắc Trên Sân Khấu",
    subheading: "Xem những highlight từ các sự kiện tôi đã dẫn chương trình.",
    mobileVisible: 2,                                // (MỚI) số video nhỏ hiện sẵn trên điện thoại; ≥ 1024px hiện đủ
    featured: {
      title: "Showreel 2025",
      thumbnail: "public/images/videos/showreel-thumb.webp",  // 1280×720px
      videoUrl: "[YOUTUBE_SHOWREEL_URL]",
      duration: "3:45",
      // (MỚI) Clip ngắn 6–12 giây, KHÔNG tiếng, tự phát lặp lại ở khung showreel tràn viền.
      // File .mp4 (H.264) 720×1280 hoặc 1280×720, ≤ 2MB, VD "public/videos/showreel-loop.mp4".
      // Để "" thì chỉ hiện poster. Clip chỉ tải khi cuộn tới, và không tải khi bật "Giảm chuyển động"/tiết kiệm dữ liệu.
      previewClip: "",
    },
    items: [
      {
        title: "Highlight Đám Cưới",
        thumbnail: "public/images/videos/video-01.webp",       // 640×360px
        videoUrl: "[YOUTUBE_VIDEO_01]",
        duration: "2:30",
      },
      {
        title: "Gala Doanh Nghiệp ABC",
        thumbnail: "public/images/videos/video-02.webp",
        videoUrl: "[YOUTUBE_VIDEO_02]",
        duration: "4:15",
      },
      {
        title: "Festival Âm Nhạc 2025",
        thumbnail: "public/images/videos/video-03.webp",
        videoUrl: "[YOUTUBE_VIDEO_03]",
        duration: "3:00",
      },
      {
        title: "Lễ Kỷ Niệm 20 Năm Cty XYZ",
        thumbnail: "public/images/videos/video-04.webp",
        videoUrl: "[YOUTUBE_VIDEO_04]",
        duration: "5:20",
      },
    ],
  },

  // ─── 8. GALLERY ────────────────────────────────────────────
  // Ảnh gallery: Điện thoại hiển thị lưới 2 cột khung 4:5 — Máy tính 3 cột. Ảnh gốc 1200×900px (4:3)
  // hoặc 960×1200px (4:5), dùng luôn cho lightbox (bấm để phóng to, vuốt trái/phải để chuyển ảnh).
  // "category" phải trùng 1 mục trong categories (dùng làm chú thích ảnh).
  gallery: {
    sectionLabel: "Hình Ảnh",
    heading: "Khoảnh Khắc Đáng Nhớ",
    subheading: "Những khoảnh khắc thực tế từ các sự kiện tôi đã đồng hành.",
    mobileVisible: 6,                                // (MỚI) số ảnh hiện sẵn — áp dụng MỌI kích thước màn hình
    moreLabel: "Xem thêm ảnh",                       // (MỚI) chữ trên nút mở thêm ảnh
    categories: ["Tất cả", "Đám cưới", "Doanh nghiệp", "Sự kiện", "Hậu trường"],
    items: [
      {
        src: "public/images/gallery/gallery-01.webp",    // 1200×900px
        alt: "MC dẫn chương trình đám cưới sang trọng",
        category: "Đám cưới",
      },
      {
        src: "public/images/gallery/gallery-02.webp",
        alt: "MC trên sân khấu gala doanh nghiệp",
        category: "Doanh nghiệp",
      },
      {
        src: "public/images/gallery/gallery-03.webp",
        alt: "Khoảnh khắc tương tác với khán giả",
        category: "Sự kiện",
      },
      {
        src: "public/images/gallery/gallery-04.webp",
        alt: "MC dẫn đám cưới ngoài trời",
        category: "Đám cưới",
      },
      {
        src: "public/images/gallery/gallery-05.webp",
        alt: "Gala dinner doanh nghiệp",
        category: "Doanh nghiệp",
      },
      {
        src: "public/images/gallery/gallery-06.webp",
        alt: "Chuẩn bị trước sự kiện",
        category: "Hậu trường",
      },
      {
        src: "public/images/gallery/gallery-07.webp",
        alt: "MC festival âm nhạc",
        category: "Sự kiện",
      },
      {
        src: "public/images/gallery/gallery-08.webp",
        alt: "Chụp ảnh cùng cặp đôi",
        category: "Đám cưới",
      },
    ],
  },

  // ─── 9. KHÁCH HÀNG / ĐỐI TÁC ─────────────────────────────
  // Logo đối tác: Điện thoại & Máy tính dùng chung 200×80px, nền trong suốt (SVG/WebP/PNG)
  // Logo tự chuyển thành trắng đơn sắc. Chưa có logo → hiển thị tên công ty.
  partners: {
    sectionLabel: "Đối Tác",
    heading: "Tin Tưởng Bởi",
    marqueeSeconds: 30,                              // (MỚI) thời gian chạy hết 1 vòng dải logo (lớn hơn = chậm hơn)
    items: [
      { name: "Công ty A", logo: "public/images/partners/partner-01.webp" },
      { name: "Công ty B", logo: "public/images/partners/partner-02.webp" },
      { name: "Công ty C", logo: "public/images/partners/partner-03.webp" },
      { name: "Công ty D", logo: "public/images/partners/partner-04.webp" },
      { name: "Công ty E", logo: "public/images/partners/partner-05.webp" },
      { name: "Công ty F", logo: "public/images/partners/partner-06.webp" },
    ],
  },

  // ─── 10. CẢM NHẬN KHÁCH HÀNG ──────────────────────────────
  // Avatar: Điện thoại & Máy tính dùng chung 100×100px vuông (hiển thị tròn) — chưa có ảnh → hiện chữ cái đầu
  testimonials: {
    sectionLabel: "Cảm Nhận",
    heading: "Khách Hàng Nói Gì",
    subheading: "Niềm tin của khách hàng là động lực lớn nhất để tôi không ngừng hoàn thiện.",
    sliderLimit: 3,                                  // (MỚI) slider chỉ lấy N cảm nhận đầu tiên (nên 2–3)
    items: [
      {
        name: "Anh Trần Văn Hùng",
        role: "Giám đốc, Công ty ABC",
        avatar: "public/images/testimonials/avatar-01.webp",  // 100×100px
        content: "Anh [TEN_MC] dẫn gala cuối năm cho công ty tôi rất chuyên nghiệp. Chương trình được dẫn dắt mạch lạc, không khí sôi động. Chắc chắn sẽ tiếp tục hợp tác!",
        rating: 5,
      },
      {
        name: "Chị Nguyễn Thị Mai",
        role: "Cô dâu",
        avatar: "public/images/testimonials/avatar-02.webp",
        content: "Cảm ơn anh [TEN_MC] đã làm đám cưới của vợ chồng em thêm trọn vẹn. Anh rất tâm lý, chuẩn bị kỹ lưỡng và tạo được nhiều khoảnh khắc xúc động.",
        rating: 5,
      },
      {
        name: "Anh Lê Minh Đức",
        role: "Trưởng phòng Marketing, Tập đoàn XYZ",
        avatar: "public/images/testimonials/avatar-03.webp",
        content: "Đã làm việc với nhiều MC nhưng anh [TEN_MC] luôn là lựa chọn hàng đầu cho các sự kiện quan trọng. Phong cách chuyên nghiệp, linh hoạt và rất có duyên.",
        rating: 5,
      },
      {
        name: "Chị Phạm Hồng Nhung",
        role: "Wedding Planner",
        avatar: "public/images/testimonials/avatar-04.webp",
        content: "Tôi thường xuyên giới thiệu anh [TEN_MC] cho các cặp đôi. Anh luôn mang đến sự chuyên nghiệp và cảm xúc đúng mực cho mỗi lễ cưới.",
        rating: 5,
      },
    ],
  },

  // ─── 10b. CÂU HỎI THƯỜNG GẶP (MỚI) ────────────────────────
  // Mỗi câu là một khối mở/đóng (accordion). Thêm/bớt bằng cách thêm/xóa object trong items.
  faq: {
    sectionLabel: "Hỏi Đáp",
    heading: "Câu Hỏi Thường Gặp",
    items: [
      {
        question: "Cần đặt lịch trước bao lâu?",
        answer: "Mùa cưới và cuối năm nên đặt trước 1–2 tháng. Sự kiện gấp vẫn có thể nhận nếu lịch còn trống — nhắn Zalo để kiểm tra nhanh.",
      },
      {
        question: "Chi phí dẫn chương trình tính thế nào?",
        answer: "Báo giá theo loại sự kiện, thời lượng, địa điểm và yêu cầu kịch bản. Gửi thông tin qua form hoặc Zalo để nhận báo giá chi tiết trong 24 giờ.",
      },
      {
        question: "Có nhận dẫn sự kiện ngoài TP.HCM không?",
        answer: "Có. Tôi nhận sự kiện trên toàn quốc; chi phí di chuyển và lưu trú (nếu có) được ghi rõ trong báo giá.",
      },
      {
        question: "Kịch bản do ai chuẩn bị?",
        answer: "Tôi soạn kịch bản dẫn riêng cho từng chương trình, gửi trước để bạn duyệt, và tổng duyệt cùng ban tổ chức trước giờ G.",
      },
      {
        question: "Có dẫn song ngữ Việt — Anh không?",
        answer: "Có, cho hội nghị, gala và sự kiện có khách quốc tế.",
      },
    ],
  },

  // ─── 11. LIÊN HỆ ──────────────────────────────────────────
  // Điện thoại: 2 nút lớn Gọi ngay / Chat Zalo ở đầu mục, các kênh khác bên dưới, form nằm trong khối thu gọn.
  contact: {
    sectionLabel: "Liên Hệ",
    heading: "Hãy Kết Nối Với Tôi",
    subheading: "Bạn đang lên kế hoạch cho sự kiện? Liên hệ ngay để được tư vấn miễn phí!",
    phone: "[SO_DIEN_THOAI]",                        // VD: "0901 234 567" — tự tạo link tel:
    zalo: "[ZALO_LINK]",                             // https://zalo.me/<số điện thoại>
    email: "[EMAIL]",
    facebook: "[FACEBOOK_LINK]",
    youtube: "[YOUTUBE_LINK]",
    address: "[DIA_CHI]",
    workingHours: "Thứ 2 — Chủ nhật: 8:00 — 21:00",
    // Form báo giá: bấm gửi sẽ mở ứng dụng email với nội dung đã điền (không cần máy chủ)
    form: {
      toggleLabel: "Gửi yêu cầu báo giá qua email",   // (MỚI) chữ trên khối thu gọn chứa form
      heading: "Gửi Yêu Cầu Báo Giá",
      note: "Để lại thông tin, tôi sẽ liên hệ lại trong vòng 24 giờ.",
      submitLabel: "Gửi Yêu Cầu",
      eventTypes: ["Đám cưới", "Sự kiện doanh nghiệp", "Khai trương / Khánh thành", "Lễ trao giải", "Sự kiện song ngữ", "Khác"],
    },
  },

  // ─── 12. FLOATING BUTTON ──────────────────────────────────
  // Nút Zalo phát sáng (neon) nổi ở góc phải dưới, mọi kích thước màn hình.
  // Trên điện thoại, nút hiện ra sau khi cuộn qua màn hình đầu (màn hình đầu đã có nút "Đặt lịch").
  floatingButton: {
    enabled: true,
    type: "zalo",
    label: "Chat Zalo",
    href: "[ZALO_LINK]",                             // VD: https://zalo.me/0901234567
    showPhone: true,                                 // (MỚI) thêm nút gọi điện phát sáng phía trên nút Zalo
    phoneLabel: "Gọi điện",                          // (MỚI)
  },

  // ─── 13. FOOTER ────────────────────────────────────────────
  footer: {
    copyright: "© 2026 [TEN_MC]. All rights reserved.",
    madeWith: "MC sự kiện tại TP.HCM & toàn quốc",
    backToTop: true,                                 // hiện link "Lên đầu trang" ở footer
  },
};
