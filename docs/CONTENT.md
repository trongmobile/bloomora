# Nội dung và dữ liệu

## Nguyên tắc

- **Không bịa nguồn hay số liệu.** Mỗi loài có danh sách `sources` (tiêu đề, nhà xuất bản, URL, nguồn đó hỗ trợ điều gì). Mỗi bài viết có `sources` (schema yêu cầu URL hợp lệ, test yêu cầu ít nhất 3 nguồn https).
- **Thời gian là ước tính.** `daysToBloom` và `stages[].days` là khoảng `[min, max]` ngày; giao diện luôn ghi "ước tính" và hiển thị `timeNote`. `confidence` là `moderate` hoặc `low`; đừng đặt cao hơn mức nguồn cho phép.
- **Time-lapse là minh họa.** Đừng viết câu khiến người đọc nghĩ đó là ảnh/video thật.
- **Hai ngôn ngữ viết riêng.** vi và en đều phải có đủ trường; test chặn việc thiếu hoặc trùng nhau.
- **Chỉ dùng media bạn có quyền.** Chưa có ảnh/video thật trong repo.

## Thêm một loài

1. Tạo `src/data/flowers/<id>.ts` theo kiểu `FlowerData` (`src/data/types.ts`), mẫu: `sunflower.ts`.
   - `id`, `slugs.vi`, `slugs.en` (chữ thường, không dấu, nối bằng `-`), `scientificName`, `family`.
   - `group`, `colors`, `bloomSeasons` (dùng cho bộ lọc), `daysToBloom`, `speedBand` (khớp với cận trên của `daysToBloom`: ≤120 ngày `fast`, ≤365 `medium`, còn lại `slow`), `startMaterial`, `confidence`.
   - `stages`: các giai đoạn theo thứ tự sinh học; loài có thể bỏ bớt giai đoạn.
   - `visual`: `archetype` (hình dạng SVG có sẵn trong `src/lib/art/archetypes/`) và `palette`.
   - `text.vi` và `text.en`: tên, `aliases`, `tagline`, `metaDescription` (≤ 160 ký tự), `intro`, mô tả giai đoạn, `care`, `facts`, `keywords`, `altText`, `timeNote`, `startNote`.
   - `sources` (test yêu cầu ≥ 3 nguồn https, không trùng URL) và `related`.
2. Đăng ký trong `src/data/index.ts`.
3. Nếu cần hình dạng hoa mới, thêm archetype trong `src/lib/art/archetypes/` và đăng ký ở `src/lib/art/`.
4. Chạy `npm run check`. `tests/unit/data.test.ts` kiểm tra slug duy nhất, thứ tự giai đoạn, `speedBand`, đủ văn bản hai ngôn ngữ, độ dài mô tả, nguồn hợp lệ và loài liên quan tồn tại.
5. `npm run build`. Ảnh OG `/og/flowers/<id>.png`, trang vi/en, mục sitemap và poster `/art/<id>.svg` được tạo tự động; `verify-build` sẽ báo nếu thiếu.

## Thêm bài viết

1. Tạo cặp file `src/content/articles/vi/<slug>.md` và `src/content/articles/en/<slug>.md` với cùng `translationKey`.
2. Front matter (schema trong `src/content.config.ts`): `title`, `description` (60–200), `lang`, `translationKey`, `datePublished`, `readingMinutes`, `relatedFlowers`, `keywords`, `sources` (schema cho phép ≥ 1, nhưng test yêu cầu ≥ 3 nguồn https).
3. Chỉ nêu một khẳng định cụ thể (số, tên địa danh, vùng khí hậu) khi có nguồn trong `sources` hỗ trợ.

## Thay minh họa bằng ảnh hoặc video thật

Trong `media` của loài (mặc định `{ type: 'svg' }`):

```ts
media: { type: 'images', stages: { seed: { src: '/media/sunflower/seed.jpg', alt: '…' }, /* … */ } }
// hoặc
media: { type: 'video', src: '/media/sunflower.mp4', mime: 'video/mp4', poster: '/media/sunflower.jpg', durationSec: 30 }
```

Đặt file trong `public/` và chỉ dùng tư liệu bạn có giấy phép. Video được tải lười (lazy) và tua theo thanh thời gian của player; nếu lỗi hoặc thiếu, player tự dùng SVG. Nếu thêm video, hãy ghi rõ nguồn/giấy phép ở trang loài, và chỉ thêm `VideoObject` JSON-LD khi video có thật (hiện `verify-build` cố ý chặn nó).

## Cập nhật ngày xem lại

Khi rà soát dữ liệu, cập nhật `CONTENT_UPDATED` trong `src/config/site.ts` (dùng cho `lastmod` và `dateModified`).
