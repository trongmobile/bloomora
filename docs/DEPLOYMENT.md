# Triển khai lên GitHub Pages

Workflow: `.github/workflows/deploy.yml`.

- **Pull request**: chạy lint, typecheck, unit test, build (kèm verify), e2e. Không deploy.
- **Push lên `main`** hoặc chạy tay (`workflow_dispatch`): như trên, rồi deploy.

## Thiết lập một lần

1. Đẩy mã nguồn lên GitHub (nhánh `main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. (Tùy chọn) **Settings → Secrets and variables → Actions → Variables** thêm:

| Variable | Khi nào cần |
| --- | --- |
| `CUSTOM_DOMAIN` | Dùng domain riêng, vd. `hoa.example.com` (không có `https://`). |
| `PUBLIC_GOATCOUNTER_CODE` | Muốn bật analytics (xem [ANALYTICS.md](ANALYTICS.md)). |
| `PUBLIC_GSC_VERIFICATION` | Xác minh Google Search Console bằng thẻ HTML. |

Không cần secret nào. Không có khóa API.

## SITE_URL và BASE_PATH được tính thế nào

| Tình huống | `SITE_URL` | `BASE_PATH` |
| --- | --- | --- |
| Có `CUSTOM_DOMAIN` | `https://<domain>` | `/` |
| Repo tên `<owner>.github.io` | `https://<owner>.github.io` | `/` |
| Project site (mặc định) | `https://<owner>.github.io` | `/<repo>/` |

Ví dụ repo `alice/bloomora` → `https://alice.github.io/bloomora/`.

Toàn bộ link, asset, canonical, sitemap, robots và ảnh OG đều đi qua `src/lib/url.ts` nên đúng với cả hai trường hợp. `scripts/verify-build.mjs` kiểm tra lại sau mỗi build; build **thất bại** nếu có URL gốc `/...` thiếu base path hoặc canonical/sitemap lệch.

## Custom domain

1. Đặt variable `CUSTOM_DOMAIN`.
2. Tại nhà cung cấp DNS:
   - Apex domain: bản ghi `A` tới `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (và `AAAA` nếu cần). Kiểm tra lại danh sách IP hiện hành trong tài liệu GitHub Pages.
   - Subdomain: `CNAME` tới `<owner>.github.io`.
3. **Settings → Pages → Custom domain**: nhập domain, bật **Enforce HTTPS** khi có thể.
4. Workflow tự ghi `dist/CNAME` mỗi lần deploy, nên domain không bị mất sau khi deploy bằng Actions.

Khi có `CUSTOM_DOMAIN`, canonical, sitemap và OG đều dùng domain đó.

## Chạy thử bản project-site trên máy

```bash
npm run test:e2e:base
```

Lệnh build với `BASE_PATH=/bloomora/` rồi chạy toàn bộ e2e trên `/bloomora/`. Muốn xem bằng mắt:

```bash
SITE_URL=https://alice.github.io BASE_PATH=/bloomora/ npm run build
SITE_URL=https://alice.github.io BASE_PATH=/bloomora/ npm run preview   # http://localhost:4321/bloomora/
```

## Kiểm tra sau khi deploy

- Mở `/robots.txt`, `/sitemap.xml`, `/og-image.png` và `/og/flowers/sunflower.png` trên domain thật.
- Xem [SEO.md](SEO.md) cho Facebook Sharing Debugger và Search Console.
- Nếu bật GoatCounter, mở trang rồi kiểm tra lượt xem trong dashboard sau vài phút.

## Sự cố thường gặp

| Hiện tượng | Nguyên nhân / cách xử lý |
| --- | --- |
| Trang trắng hoặc mất CSS/JS | `BASE_PATH` sai. Project site phải là `/<repo>/`. |
| Canonical/OG trỏ `bloomora.example` | `SITE_URL` chưa được đặt (build local). Trong CI luôn được tính tự động. |
| `verify-build` báo lỗi | Đọc thông báo: nó chỉ ra trang và URL cụ thể. |
| Deploy báo thiếu quyền | Pages Source phải là **GitHub Actions**. |
| Domain riêng mất sau deploy | Kiểm tra `CUSTOM_DOMAIN` còn được đặt; file `CNAME` chỉ được ghi khi biến này có giá trị. |
| e2e lỗi trong CI | Tải artifact `playwright-report` ở trang chạy workflow. |
