# Analytics — GoatCounter Cloud

Bloomora dùng [GoatCounter](https://www.goatcounter.com) vì nó không đặt cookie, không lưu dữ liệu cá nhân và đủ để đếm lượt xem trang. Site **hoạt động bình thường** khi GoatCounter chưa cấu hình, bị chặn hoặc ngừng hoạt động: script tải `async` và không có phần nào của site phụ thuộc vào nó.

Chỉ đếm lượt xem trang. Không có event tracking tùy chỉnh, không có định danh người dùng.

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

## Từ chối theo dõi (opt-out)

Trang **Giới thiệu / About** có nút opt-out. Nút ghi `localStorage.skipgc = 't'`, đúng cơ chế GoatCounter hỗ trợ, và script của GoatCounter sẽ không gửi gì từ trình duyệt đó. Bấm lần nữa để bật lại. Bạn cũng có thể tự tắt cho chính mình bằng cách chạy `localStorage.skipgc = 't'` trong console.

## Kiểm tra

- Mở trang trên domain thật → thẻ Network có yêu cầu tới `*.goatcounter.com/count`.
- Dashboard hiển thị lượt xem sau vài phút.
- Trong test: `tests/unit/analytics.test.ts` (phân giải cấu hình) và `tests/e2e/analytics.spec.ts` (chèn đúng một lần, không chèn khi tắt, trang vẫn chạy khi script lỗi). Test e2e chạy đầy đủ khi build và chạy với cùng `PUBLIC_GOATCOUNTER_CODE`.

## Lưu ý quyền riêng tư

GoatCounter không dùng cookie nên thường không cần banner đồng ý, nhưng quy định tùy quốc gia và tùy cách bạn cấu hình; hãy tự kiểm tra với tư vấn pháp lý nếu cần. Nên ghi rõ việc dùng analytics trong trang Giới thiệu (site đã có đoạn này).
