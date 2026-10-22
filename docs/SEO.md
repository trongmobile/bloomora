# SEO, Open Graph và chia sẻ

## Những gì site tự tạo

| Hạng mục | Cách làm |
| --- | --- |
| `<title>`, meta description, canonical | `src/components/seo/SEOHead.astro` + `src/lib/seo.ts`, riêng từng route. Canonical luôn là URL tuyệt đối https: `SITE_URL` + `BASE_PATH` + đường dẫn. |
| URL | Thân thiện, có dấu `/` cuối: `/vi/flowers/hoa-huong-duong/`, `/en/flowers/sunflower/`, `/vi/learn/vong-doi-cua-hoa/`. Slug được dịch theo ngôn ngữ. |
| hreflang | `vi`, `en`, `x-default` hai chiều, URL tuyệt đối. Nội dung vi và en được viết riêng, không phải cùng một đoạn văn lặp lại (có test). |
| `/` | Trang cổng ngôn ngữ (`x-default`): chuyển bằng JS theo lựa chọn đã lưu hoặc `navigator.language`, và vẫn có link tới `/vi/` và `/en/` khi tắt JS. |
| `robots.txt` | `Allow: /` + dòng `Sitemap:` tuyệt đối. Sinh bởi `src/pages/robots.txt.ts`. |
| `sitemap.xml` | Mọi trang có `<loc>`, `<lastmod>` và `xhtml:link` hreflang. Không có 404 hay URL trùng. Sinh bởi `src/pages/sitemap.xml.ts`. |
| 404 | `/404.html` song ngữ, `noindex`, không nằm trong sitemap. |
| JSON-LD | `WebSite` (trang chủ), `BreadcrumbList` (trang con), `Article` (bài viết và trang loài). Không có `Organization`, `aggregateRating`, `Review` hay `VideoObject` vì site không có dữ liệu thật cho chúng. |
| Open Graph / Twitter | `og:title/description/url/image/type/locale(+alternate)`, `twitter:card=summary_large_image`. URL ảnh luôn tuyệt đối https. |
| Search Console | Đặt `PUBLIC_GSC_VERIFICATION` để thêm thẻ `google-site-verification`. |

## Ảnh OG

- Mặc định: `/og-image.png` (1200×630).
- Mỗi loài: `/og/flowers/{id}.png` (1200×630), ví dụ `/og/flowers/sunflower.png`.
- Sinh bởi `scripts/generate-og.ts` (`npm run og`, chạy tự động trước `npm run build`) bằng `opentype.js` + `sharp`. Chữ được chuyển thành đường vector từ font Be Vietnam Pro / Newsreader đi kèm trong `assets/og-fonts/`, nên dấu tiếng Việt hiển thị đúng và không phụ thuộc font hệ thống.
- Hình minh họa lấy từ chính engine SVG của site. Không dùng ảnh có bản quyền.
- Các file này nằm trong `.gitignore` vì được tạo lại mỗi lần build (CI chạy `npm run build` nên luôn có).
- Muốn đổi thiết kế ảnh: sửa `scripts/generate-og.ts`.

## Kiểm tra sau build

`npm run build` tự chạy `scripts/verify-build.mjs`. Nó kiểm tra mọi trang: một `<title>` và một `<h1>`, description 50–200 ký tự, canonical đúng, cặp og/twitter đầy đủ, `og:image` là https tuyệt đối và file tồn tại, hreflang, JSON-LD hợp lệ, GoatCounter không trùng, URL gốc có base path, sitemap khớp với file trong `dist/`, `robots.txt` có dòng Sitemap, ảnh OG đúng 1200×630.

Chạy lại bất kỳ lúc nào: `SITE_URL=... BASE_PATH=... npm run verify` (đối số tùy chọn: đường dẫn `dist`). Đặt `VERIFY_STRICT=1` để cảnh báo (domain placeholder, thiếu GoatCounter) cũng làm lệnh thất bại. Nên bật trong lần build cuối trước khi lên production.

## Facebook Sharing Debugger

Làm sau khi site đã chạy trên domain thật (Facebook không đọc được `localhost`).

1. Mở <https://developers.facebook.com/tools/debug/> (cần đăng nhập Facebook).
2. Dán URL đầy đủ của một trang, ví dụ `https://<domain>/<base>/vi/flowers/hoa-huong-duong/`.
3. Bấm **Debug**. Kiểm tra: `og:title`, `og:description`, `og:url` trùng canonical, ảnh xem trước 1200×630 đúng loài đó.
4. Nếu bạn đã chia sẻ URL trước đó hoặc vừa đổi ảnh, bấm **Scrape Again** để xóa cache của Facebook.
5. Lặp lại với trang chủ `/vi/`, `/en/` và vài loài khác để chắc mỗi loài có ảnh riêng.

Ảnh xem trước bị thiếu hoặc sai thường do: `SITE_URL` chưa đúng (ảnh trỏ tới domain placeholder), `BASE_PATH` sai, hoặc cache cũ.

## Kiểm tra khác

- Google Rich Results Test: <https://search.google.com/test/rich-results> (kiểm JSON-LD).
- Google Search Console: thêm property, xác minh bằng token (`PUBLIC_GSC_VERIFICATION`) rồi gửi `<site>/<base>/sitemap.xml`.
- Chia sẻ thử qua Zalo, Messenger, LinkedIn: các trình quét này dùng cùng thẻ Open Graph.

## Việc bạn phải tự cung cấp

- Domain/`SITE_URL` thật. Mặc định là `https://bloomora.example` nên canonical và OG sẽ sai cho đến khi thay.
- Token Search Console nếu muốn xác minh bằng thẻ.
- Ảnh/video có giấy phép nếu muốn thay hoặc bổ sung minh họa SVG (xem [CONTENT.md](CONTENT.md)).
