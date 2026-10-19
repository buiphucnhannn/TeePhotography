# Tee.Photography in Hoi An — Landing Page

Landing page song ngữ (Việt / English) cho studio ảnh cưới **Tee.Photography** tại Hội An.
Xây bằng **Next.js 16 (App Router)**, **Tailwind CSS v4**, **JavaScript thuần** và **Lenis** cho cuộn mượt.

Yêu cầu gốc nằm ở `docs/demo.docx`. Phong cách tham khảo: Pixieset (trắng, thoáng, ảnh lớn) + header & cuộn mượt theo mẫu ButStudio.

## Bắt đầu

```bash
npm install
npm run dev        # http://localhost:3000  (tiếng Việt)  ·  /en (English)
```

| Lệnh             | Mô tả                                                                    |
| ---------------- | ------------------------------------------------------------------------ |
| `npm run dev`    | Chạy môi trường phát triển                                               |
| `npm run build`  | Build production                                                         |
| `npm run start`  | Chạy bản build                                                           |
| `npm run lint`   | Kiểm tra code với ESLint                                                 |
| `npm run images` | Sinh lại manifest ảnh (kích thước + blur), logo PNG trong suốt, ảnh OG   |
| `npm run icons`  | Sinh lại icon PWA / apple-icon                                           |

Script kiểm tra giao diện (cần Chrome cài sẵn): `node scripts/screenshot.mjs http://localhost:3000/ ./shots`.

## Cấu trúc thư mục

```
├── docs/demo.docx                 # Hồ sơ yêu cầu từ sale
├── public/
│   ├── icons/                     # Icon PWA
│   └── images/
│       ├── brand/                 # logo.jpg (gốc) → logo.png, logo-white.png (tự sinh)
│       ├── old-town/              # Bộ sưu tập Phố cổ (9 ảnh)
│       ├── countryside/           # Bộ sưu tập Đồng quê & biển (5 ảnh)
│       ├── moments/               # Khoảnh khắc (ảnh nhẫn)
│       └── og/                    # Ảnh chia sẻ mạng xã hội (tự sinh)
├── scripts/
│   ├── build-images.mjs           # Manifest ảnh + logo + OG
│   ├── build-icons.mjs
│   └── screenshot*.mjs            # Chụp màn hình kiểm tra
└── src/
    ├── app/
    │   ├── [lang]/                # layout.js (font, SEO, JSON-LD), page.js, not-found.js
    │   ├── globals.css            # Design tokens (@theme), utilities, reveal/marquee CSS
    │   └── robots.js · sitemap.js · manifest.js · icon.svg · apple-icon.png
    ├── components/
    │   ├── fx/                    # SmoothScroll (Lenis), Reveal, Parallax, SplitText, Preloader
    │   ├── layout/                # Header (pill kính mờ), Footer, FloatingContact, ScrollTop
    │   ├── booking/               # BookingModal + BookingForm (popup đặt lịch, mở bằng data-booking)
    │   ├── sections/              # Hero, Marquee, About, Collections, Gallery, Services,
    │   │                          # Process, Testimonials, Pricing, CtaBand, FAQ
    │   └── ui/                    # Button, Container, SectionHeading, Logo, Icon, Lightbox
    ├── data/
    │   ├── site.js                # Thông tin doanh nghiệp, liên hệ, mạng xã hội
    │   ├── gallery.js             # Danh sách ảnh theo bộ sưu tập + ảnh dùng ở vị trí nổi bật
    │   ├── images.generated.js    # Tự sinh — đừng sửa tay
    │   └── dictionaries/          # vi.js, en.js — toàn bộ nội dung chữ
    ├── hooks/useReveal.js
    └── lib/utils.js               # cn, localePath, anchor, lockScroll, fmt…
```

## Song ngữ

- `/` là tiếng Việt (rewrite nội bộ tới `/vi`), `/en` là tiếng Anh. `/vi` redirect về `/`.
- Mọi chữ nằm trong `src/data/dictionaries/{vi,en}.js`. Thêm ngôn ngữ: thêm file từ điển và thêm mã vào `locales` trong `src/data/site.js`.
- Chuỗi có biến dùng dạng `"{n} ảnh"` + helper `fmt()` (không dùng hàm trong từ điển vì không truyền được sang client component).

## Thêm / thay ảnh

1. Bỏ ảnh JPG vào `public/images/<bộ-sưu-tập>/` (tên không dấu, gạch nối).
2. Chạy `npm run images` để cập nhật kích thước và blur placeholder.
3. Khai báo ảnh (và alt 2 ngôn ngữ) trong `src/data/gallery.js`; chọn ảnh cho hero/about/dịch vụ ở object `featured`.

## Hiệu ứng

- **Cuộn mượt**: `components/fx/SmoothScroll.jsx` (Lenis, `lerp 0.06`, `wheelMultiplier 0.78`). Instance ở `window.__lenis`.
- **Hiện dần khi cuộn**: thêm class `reveal` (tuỳ chọn `data-reveal="left|right|scale|clip"`, trễ bằng `style={{"--reveal-delay":"120ms"}}`) hoặc dùng `<SplitText>` cho tiêu đề.
- **Header**: section nền tối đặt `data-nav-theme="dark"` để header chuyển sang kính tối chữ trắng.
- **Popup đặt lịch**: bất kỳ phần tử nào có thuộc tính `data-booking` đều mở popup; giá trị của thuộc tính (tên dịch vụ/gói) sẽ được chọn sẵn trong form. Form soạn tin nhắn, sao chép vào clipboard rồi mở WhatsApp (điền sẵn nội dung) hoặc Zalo.

## Việc cần làm trước khi bàn giao

- `BookingForm.jsx` hiện gửi qua WhatsApp/Zalo (demo, không có backend) — khi có API thì thay `handleSend`.
- Email, Instagram, số liệu (500+ cặp đôi…), testimonial và bảng giá là nội dung mẫu — xác nhận lại với khách.
- Đặt `NEXT_PUBLIC_SITE_URL` (xem `.env.example`) theo domain thật để SEO/OG đúng.
