import { InteractiveTable, type Column } from '../InteractiveTable';
import type { Lang } from '../../i18n/translations';

interface ListDashboardRow {
  week: string;
  date: string;
  location: string;
  connections: string;
  profileViews: string;
  searches: string;
  emailsSent: string;
  inMailsSent: string;
  phoneCalls: string;
  keywords: string;
  notes: string;
}

const STORAGE_KEY = 'exercise-list-dashboard';

const columnLabels: Record<Lang, Record<keyof ListDashboardRow, { label: string; placeholder: string }>> = {
  en: {
    week: { label: 'Week', placeholder: 'e.g. Week 1' },
    date: { label: 'Date', placeholder: 'e.g. 2025-01-06' },
    location: { label: 'Location', placeholder: 'e.g. San Francisco' },
    connections: { label: 'Connections', placeholder: 'e.g. 5' },
    profileViews: { label: 'Profile Views', placeholder: 'e.g. 20' },
    searches: { label: 'Searches', placeholder: 'e.g. 10' },
    emailsSent: { label: 'Emails Sent', placeholder: 'e.g. 8' },
    inMailsSent: { label: 'InMails Sent', placeholder: 'e.g. 3' },
    phoneCalls: { label: 'Phone Calls', placeholder: 'e.g. 2' },
    keywords: { label: 'Keywords', placeholder: 'e.g. Frontend, React' },
    notes: { label: 'Notes', placeholder: 'Weekly notes' },
  },
  'zh-tw': {
    week: { label: '週次', placeholder: '例如：第 1 週' },
    date: { label: '日期', placeholder: '例如：2025-01-06' },
    location: { label: '地點', placeholder: '例如：台北' },
    connections: { label: '人脈連結', placeholder: '例如：5' },
    profileViews: { label: '檔案瀏覽', placeholder: '例如：20' },
    searches: { label: '搜尋次數', placeholder: '例如：10' },
    emailsSent: { label: '寄出郵件', placeholder: '例如：8' },
    inMailsSent: { label: 'InMail 寄出', placeholder: '例如：3' },
    phoneCalls: { label: '電話通話', placeholder: '例如：2' },
    keywords: { label: '關鍵字', placeholder: '例如：前端、React' },
    notes: { label: '備註', placeholder: '本週備註' },
  },
  ja: {
    week: { label: '週', placeholder: '例：第1週' },
    date: { label: '日付', placeholder: '例：2025-01-06' },
    location: { label: '場所', placeholder: '例：東京' },
    connections: { label: 'コネクション', placeholder: '例：5' },
    profileViews: { label: 'プロフィール閲覧', placeholder: '例：20' },
    searches: { label: '検索回数', placeholder: '例：10' },
    emailsSent: { label: '送信メール', placeholder: '例：8' },
    inMailsSent: { label: 'InMail送信', placeholder: '例：3' },
    phoneCalls: { label: '電話', placeholder: '例：2' },
    keywords: { label: 'キーワード', placeholder: '例：フロントエンド、React' },
    notes: { label: '備考', placeholder: '今週のメモ' },
  },
};

function getColumns(lang: Lang): Column<ListDashboardRow>[] {
  const labels = columnLabels[lang];
  return [
    { key: 'week', label: labels.week.label, type: 'text', placeholder: labels.week.placeholder, width: '100px' },
    { key: 'date', label: labels.date.label, type: 'text', placeholder: labels.date.placeholder, width: '120px' },
    { key: 'location', label: labels.location.label, type: 'text', placeholder: labels.location.placeholder, width: '120px' },
    { key: 'connections', label: labels.connections.label, type: 'text', placeholder: labels.connections.placeholder, width: '100px' },
    { key: 'profileViews', label: labels.profileViews.label, type: 'text', placeholder: labels.profileViews.placeholder, width: '110px' },
    { key: 'searches', label: labels.searches.label, type: 'text', placeholder: labels.searches.placeholder, width: '100px' },
    { key: 'emailsSent', label: labels.emailsSent.label, type: 'text', placeholder: labels.emailsSent.placeholder, width: '100px' },
    { key: 'inMailsSent', label: labels.inMailsSent.label, type: 'text', placeholder: labels.inMailsSent.placeholder, width: '110px' },
    { key: 'phoneCalls', label: labels.phoneCalls.label, type: 'text', placeholder: labels.phoneCalls.placeholder, width: '100px' },
    { key: 'keywords', label: labels.keywords.label, type: 'text', placeholder: labels.keywords.placeholder, width: '140px' },
    { key: 'notes', label: labels.notes.label, type: 'textarea', placeholder: labels.notes.placeholder, width: '200px' },
  ];
}

function defaultRow(): ListDashboardRow {
  return {
    week: '',
    date: '',
    location: '',
    connections: '',
    profileViews: '',
    searches: '',
    emailsSent: '',
    inMailsSent: '',
    phoneCalls: '',
    keywords: '',
    notes: '',
  };
}

const sampleRow: Record<Lang, ListDashboardRow[]> = {
  en: [{
    week: 'Week 1',
    date: '2025-01-06',
    location: 'San Francisco',
    connections: '12',
    profileViews: '45',
    searches: '8',
    emailsSent: '5',
    inMailsSent: '3',
    phoneCalls: '2',
    keywords: 'Frontend, React, Senior Engineer',
    notes: 'Connected with 2 recruiters at target companies. Follow up next week.',
  }],
  'zh-tw': [{
    week: '第 1 週',
    date: '2025-01-06',
    location: '台北',
    connections: '12',
    profileViews: '45',
    searches: '8',
    emailsSent: '5',
    inMailsSent: '3',
    phoneCalls: '2',
    keywords: '前端、React、資深工程師',
    notes: '與 2 位目標公司的招募人員建立聯繫，下週追蹤。',
  }],
  ja: [{
    week: '第1週',
    date: '2025-01-06',
    location: '東京',
    connections: '12',
    profileViews: '45',
    searches: '8',
    emailsSent: '5',
    inMailsSent: '3',
    phoneCalls: '2',
    keywords: 'フロントエンド、React、シニアエンジニア',
    notes: 'ターゲット企業のリクルーター2名とつながった。来週フォローアップ。',
  }],
};

export default function ListDashboard({ lang }: { lang: Lang }) {
  return (
    <InteractiveTable<ListDashboardRow>
      storageKey={STORAGE_KEY}
      columns={getColumns(lang)}
      defaultRow={defaultRow}
      lang={lang}
      initialData={sampleRow[lang]}
    />
  );
}
