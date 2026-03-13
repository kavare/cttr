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

function getColumns(lang: Lang): Column<ListDashboardRow>[] {
  const isZh = lang === 'zh-tw';
  return [
    {
      key: 'week',
      label: isZh ? '週次' : 'Week',
      type: 'text',
      placeholder: isZh ? '例如：第 1 週' : 'e.g. Week 1',
      width: '100px',
    },
    {
      key: 'date',
      label: isZh ? '日期' : 'Date',
      type: 'text',
      placeholder: isZh ? '例如：2025-01-06' : 'e.g. 2025-01-06',
      width: '120px',
    },
    {
      key: 'location',
      label: isZh ? '地點' : 'Location',
      type: 'text',
      placeholder: isZh ? '例如：台北' : 'e.g. San Francisco',
      width: '120px',
    },
    {
      key: 'connections',
      label: isZh ? '人脈連結' : 'Connections',
      type: 'text',
      placeholder: isZh ? '例如：5' : 'e.g. 5',
      width: '100px',
    },
    {
      key: 'profileViews',
      label: isZh ? '檔案瀏覽' : 'Profile Views',
      type: 'text',
      placeholder: isZh ? '例如：20' : 'e.g. 20',
      width: '110px',
    },
    {
      key: 'searches',
      label: isZh ? '搜尋次數' : 'Searches',
      type: 'text',
      placeholder: isZh ? '例如：10' : 'e.g. 10',
      width: '100px',
    },
    {
      key: 'emailsSent',
      label: isZh ? '寄出郵件' : 'Emails Sent',
      type: 'text',
      placeholder: isZh ? '例如：8' : 'e.g. 8',
      width: '100px',
    },
    {
      key: 'inMailsSent',
      label: isZh ? 'InMail 寄出' : 'InMails Sent',
      type: 'text',
      placeholder: isZh ? '例如：3' : 'e.g. 3',
      width: '110px',
    },
    {
      key: 'phoneCalls',
      label: isZh ? '電話通話' : 'Phone Calls',
      type: 'text',
      placeholder: isZh ? '例如：2' : 'e.g. 2',
      width: '100px',
    },
    {
      key: 'keywords',
      label: isZh ? '關鍵字' : 'Keywords',
      type: 'text',
      placeholder: isZh ? '例如：前端、React' : 'e.g. Frontend, React',
      width: '140px',
    },
    {
      key: 'notes',
      label: isZh ? '備註' : 'Notes',
      type: 'textarea',
      placeholder: isZh ? '本週備註' : 'Weekly notes',
      width: '200px',
    },
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

export default function ListDashboard({ lang }: { lang: Lang }) {
  return (
    <InteractiveTable<ListDashboardRow>
      storageKey={STORAGE_KEY}
      columns={getColumns(lang)}
      defaultRow={defaultRow}
      lang={lang}
    />
  );
}
