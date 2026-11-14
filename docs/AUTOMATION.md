# Tự động thêm loài hoa mỗi tuần (Gemini)

Workflow `.github/workflows/weekly-flowers.yml` nhờ Gemini thêm **4 loài hoa ở Việt Nam** mỗi tuần, rồi mở một pull request. Không có gì lên site cho tới khi bạn đọc và merge PR đó.

- **Lịch**: thứ 3, 09:00 giờ Việt Nam (`cron: '0 2 * * 2'`). GitHub tính cron theo UTC, nên muốn đổi giờ thì đổi theo UTC.
- **Chạy tay**: Actions → *Weekly flowers (Gemini)* → *Run workflow*. Có thể đổi số loài, hoặc chọn *dry run* (sinh và kiểm tra nhưng không đẩy nhánh, không mở PR).
- **Còn PR tuần trước chưa merge** thì tuần này bỏ qua. Việc này tránh PR chồng nhau và xung đột ở `src/data/index.ts`.

## Thiết lập một lần

1. Tạo API key tại <https://aistudio.google.com/apikey>.
2. **Settings → Secrets and variables → Actions → Secrets** → thêm `GEMINI_API_KEY`.
3. **Settings → Actions → General → Workflow permissions** → bật *Allow GitHub Actions to create and approve pull requests*. Không bật thì workflow vẫn đẩy nhánh nhưng không tạo được PR.
4. (Tùy chọn) **Variables** → `GEMINI_MODEL`. Mặc định là `gemini-4-carbon`. Model phải hỗ trợ *Grounding with Google Search* và *Structured outputs*. Danh sách model hiện hành: <https://aistudio.google.com/docs/models>.
5. Chạy thử một lần bằng *dry run* để xem log và phần tóm tắt trong tab *Summary*.

## Mỗi lần chạy làm gì

1. **Đề xuất.** Gemini nêu 8 loài ứng viên (4 cần + 4 dự phòng) mà site chưa có. Script loại ứng viên trùng tên khoa học với loài đã có, kể cả khi viết khác dấu `×`.
2. **Nghiên cứu.** Với mỗi ứng viên, Gemini chạy 3 truy vấn có Google Search: nhận diện, thời gian và nhân giống, chăm sóc và sự thật. Kết quả là ghi chú cùng danh sách nguồn mà Google đã trích.
3. **Kiểm tra nguồn.** Script mở từng nguồn: bỏ link chết hoặc không phải https, đi theo redirect tới URL thật, đọc tiêu đề trang thật. Cần ít nhất 3 nguồn. Trang chặn bot (401, 403, 429) vẫn được giữ nhưng được đánh dấu trong PR.
4. **Viết.** Gemini trả JSON theo schema, chỉ dùng ghi chú, và chọn nguồn **theo số thứ tự**, không tự viết URL.
5. **Tính lại và kiểm tra.** Script tự tính phần suy ra được: thứ tự giai đoạn, `daysToBloom` (tổng các giai đoạn tới *blooming*), `speedBand`, `confidence` luôn là `low`. Sau đó kiểm tra bằng các luật tương đương `tests/unit/data.test.ts` và [CONTENT.md](CONTENT.md): slug và tên duy nhất, đủ vi/en, `metaDescription` 70–160 ký tự, ≥ 3 nguồn https không trùng, `related` tồn tại, màu `#rrggbb`, tiếng Việt thật sự có dấu. Sai thì gửi lỗi lại cho Gemini sửa (tối đa 3 lần). Vẫn sai thì bỏ ứng viên đó và lấy ứng viên khác.
6. **Ghi file.** Tạo `src/data/flowers/<id>.ts`, đăng ký trong `src/data/index.ts`, bỏ `isNew` của lô trước, cập nhật số loài trong `README.md` và `CONTENT_UPDATED`.
7. **Kiểm thử.** `lint`, `typecheck`, unit test, `build` (kèm `verify-build`), e2e. Qua hết mới đẩy nhánh `automation/weekly-flowers-<ngày>-<số lần chạy>` và mở PR.

Nếu chỉ thêm được ít hơn 4 loài, PR vẫn được mở và ghi rõ loài nào bị bỏ, vì sao. Nếu không thêm được loài nào, job báo lỗi.

## Chất lượng và giới hạn

