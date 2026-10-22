# Bloomora — Liquid Glass Flower Time-lapse Explorer

Website tĩnh song ngữ (Tiếng Việt / English) giúp khám phá vòng đời của hoa qua time-lapse minh họa 9 giai đoạn, từ hạt giống đến lúc tàn. Giao diện theo phong cách **Botanical Liquid Glass**.

- Không backend, không database, không đăng nhập, không API AI trả phí.
- Astro 6 (SSG) + TypeScript. React chỉ dùng cho trình phát time-lapse (island).
- CSS variables + SVG animation. Font tự host (Be Vietnam Pro, Newsreader).
- Kiểm thử: Vitest (unit, jsdom) và Playwright (e2e, axe a11y).
- Deploy: GitHub Actions → GitHub Pages (project site hoặc custom domain).
- Analytics tùy chọn: GoatCounter Cloud (không cookie, không dữ liệu cá nhân).

> Mọi time-lapse là **minh họa**, không phải ảnh/video thật. Số ngày là **ước tính** từ nguồn được ghi ở từng loài, kèm mức độ tin cậy (`moderate` / `low`).

## Chạy nhanh

Yêu cầu Node.js ≥ 22.12.

```bash
npm ci
cp .env.example .env      # tùy chọn
npm run dev               # http://localhost:4321
```

Build và xem bản production:

```bash
npm run build             # tạo ảnh OG → astro build → verify-build
npm run preview
```

## Lệnh

| Lệnh | Việc làm |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run og` | Sinh `public/og-image.png`, `public/og/flowers/{id}.png`, `apple-touch-icon.png` |
| `npm run build` | `og` (prebuild) + `astro build` + `scripts/verify-build.mjs` |
| `npm run build:only` | Chỉ `astro build` (dùng trước e2e) |
| `npm run lint` / `typecheck` / `test` | ESLint / `astro check` / Vitest |
| `npm run check` | lint + typecheck + test |
| `npm run test:e2e` | Playwright trên `dist/` (cần build trước) |
| `npm run test:e2e:base` | Build với `BASE_PATH=/bloomora/` rồi chạy e2e (mô phỏng project site) |
| `npm run verify` | Kiểm tra lại `dist/` (canonical, sitemap, OG, hreflang, base path…) |

### Biến môi trường

| Biến | Ý nghĩa |
| --- | --- |
| `SITE_URL` | Origin tuyệt đối của site (vd. `https://hoa.example.com` hoặc `https://<user>.github.io`). Mặc định là placeholder `https://bloomora.example` — canonical/sitemap/OG sẽ **sai** cho đến khi bạn đặt giá trị thật. |
| `BASE_PATH` | `/` cho custom domain hoặc user site; `/<repo>/` cho project site. |
| `PUBLIC_GOATCOUNTER_CODE` | Code GoatCounter. Để trống = tắt analytics. |
| `PUBLIC_ANALYTICS_ENABLED` | `false` để tắt dù có code. |
| `PUBLIC_GSC_VERIFICATION` | Token xác minh Google Search Console (tùy chọn). |

