# هزینه جمهوری اسلامی برای ایران
# The Cost of the Islamic Republic to Iran

> **یک پروژه داده‌محور، مستند، و متن‌باز که هزینه ۴۶ ساله جمهوری اسلامی بر مردم ایران را نشان می‌دهد.**
>
> *An open, fully-sourced data project documenting the 46-year cost of the Islamic Republic on the Iranian people.*

[![Validate Data](https://github.com/YOUR_ORG/iran-freedom-data/actions/workflows/validate.yml/badge.svg)](https://github.com/YOUR_ORG/iran-freedom-data/actions)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

---

## ⚠️ سلب مسئولیت | Disclaimer

> این پروژه هزینه‌هایی را که جمهوری اسلامی به مردم ایران تحمیل کرده مستند می‌کند.  
> ما از **هیچ‌گونه مداخله نظامی خارجی** حمایت نمی‌کنیم.  
> هدف ما شفافیت اقتصادی و آگاهی عمومی است.
>
> This project documents costs imposed by the Islamic Republic on the Iranian people.  
> We **do not advocate for any foreign military intervention**.  
> Our goal is economic transparency and public awareness.

---

## 📂 ساختار داده | Data Structure

```
data/
├── metrics/
│   ├── macroeconomics.json      # GDP, currency, oil, investment
│   ├── human_capital.json       # Brain drain, women, education
│   ├── military_spending.json   # IRGC, proxy wars, nuclear
│   └── social_indicators.json   # Civil liberties, health
├── comparisons/
│   └── peer_countries.json      # Iran vs Turkey, S.Korea, etc.
├── events/
│   └── timeline.json            # Key events 1979–present
├── live/
│   ├── latest.json              # Latest snapshot (auto-updated daily)
│   └── snapshots/               # Daily snapshots archive
└── sources/
    └── bibliography.json        # All source references
```

---

## 📊 داده‌های کلیدی | Key Data Points

| شاخص | مقدار | منبع |
|------|-------|------|
| شکاف GDP با ترکیه (تجمعی) | ~$3.2 تریلیون | IMF + محاسبه |
| کاهش ارزش ریال | ۸۵۷۱ برابر | بانک مرکزی |
| رتبه فرار مغزها | اول جهان | IMF |
| هزینه جنگ‌های نیابتی (۲۰ سال) | ~$۱۰۰ میلیارد | چند منبع |
| رتبه آزادی مطبوعات | ۱۷۶ از ۱۸۰ | RSF |
| مشارکت اقتصادی زنان | ۱۶٪ | ILO |

---

## 🔬 روش‌شناسی | Methodology

همه اعداد دارای:
- **منبع مشخص** — لینک به منبع اصلی
- **سطح اطمینان** — `high | medium | estimate | speculative`
- **توضیح روش محاسبه** — برای اعداد محاسباتی
- **دامنه عدم قطعیت** — min/max برای تخمین‌ها

[→ مطالعه کامل روش‌شناسی](docs/METHODOLOGY.md)

---

## 🤝 مشارکت | Contributing

**برای گزارش خطا در داده:**
1. یک [GitHub Issue](https://github.com/YOUR_ORG/iran-freedom-data/issues/new) باز کنید
2. عدد اشتباه + منبع صحیح را ذکر کنید

**برای اضافه کردن داده جدید:**
1. Fork کنید
2. یک metric جدید به JSON مناسب اضافه کنید
3. `node scripts/validate.js` اجرا کنید
4. Pull Request بفرستید

---

## 📜 مجوز | License

داده‌ها تحت [Creative Commons BY 4.0](https://creativecommons.org/licenses/by/4.0/) منتشر شده‌اند.  
می‌توانید آزادانه استفاده کنید، با ذکر منبع.

---

## 🌐 وب‌سایت | Website

[→ iranfreedom.info](https://iranfreedom.info) *(در دست ساخت)*

---

*ایران یکبار بزرگ بوده و دوباره خواهد بود 🦁*
