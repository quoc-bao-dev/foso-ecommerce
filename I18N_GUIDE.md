# Hướng dẫn sử dụng I18n

## Cấu trúc

Dự án đã được cấu hình i18n với Next.js và next-intl. Các route sẽ có dạng:

- `/vi` - Tiếng Việt
- `/en` - Tiếng Anh

## Cách sử dụng

### 1. Sử dụng hook useI18n

```tsx
"use client";

import { useI18n } from "@/hooks/useI18n";

export function MyComponent() {
  const { t, currentLocale, setLanguage } = useI18n();

  return (
    <div>
      <h1>{t("common.home")}</h1>
      <p>Current locale: {currentLocale}</p>
      <button onClick={() => setLanguage("en")}>Switch to English</button>
    </div>
  );
}
```

### 2. Sử dụng useTranslations trực tiếp

```tsx
"use client";

import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("common.home")}</h1>
      <p>{t("home.hero.title")}</p>
    </div>
  );
}
```

### 3. Sử dụng LanguageSwitcher component

```tsx
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

## Thêm ngôn ngữ mới

1. Thêm locale vào `src/i18n/config.ts`:

```ts
export const locales = ["vi", "en", "fr"] as const;
```

2. Tạo file messages mới `src/i18n/locales/fr.json`

3. Cập nhật `localeNames` trong config

## Cấu trúc messages

Messages được tổ chức theo namespace:

```json
{
  "common": {
    "home": "Trang chủ",
    "products": "Sản phẩm"
  },
  "home": {
    "hero": {
      "title": "Chào mừng",
      "subtitle": "Khám phá"
    }
  }
}
```

## Context

`LanguageContext` cung cấp:

- `currentLocale`: Ngôn ngữ hiện tại
- `setLanguage(locale)`: Chuyển đổi ngôn ngữ
- `availableLocales`: Danh sách ngôn ngữ có sẵn

## Static Generation

Dự án hỗ trợ static generation cho các route:

- `/vi` sẽ được generate static
- `/en` sẽ được generate static

Middleware sẽ tự động redirect từ `/` đến `/vi` (locale mặc định).