- **Đây là nội dung do AI viết, cần người duyệt.** Nguồn là thật (Google đã trích, mở được), nhưng phần `supports` và các con số do AI tóm tắt từ ghi chú. Danh sách kiểm tra nằm trong PR.
- **Hình minh họa dùng lại kiểu vẽ có sẵn.** Gemini chọn archetype giống nhất trong `src/lib/art/archetypes/` và đặt bảng màu riêng, nên loài mới trông gần với loài đã có. Loài cần hình dạng mới vẫn phải thêm archetype bằng tay (xem [CONTENT.md](CONTENT.md), mục *Thêm một loài*, bước 3).
- **Thời gian là ước tính thô.** `confidence` luôn là `low` và `timeNote` phải nói đúng điều nguồn có và không có.
- **Không tự merge, không tự deploy.** PR do `GITHUB_TOKEN` tạo nên `deploy.yml` không chạy trên PR. Workflow tuần đã chạy cùng các cổng trước khi mở PR. Khi bạn merge vào `main`, `deploy.yml` chạy lại toàn bộ rồi mới deploy.
- GitHub **tự tắt workflow theo lịch** của repo công khai sau 60 ngày không có hoạt động. Việc merge PR hàng tuần giữ cho nó chạy. Nếu bị tắt, vào tab *Actions* và bật lại.

## Chi phí

Mỗi loài dùng 3 lượt gọi có tìm kiếm và 1–3 lượt viết; cả tuần chỉ vài chục lượt gọi. Theo tài liệu Gemini, với Gemini 3 trở lên, Grounding with Google Search tính phí theo từng truy vấn tìm kiếm: 5.000 truy vấn miễn phí mỗi tháng (dùng chung cho các model Gemini 3 trở lên), sau đó 14 USD cho 1.000 truy vấn. Phí token theo bảng giá của model bạn chọn. Hãy kiểm tra lại bảng giá hiện hành tại <https://aistudio.google.com/docs/pricing>.

## Chạy trên máy

```bash
GEMINI_API_KEY=... npm run flowers:add -- --count 2
# hoặc đặt GEMINI_API_KEY (và GEMINI_MODEL nếu muốn) trong .env; script đọc .env
npm run check && npm run build
git diff --stat      # xem thay đổi; muốn bỏ thì git restore . và xóa file mới trong src/data/flowers/
```

Tham số: `--count N` (mặc định 4), `--spare N` (ứng viên dự phòng, mặc định 4), `--summary <file>` (mặc định `out/weekly-flowers-summary.md`), `--date YYYY-MM-DD`.

Biến môi trường: `GEMINI_API_KEY` (bắt buộc), `GEMINI_MODEL`, `GEMINI_API_REVISION` (tùy chọn, gửi header `Api-Revision`), `GEMINI_BASE_URL` (chỉ dùng để trỏ vào server giả khi thử nghiệm).

## Sự cố thường gặp

| Hiện tượng | Nguyên nhân / cách xử lý |
| --- | --- |
| `Chưa có secret GEMINI_API_KEY` | Thêm secret ở bước thiết lập 2. |
| `HTTP 400: API key not valid` | Key sai hoặc đã bị thu hồi. Tạo key mới. |
| `HTTP 404` hoặc báo không thấy model | `GEMINI_MODEL` sai hoặc model đã ngừng. Xem danh sách model. |
| `HTTP 429` kéo dài | Hết hạn mức. Script đã thử lại 4 lần (chờ 1 giây tăng dần tới 60 giây, theo `Retry-After` nếu có). Chạy lại sau. |
| `No flower could be added` | Xem log: mỗi ứng viên có lý do riêng (thiếu nguồn, không qua kiểm tra). Thường chạy lại là được. |
| Không tạo được PR | Bật *Allow GitHub Actions to create and approve pull requests*. Nhánh đã được đẩy; log có link so sánh để mở PR tay. |
| Không có PR mới tuần này | Còn PR tuần trước chưa merge, hoặc workflow theo lịch bị GitHub tắt (xem trên). |
| PR không có check *Deploy to GitHub Pages* | Bình thường: PR do `GITHUB_TOKEN` tạo không kích hoạt workflow khác. |
| e2e lỗi trong workflow | Tải artifact `playwright-report` ở trang chạy workflow. |

## An toàn

- Key chỉ nằm trong secret và đi qua header `x-goog-api-key`, không nằm trong URL, không in ra log.
- Prompt chỉ chứa tên các loài đang có trên site. Không có dữ liệu cá nhân.
- Nội dung model trả về được coi là dữ liệu không tin cậy: nó chỉ đi qua schema và bộ kiểm tra, rồi được ghi ra bằng code của repo (`toTs` thoát chuỗi), không bao giờ chép nguyên văn code do model viết.
- Script chỉ ghi vào `src/data/flowers/`, `src/data/index.ts`, `README.md`, `src/config/site.ts`. Workflow chỉ `git add src README.md`.
- Code nằm ở `scripts/add-flowers.ts` và `scripts/lib/` (`gemini.ts`, `verify-url.ts`, `flower-gen.ts`, `flower-prompts.ts`), kiểm thử ở `tests/unit/add-flowers.test.ts`. Chỉnh cách Gemini viết thì sửa `flower-prompts.ts`.
