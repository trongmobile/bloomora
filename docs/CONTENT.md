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

## Trắc nghiệm (quiz)

Dữ liệu ở `src/data/quiz.ts`, logic chấm điểm ở `src/lib/quiz.ts`.

- Quiz **chỉ để vui**: chín giai đoạn của hoa là phép ẩn dụ, không phải khoa học hay đánh giá tâm lý. Giữ dòng lưu ý (`quiz.disclaimer`) trên trang và trên thẻ kết quả.
- Mỗi câu có đúng 4 lựa chọn, mỗi lựa chọn bỏ phiếu cho một giai đoạn khác nhau. Giai đoạn nhiều phiếu nhất thắng; hòa thì chọn giai đoạn gần trung bình các câu trả lời nhất, rồi giai đoạn sớm hơn.
- Giọng văn ấm, không phán xét: không giai đoạn nào "tốt" hay "xấu" (kể cả *tàn* là lúc cây kết hạt). Mỗi kết quả có `title`, `body` (50–200 ký tự vì là meta description), `tip`, bằng cả hai ngôn ngữ, viết riêng.
- `showcase` là loài có hình minh họa đại diện cho giai đoạn trên trang kết quả và ảnh OG.
- `tests/unit/quiz.test.ts` kiểm tra: đủ 4 lựa chọn khác nhau, đủ chín kết quả hai ngôn ngữ, và **mọi giai đoạn đều có thể là kết quả** (duyệt toàn bộ tổ hợp).

## Mốc dịp lễ của công cụ gieo – nở

`src/data/occasions.ts`. Ngày cố định (Valentine 14/2, 8/3, 20/10, 20/11) được tính theo năm. **Tết thì chỉ liệt kê, không tính**: bảng `TET_DATES` có 2027-02-06, 2028-01-26, 2029-02-13, đã đối chiếu với lịch công bố. Đừng thêm năm từ trí nhớ hoặc từ lịch âm của `Intl` (Node cho lệch một ngày ở một số năm, ví dụ 2027). Năm chưa có trong bảng thì công cụ báo "chưa có ngày" và để người dùng chọn ngày tùy ý.

Kết quả của công cụ luôn là một **khoảng** lấy từ `daysToBloom`, kèm lời nhắc đây là ước tính và nhãn độ tin cậy của loài.

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
