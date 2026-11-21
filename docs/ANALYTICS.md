# Analytics — GoatCounter Cloud

Bloomora dùng [GoatCounter](https://www.goatcounter.com) vì nó không đặt cookie, không lưu dữ liệu cá nhân và đủ để đếm lượt xem trang. Site **hoạt động bình thường** khi GoatCounter chưa cấu hình, bị chặn hoặc ngừng hoạt động: script tải `async` và không có phần nào của site phụ thuộc vào nó.

Đếm lượt xem trang và **một** loại sự kiện: bấm vào thẻ hoa (xem [Đếm lượt bấm thẻ hoa](#đếm-lượt-bấm-thẻ-hoa)). Không có định danh người dùng.

## Bật analytics

1. Tạo site tại <https://www.goatcounter.com/signup>. Giả sử chọn code `bloomora` → dashboard `https://bloomora.goatcounter.com`.
2. Đặt biến khi build:
   - **GitHub Actions**: Settings → Secrets and variables → Actions → **Variables** → `PUBLIC_GOATCOUNTER_CODE = bloomora`. Chạy lại workflow.
   - **Local**: `PUBLIC_GOATCOUNTER_CODE=bloomora npm run build`.
3. Nếu GoatCounter yêu cầu khai báo domain của site (Settings → Sites), nhập domain thật bạn dùng để deploy.

Code hợp lệ gồm chữ thường, số và dấu gạch ngang. Code sai định dạng bị bỏ qua (không chèn script).

## Cách hoạt động

- `src/config/analytics.ts` đọc `PUBLIC_GOATCOUNTER_CODE` và `PUBLIC_ANALYTICS_ENABLED`, dựng endpoint `https://<code>.goatcounter.com/count`.
- `src/components/analytics/GoatCounterScript.astro` được render **một lần**, chỉ trong `BaseLayout`. Không có code → không có thẻ `<script>`.
- Cài đặt `allow_local: false`: truy cập từ localhost không bị đếm.
- `scripts/verify-build.mjs` bảo đảm mỗi trang có tối đa một script GoatCounter và cấu hình là "tất cả hoặc không có".

Tắt cưỡng bức dù có code: `PUBLIC_ANALYTICS_ENABLED=false`.

## Đếm lượt bấm thẻ hoa

Mỗi thẻ hoa (`FlowerCard.astro`, dùng ở trang chủ, danh sách hoa và mục hoa liên quan) có hai thuộc tính trên link:

```html
data-goatcounter-click="click/flower/<id>" data-goatcounter-title="<tên tiếng Anh>"
```

`count.js` của GoatCounter tự gắn sự kiện từ thuộc tính này (bấm thường và bấm giữa chuột, gửi bằng `sendBeacon` nên không mất khi trang chuyển đi). Site **không có JavaScript theo dõi riêng**.

- **Tên sự kiện** dùng `flower.id` (không đổi theo ngôn ngữ), nên thẻ tiếng Việt và tiếng Anh của cùng một loài gộp vào một dòng. Tên dựng bởi `flowerClickEventName()` trong `src/config/analytics.ts`.
- **Xem số liệu**: trong dashboard GoatCounter, tìm các dòng có tên bắt đầu bằng `click/flower/`. Mỗi dòng là một loài.
- **Khác với lượt xem trang**: `/vi/flowers/<slug>/` đếm mọi người vào trang đó, kể cả từ Google hay link chia sẻ. `click/flower/<id>` chỉ đếm người bấm từ một thẻ hoa trên site.
- GoatCounter mặc định gộp các lần bấm liên tiếp trong cùng một phiên, nên con số gần với "số người bấm" hơn "số lần bấm". Muốn đếm từng lần, thêm `data-goatcounter-no-session="1"`.
- Không có code → thuộc tính nằm trong HTML nhưng không có gì chạy, không có yêu cầu mạng nào. Nút opt-out (`skipgc`) và `allow_local: false` áp dụng cho cả sự kiện này.
- Thêm một thẻ hoa mới ở nơi khác thì dùng lại `FlowerCard`. `tests/e2e/analytics.spec.ts` kiểm tra mọi thẻ đều có sự kiện và không có phần tử nào khác bị gắn sự kiện.

## Từ chối theo dõi (opt-out)

Trang **Giới thiệu / About** có nút opt-out. Nút ghi `localStorage.skipgc = 't'`, đúng cơ chế GoatCounter hỗ trợ, và script của GoatCounter sẽ không gửi gì từ trình duyệt đó. Bấm lần nữa để bật lại. Bạn cũng có thể tự tắt cho chính mình bằng cách chạy `localStorage.skipgc = 't'` trong console.

## Kiểm tra

- Mở trang trên domain thật → thẻ Network có yêu cầu tới `*.goatcounter.com/count`.
- Dashboard hiển thị lượt xem sau vài phút.
- Trong test: `tests/unit/analytics.test.ts` (phân giải cấu hình) và `tests/e2e/analytics.spec.ts` (chèn đúng một lần, không chèn khi tắt, trang vẫn chạy khi script lỗi). Test e2e chạy đầy đủ khi build và chạy với cùng `PUBLIC_GOATCOUNTER_CODE`.

## Lưu ý quyền riêng tư

GoatCounter không dùng cookie nên thường không cần banner đồng ý, nhưng quy định tùy quốc gia và tùy cách bạn cấu hình; hãy tự kiểm tra với tư vấn pháp lý nếu cần. Nên ghi rõ việc dùng analytics trong trang Giới thiệu (site đã có đoạn này).
