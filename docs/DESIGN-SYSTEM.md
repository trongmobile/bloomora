# Design system — Botanical Liquid Glass

Mọi giá trị nhìn thấy được nằm trong `src/styles/tokens.css`; component chỉ dùng token, không hard-code màu.

## Nguyên tắc

1. **Kính chỉ làm mờ thứ nằm phía sau nó**, không bao giờ làm mờ tranh hoa. Khung player (`.tl__stage`) là bề mặt đặc, không có `backdrop-filter`.
2. Không làm mờ cả trang. Số lớp kính chồng nhau được giữ nhỏ.
3. Mọi bề mặt kính phải degrade thành nền đặc đọc được.
4. Chữ luôn nằm trên nền đủ tương phản (≥ 4.5:1), kể cả khi kính trong suốt.

## Token

| Nhóm | Token tiêu biểu |
| --- | --- |
| Chữ | `--font-sans` (Be Vietnam Pro), `--font-serif` (Newsreader), `--text-xs … --text-3xl` (fluid `clamp`), `--leading-body` 1.65 |
| Khoảng cách / bo góc | `--space-1…8`, `--r-sm/md/lg/pill`, `--gutter`, `--container` |
| Mục tiêu chạm | `--tap: 2.75rem` (44px) |
| Chuyển động | `--ease`, `--dur-fast/dur/dur-slow` |
| Màu sáng (mặc định) | `--bg`, `--surface-solid`, `--text`, `--text-muted`, `--accent` (`#a3254f`, 6.9:1), `--leaf`, `--focus`, `--danger` |
| Màu tối (`[data-theme='dark']`) | cùng tên token, giá trị khác |
| Kính | `--glass-{subtle,standard,elevated,interactive}-bg`, `--blur-*`, `--glass-border/edge/highlight`, `--glass-shadow-1..3`, `--saturate` |

`tests/unit/tokens.test.ts` tính tỉ lệ tương phản của các cặp chữ/nền quan trọng ở cả hai theme và thất bại nếu dưới 4.5:1.

## Bốn tầng kính (`src/styles/glass.css`)

| Tầng | Dùng cho | Blur |
| --- | --- | --- |
| `subtle` | Nền phụ, vùng nhóm nhẹ | 10px |
| `standard` | Thẻ, panel thông thường | 18px |
| `elevated` | Menu, header khi cuộn, hộp thoại nổi | 28px |
| `interactive` | Thẻ/nút bấm được (hover/focus nâng 2px) | 14px |

Dùng qua `GlassSurface` / `GlassPanel` (`data-tier`). Các component khác: `GlassButton`, `GlassInput`, `GlassBadge`, `GlassMenu`, `ThemeToggle`, `Container`, `Typography`.

## Fallback

| Điều kiện | Kết quả |
| --- | --- |
| Không hỗ trợ `backdrop-filter` (`@supports not`) | Nền `--surface-solid` |
| `prefers-reduced-transparency: reduce` | Bỏ blur, nền đặc, viền đặc |
| `data-perf="low"` trên `<html>` (script đầu trang đặt khi `deviceMemory ≤ 2`, ≤ 2 nhân CPU hoặc bật Data Saver) | Bỏ blur, nền đặc |
| `forced-colors: active` | `Canvas`/`CanvasText` |
| `prefers-reduced-motion: reduce` | Bỏ hover nâng, transition gần như về 0; player chuyển sang bước theo từng giai đoạn |

## Theme

Script nhỏ inline trong `<head>` (`src/lib/head-script.ts`) đặt `data-theme` trước khi trình duyệt vẽ lần đầu, từ `localStorage['bloomora-theme']` hoặc `prefers-color-scheme`, nên không bị nháy sai theme. Nếu storage bị chặn, site vẫn chạy theo `prefers-color-scheme`. Khi tắt hẳn JavaScript, theme là sáng.

## Tiếng Việt

Font Be Vietnam Pro và Newsreader được tự host với đủ subset `latin`, `latin-ext`, `vietnamese` (`@fontsource`, không gọi Google Fonts). `line-height` thân bài 1.65 để dấu không chạm dòng trên.

## Truy cập (WCAG 2.2 AA)

- Skip link, landmark, một `h1` mỗi trang, `aria-current` cho điều hướng và giai đoạn hiện tại.
- Vòng focus rõ (`--focus`), mục tiêu chạm ≥ 44px, không cuộn ngang tới 320px.
- Player: mọi nút có tên truy cập, thanh thời gian là `input[type=range]` có `aria-valuetext`, bàn phím: `Space`/`K` phát/dừng, `←/→` tua (`Shift` tua nhanh), `Home/End`, `[` `]` đổi giai đoạn, `+`/`-` đổi tốc độ, `F` toàn màn hình; hỗ trợ cảm ứng.
- Minh họa có `alt`/mô tả; ảnh trang trí để `alt=""`.
- `tests/e2e/a11y.spec.ts` chạy axe-core trên các trang chính ở cả desktop và mobile. Axe không thay thế kiểm thử thủ công bằng screen reader — nên thử thêm với NVDA/VoiceOver.