Trong CI các biến này được workflow tự tính, xem [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

### Kiểm thử e2e

```bash
npx playwright install chromium    # lần đầu
npm run build:only
npm run test:e2e
```

- Môi trường đã cài sẵn Chromium khác phiên bản Playwright: đặt `PW_CHROMIUM_PATH=/đường/dẫn/chrome`.
- Safari/WebKit: `npx playwright install webkit`, rồi `PW_WEBKIT=1 npm run test:e2e`. Mặc định **không chạy WebKit**, nên hành vi trên Safari chưa được kiểm tra tự động.
- Bản build có GoatCounter: đặt `PUBLIC_GOATCOUNTER_CODE` khi build **và** khi chạy e2e để các test analytics chạy đầy đủ.

## Cấu trúc thư mục

```
.github/workflows/deploy.yml   CI: lint → typecheck → test → build → e2e → deploy
assets/og-fonts/               font .woff dùng để vẽ chữ trong ảnh OG (chuyển thành path)
docs/                          tài liệu (xem bên dưới)
public/                        favicon.svg; og-image.png, og/, apple-touch-icon.png được sinh khi build
scripts/                       generate-og.ts, verify-build.mjs
src/
  config/        site.ts (hằng số), analytics.ts (đọc env GoatCounter)
  data/          dữ liệu 8 loài (flowers/*.ts), kiểu dữ liệu, taxonomy
  content/       bài viết (articles/{vi,en}/*.md, content collection có schema)
  i18n/          từ điển vi / en
  lib/           logic thuần: url, seo, jsonld, sitemap, filter, search-index, routes,
                 art/ (SVG theo từng loài), timelapse/ (timeline, keyframes, reducer của player)
  components/    design-system/ (Glass*), site/, seo/, analytics/, timelapse/ (React)
  scripts/       JS phía client nhỏ: theme, menu, share, toast, bộ lọc, opt-out analytics
  styles/        tokens, glass, base, layout, components, timelapse
  pages/         /, /[lang]/..., 404, sitemap.xml, robots.txt
tests/unit, tests/e2e
```

Dữ liệu, UI, engine animation, SEO, analytics và script OG nằm ở các module tách biệt: component không chứa dữ kiện thực vật nào, tất cả đến từ `src/data`.

## Tính năng

- **Trang chủ**, **danh sách hoa** (tìm kiếm theo tên vi/en/khoa học, lọc nhóm/màu/mùa/thời gian nở, trạng thái rỗng/lỗi, "xem thêm"), **chi tiết loài** (9 giai đoạn, chăm sóc, sự thật, nguồn, loài liên quan, breadcrumb, chia sẻ, OG riêng), **bài viết** học thuật nhẹ, trang **giới thiệu**.
- **Trình phát time-lapse**: phát/tạm dừng, bắt đầu lại, thanh thời gian kéo được, giai đoạn trước/sau, tốc độ 0.5/1/2/4/8x, phần trăm, tên giai đoạn, thời gian tham chiếu, toàn màn hình, bàn phím + cảm ứng. Một interface cho 3 loại media: ảnh theo giai đoạn, SVG (mặc định) và video lazy-load có fallback.
- **i18n thật**: nội dung vi và en được viết riêng cho từng loài/bài, `hreflang` vi/en/x-default.
- **Giao diện**: sáng/tối không nháy (script inline trong `<head>`), 4 tầng kính, fallback khi không có `backdrop-filter`, khi bật *reduced transparency* hoặc thiết bị yếu; tôn trọng `prefers-reduced-motion`; mục tiêu chạm ≥ 44px; font tiếng Việt đầy đủ dấu.
- **SEO**: title/description/canonical theo từng route, `robots.txt`, `sitemap.xml` (có hreflang), JSON-LD `WebSite`, `BreadcrumbList`, `Article` (không có Organization/rating/VideoObject giả).
- **OG**: ảnh 1200×630 mặc định và riêng từng loài, vẽ từ chính SVG của site, không dùng ảnh có bản quyền.
- **Chia sẻ**: Web Share API, sao chép liên kết có fallback, toast thông báo.
- **Analytics**: GoatCounter, xem [docs/ANALYTICS.md](docs/ANALYTICS.md).

## Tài liệu

- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — deploy GitHub Pages, custom domain, base path
- [docs/ANALYTICS.md](docs/ANALYTICS.md) — GoatCounter
- [docs/SEO.md](docs/SEO.md) — SEO, OG, Facebook Sharing Debugger, Search Console
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — token, tầng kính, fallback, a11y
- [docs/CONTENT.md](docs/CONTENT.md) — thêm loài / bài viết, quy tắc về nguồn và số liệu

## Giới hạn đã biết

- Chưa có ảnh/video thật: mọi loài dùng SVG minh họa. Player đã hỗ trợ `images` và `video`; chỉ thêm khi bạn có media được cấp phép.
- Dữ liệu thời gian là khoảng ước tính, độ tin cậy ghi rõ ở từng loài.
- Không có JavaScript: trang vẫn đọc được (poster SVG tĩnh), nhưng theme mặc định là sáng và player không chạy.
- WebKit/Safari chưa được kiểm thử tự động mặc định.
