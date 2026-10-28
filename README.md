# MC Portfolio — giao diện "Xenon Follow-Spot"

Website một trang cho MC sự kiện: HTML + Tailwind CSS v4 + JavaScript thuần, không framework, không bundler.
Giao diện **thiết kế cho điện thoại trước** (390px); máy tính là bản mở rộng.
Toàn bộ nội dung nằm trong **một file duy nhất: `site.config.js`**.

**Phong cách:** khán phòng tắt đèn — nền than chì lạnh `#07090D`, chữ trắng `#EEF2F7`, ánh đèn xenon xanh băng `#8FC8FF`.
Tiêu đề dùng **Big Shoulders Display** (chữ hẹp kiểu bảng đèn sân khấu), nội dung dùng **Lexend**. Cả hai font đều có bộ chữ tiếng Việt.

**Hero "The Spotlight Reveal":** khi mới mở trang, màn hình tối mờ, giữa màn hình có dòng chữ mỏng "Sẵn sàng tỏa sáng...".
Khi chạm (điện thoại) hoặc di chuột (máy tính), một **đèn follow-spot** chiếu từ giàn đèn góc trên bên phải sẽ bám theo ngón tay/con trỏ, soi rõ ảnh chân dung, tên MC và nút "Đặt lịch".
Nếu khách không tương tác, sau vài giây đèn tự lướt tới khuôn mặt MC rồi mở rộng phủ cả sân khấu, nên khách luôn đọc được tên và thấy nút đặt lịch.
Nút "Đặt lịch" tự phát sáng, nên vẫn thấy được cả khi sân khấu còn tối.

> Hiệu ứng chỉ đổi `transform` của 2 lớp (tấm tối có lỗ sáng và chùm sáng), chạy trên GPU và tự dừng khi đèn đứng yên hoặc khi hero ra khỏi màn hình.
> Khi bật "Giảm chuyển động" hoặc trình duyệt tắt JavaScript, sân khấu sáng sẵn và không có đèn chạy.

## Cài đặt

Yêu cầu **Node.js >= 20**.

```bash
npm install
```

## Các lệnh

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Build (không minify), mở server tại http://localhost:5173 và tự build lại khi sửa `index.html`, `site.config.js`, `src/`, `public/` |
| `npm run build` | Build bản chính thức (CSS minify) vào `dist/` |
| `npm run preview` | Chỉ phục vụ `dist/` đang có, không build |
| `node scripts/build.mjs --html-only` | Chỉ ghép HTML, bỏ qua CSS (nhanh) |

> Trên Windows PowerShell, nếu gặp lỗi "running scripts is disabled", dùng `npm.cmd run dev`.

- **Xem thử trên điện thoại thật:** khi chạy `npm run dev`, terminal in thêm dòng `Mạng LAN (điện thoại): http://192.168.x.x:5173/`. Mở địa chỉ đó trên điện thoại dùng **cùng Wi-Fi** với máy tính. Nếu không vào được, cho phép Node.js đi qua Windows Firewall.
- Đổi cổng: `PORT=3000 npm run dev` (PowerShell: `$env:PORT=3000; npm run dev`).
- Giả lập GitHub Pages dạng project: `npm run dev -- --base=/profilestudio-mc-spotlight/` rồi mở http://localhost:5173/profilestudio-mc-spotlight/.

Sau mỗi lần build, terminal sẽ báo:
- **Cảnh báo vàng**: file ảnh/video được khai báo nhưng chưa có trong `public/`, và các placeholder `[IN_HOA]` chưa thay.
- **Lỗi đỏ**: template dùng key không có trong config (lệnh build trả mã lỗi 1).

## Sửa nội dung

1. Mở `site.config.js` và sửa chữ, link, danh sách dịch vụ/video/ảnh… Mỗi mục có comment hướng dẫn và kích thước ảnh (điện thoại ghi trước, máy tính sau).
2. Thêm/bớt dịch vụ, video, ảnh gallery, đối tác, cảm nhận, câu hỏi bằng cách thêm/xóa object trong mảng `items`.
3. Đường dẫn ảnh viết dạng `public/images/...` (không có dấu `/` ở đầu).
4. Không sửa tay thư mục `dist/`, vì nó bị xóa và tạo lại mỗi lần build.

