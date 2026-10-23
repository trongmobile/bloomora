# Bloomora — Flower Time-lapse Explorer

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

| Lệnh                                  | Việc làm                                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                         | Dev server                                                                                                                      |
| `npm run og`                          | Sinh `public/og-image.png`, `public/og/flowers/{id}.png`, `public/og/moments/…`, `public/og/quiz/…`, `apple-touch-icon.png`     |
| `npm run clips`                       | Xuất clip dọc 9:16 (MP4) và thẻ PNG cho TikTok/Reels/Shorts vào `out/clips/` (cần ffmpeg). Xem [docs/GROWTH.md](docs/GROWTH.md) |
| `npm run build`                       | `og` (prebuild) + `astro build` + `scripts/verify-build.mjs`                                                                    |
| `npm run build:only`                  | Chỉ `astro build` (dùng trước e2e)                                                                                              |
| `npm run lint` / `typecheck` / `test` | ESLint / `astro check` / Vitest                                                                                                 |
| `npm run check`                       | lint + typecheck + test                                                                                                         |
| `npm run test:e2e`                    | Playwright trên `dist/` (cần build trước)                                                                                       |
| `npm run test:e2e:base`               | Build với `BASE_PATH=/bloomora/` rồi chạy e2e (mô phỏng project site)                                                           |
| `npm run verify`                      | Kiểm tra lại `dist/` (canonical, sitemap, OG, hreflang, base path…)                                                             |

## Cấu trúc thư mục

```
.github/workflows/deploy.yml   CI: lint → typecheck → test → build → e2e → deploy
assets/og-fonts/               font .woff dùng để vẽ chữ trong ảnh OG (chuyển thành path)
docs/                          tài liệu (xem bên dưới)
public/                        favicon.svg; og-image.png, og/, apple-touch-icon.png được sinh khi build
scripts/                       generate-og.ts, render-clips.ts, lib/text-path.ts, verify-build.mjs
src/
  config/        site.ts (hằng số), analytics.ts (đọc env GoatCounter)
  data/          dữ liệu 8 loài (flowers/*.ts), kiểu dữ liệu, taxonomy
  content/       bài viết (articles/{vi,en}/*.md, content collection có schema)
  i18n/          từ điển vi / en
  lib/           logic thuần: url, seo, jsonld, sitemap, filter, search-index, routes,
                 art/ (SVG theo từng loài), timelapse/ (timeline, keyframes, reducer của player),
                 clip/ (bố cục khung 9:16 dùng chung cho clip, thẻ ảnh và thẻ quiz), quiz, planner, moment, embed
  components/    design-system/ (Glass*), site/, seo/, analytics/, timelapse/ (React)
  scripts/       JS phía client nhỏ: theme, menu, share, toast, bộ lọc, opt-out analytics, quiz, planner, embed, thẻ in
  styles/        tokens, glass, base, layout, components, timelapse
  pages/         /, /[lang]/..., 404, sitemap.xml, robots.txt
tests/unit, tests/e2e
```

Dữ liệu, UI, engine animation, SEO, analytics và script OG nằm ở các module tách biệt: component không chứa dữ kiện thực vật nào, tất cả đến từ `src/data`.

## Tính năng

- **Trang chủ**, **danh sách hoa** (tìm kiếm theo tên vi/en/khoa học, lọc nhóm/màu/mùa/thời gian nở, trạng thái rỗng/lỗi, "xem thêm"), **chi tiết loài** (9 giai đoạn, chăm sóc, sự thật, nguồn, loài liên quan, breadcrumb, chia sẻ, OG riêng), **bài viết** học thuật nhẹ, trang **giới thiệu**.
- **Trình phát time-lapse**: phát/tạm dừng, bắt đầu lại, thanh thời gian kéo được, giai đoạn trước/sau, tốc độ 0.5/1/2/4/8x, phần trăm, tên giai đoạn, thời gian tham chiếu, toàn màn hình, bàn phím + cảm ứng. Một interface cho 3 loại media: ảnh theo giai đoạn, SVG (mặc định) và video lazy-load có fallback.
- **i18n thật**: nội dung vi và en được viết riêng cho từng loài/bài, `hreflang` vi/en/x-default.
- **Giao diện**: sáng/tối không nháy (script inline trong `<head>`), 4 tầng kính, fallback khi không có `backdrop-filter`, khi bật _reduced transparency_ hoặc thiết bị yếu; tôn trọng `prefers-reduced-motion`; mục tiêu chạm ≥ 44px; font tiếng Việt đầy đủ dấu.

### Để người ta chia sẻ và dùng lại

Chi tiết cách dùng và đo lường nằm ở [docs/GROWTH.md](docs/GROWTH.md).

- **Lưu và chia sẻ khoảnh khắc**: trong player có _Chia sẻ khoảnh khắc này_ (link tới trang riêng của giai đoạn đang xem, có ảnh OG riêng), _Lưu ảnh dọc_ (PNG 1080×1920) và _Tạo clip dọc_ (video 9:16 ghi ngay trong trình duyệt, MP4 hoặc WebM tùy trình duyệt). Mọi thứ chạy trên máy người dùng, không tải lên đâu cả.
- **Deep link theo giai đoạn**: `…/flowers/<loài>/?stage=<giai đoạn>#timelapse` và trang `…/flowers/<loài>/moment/<giai đoạn>/` (noindex, có ảnh OG theo loài + giai đoạn + ngôn ngữ).
- **Trắc nghiệm** `/<lang>/quiz/`: "Bạn đang ở giai đoạn nào của đời hoa?", 7 câu + chọn hoa, kết quả là trang tĩnh `/<lang>/quiz/result/<giai đoạn>/` (noindex, có ảnh OG) cùng thẻ kết quả PNG 9:16. Chỉ mang tính giải trí.
- **Lịch gieo – nở** `/<lang>/planner/`: chọn loài và ngày bắt đầu để xem khoảng thời gian nở ước tính, đặt mốc (Tết, Valentine, 8/3, 20/10, 20/11 hoặc ngày tùy chọn) để biết hạn bắt đầu. Liên kết chia sẻ giữ nguyên lựa chọn (`?f=&s=&g=`).
- **Nhúng và lớp học**: mỗi trang loài có mã iframe (`/<lang>/embed/<loài>/`, noindex, nhận `?theme=light|dark`), trang `/<lang>/classroom/` cho giáo viên, và thẻ chín giai đoạn in được `/<lang>/classroom/cards/<loài>/` (có chế độ ẩn tên để chơi sắp xếp).

## Giới hạn đã biết

- Chưa có ảnh/video thật: mọi loài dùng SVG minh họa. Player đã hỗ trợ `images` và `video`; chỉ thêm khi bạn có media được cấp phép.
- Dữ liệu thời gian là khoảng ước tính, độ tin cậy ghi rõ ở từng loài.
- Không có JavaScript: trang vẫn đọc được (poster SVG tĩnh), nhưng theme mặc định là sáng và player không chạy.
- WebKit/Safari chưa được kiểm thử tự động mặc định.
- Clip tạo trong trình duyệt ghi theo thời gian thực; thiết bị yếu có thể rớt khung hình, và trình duyệt không hỗ trợ MP4 sẽ cho WebM. Muốn MP4 chuẩn cho mạng xã hội, dùng `npm run clips`.
- Bảng ngày Tết chỉ có 2027–2029 (đã đối chiếu nguồn). Các năm sau phải được thêm sau khi kiểm chứng; trong lúc đó công cụ gieo – nở cho chọn ngày tùy ý.
