import { useEffect, useState } from 'react';

import dashboardData from './data/dashboard.snapshot.json';

const { meta: releaseMeta, sources: sourcePack, results } = dashboardData;
const {
  estimatedOpportunityCost: cumulativeOpportunityCost,
  costContextCards,
  topOfficialCards,
  officialLevel1Metrics,
  level2HighlightCards,
  officialLevel2Metrics,
  provisionalRepoData,
  scenarios: scenarioCards,
  baseModelSample,
  remainingDataGaps,
} = results;
const { annualDrainItems, blueprintCorruptionTotalUsd, corruptionCases, directIdeologicalBudgetUsd, weightedAnnualDrainUsd } =
  provisionalRepoData;

const UI_COPY = {
  en: {
    locale: 'en-US',
    dir: 'ltr',
    title: 'Iran Economic Simulator',
    navLabel: 'Primary navigation',
    topStrip: {
      status: 'Official Snapshot',
      generated: 'Generated',
    },
    navItems: [
      ['Home', '#home'],
      ['Results', '#results'],
      ['Level 1', '#level-1'],
      ['Level 2', '#level-2'],
      ['Scenarios', '#scenarios'],
      ['Sources', '#sources'],
    ],
    languageSwitchLabel: 'Page language',
    hero: {
      overline: 'Official snapshot',
      title: 'Official baseline first.',
      subtitle:
        'World Bank, EIA, and OFAC values now anchor the page. The 13T figure stays visible, but only as an estimate with explicit scope and source context.',
      ctas: [
        ['See results', '#results'],
        ['Open Level 1', '#level-1'],
        ['Inspect sources', '#sources'],
      ],
      sideKicker: 'What changed',
      sideTitle: 'One clean baseline for the rest of the project.',
      sideBody:
        'This version separates official observations from repo-built estimates and keeps the git JSON bundle as the source of truth.',
      sidePoints: [
        'Official data is shown separately from repo estimates.',
        'The 13T number is still an estimate, not an official total.',
        'Every number on this page comes from git JSON or a linked source.',
      ],
      sourceLabel: 'Source stack',
      sourceValue: 'World Bank Open Data, WGI, U.S. EIA, U.S. OFAC, repo estimate artifact',
      disclaimers: [
        releaseMeta.snapshotStatus,
        '13T remains estimated, not official',
        'No fake all-in cost total added',
        'Lagged tax and revenue series still visible as gaps',
      ],
    },
    actions: {
      post: 'Post',
      share: 'Share',
      copy: 'Copy link',
    },
    share: {
      text:
        'Iran Economic Simulator: official Level 1 and partial Level 2 snapshot with World Bank, EIA, OFAC data plus context for the repo 13T estimate.',
      shared: 'Shared',
      cancelled: 'Share cancelled',
      copied: 'Link copied',
      blocked: 'Clipboard blocked',
      unavailable: 'Share unavailable',
    },
    feedbackDefault: 'Official Level 1 data is wired in. Level 2 is materially better, but still partial.',
    results: {
      kicker: 'Estimated historical composite',
      title: 'Repo opportunity-cost estimate since 1979',
      rangeLabel: 'Range',
      asOfLabel: 'As of',
      captionSuffix: 'The official data below provides auditable context around this number, not direct proof of it.',
      audit: {
        claimType: 'Claim type',
        confidence: 'Confidence',
        estimateSource: 'Estimate source',
        snapshotStatus: 'Snapshot status',
      },
    },
    rateMeta: 'Official snapshot',
    metricTable: {
      metric: 'Metric',
      value: 'Value',
      asOf: 'As of',
      claim: 'Claim',
      source: 'Source',
      openSource: 'Open source',
      internalPath: 'Internal repo path',
    },
    claimTypeLabels: {
      observed: 'observed',
      derived: 'derived',
      estimated: 'estimated',
      scenario: 'scenario',
    },
    confidenceLabels: {
      high: 'high',
      medium: 'medium',
      estimate: 'estimate',
      speculative: 'speculative',
    },
    statusLabels: {
      Active: 'Active',
    },
    sections: {
      level1: {
        title: 'Official Level 1 snapshot',
        body:
          'These are the core macro and external-sector values now wired into the app from official institutional sources. Where the official series is stale, the stale year is shown directly instead of being hidden.',
      },
      level2: {
        title: 'Official Level 2 proxies',
        body:
          'Level 2 is harder because there is no single official corruption-monopoly-sanctions dataset. The app now uses primary institutional proxies instead of placeholder copy.',
        cardKicker: 'Level 2 highlight',
      },
      scenarios: {
        title: 'Scenario outputs already in the repo',
        body:
          'These scenario cards remain model outputs, not official observations. Keeping that separation visible is part of the point of this pass.',
        kicker: 'Scenario',
        type: 'Type · scenario',
        confidence: 'Confidence · speculative',
      },
      model: {
        title: 'Model sample output currently available',
        kicker: 'Base sample',
        startLabel: `${baseModelSample.startYear} GDP`,
        startNote: 'Start of the demo release series',
        endLabel: `${baseModelSample.endYear} GDP`,
        endNote: 'End of the 10-year demo horizon',
        liftLabel: '10-year GDP lift',
      },
      ledger: {
        title: 'Repo provisional ledger still in view',
        body:
          'These rows stay visible because they are part of the current repo, but they are still repo-level estimates and budget proxies rather than official Level 1 or Level 2 baseline series.',
        cards: {
          corruption: 'Documented corruption',
          corruptionNote: 'Blueprint total in USD',
          ideology: 'Ideological budget',
          ideologyNote: 'Budget law proxy, annual',
          drain: 'Weighted annual drain',
          drainNote: 'Drain items times multipliers',
        },
        table: {
          item: 'Item',
          annualIrr: 'Annual IRR',
          directUsd: 'Direct USD',
          weightedUsd: 'Weighted USD',
        },
      },
      corruption: {
        title: 'Documented corruption cases',
        kicker: 'Case',
      },
      gaps: {
        title: 'What is still missing after this pass',
      },
      sources: {
        title: 'Source pack now wired into the page',
        kicker: 'Source pack',
      },
      footer: {
        kicker: 'Next pass',
        title: 'Extend the official snapshot before widening the headline claims.',
        body:
          'The correct next move is deeper official coverage for fiscal lines, monopoly proxies, and human-capital losses. A bigger all-in cost number should only ship after those missing modules are sourced and exposed.',
        cta: 'Audit the current source pack',
      },
    },
    cardCopy: {
      costContext: costContextCards.map(item => ({
        label: item.label,
        note: item.note,
      })),
      topOfficial: topOfficialCards.map(item => item.label),
      level2Highlights: level2HighlightCards.map(item => ({
        title: item.title,
        description: item.description,
      })),
      scenarios: scenarioCards.map(item => ({
        title: item.title,
        description: item.description,
      })),
      dataGaps: remainingDataGaps,
      corruptionCases: corruptionCases.map(item => ({
        name: item.name,
        note: item.note,
      })),
    },
    metricText: Object.fromEntries(
      [...officialLevel1Metrics, ...officialLevel2Metrics].map(item => [item.id, { label: item.label, note: item.note }]),
    ),
    drainText: Object.fromEntries(annualDrainItems.map(item => [item.id, item.label])),
    sourceText: Object.fromEntries(sourcePack.map(item => [item.id, { title: item.title, note: item.note }])),
    sourceChipLabels: {
      'Tier A': 'Tier A',
      Estimate: 'Estimate',
    },
  },
  fa: {
    locale: 'fa-IR',
    dir: 'rtl',
    title: 'شبیه ساز اقتصادی ایران',
    navLabel: 'ناوبری اصلی',
    topStrip: {
      status: 'نسخه رسمی',
      generated: 'تاریخ تولید',
    },
    navItems: [
      ['خانه', '#home'],
      ['نتایج', '#results'],
      ['سطح ۱', '#level-1'],
      ['سطح ۲', '#level-2'],
      ['سناریوها', '#scenarios'],
      ['منابع', '#sources'],
    ],
    languageSwitchLabel: 'زبان صفحه',
    hero: {
      overline: 'نسخه رسمی',
      title: 'اول داده رسمی.',
      subtitle:
        'داده های بانک جهانی، EIA و OFAC حالا پایه این صفحه هستند. عدد ۱۳ تریلیون هنوز دیده می شود، اما فقط با برچسب روشن «برآورد» و با توضیح دامنه و منبع.',
      ctas: [
        ['نتایج', '#results'],
        ['سطح ۱', '#level-1'],
        ['منابع', '#sources'],
      ],
      sideKicker: 'چه چیزی عوض شد',
      sideTitle: 'یک خط مبنای روشن برای ادامه پروژه.',
      sideBody:
        'این نسخه داده های رسمی را از برآوردهای داخل ریپو جدا می کند و همان فایل JSON داخل گیت را منبع اصلی نگه می دارد.',
      sidePoints: [
        'داده های رسمی جدا از برآوردهای داخل ریپو نمایش داده می شوند.',
        'عدد ۱۳ تریلیون هنوز یک برآورد است، نه یک عدد رسمی.',
        'همه اعداد این صفحه از JSON داخل گیت یا از منبع لینک شده می آیند.',
      ],
      sourceLabel: 'بسته منابع',
      sourceValue: 'World Bank Open Data، WGI، U.S. EIA، U.S. OFAC، و آرتیفکت برآوردی ریپو',
      disclaimers: [
        releaseMeta.snapshotStatus,
        'عدد ۱۳T هنوز برآوردی است، نه رسمی',
        'عدد تجمیعی ساختگی جدید اضافه نشده',
        'سری مالیات و درآمد هنوز با تاخیر زمانی دیده می شود',
      ],
    },
    actions: {
      post: 'پست',
      share: 'اشتراک',
      copy: 'کپی لینک',
    },
    share: {
      text:
        'شبیه ساز اقتصادی ایران: نسخه رسمی سطح ۱ و بخشی از سطح ۲ با داده های بانک جهانی، EIA و OFAC به همراه زمینه لازم برای عدد برآوردی ۱۳ تریلیون.',
      shared: 'اشتراک انجام شد',
      cancelled: 'اشتراک لغو شد',
      copied: 'لینک کپی شد',
      blocked: 'دسترسی کلیپ بورد بسته است',
      unavailable: 'اشتراک گذاری در دسترس نیست',
    },
    feedbackDefault: 'داده های رسمی سطح ۱ وارد شده اند. سطح ۲ بهتر شده، اما هنوز کامل نیست.',
    results: {
      kicker: 'ترکیب تاریخی برآوردی',
      title: 'برآورد هزینه فرصت ریپو از سال ۱۹۷۹',
      rangeLabel: 'بازه',
      asOfLabel: 'تا تاریخ',
      captionSuffix: 'داده های رسمی پایین صفحه فقط زمینه قابل ممیزی می دهند و خودشان اثبات مستقیم این عدد نیستند.',
      audit: {
        claimType: 'نوع ادعا',
        confidence: 'سطح اطمینان',
        estimateSource: 'منبع برآورد',
        snapshotStatus: 'وضعیت این نسخه',
      },
    },
    rateMeta: 'نسخه رسمی',
    metricTable: {
      metric: 'شاخص',
      value: 'مقدار',
      asOf: 'تاریخ',
      claim: 'نوع',
      source: 'منبع',
      openSource: 'باز کردن منبع',
      internalPath: 'مسیر داخلی ریپو',
    },
    claimTypeLabels: {
      observed: 'مشاهده شده',
      derived: 'مشتق شده',
      estimated: 'برآوردی',
      scenario: 'سناریو',
    },
    confidenceLabels: {
      high: 'بالا',
      medium: 'متوسط',
      estimate: 'برآورد',
      speculative: 'گمانه ای',
    },
    statusLabels: {
      Active: 'فعال',
    },
    sections: {
      level1: {
        title: 'نمای رسمی سطح ۱',
        body:
          'اینها شاخص های اصلی اقتصاد کلان و بخش خارجی هستند که حالا از منابع نهادی رسمی وارد صفحه شده اند. هر جا داده رسمی قدیمی است، همان سال قدیمی به طور شفاف نشان داده می شود.',
      },
      level2: {
        title: 'پروکسی های رسمی سطح ۲',
        body:
          'سطح ۲ سخت تر است، چون یک دیتاست رسمی واحد برای فساد، انحصار و شدت تحریم وجود ندارد. این نسخه به جای متن placeholder از پروکسی های نهادی استفاده می کند.',
        cardKicker: 'هایلایت سطح ۲',
      },
      scenarios: {
        title: 'خروجی سناریوهایی که از قبل در ریپو بودند',
        body:
          'این کارت ها هنوز خروجی مدل هستند، نه مشاهده رسمی. همین جداسازی روشن بین داده واقعی و سناریو بخشی از هدف این نسخه است.',
        kicker: 'سناریو',
        type: 'نوع · سناریو',
        confidence: 'اطمینان · گمانه ای',
      },
      model: {
        title: 'نمونه خروجی مدل که فعلا موجود است',
        kicker: 'نمونه پایه',
        startLabel: `GDP ${baseModelSample.startYear}`,
        startNote: 'آغاز سری نمایشی انتشار',
        endLabel: `GDP ${baseModelSample.endYear}`,
        endNote: 'پایان افق ۱۰ ساله نمایشی',
        liftLabel: 'رشد GDP در ۱۰ سال',
      },
      ledger: {
        title: 'دفتر موقت ریپو هنوز دیده می شود',
        body:
          'این ردیف ها هنوز روی صفحه مانده اند چون بخشی از همین ریپو هستند، اما همچنان برآوردهای داخلی و پروکسی های بودجه ای هستند، نه داده پایه رسمی سطح ۱ یا ۲.',
        cards: {
          corruption: 'فساد مستند',
          corruptionNote: 'جمع کل بلوپرینت به دلار',
          ideology: 'بودجه ایدئولوژیک',
          ideologyNote: 'پروکسی سالانه قانون بودجه',
          drain: 'نشت وزنی سالانه',
          drainNote: 'اقلام نشت ضربدر ضرایب',
        },
        table: {
          item: 'ردیف',
          annualIrr: 'ریال سالانه',
          directUsd: 'دلار مستقیم',
          weightedUsd: 'دلار وزنی',
        },
      },
      corruption: {
        title: 'پرونده های فساد مستند',
        kicker: 'پرونده',
      },
      gaps: {
        title: 'بعد از این نسخه چه چیزهایی هنوز کم است',
      },
      sources: {
        title: 'بسته منبعی که حالا به صفحه وصل شده',
        kicker: 'بسته منبع',
      },
      footer: {
        kicker: 'گام بعدی',
        title: 'قبل از بزرگ تر کردن عددها، پوشش رسمی را عمیق تر کن.',
        body:
          'حرکت درست بعدی، پوشش رسمی بیشتر برای ردیف های مالی، پروکسی های انحصار و زیان های سرمایه انسانی است. عدد نهایی بزرگ تر فقط وقتی باید منتشر شود که این ماژول های خالی هم با منبع روشن پر شده باشند.',
        cta: 'بسته منبع فعلی را بررسی کن',
      },
    },
    cardCopy: {
      costContext: [
        {
          label: 'GDP تجمیعی رسمی، ۱۹۷۹ تا ۲۰۲۴',
          note: 'جمع سالانه GDP اسمی دلاری بانک جهانی. این عدد فقط زمینه می دهد و اثبات مستقیم ۱۳ تریلیون نیست.',
        },
        {
          label: 'GDP رسمی ۲۰۲۴',
          note: 'آخرین مقدار غیرتهی GDP ایران در سری بانک جهانی.',
        },
        {
          label: 'نسبت برآورد به GDP ۲۰۲۴',
          note: 'این برآورد تقریبا معادل ۲۷.۴ سال GDP در مقیاس دلار جاری ۲۰۲۴ است.',
        },
        {
          label: 'نسبت برآورد به GDP تجمیعی',
          note: 'عدد ۱۳ تریلیون کمی بزرگ تر از مجموع GDP جاری رسمی ۱۹۷۹ تا ۲۰۲۴ است.',
        },
      ],
      topOfficial: ['GDP رسمی', 'جمعیت', 'GDP سرانه'],
      level2Highlights: [
        {
          title: 'کنترل فساد',
          description: 'رتبه صدکی بانک جهانی. عدد بالاتر بهتر است.',
        },
        {
          title: 'کارآمدی دولت',
          description: 'رتبه صدکی بانک جهانی. عدد بالاتر بهتر است.',
        },
        {
          title: 'کیفیت مقررات',
          description: 'رتبه صدکی بانک جهانی. عدد بالاتر بهتر است.',
        },
      ],
      scenarios: [
        {
          title: 'فقط رفع تحریم',
          description: 'رشد بلندمدت GDP فقط از حذف تحریم های آمریکا و اروپا.',
        },
        {
          title: 'رسیدن به بهره وری ترکیه',
          description: 'رفع تحریم به علاوه نزدیک شدن بهره وری به سطح ترکیه.',
        },
        {
          title: 'رسیدن به بهره وری کره جنوبی',
          description: 'رفع تحریم به علاوه نزدیک شدن بهره وری به سطح کره جنوبی.',
        },
      ],
      dataGaps: [
        'هنوز یک عدد رسمی و واحد برای کل هزینه ها وجود ندارد، بنابراین این نسخه عددی بزرگ تر از ۱۳ تریلیون اختراع نمی کند.',
        'سری رسمی مالیات و درآمد بانک جهانی برای ایران قدیمی است و آخرین مقدار قابل مشاهده آن به ۲۰۰۹ برمی گردد.',
        'سطح ۲ بهتر شده، اما هنوز دیتاست رسمی پاکی برای انحصارها یا سهم بُنیادها در صفحه نداریم.',
        'فرار سرمایه انسانی، سرکوب، سلامت، محیط زیست و خسارت های جنگ هنوز بیرون از یک عدد واحد باقی مانده اند.',
      ],
      corruptionCases: [
        {
          name: 'پرونده چای دبش',
          note: 'با این رقم می شد ۵۰۰ بیمارستان پیشرفته ساخت.',
        },
        {
          name: 'پرونده فساد فولاد',
          note: 'به عنوان یکی از موارد شاخص در داده های بلوپرینت آمده است.',
        },
      ],
    },
    metricText: {
      gdp_current_usd: {
        label: 'تولید ناخالص داخلی (دلار جاری)',
        note: 'آخرین مقدار غیرتهی GDP اسمی دلاری ایران در بانک جهانی.',
      },
      population_total: {
        label: 'جمعیت کل',
        note: 'آخرین جمعیت رسمی ثبت شده در سری بانک جهانی.',
      },
      gdp_per_capita_current_usd: {
        label: 'GDP سرانه (دلار جاری)',
        note: 'از تقسیم GDP و جمعیت همان سال به دست آمده است.',
      },
      gross_capital_formation_pct_gdp: {
        label: 'تشکیل سرمایه ناخالص (درصد GDP)',
        note: 'پروکسی سرمایه گذاری که در چک لیست سطح ۱ پروژه آمده بود.',
      },
      exports_goods_services_usd: {
        label: 'صادرات کالا و خدمات (دلار جاری)',
        note: 'خط مبنای رسمی بخش خارجی برای آخرین سال غیرتهی.',
      },
      imports_goods_services_usd: {
        label: 'واردات کالا و خدمات (دلار جاری)',
        note: 'خط مبنای رسمی بخش خارجی برای آخرین سال غیرتهی.',
      },
      trade_balance_usd: {
        label: 'تراز تجاری کالا و خدمات (دلار جاری)',
        note: 'به صورت صادرات منهای واردات از همان سری های بانک جهانی محاسبه شده است.',
      },
      fdi_net_inflows_usd: {
        label: 'جریان خالص FDI (دلار جاری)',
        note: 'خط مبنای رسمی ورود سرمایه مستقیم خارجی در بانک جهانی.',
      },
      oil_rents_pct_gdp: {
        label: 'رانت نفتی (درصد GDP)',
        note: 'تمیزترین پروکسی رسمی نفتی که در این پاس جمع شد.',
      },
      crude_oil_production_mbd: {
        label: 'تولید نفت خام',
        note: 'EIA گزارش می دهد تولید نفت خام ایران در ۲۰۲۳ حدود ۲.۹ میلیون بشکه در روز بوده است.',
      },
      crude_oil_exports_mbd: {
        label: 'صادرات نفت خام',
        note: 'EIA گزارش می دهد میانگین صادرات نفت و میعانات در هشت ماه اول ۲۰۲۴ حدود ۱.۵ میلیون بشکه در روز بوده است.',
      },
      tax_revenue_pct_gdp: {
        label: 'درآمد مالیاتی (درصد GDP)',
        note: 'سری رسمی برای ایران قدیمی است، بنابراین دیده می شود اما نباید به عنوان عدد جاری استفاده شود.',
      },
      revenue_excluding_grants_pct_gdp: {
        label: 'درآمد بدون کمک ها (درصد GDP)',
        note: 'سری رسمی قدیمی است و فقط برای نشان دادن شکاف داده باقی مانده است.',
      },
      control_of_corruption_pct_rank: {
        label: 'رتبه صدکی کنترل فساد',
        note: 'پروکسی رسمی حکمرانی برای سنجش مواجهه با فساد در سطح ۲.',
      },
      government_effectiveness_pct_rank: {
        label: 'رتبه صدکی کارآمدی دولت',
        note: 'پروکسی رسمی حکمرانی برای کیفیت عملکرد نهادی.',
      },
      regulatory_quality_pct_rank: {
        label: 'رتبه صدکی کیفیت مقررات',
        note: 'پروکسی رسمی برای شرایط رقابت و اصطکاک مقرراتی.',
      },
      political_stability_pct_rank: {
        label: 'رتبه صدکی ثبات سیاسی',
        note: 'پروکسی رسمی ریسک کشوری در شاخص های حکمرانی بانک جهانی.',
      },
      rule_of_law_pct_rank: {
        label: 'رتبه صدکی حاکمیت قانون',
        note: 'پروکسی رسمی برای قابلیت پیش بینی و اجرای قراردادها.',
      },
      voice_accountability_pct_rank: {
        label: 'رتبه صدکی پاسخگویی و حق صدا',
        note: 'پروکسی حکمرانی که بیرون از حوزه صرفا مالی است اما برای کیفیت سیستم مهم است.',
      },
      new_business_density: {
        label: 'تراکم کسب و کارهای جدید',
        note: 'پروکسی رسمی پویایی کسب و کار: ثبت شرکت های جدید به ازای هر ۱۰۰۰ نفر ۱۵ تا ۶۴ ساله.',
      },
      china_export_share: {
        label: 'سهم چین از صادرات نفت خام',
        note: 'EIA می گوید بیش از ۹۰٪ صادرات نفت و میعانات ایران در هشت ماه اول ۲۰۲۴ به چین رفته است.',
      },
      ofac_sanctions_status: {
        label: 'وضعیت برنامه تحریم ایران در OFAC',
        note: 'تایید مستقیم منبع اولیه برای اینکه برنامه تحریم ایران فعال است.',
      },
    },
    drainText: {
      religious_centers: 'مرکز خدمات حوزه های علمیه',
      propaganda: 'سازمان تبلیغات اسلامی',
      oil_discount_loss: 'زیان برآوردی تخفیف نفت به چین',
    },
    sourceText: {
      WB_OPEN_DATA: {
        title: 'API داده باز بانک جهانی',
        note: 'برای GDP، جمعیت، سرمایه گذاری، تجارت، FDI، مالیات، درآمد، رانت نفت و تراکم کسب و کار استفاده شده است.',
      },
      WB_WGI: {
        title: 'شاخص های حکمرانی بانک جهانی',
        note: 'برای فساد، کارآمدی دولت، کیفیت مقررات، ثبات سیاسی، حاکمیت قانون و پاسخگویی استفاده شده است.',
      },
      US_EIA_IRAN: {
        title: 'گزارش EIA درباره ایران',
        note: 'برای تولید نفت خام، صادرات نفت و تمرکز مقصد صادرات استفاده شده است.',
      },
      US_OFAC_IRAN: {
        title: 'صفحه تحریم ایران در OFAC',
        note: 'برای تایید وضعیت فعلی برنامه تحریم ایران استفاده شده است.',
      },
      REPO_CUMULATIVE_WASTE: {
        title: 'آرتیفکت برآوردی cumulative-waste.json',
        note: 'منبع عدد فعلی ۱۳ تریلیون در ریپو.',
      },
      REPO_BLUEPRINT: {
        title: 'بلوپرینت و آرتیفکت های لجر داخل ریپو',
        note: 'منبع ردیف های موقت فساد و نشت بودجه که هنوز روی صفحه دیده می شوند.',
      },
    },
    sourceChipLabels: {
      'Tier A': 'رده A',
      Estimate: 'برآوردی',
    },
  },
};

