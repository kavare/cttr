export type Lang = 'en' | 'zh-tw';

export const translations = {
  en: {
    site: {
      title: 'A Beginner Guide to Find Your First Overseas Jobs',
      description: 'Interactive career exercises and resources for landing your first international job.',
    },
    nav: {
      home: 'Home',
      exercises: 'Exercises',
      resources: 'Resources',
    },
    landing: {
      heroTitle: 'Aaron Hsieh',
      heroSubtitle: 'Engineering Manager @Datadog | Tech Lead @Meta | Early-Engineer @Beamery🦄 | Author | Career Coach',
      bioTitle: 'About Me',
      bio: `Over the past 12+ years, I've built my career across three continents — from Taiwan to the UK to the US. I started as an early engineer at Beamery (now a unicorn), grew into a Tech Lead at Meta, and currently serve as an Engineering Manager at Datadog. Along the way, I've navigated visa processes, cultural shifts, and the challenges of building a career far from home. This book distills everything I've learned into a practical, step-by-step guide for anyone dreaming of working abroad.`,
      bookTitle: 'The Book',
      bookDescription: 'A Beginner Guide to Find Your First Overseas Jobs — a practical, step-by-step guide covering visa strategies, resume building, interview preparation, and career planning for international job seekers.',
      ctaTitle: 'Interactive Exercises',
      ctaDescription: 'Complete these 5 career exercises digitally. Your progress is saved locally in your browser.',
      ctaButton: 'Start Exercises',
    },
    exercises: {
      title: 'Career Exercises',
      description: 'Complete these interactive exercises to prepare for your overseas job search. All data is saved locally in your browser.',
      visaMemo: {
        title: 'Exercise 1: Visa Memo for Dream Countries',
        description: 'Research and organize visa requirements for your target countries.',
      },
      starTime: {
        title: 'Exercise 2: STAR Storybook (Time-series)',
        description: 'Document your career stories chronologically using the STAR method.',
      },
      starQuestions: {
        title: 'Exercise 3: STAR Storybook (Questions-based)',
        description: 'Map behavioral interview questions to your STAR stories.',
      },
      listDashboard: {
        title: 'Exercise 4: LIST Principles Dashboard',
        description: 'Track your weekly job search activities and networking metrics.',
      },
      listFunnel: {
        title: 'Exercise 5: LIST Principles Funnel',
        description: 'Manage your job application pipeline from submission to offer.',
      },
    },
    resources: {
      title: 'Resources',
      description: 'Download printable PDF versions of the career exercises.',
      downloadPdf: 'Download PDF',
      downloadAll: 'Download All Exercises',
    },
    common: {
      addRow: 'Add Row',
      deleteRow: 'Delete',
      exportJson: 'Export JSON',
      importJson: 'Import JSON',
      saved: 'Saved',
      saving: 'Saving...',
      noData: 'No data yet. Add a row to get started.',
      confirmDelete: 'Are you sure you want to delete this row?',
      importSuccess: 'Data imported successfully!',
      importError: 'Failed to import data. Please check the file format.',
      footer: '© 2025 Aaron Hsieh. All rights reserved.',
    },
  },
  'zh-tw': {
    site: {
      title: '海外求職新手指南',
      description: '互動式職涯練習與資源，助你找到第一份海外工作。',
    },
    nav: {
      home: '首頁',
      exercises: '練習',
      resources: '資源',
    },
    landing: {
      heroTitle: 'Aaron Hsieh',
      heroSubtitle: 'Engineering Manager @Datadog | Tech Lead @Meta | Early-Engineer @Beamery🦄 | 作者 | 職涯教練',
      bioTitle: '關於我',
      bio: `過去 12 年多來，我在三個大洲建立了我的職涯——從台灣到英國再到美國。我從 Beamery（現已成為獨角獸）的早期工程師開始，成長為 Meta 的技術主管，目前擔任 Datadog 的工程經理。一路上，我經歷了簽證流程、文化轉變，以及在異鄉建立職涯的種種挑戰。這本書將我所學到的一切，濃縮成一本實用的、循序漸進的指南，獻給每一個夢想到海外工作的人。`,
      bookTitle: '關於本書',
      bookDescription: '海外求職新手指南——一本實用的循序漸進指南，涵蓋簽證策略、履歷撰寫、面試準備，以及國際求職者的職涯規劃。',
      ctaTitle: '互動練習',
      ctaDescription: '在線上完成這 5 個職涯練習。您的進度會自動儲存在瀏覽器中。',
      ctaButton: '開始練習',
    },
    exercises: {
      title: '職涯練習',
      description: '完成這些互動練習，為您的海外求職做準備。所有資料都儲存在您的瀏覽器中。',
      visaMemo: {
        title: '練習一：夢想國家簽證備忘錄',
        description: '研究並整理目標國家的簽證要求。',
      },
      starTime: {
        title: '練習二：STAR 故事集（時間序列）',
        description: '使用 STAR 方法按時間順序記錄您的職涯故事。',
      },
      starQuestions: {
        title: '練習三：STAR 故事集（問題導向）',
        description: '將行為面試問題對應到您的 STAR 故事。',
      },
      listDashboard: {
        title: '練習四：LIST 原則儀表板',
        description: '追蹤您每週的求職活動和人脈指標。',
      },
      listFunnel: {
        title: '練習五：LIST 原則漏斗',
        description: '管理您的求職管道，從投遞到錄取。',
      },
    },
    resources: {
      title: '資源',
      description: '下載可列印的 PDF 版本職涯練習。',
      downloadPdf: '下載 PDF',
      downloadAll: '下載全部練習',
    },
    common: {
      addRow: '新增列',
      deleteRow: '刪除',
      exportJson: '匯出 JSON',
      importJson: '匯入 JSON',
      saved: '已儲存',
      saving: '儲存中...',
      noData: '尚無資料。新增一列以開始。',
      confirmDelete: '確定要刪除此列嗎？',
      importSuccess: '資料匯入成功！',
      importError: '匯入失敗，請檢查檔案格式。',
      footer: '© 2025 Aaron Hsieh. 保留所有權利。',
    },
  },
} as const;

export function t(lang: Lang) {
  return translations[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, langSegment] = url.pathname.split('/');
  if (langSegment === 'zh-tw') return 'zh-tw';
  return 'en';
}

export function getLocalizedPath(path: string, lang: Lang): string {
  return `/${lang}${path}`;
}
