# Chia sẻ, clip và tăng trưởng

Mục tiêu: làm cho thứ người ta thấy đẹp nhất ở Bloomora (hoa lớn lên theo từng giai đoạn) **mang đi được**: thành một clip, một tấm ảnh, một đường link có ảnh xem trước đúng, hoặc một mã nhúng. Không có backend, không đăng nhập, không gửi dữ liệu đi đâu.

Không ai ép được một trang "viral". Các tính năng dưới đây chỉ làm cho việc chia sẻ dễ và đẹp; phần đăng bài và đo lường vẫn là việc của bạn.

## Có gì để chia sẻ

| Thứ | Ở đâu | Người nhận thấy gì |
| --- | --- | --- |
| Clip dọc 9:16 | Player → *Tạo clip dọc* (trình duyệt), hoặc `npm run clips` (MP4 chuẩn) | Video 14 giây: tên hoa, thanh giai đoạn, watermark địa chỉ trang |
| Ảnh dọc 1080×1920 | Player → *Lưu ảnh dọc* | Khoảnh khắc đang xem, cùng watermark |
| Link khoảnh khắc | Player → *Chia sẻ khoảnh khắc này* | Trang `…/moment/<giai đoạn>/` mở ngay đúng giai đoạn; bản xem trước (Zalo, Messenger, Facebook…) dùng ảnh OG riêng của giai đoạn đó |
| Thẻ quiz | `/<lang>/quiz/` → kết quả → *Lưu thẻ kết quả* / *Chia sẻ kết quả* | Thẻ 9:16 "Bạn đang ở giai đoạn…" hoặc link tới trang kết quả có ảnh OG riêng; người mở link thấy hoa của bạn họ và nút làm quiz |
| Link gieo – nở | `/<lang>/planner/` → *Sao chép liên kết* | Mở lại đúng loài, ngày bắt đầu và mốc đã chọn |
| Mã nhúng | Trang loài → *Nhúng time-lapse này vào trang của bạn* | Player chạy được trong blog, LMS, bài giảng; có link ghi nguồn về Bloomora |
| Thẻ in, trình chiếu | `/<lang>/classroom/` | Giáo viên in thẻ chín giai đoạn, hoặc mở trang nhúng toàn màn hình |

## Xuất clip hàng loạt để đăng

```bash
npm run clips                                         # mọi loài, tiếng Việt
npm run clips -- --lang vi,en --only sunflower,lotus
npm run clips -- --site https://hoa.example.com       # watermark dùng domain thật
npm run clips -- --stills-only                        # chỉ thẻ PNG, vài giây, không cần ffmpeg
```

- Cần `ffmpeg` trong PATH để xuất MP4 (H.264, yuv420p, `faststart`, hợp với TikTok, Reels, Shorts). Mỗi clip 14 giây, 30 khung hình/giây, mất khoảng 20 giây để dựng.
- Kết quả: `out/clips/<lang>/<id>.mp4`, `<id>.png` (thẻ ở giữa giai đoạn nở rộ, dùng cho Pinterest hoặc ảnh bìa) và `captions.txt` (mô tả gợi ý kèm link và hashtag).
- **Đặt `--site` hoặc `SITE_URL` trước khi đăng.** Mặc định watermark ghi domain giữ chỗ `bloomora.example` và lệnh sẽ cảnh báo.
- Khung hình được vẽ từ chính mã minh họa của site, bố cục dùng chung với nút *Tạo clip dọc* trong trang (`src/lib/clip`), nên hai nơi trông giống nhau.

Gợi ý đăng: một loài mỗi ngày, hai ngôn ngữ, giữ nguyên dòng "Minh họa mô phỏng" trong khung hình. Đây là hình minh họa, đừng mô tả nó là video quay thật.

## Link chia sẻ và ảnh xem trước

Mỗi link khoảnh khắc và kết quả quiz là trang tĩnh có thẻ Open Graph riêng, nên bản xem trước đúng ngay cả trên nền tảng không chạy JavaScript. Sau khi có domain thật:

1. Mở thử vài link trong Facebook Sharing Debugger (xem [SEO.md](SEO.md)), rồi gửi thử qua Zalo và Messenger.
2. Nếu vừa đổi ảnh hoặc domain, bấm **Scrape Again** để xóa cache.

Các trang này là `noindex` và không nằm trong sitemap để Google không phải lập chỉ mục hàng trăm trang gần giống nhau. Trang được xếp hạng vẫn là trang loài hoa.

## Mùa vụ để bám theo

Công cụ gieo – nở trả lời câu "gieo hôm nay thì kịp Tết không?" bằng dữ liệu có nguồn. Tết 2027 rơi vào thứ Bảy 6/2/2027; cúc vạn thọ (50–100 ngày) bắt đầu trước 29/10/2026 thì chắc kịp, đến 18/12/2026 vẫn còn cơ hội. Các dịp khác có sẵn: Valentine 14/2, 8/3, 20/10, 20/11, và ngày tùy chọn.

Lịch gợi ý: đăng nội dung Tết từ cuối tháng 10, 8/3 từ cuối tháng 12, 20/10 từ tháng 8, mùa sen vào đầu hè, hoa anh đào vào đầu xuân.

## Giáo viên

Vòng đời cây là nội dung phổ thông. Trang `/<lang>/classroom/` có hướng dẫn ba bước, ba hoạt động gợi ý, thẻ in (tick *Ẩn tên giai đoạn…* để làm trò chơi sắp xếp) và mã nhúng. Kênh phân phối tự nhiên là các nhóm giáo viên trên Zalo và Facebook: đăng một link tới trang này kèm ảnh thẻ.

## Đo lường

Analytics chỉ đếm lượt xem trang (GoatCounter, không cookie, xem [ANALYTICS.md](ANALYTICS.md)). Trong bảng điều khiển của GoatCounter, nhìn:

- **Referrers** để biết nguồn nào mang người tới (Zalo, Facebook, TikTok, một blog nhúng…).
- Lượt xem của `/<lang>/quiz/result/…` và `/<lang>/flowers/…/moment/…`: người mở link do bạn bè gửi.
- Lượt xem của `/<lang>/embed/…`: số lần player được nhúng chạy ở nơi khác.
- `/<lang>/planner/` và `/<lang>/classroom/` theo mùa.

Không có sự kiện tùy chỉnh nên không đo được số lần bấm nút lưu hay tạo clip. Đó là chủ ý, vì không theo dõi cá nhân.

## Việc bạn phải tự làm

- Domain thật và `SITE_URL` (nếu không, link chia sẻ và ảnh xem trước trỏ về `bloomora.example`).
- Mã GoatCounter nếu muốn đo.
- Đăng clip, trả lời bình luận, và gửi link cho các nhóm phù hợp.
- Thêm ngày Tết các năm sau 2029 vào `src/data/occasions.ts` sau khi kiểm chứng với lịch công bố.

## Giới hạn cần nói thẳng

- Hình là minh họa SVG, không phải ảnh thật. Chỉ có người xem thấy nó đủ "đã mắt" thì clip mới được chia sẻ; hãy đăng thử vài clip và xem cái nào có phản ứng trước khi đầu tư thêm.
- Clip tạo trong trình duyệt ghi theo thời gian thực: máy yếu có thể rớt khung hình, và trình duyệt không ghi được MP4 sẽ cho WebM (một số nền tảng không nhận). Dùng `npm run clips` khi cần chất lượng ổn định.
- Quiz chỉ để vui. Công cụ gieo – nở cho khoảng ước tính, không phải lời hứa.