Link còn là placeholder (`[ZALO_LINK]`, `[SO_DIEN_THOAI]`…) sẽ tự trỏ về mục Liên hệ, nên không bao giờ thành link hỏng.
Ảnh chưa có sẽ tự hiện khung họa tiết cùng tỉ lệ (kèm nhãn hoặc icon), nên bố cục không bị vỡ.

### Chỉnh số mục hiển thị trên điện thoại

Trên điện thoại, mỗi danh sách chỉ hiện vài mục đầu, phần còn lại nằm sau nút **"Xem thêm (N)"**. Bấm lần nữa thì nút thành **"Thu gọn"** và trang cuộn về đầu mục.
Nội dung bị thu gọn vẫn nằm sẵn trong HTML (tốt cho SEO). Nếu trình duyệt tắt JavaScript, trang hiện đầy đủ.

| Key trong `site.config.js` | Mặc định | Ghi chú |
|---|---|---|
| `services.mobileVisible` | `3` | Từ màn hình ≥ 1024px hiện đủ tất cả |
| `videos.mobileVisible` | `2` | Video nhỏ dưới showreel; ≥ 1024px hiện đủ |
| `gallery.mobileVisible` | `6` | Gallery thu gọn ở **mọi** kích thước (lưới 6 ảnh + nút "Xem thêm ảnh") |
| `testimonials.sliderLimit` | `3` | Slider chỉ lấy N cảm nhận đầu tiên (nên 2–3) |

Câu chuyện ở mục Giới thiệu, câu hỏi FAQ và form báo giá dùng thẻ `<details>` gốc của HTML (mở/đóng được cả khi không có JavaScript, dùng được bằng bàn phím và trình đọc màn hình).

### Các key mới của giao diện này

| Key | Ý nghĩa |
|---|---|
| `ui.showMore`, `ui.showLess` | Chữ trên nút thu gọn/mở rộng ("Xem thêm" / "Thu gọn") |
| `ui.skipLink`, `ui.menuLabel` | Chữ của link "Bỏ qua đến nội dung chính" và nút "Menu" |
| `hero.image.mobile` / `.desktop` | Ảnh hero đã tối ưu (`.webp`). Để `""` thì dùng `backgroundMobile` / `backgroundDesktop` |
| `hero.imagePosition.mobile` / `.desktop` | Điểm lấy nét ảnh (CSS `object-position`), VD `"50% 22%"`: đặt vào khuôn mặt MC |
| `hero.revealTeaser` | Dòng chữ mỏng lúc màn hình còn tối ("Sẵn sàng tỏa sáng...") |
| `hero.revealHint.touch` / `.mouse` | Gợi ý cách bật đèn cho điện thoại / máy tính |
| `hero.autoRevealSeconds` | Sau bao nhiêu giây không tương tác thì đèn tự rọi vào MC (mặc định `2.6`) |
| `about.summary` | Tóm tắt 2–3 câu, luôn hiển thị |
| `about.storyToggleLabel` | Chữ trên khối mở câu chuyện đầy đủ (`about.story`) |
| `services.mobileVisible`, `videos.mobileVisible`, `gallery.mobileVisible` | Số mục hiện sẵn (xem bảng trên) |
| `gallery.moreLabel` | Chữ trên nút xem thêm ảnh |
| `videos.featured.previewClip` | Clip ngắn tự phát, không tiếng, ở khung showreel tràn viền (để `""` nếu chưa có). Chỉ tải khi cuộn tới, không tải khi bật tiết kiệm dữ liệu hoặc giảm chuyển động |
| `partners.marqueeSeconds` | Tốc độ dải logo chạy ngang (giây/vòng, lớn hơn = chậm hơn). Logo tự chuyển thành trắng đơn sắc |
| `testimonials.sliderLimit` | Số cảm nhận trong slider |
| `faq` | Mục Câu hỏi thường gặp: `sectionLabel`, `heading`, `items: [{ question, answer }]` |
| `contact.form.toggleLabel` | Chữ trên khối thu gọn chứa form báo giá (máy tính ≥ 1024px: form mở sẵn) |
| `floatingButton.showPhone`, `.phoneLabel` | Thêm nút gọi điện phát sáng phía trên nút Zalo nổi |

