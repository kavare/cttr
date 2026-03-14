export type Lang = 'en' | 'zh-tw' | 'ja' | 'ko';

export const translations = {
  en: {
    site: {
      title: 'Aaron Hsieh - A Beginner Guide to Find Your First Overseas Jobs',
      description: 'Aaron Hsieh, Career Coach and author, shares a practical guide to overseas jobs, international career building, leadership, and working abroad for startups and beyond.',
    },
    nav: {
      brand: 'A Beginner Guide to Find Your First Overseas Jobs',
      home: 'About',
      exercises: 'Exercises',
      resources: 'Resources',
      coffeechat: 'Coffee Chat',
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
      title: 'Aaron Hsieh - 普通人的海外求職指南',
      description: '職涯教練 Aaron Hsieh 的國際職涯指南。普通人也能掌握海外工作技巧，從零開始海外求職，打造屬於自己的國際職涯。',
    },
    nav: {
      brand: '普通人的海外求職指南',
      home: '關於',
      exercises: '練習',
      resources: '資源',
      coffeechat: 'Coffee Chat',
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
      title: 'Aaron Hsieh 「はじめての海外キャリアのつくり方」',
      description: 'キャリアコーチ Aaron Hsieh による海外キャリア・海外就職の実践ガイド。国際キャリアの築き方から海外転職のコツまで、すぐに使えるノウハウを紹介。',
    },
    nav: {
      brand: 'はじめての海外キャリアのつくり方',
      home: '著者について',
      exercises: 'ワーク',
      resources: '資料集',
      coffeechat: 'コーヒーチャット',
    },
    landing: {
      heroTitle: 'Aaron Hsieh',
      heroSubtitle: 'エンジニアリングマネージャー @Datadog / 元テックリード @Meta / 初期メンバー @Beamery🦄 / 著者 / キャリアコーチ',
      bioTitle: '著者について',
      bio: `12年以上かけて、台湾、イギリス、アメリカの3つの大陸でキャリアを積んできました。ユニコーン企業Beameryの初期エンジニアからスタートし、Metaのテックリードを経て、現在はDatadogでエンジニアリングマネージャーを務めています。ビザの壁、文化の違い、海外でゼロからキャリアを築く大変さ。その全てを乗り越えてきた経験を、この一冊にまとめました。海外で働きたいと思っているあなたに、すぐ使える実践ガイドをお届けします。`,
      bookTitle: '書籍のご紹介',
      bookDescription: 'ビザの取り方、職務経歴書の書き方、面接対策、キャリア設計まで。海外就職に必要なことを一冊にまとめた実践ガイドです。',
      ctaTitle: '実践ワーク',
      ctaDescription: '5つのワークにオンラインで取り組めます。入力した内容はお使いのブラウザに自動保存されます。',
      ctaButton: 'ワークを始める',
    },
    exercises: {
      title: '実践ワーク',
      description: '海外就職の準備に役立つ5つのワークに取り組みましょう。入力データはブラウザに自動保存されます。CSV形式でのダウンロードやアップロードもいつでも可能です。',
      visaMemo: {
        title: 'ワーク1：行きたい国のビザ調査メモ',
        description: '気になる国のビザ要件を調べて、一覧に整理しましょう。',
      },
      starTime: {
        title: 'ワーク2：STAR式キャリア年表',
        description: 'STAR形式で、これまでの仕事の実績を時系列で書き出しましょう。',
      },
      starQuestions: {
        title: 'ワーク3：STAR式 面接質問の準備',
        description: 'よくある行動面接の質問に対して、STAR形式で回答を準備しましょう。',
      },
      listDashboard: {
        title: 'ワーク4：LIST式 週間活動ボード',
        description: '毎週の求職活動や人脈づくりの進み具合を記録しましょう。',
      },
      listFunnel: {
        title: 'ワーク5：LIST式 選考パイプライン',
        description: '応募から内定まで、選考の進捗を一元管理しましょう。',
      },
    },
    resources: {
      title: '資料集',
      description: '各ワークの印刷用PDFをダウンロードできます。',
      downloadPdf: 'PDFをダウンロード',
      downloadAll: 'すべてダウンロード',
    },
    common: {
      addRow: '行を追加',
      deleteRow: '削除',
      exportCsv: 'CSV書き出し',
      importCsv: 'CSV読み込み',
      downloadPdf: 'PDFをダウンロード',
      dataTooltip: 'CSVでダウンロードしてGoogleスプレッドシートに貼り付けたり、PDFで印刷したりできます。',
      saved: '保存しました',
      saving: '保存中...',
      noData: 'まだデータがありません。「行を追加」で始めましょう。',
      confirmDelete: 'この行を削除しますか？',
      importSuccess: 'CSVデータを読み込みました。',
      importError: '読み込みに失敗しました。CSVファイルの形式をご確認ください。',
      backToExercises: 'ワーク一覧に戻る',
      footer: '© 2026 Aaron Hsieh. All rights reserved.',
    },
  },
  ko: {
    site: {
      title: 'Aaron Hsieh - 평범한 사람의 해외 취업 가이드',
      description: '커리어 코치 Aaron Hsieh의 해외 취업·해외 커리어 실전 가이드. 국제 커리어 구축부터 해외 구직 노하우까지 한 권에 담았습니다.',
    },
    nav: {
      brand: '평범한 사람의 해외 취업 가이드',
      home: '소개',
      exercises: '실습',
      resources: '자료실',
      coffeechat: '커피챗',
    },
    landing: {
      heroTitle: 'Aaron Hsieh',
      heroSubtitle: '엔지니어링 매니저 @Datadog / 전 테크리드 @Meta / 초기 엔지니어 @Beamery🦄 / 저자 / 커리어 코치',
      bioTitle: '저자 소개',
      bio: `지난 12년간 대만, 영국, 미국 세 대륙을 넘나들며 커리어를 쌓아왔습니다. 유니콘 기업 Beamery의 초기 엔지니어로 시작해 Meta의 테크리드를 거쳐 현재 Datadog에서 엔지니어링 매니저로 일하고 있습니다. 비자 문제, 문화 차이, 낯선 땅에서 처음부터 커리어를 만들어가는 과정을 모두 겪었습니다. 그 경험을 한 권에 담았습니다. 해외에서 일하고 싶은 모든 분께 드리는 실전 가이드입니다.`,
      bookTitle: '책 소개',
      bookDescription: '평범한 사람의 해외 취업 가이드는 비자 전략, 이력서 작성법, 면접 준비, 커리어 설계까지 해외 취업에 필요한 모든 것을 담은 실전 안내서입니다.',
      ctaTitle: '실전 워크북',
      ctaDescription: '5가지 커리어 실습을 온라인으로 진행할 수 있습니다. 작성한 내용은 브라우저에 자동 저장됩니다.',
      ctaButton: '실습 시작하기',
    },
    exercises: {
      title: '커리어 실습',
      description: '해외 취업 준비에 도움이 되는 5가지 실습을 진행해 보세요. 데이터는 브라우저에 자동 저장되며, CSV로 다운로드하거나 업로드할 수 있습니다.',
      visaMemo: {
        title: '실습 1: 희망 국가 비자 메모',
        description: '가고 싶은 나라의 비자 요건을 조사하고 한눈에 정리해 보세요.',
      },
      starTime: {
        title: '실습 2: STAR 스토리북 (시간순)',
        description: 'STAR 기법으로 지금까지의 커리어 경험을 시간순으로 정리해 보세요.',
      },
      starQuestions: {
        title: '실습 3: STAR 스토리북 (질문 기반)',
        description: '행동 면접 질문에 맞는 STAR 스토리를 미리 준비해 보세요.',
      },
      listDashboard: {
        title: '실습 4: LIST 원칙 대시보드',
        description: '매주 구직 활동과 네트워킹 현황을 기록하고 점검해 보세요.',
      },
      listFunnel: {
        title: '실습 5: LIST 원칙 퍼널',
        description: '지원부터 최종 합격까지, 채용 파이프라인을 한눈에 관리해 보세요.',
      },
    },
    resources: {
      title: '자료실',
      description: '각 실습의 인쇄용 PDF 버전을 다운로드할 수 있습니다.',
      downloadPdf: 'PDF 다운로드',
      downloadAll: '전체 실습 다운로드',
    },
    common: {
      addRow: '행 추가',
      deleteRow: '삭제',
      exportCsv: 'CSV 내보내기',
      importCsv: 'CSV 가져오기',
      downloadPdf: 'PDF 다운로드',
      dataTooltip: 'CSV로 다운로드해서 Google 스프레드시트에 붙여넣거나, PDF로 인쇄할 수 있습니다.',
      saved: '저장 완료',
      saving: '저장 중...',
      noData: '아직 데이터가 없습니다. 행 추가를 눌러 시작해 보세요.',
      confirmDelete: '이 행을 삭제하시겠습니까?',
      importSuccess: 'CSV 데이터를 성공적으로 가져왔습니다.',
      importError: '가져오기에 실패했습니다. CSV 파일 형식을 확인해 주세요.',
      backToExercises: '실습 목록으로',
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
  if (langSegment === 'ko') return 'ko';
  return 'en';
}

export function getLocalizedPath(path: string, lang: Lang): string {
  return `/${lang}${path}`;
}
