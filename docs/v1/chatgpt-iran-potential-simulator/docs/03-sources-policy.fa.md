# سیاست منابع و شفافیت (FA)

## قانون طلایی
هیچ پارامتری بدون `source_id` یا `method_note` وارد نمی‌شود.

## برای هر پارامتر
- `value` مقدار پایه
- `min` و `max` برای عدم قطعیت
- `unit`
- `source_ids` (لیست) یا `method_note`
- `last_updated`
- `confidence` (low/medium/high)

## نسخه‌بندی
- داده‌ها (JSON) با tagهای Git نسخه می‌خورند.
- هر تغییر پارامتر = PR با توضیح و لینک منبع.