Nút liên hệ nổi tự ẩn khi đang ở màn hình đầu (đã có nút Đặt lịch) và khi cụm nút Gọi/Zalo của mục Liên hệ đang hiển thị.

Màu sắc và font khai báo **một lần** trong `@theme` ở đầu `src/input.css` (`--color-night`, `--color-fg`, `--color-xenon`, `--font-display`, `--font-sans`…).

## Ảnh cần chuẩn bị

Ưu tiên `.webp`, tên kebab-case có số thứ tự. Kích thước ghi **điện thoại trước, máy tính sau**. Các thư mục đã được tạo sẵn trong `public/images/`.

| File | Điện thoại | Máy tính |
|---|---|---|
| `public/images/hero/hero-m.webp` ✅ có sẵn | 720×1280 (dọc 9:16) | — |
| `public/images/hero/hero-d.webp` ✅ có sẵn | — | 1920×1280 (ngang 3:2) |
| `public/images/about/portrait-mobile.webp` | 400×500 (4:5) | — |
| `public/images/about/portrait.webp` | — | 600×800 (3:4) |
| `public/images/services/service-01..06.webp` | 600×400 (3:2), dùng chung | dùng chung |
| `public/images/videos/showreel-thumb.webp` | 1280×720, dùng chung | dùng chung |
| `public/images/videos/video-01..04.webp` | 640×360, dùng chung | dùng chung |
| `public/images/gallery/gallery-01..08.webp` | 960×1200 (4:5) hoặc 1200×900, dùng chung | dùng chung |
| `public/images/partners/partner-01..06.webp` | 200×80, nền trong suốt | dùng chung |
| `public/images/testimonials/avatar-01..04.webp` | 100×100 | dùng chung |
| `public/images/og/og-cover.jpg` | — | 1200×630 (ảnh khi chia sẻ link) |
| `public/videos/showreel-loop.mp4` (tùy chọn) | 720×1280 hoặc 1280×720, 6–12 giây, không tiếng, ≤ 2MB | dùng chung |

Icon (`public/icons/`) đã có sẵn: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`.

## Deploy lên GitHub Pages

1. Tạo repo (VD `profilestudio-mc-spotlight`) và push code lên nhánh `main`.
2. Trên GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Mỗi lần push lên `main`, workflow `.github/workflows/deploy.yml` sẽ tự build và deploy (hoặc chạy tay trong tab **Actions**).

Trang dùng đường dẫn tương đối nên chạy được cả ở `https://ten.github.io/` lẫn `https://ten.github.io/profilestudio-mc-spotlight/`.
Có thể đưa thư mục `dist/` lên bất kỳ hosting tĩnh nào (Netlify, Vercel, Cloudflare Pages…).

## Cấu trúc thư mục

```
├── site.config.js        # NỘI DUNG website (sửa ở đây)
├── index.html            # Khung HTML (template)
├── src/
│   ├── templates.js      # Bộ render: config → HTML
│   ├── input.css         # CSS nguồn Tailwind v4 (màu, font trong @theme)
│   └── js/main.js        # JS phía trình duyệt (đèn follow-spot, menu, thu gọn, lightbox, slider, video, form)
├── public/               # icons/, images/<khu-vuc>/, videos/
├── scripts/
│   ├── build.mjs         # Build → dist/
│   └── dev.mjs           # Server phát triển (0.0.0.0, in IP mạng LAN)
└── .github/workflows/deploy.yml
```