function formatNumber(value, language, digits = 0) {
  return new Intl.NumberFormat(UI_COPY[language].locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function formatMoney(value, language, options = {}) {
  return new Intl.NumberFormat(UI_COPY[language].locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
    notation: options.notation,
  }).format(value);
}

function formatCompactMoney(value, language) {
  return new Intl.NumberFormat(UI_COPY[language].locale, {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function formatCompactNumber(value, language) {
  return new Intl.NumberFormat(UI_COPY[language].locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function formatPercent(value, language, digits = 0) {
  return `${formatNumber(value, language, digits)}${language === 'fa' ? '٪' : '%'}`;
}

function formatIrr(value, language) {
  return `${formatCompactNumber(value, language)} ${language === 'fa' ? 'ریال' : 'IRR'}`;
}

function formatMetricValue(metric, language, statusLabels) {
  if (metric.unit === 'status') {
    return statusLabels[metric.value] ?? metric.value;
  }

  if (metric.unit === 'usd') {
    return Math.abs(metric.value) >= 1_000_000_000
      ? formatCompactMoney(metric.value, language)
      : formatMoney(metric.value, language);
  }

  if (metric.unit === 'people') {
    return formatCompactNumber(metric.value, language);
  }

  if (metric.unit === 'pct') {
    return formatPercent(metric.value, language, 1);
  }

  if (metric.unit === 'pct_plus') {
    return `${language === 'fa' ? 'بیش از ' : '>'}${formatPercent(metric.value, language, 0)}`;
  }

  if (metric.unit === 'multiple') {
    return language === 'fa' ? `${formatNumber(metric.value, language, 1)} برابر` : `${formatNumber(metric.value, language, 1)}x`;
  }

  if (metric.unit === 'mbd') {
    return language === 'fa'
      ? `${formatNumber(metric.value, language, 1)} میلیون بشکه در روز`
      : `${formatNumber(metric.value, language, 1)}m b/d`;
  }

  if (metric.unit === 'per_1000_adults') {
    return language === 'fa'
      ? `${formatNumber(metric.value, language, 2)} در هر ۱۰۰۰ بزرگسال`
      : `${formatNumber(metric.value, language, 2)} / 1k adults`;
  }

  return String(metric.value);
}

function localizeMetrics(items, copy) {
  return items.map(item => {
    const localized = copy.metricText[item.id];
    return {
      ...item,
      label: localized?.label ?? item.label,
      note: localized?.note ?? item.note,
    };
  });
}

function MetricTable({ items, copy, language }) {
  return (
    <article className="table-card metric-table">
      <div className="metric-row metric-row--head">
        <span>{copy.metricTable.metric}</span>
        <span>{copy.metricTable.value}</span>
        <span>{copy.metricTable.asOf}</span>
        <span>{copy.metricTable.claim}</span>
        <span>{copy.metricTable.source}</span>
      </div>

      {items.map(item => (
        <div className="metric-row" key={item.id}>
          <div className="metric-main">
            <strong>{item.label}</strong>
            <p className="metric-note">{item.note}</p>
          </div>
          <div className="metric-value">{formatMetricValue(item, language, copy.statusLabels)}</div>
          <div className="metric-meta">{item.asOf}</div>
          <div className="metric-claim">
            <span className="source-chip">{copy.claimTypeLabels[item.claimType] ?? item.claimType}</span>
            <span className="metric-meta">{copy.confidenceLabels[item.confidence] ?? item.confidence}</span>
          </div>
          <div className="metric-source">
            <a href={item.sourceUrl} target="_blank" rel="noreferrer">
              {copy.metricTable.openSource}
            </a>
            <span>{item.sourceLabel}</span>
          </div>
        </div>
      ))}
    </article>
  );
}

function App() {
  const [language, setLanguage] = useState('en');
  const [shareFeedback, setShareFeedback] = useState('');

  const copy = UI_COPY[language];
  const isFa = language === 'fa';

  useEffect(() => {
    document.documentElement.lang = isFa ? 'fa' : 'en';
    document.documentElement.dir = copy.dir;
    document.title = copy.title;
  }, [copy.dir, copy.title, isFa]);

  useEffect(() => {
    if (!shareFeedback) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setShareFeedback('');
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [shareFeedback]);

  const localizedLevel1Metrics = localizeMetrics(officialLevel1Metrics, copy);
  const localizedLevel2Metrics = localizeMetrics(officialLevel2Metrics, copy);
  const localizedCostContextCards = costContextCards.map((item, index) => ({
    ...item,
    label: copy.cardCopy.costContext[index]?.label ?? item.label,
    note: copy.cardCopy.costContext[index]?.note ?? item.note,
  }));
  const localizedTopOfficialCards = topOfficialCards.map((item, index) => ({
    ...item,
    label: copy.cardCopy.topOfficial[index] ?? item.label,
  }));
  const localizedLevel2Highlights = level2HighlightCards.map((item, index) => ({
    ...item,
    title: copy.cardCopy.level2Highlights[index]?.title ?? item.title,
    description: copy.cardCopy.level2Highlights[index]?.description ?? item.description,
  }));
  const localizedScenarioCards = scenarioCards.map((item, index) => ({
    ...item,
    title: copy.cardCopy.scenarios[index]?.title ?? item.title,
    description: copy.cardCopy.scenarios[index]?.description ?? item.description,
  }));
  const localizedDataGaps = copy.cardCopy.dataGaps ?? remainingDataGaps;
  const localizedCorruptionCases = corruptionCases.map((item, index) => ({
    ...item,
    name: copy.cardCopy.corruptionCases[index]?.name ?? item.name,
    note: copy.cardCopy.corruptionCases[index]?.note ?? item.note,
  }));
  const localizedDrainLedger = annualDrainItems.map(item => ({
    ...item,
    label: copy.drainText[item.id] ?? item.label,
  }));
  const localizedSourcePack = sourcePack.map(source => ({
    ...source,
    title: copy.sourceText[source.id]?.title ?? source.title,
    note: copy.sourceText[source.id]?.note ?? source.note,
    chipLabel: copy.sourceChipLabels[source.chip] ?? source.chip,
  }));

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: copy.title,
          text: copy.share.text,
          url: window.location.href,
        });
        setShareFeedback(copy.share.shared);
        return;
      } catch {
        setShareFeedback(copy.share.cancelled);
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(`${copy.share.text} ${window.location.href}`);
      setShareFeedback(copy.share.copied);
    } catch {
      setShareFeedback(copy.share.unavailable);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareFeedback(copy.share.copied);
    } catch {
      setShareFeedback(copy.share.blocked);
    }
  }

  function handlePost() {
    const text = encodeURIComponent(copy.share.text);
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  return (
    <div className={`page-shell ${isFa ? 'page-shell--fa' : ''}`} dir={copy.dir}>
      <div className="top-strip">
        <div className="top-strip__inner">
          <span className="live-dot" />
          {copy.topStrip.status}
          <span className="separator">|</span>
          {releaseMeta.releaseVersion}
          <span className="separator">|</span>
          {copy.topStrip.generated} {releaseMeta.generatedAt}
        </div>
      </div>

      <main className="page" id="home">
        <header className="hero">
          <div className="hero-topline">
            <nav className="hero-nav" aria-label={copy.navLabel}>
              {copy.navItems.map(([label, href]) => (
                <a href={href} key={label}>
                  {label}
                </a>
              ))}
            </nav>

            <div className="lang-switch" role="tablist" aria-label={copy.languageSwitchLabel}>
              <button
                className={`lang-switch__button ${language === 'en' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                className={`lang-switch__button lang-switch__button--fa ${language === 'fa' ? 'is-active' : ''}`}
                type="button"
                onClick={() => setLanguage('fa')}
              >
                فارسی
              </button>
            </div>
          </div>

          <div className="hero-layout">
            <div className="hero-copy-panel">
              <p className="mono-overline">{copy.hero.overline}</p>
              <h1 className="hero-title">{copy.hero.title}</h1>
              <p className="hero-subtitle">{copy.hero.subtitle}</p>

              <div className="hero-links">
                {copy.hero.ctas.map(([label, href]) => (
                  <a href={href} key={label}>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <aside className="hero-side-panel">
              <p className="section-kicker">{copy.hero.sideKicker}</p>
              <h2 className="hero-side-title">{copy.hero.sideTitle}</h2>
              <p className="hero-side-body">{copy.hero.sideBody}</p>

              <div className="hero-side-points">
                {copy.hero.sidePoints.map(point => (
                  <span className="hero-side-point" key={point}>
                    {point}
                  </span>
                ))}
              </div>

              <div className="hero-source-box">
                <label>{copy.hero.sourceLabel}</label>
                <p>{copy.hero.sourceValue}</p>
              </div>
            </aside>
          </div>

          <div className="hero-disclaimer">
            {copy.hero.disclaimers.map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </header>

        <section className="main-counter" id="results">
          <p className="section-kicker">{copy.results.kicker}</p>
          <h2>{copy.results.title}</h2>
          <div className="main-counter__amount">{formatCompactMoney(cumulativeOpportunityCost.totalUsd, language)}</div>
          <p className="main-counter__subline">
            {copy.results.rangeLabel} {formatCompactMoney(cumulativeOpportunityCost.rangeMinUsd, language)} -{' '}
            {formatCompactMoney(cumulativeOpportunityCost.rangeMaxUsd, language)} | {copy.results.asOfLabel}{' '}
            {cumulativeOpportunityCost.asOf}
          </p>
          <p className="main-counter__caption">
            {cumulativeOpportunityCost.note} {copy.results.captionSuffix}
          </p>

          <div className="audit-grid">
            <article className="audit-pill">
              <label>{copy.results.audit.claimType}</label>
              <strong>{copy.claimTypeLabels[cumulativeOpportunityCost.claimType] ?? cumulativeOpportunityCost.claimType}</strong>
            </article>
            <article className="audit-pill">
              <label>{copy.results.audit.confidence}</label>
              <strong>{copy.confidenceLabels[cumulativeOpportunityCost.confidence] ?? cumulativeOpportunityCost.confidence}</strong>
            </article>
            <article className="audit-pill">
              <label>{copy.results.audit.estimateSource}</label>
              <strong>{cumulativeOpportunityCost.sourceLabel}</strong>
            </article>
            <article className="audit-pill">
              <label>{copy.results.audit.snapshotStatus}</label>
              <strong>{releaseMeta.snapshotStatus}</strong>
            </article>
          </div>

          <div className="countdown-grid">
            {localizedCostContextCards.map(item => (
              <div className="countdown-cell" key={item.label}>
                <span>{formatMetricValue(item, language, copy.statusLabels)}</span>
                <label>{item.label}</label>
                <small>{item.note}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="rate-grid">
          {localizedTopOfficialCards.map(card => (
            <article className="rate-card" key={card.label}>
              <p>{card.label}</p>
              <strong>{formatMetricValue(card, language, copy.statusLabels)}</strong>
              <span>
                {copy.rateMeta} · {card.asOf}
              </span>
            </article>
          ))}
        </section>

        <section className="action-row">
          <button type="button" onClick={handlePost}>
            {copy.actions.post}
          </button>
          <button type="button" onClick={handleShare}>
            {copy.actions.share}
          </button>
          <button type="button" onClick={handleCopy}>
            {copy.actions.copy}
          </button>
        </section>

        <p className="feedback-line" aria-live="polite">
          {shareFeedback || copy.feedbackDefault}
        </p>

        <section className="page-section" id="level-1">
          <h2 className="section-heading">{copy.sections.level1.title}</h2>
          <p className="section-copy">{copy.sections.level1.body}</p>
          <MetricTable items={localizedLevel1Metrics} copy={copy} language={language} />
        </section>

        <section className="page-section" id="level-2">
          <h2 className="section-heading">{copy.sections.level2.title}</h2>
          <p className="section-copy">{copy.sections.level2.body}</p>

          <div className="proof-grid">
            {localizedLevel2Highlights.map(card => (
              <article className="proof-card" key={card.title}>
                <p className="section-kicker">{copy.sections.level2.cardKicker}</p>
                <h3>{card.title}</h3>
                <strong>{formatMetricValue(card, language, copy.statusLabels)}</strong>
                <div className="proof-meta">
                  <span>
                    {copy.metricTable.asOf} · {card.asOf}
                  </span>
                  <span>{card.description}</span>
                  <span>
                    {copy.metricTable.source} · {card.sourceLabel}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <MetricTable items={localizedLevel2Metrics} copy={copy} language={language} />
        </section>

        <section className="page-section" id="scenarios">
          <h2 className="section-heading">{copy.sections.scenarios.title}</h2>
          <p className="section-copy">{copy.sections.scenarios.body}</p>
          <div className="proof-grid">
            {localizedScenarioCards.map(card => (
              <article className="proof-card" key={card.title}>
                <p className="section-kicker">{copy.sections.scenarios.kicker}</p>
                <h3>{card.title}</h3>
                <strong>{formatPercent(card.upliftPercent, language)}</strong>
                <div className="proof-meta">
                  <span>{copy.sections.scenarios.type}</span>
                  <span>{copy.sections.scenarios.confidence}</span>
                  <span>{card.description}</span>
                  <span>
                    {copy.metricTable.source} · {card.source}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <h2 className="section-heading">{copy.sections.model.title}</h2>
          <div className="impact-grid">
            <article className="impact-card impact-card--sky">
              <p className="section-kicker">{copy.sections.model.kicker}</p>
              <h3>{copy.sections.model.startLabel}</h3>
              <strong>{formatCompactMoney(baseModelSample.startGdpUsd, language)}</strong>
              <span>{copy.sections.model.startNote}</span>
            </article>
            <article className="impact-card impact-card--amber">
              <p className="section-kicker">{copy.sections.model.kicker}</p>
              <h3>{copy.sections.model.endLabel}</h3>
              <strong>{formatCompactMoney(baseModelSample.endGdpUsd, language)}</strong>
              <span>{copy.sections.model.endNote}</span>
            </article>
            <article className="impact-card impact-card--rose">
              <p className="section-kicker">{copy.sections.model.kicker}</p>
              <h3>{copy.sections.model.liftLabel}</h3>
              <strong>{formatPercent(baseModelSample.growthPct, language)}</strong>
              <span>
                {formatMoney(baseModelSample.startPerCapitaUsd, language)} {isFa ? 'تا' : 'to'}{' '}
                {formatMoney(baseModelSample.endPerCapitaUsd, language)} {isFa ? 'به ازای هر نفر' : 'per capita'}
              </span>
            </article>
          </div>
        </section>

        <section className="page-section" id="ledger">
          <h2 className="section-heading">{copy.sections.ledger.title}</h2>
          <p className="section-copy">{copy.sections.ledger.body}</p>
          <div className="rate-grid rate-grid--provisional">
            <article className="rate-card">
              <p>{copy.sections.ledger.cards.corruption}</p>
              <strong>{formatCompactMoney(blueprintCorruptionTotalUsd, language)}</strong>
              <span>{copy.sections.ledger.cards.corruptionNote}</span>
            </article>
            <article className="rate-card">
              <p>{copy.sections.ledger.cards.ideology}</p>
              <strong>{formatCompactMoney(directIdeologicalBudgetUsd, language)}</strong>
              <span>{copy.sections.ledger.cards.ideologyNote}</span>
            </article>
            <article className="rate-card">
              <p>{copy.sections.ledger.cards.drain}</p>
              <strong>{formatCompactMoney(weightedAnnualDrainUsd, language)}</strong>
              <span>{copy.sections.ledger.cards.drainNote}</span>
            </article>
          </div>

          <article className="table-card ledger-table">
            <div className="ledger-row ledger-row--head">
              <span>{copy.sections.ledger.table.item}</span>
              <span>{copy.sections.ledger.table.annualIrr}</span>
              <span>{copy.sections.ledger.table.directUsd}</span>
              <span>{copy.sections.ledger.table.weightedUsd}</span>
            </div>
            {localizedDrainLedger.map(item => (
              <div className="ledger-row" key={item.id}>
                <strong>{item.label}</strong>
                <span>{formatIrr(item.annualBudgetIrr, language)}</span>
                <span>{formatCompactMoney(item.directUsd, language)}</span>
                <span>{formatCompactMoney(item.weightedUsd, language)}</span>
              </div>
            ))}
          </article>
        </section>

        <section className="page-section">
          <h2 className="section-heading">{copy.sections.corruption.title}</h2>
          <div className="trust-grid">
            {localizedCorruptionCases.map(caseItem => (
              <article className="trust-card" key={caseItem.name}>
                <p className="section-kicker">{copy.sections.corruption.kicker}</p>
                <h3>{caseItem.name}</h3>
                <div className="case-amount">{formatMoney(caseItem.amountUsd, language)}</div>
                <p>{caseItem.note}</p>
                <p className="source-footnote">
                  {copy.metricTable.source}: {caseItem.source}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" id="data-gaps">
          <h2 className="section-heading">{copy.sections.gaps.title}</h2>
          <div className="missing-grid">
            {localizedDataGaps.map(item => (
              <article className="missing-card" key={item}>
                {item}
              </article>
            ))}
          </div>
        </section>

        <section className="page-section" id="sources">
          <h2 className="section-heading">{copy.sections.sources.title}</h2>
          <article className="sources-card source-table">
            {localizedSourcePack.map(source => (
              <div className="source-row" key={source.id}>
                <div className="source-main">
                  <p className="source-id">{copy.sections.sources.kicker}</p>
                  <strong>{source.title}</strong>
                  <span>{source.note}</span>
                  {source.url ? (
                    <a className="source-link" href={source.url} target="_blank" rel="noreferrer">
                      {copy.metricTable.openSource}
                    </a>
                  ) : (
                    <span className="source-link source-link--static">{copy.metricTable.internalPath}</span>
                  )}
                </div>
                <div className="source-meta">
                  <span className={`source-chip source-chip--${source.tone}`}>{source.chipLabel}</span>
                  <span>{source.meta}</span>
                </div>
              </div>
            ))}
          </article>
        </section>

        <section className="page-section">
          <article className="footer-cta">
            <p className="section-kicker">{copy.sections.footer.kicker}</p>
            <h3>{copy.sections.footer.title}</h3>
            <p>{copy.sections.footer.body}</p>
            <a href="#sources">{copy.sections.footer.cta}</a>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
