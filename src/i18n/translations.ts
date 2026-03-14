export type Lang = 'en' | 'zh-tw' | 'ja';

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
      description: 'Complete these interactive exercises to prepare for your overseas job search. Your data is preserved locally in your browser. You can download or upload your own data anytime.',
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
      exportCsv: 'Export CSV',
      importCsv: 'Import CSV',
      downloadPdf: 'Download PDF',
      dataTooltip: 'Download as CSV to copy into Google Sheets, or download as PDF to print out.',
      saved: 'Saved',
      saving: 'Saving...',
      noData: 'No data yet. Add a row to get started.',
      confirmDelete: 'Are you sure you want to delete this row?',
      importSuccess: 'CSV data imported successfully!',
      importError: 'Failed to import data. Please check the CSV file format.',
      backToExercises: 'Back to Exercises',
      footer: '© 2026 Aaron Hsieh. All rights reserved.',
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
      description: '完成這些互動練習，為您的海外求職做準備。資料會保存在您的瀏覽器中，您可以隨時下載或上傳自己的資料。',
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
      exportCsv: '匯出 CSV',
      importCsv: '匯入 CSV',
      downloadPdf: '下載 PDF',
      dataTooltip: '下載 CSV 可複製到 Google 試算表，或下載 PDF 以列印。',
      saved: '已儲存',
      saving: '儲存中...',
      noData: '尚無資料。新增一列以開始。',
      confirmDelete: '確定要刪除此列嗎？',
      importSuccess: 'CSV 資料匯入成功！',
      importError: '匯入失敗，請檢查 CSV 檔案格式。',
      backToExercises: '返回練習列表',
      footer: '© 2026 Aaron Hsieh. All rights reserved.',
    },
  },
  ja: {
    site: {
      title: '初めての海外就職ガイド',
      description: '初めての海外就職に役立つインタラクティブなキャリア演習とリソース。',
    },
    nav: {
      home: 'ホーム',
      exercises: '演習',
      resources: 'リソース',
    },
    landing: {
      heroTitle: 'Aaron Hsieh',
      heroSubtitle: 'Engineering Manager @Datadog | Tech Lead @Meta | Early-Engineer @Beamery🦄 | 著者 | キャリアコーチ',
      bioTitle: '自己紹介',
      bio: `過去12年以上にわたり、台湾、イギリス、アメリカの3大陸でキャリアを築いてきました。Beamery（現在はユニコーン企業）のアーリーエンジニアとしてスタートし、MetaのTech Leadに成長し、現在はDatadogのEngineering Managerを務めています。その過程で、ビザ手続き、文化の違い、海外でキャリアを築く挑戦を乗り越えてきました。この本は、私が学んだすべてを、海外で働くことを夢見るすべての人のための実践的なステップバイステップガイドにまとめたものです。`,
      bookTitle: '本について',
      bookDescription: '初めての海外就職ガイド——ビザ戦略、履歴書作成、面接準備、国際的な求職者のためのキャリアプランニングをカバーする実践的なステップバイステップガイド。',
      ctaTitle: 'インタラクティブ演習',
      ctaDescription: 'この5つのキャリア演習をデジタルで完了しましょう。進捗はブラウザにローカル保存されます。',
      ctaButton: '演習を始める',
    },
    exercises: {
      title: 'キャリア演習',
      description: 'これらのインタラクティブな演習を完了して、海外就職の準備をしましょう。データはブラウザにローカル保存されます。いつでもデータのダウンロードやアップロードが可能です。',
      visaMemo: {
        title: '演習1：夢の国のビザメモ',
        description: '目標国のビザ要件を調査・整理しましょう。',
      },
      starTime: {
        title: '演習2：STARストーリーブック（時系列）',
        description: 'STARメソッドを使って、キャリアストーリーを時系列で記録しましょう。',
      },
      starQuestions: {
        title: '演習3：STARストーリーブック（質問ベース）',
        description: '行動面接の質問をSTARストーリーにマッピングしましょう。',
      },
      listDashboard: {
        title: '演習4：LIST原則ダッシュボード',
        description: '毎週の求職活動とネットワーキング指標を追跡しましょう。',
      },
      listFunnel: {
        title: '演習5：LIST原則ファネル',
        description: '応募からオファーまでの求職パイプラインを管理しましょう。',
      },
    },
    resources: {
      title: 'リソース',
      description: '印刷可能なPDF版のキャリア演習をダウンロードできます。',
      downloadPdf: 'PDF ダウンロード',
      downloadAll: '全演習をダウンロード',
    },
    common: {
      addRow: '行を追加',
      deleteRow: '削除',
      exportCsv: 'CSV エクスポート',
      importCsv: 'CSV インポート',
      downloadPdf: 'PDF ダウンロード',
      dataTooltip: 'CSVをダウンロードしてGoogleスプレッドシートにコピー、またはPDFをダウンロードして印刷できます。',
      saved: '保存済み',
      saving: '保存中...',
      noData: 'データがありません。行を追加して始めましょう。',
      confirmDelete: 'この行を削除してもよろしいですか？',
      importSuccess: 'CSVデータのインポートに成功しました！',
      importError: 'データのインポートに失敗しました。CSVファイルの形式を確認してください。',
      backToExercises: '演習一覧に戻る',
      footer: '© 2026 Aaron Hsieh. All rights reserved.',
    },
  },
} as const;

export function t(lang: Lang) {
  return translations[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, langSegment] = url.pathname.split('/');
  if (langSegment === 'zh-tw') return 'zh-tw';
  if (langSegment === 'ja') return 'ja';
  return 'en';
}

export function getLocalizedPath(path: string, lang: Lang): string {
  return `/${lang}${path}`;
}
