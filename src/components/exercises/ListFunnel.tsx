import { InteractiveTable, type Column } from '../InteractiveTable';
import type { Lang } from '../../i18n/translations';
import type { ReactNode } from 'react';

interface ListFunnelRow {
  companyName: string;
  title: string;
  channel: string;
  location: string;
  nextDate: string;
  pipelineStep: string;
}

const STORAGE_KEY = 'exercise-list-funnel';

const PIPELINE_STEPS_EN = [
  'Submit',
  'Info Session',
  'Online Judge',
  'Phone Interview',
  'Onsite',
  'Oral Offer',
  'Offer Negotiation',
];

const PIPELINE_STEPS_ZH: Record<string, string> = {
  'Submit': '投遞',
  'Info Session': '說明會',
  'Online Judge': '線上測驗',
  'Phone Interview': '電話面試',
  'Onsite': '現場面試',
  'Oral Offer': '口頭錄取',
  'Offer Negotiation': '薪資談判',
};

const PIPELINE_STEPS_JA: Record<string, string> = {
  'Submit': '応募済み',
  'Info Session': '説明会',
  'Online Judge': 'コーディング試験',
  'Phone Interview': '電話面接',
  'Onsite': '最終面接',
  'Oral Offer': '内定',
  'Offer Negotiation': '条件交渉',
};

const PIPELINE_STEPS_KO: Record<string, string> = {
  'Submit': '지원 완료',
  'Info Session': '설명회',
  'Online Judge': '온라인 코딩 테스트',
  'Phone Interview': '전화 면접',
  'Onsite': '현장 면접',
  'Oral Offer': '구두 합격',
  'Offer Negotiation': '처우 협상',
};

const STEP_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Submit':            { bg: 'bg-gray-100',    text: 'text-gray-700',    border: 'border-gray-300' },
  'Info Session':      { bg: 'bg-blue-100',    text: 'text-blue-700',    border: 'border-blue-300' },
  'Online Judge':      { bg: 'bg-indigo-100',  text: 'text-indigo-700',  border: 'border-indigo-300' },
  'Phone Interview':   { bg: 'bg-purple-100',  text: 'text-purple-700',  border: 'border-purple-300' },
  'Onsite':            { bg: 'bg-orange-100',  text: 'text-orange-700',  border: 'border-orange-300' },
  'Oral Offer':        { bg: 'bg-teal-100',    text: 'text-teal-700',    border: 'border-teal-300' },
  'Offer Negotiation': { bg: 'bg-green-100',   text: 'text-green-700',   border: 'border-green-300' },
};

const funnelLabels: Record<Lang, Record<keyof ListFunnelRow, { label: string; placeholder: string }>> = {
  en: {
    companyName: { label: 'Company Name', placeholder: 'e.g. Google' },
    title: { label: 'Title', placeholder: 'e.g. Software Engineer' },
    channel: { label: 'Channel', placeholder: 'e.g. LinkedIn' },
    location: { label: 'Location', placeholder: 'e.g. San Francisco' },
    nextDate: { label: 'Next Date', placeholder: 'e.g. 2025-02-15' },
    pipelineStep: { label: 'Pipeline Step', placeholder: '' },
  },
  'zh-tw': {
    companyName: { label: '公司名稱', placeholder: '例如：Google' },
    title: { label: '職稱', placeholder: '例如：軟體工程師' },
    channel: { label: '管道', placeholder: '例如：LinkedIn' },
    location: { label: '地點', placeholder: '例如：舊金山' },
    nextDate: { label: '下一個日期', placeholder: '例如：2025-02-15' },
    pipelineStep: { label: '管道階段', placeholder: '' },
  },
  ja: {
    companyName: { label: '会社名', placeholder: '例：Google' },
    title: { label: '職種', placeholder: '例：ソフトウェアエンジニア' },
    channel: { label: '応募経路', placeholder: '例：LinkedIn' },
    location: { label: '勤務地', placeholder: '例：東京' },
    nextDate: { label: '次のアクション日', placeholder: '例：2025-02-15' },
    pipelineStep: { label: '選考状況', placeholder: '' },
  },
  ko: {
    companyName: { label: '회사명', placeholder: '예: Google' },
    title: { label: '직무', placeholder: '예: 소프트웨어 엔지니어' },
    channel: { label: '지원 경로', placeholder: '예: LinkedIn' },
    location: { label: '근무지', placeholder: '예: 런던' },
    nextDate: { label: '다음 일정', placeholder: '예: 2025-02-15' },
    pipelineStep: { label: '전형 단계', placeholder: '' },
  },
};

function getColumns(lang: Lang): Column<ListFunnelRow>[] {
  const labels = funnelLabels[lang];
  return [
    { key: 'companyName', label: labels.companyName.label, type: 'text', placeholder: labels.companyName.placeholder, width: '140px' },
    { key: 'title', label: labels.title.label, type: 'text', placeholder: labels.title.placeholder, width: '150px' },
    { key: 'channel', label: labels.channel.label, type: 'text', placeholder: labels.channel.placeholder, width: '120px' },
    { key: 'location', label: labels.location.label, type: 'text', placeholder: labels.location.placeholder, width: '120px' },
    { key: 'nextDate', label: labels.nextDate.label, type: 'text', placeholder: labels.nextDate.placeholder, width: '120px' },
    { key: 'pipelineStep', label: labels.pipelineStep.label, type: 'select', options: PIPELINE_STEPS_EN, width: '280px' },
  ];
}

function defaultRow(): ListFunnelRow {
  return {
    companyName: '',
    title: '',
    channel: '',
    location: '',
    nextDate: '',
    pipelineStep: '',
  };
}

const PIPELINE_STEPS_LOCALIZED: Record<Lang, Record<string, string>> = {
  en: Object.fromEntries(PIPELINE_STEPS_EN.map((s) => [s, s])),
  'zh-tw': PIPELINE_STEPS_ZH,
  ja: PIPELINE_STEPS_JA,
  ko: PIPELINE_STEPS_KO,
};

function PipelineIndicator({ step, lang }: { step: string; lang: Lang }) {
  if (!step) return null;

  const currentIndex = PIPELINE_STEPS_EN.indexOf(step);
  if (currentIndex === -1) return null;

  const colors = STEP_COLORS[step] || STEP_COLORS['Submit'];
  const localizedSteps = PIPELINE_STEPS_LOCALIZED[lang];
  const displayLabel = localizedSteps[step] || step;

  return (
    <div className="space-y-1.5">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
      >
        {displayLabel}
      </span>
      <div className="flex gap-0.5">
        {PIPELINE_STEPS_EN.map((s, idx) => {
          const stepColor = STEP_COLORS[s];
          const isActive = idx <= currentIndex;
          return (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                isActive ? stepColor.bg.replace('100', '400') : 'bg-gray-200'
              }`}
              style={
                isActive
                  ? {
                      backgroundColor:
                        idx === 0 ? '#9ca3af' :
                        idx === 1 ? '#60a5fa' :
                        idx === 2 ? '#818cf8' :
                        idx === 3 ? '#a78bfa' :
                        idx === 4 ? '#fb923c' :
                        idx === 5 ? '#2dd4bf' :
                        '#4ade80',
                    }
                  : undefined
              }
              title={localizedSteps[s] || s}
            />
          );
        })}
      </div>
    </div>
  );
}

const sampleRow: Record<Lang, ListFunnelRow[]> = {
  en: [{
    companyName: 'Google',
    title: 'Senior Software Engineer',
    channel: 'LinkedIn',
    location: 'London, UK',
    nextDate: '2025-02-15',
    pipelineStep: 'Phone Interview',
  }],
  'zh-tw': [{
    companyName: 'Google',
    title: '資深軟體工程師',
    channel: 'LinkedIn',
    location: '倫敦',
    nextDate: '2025-02-15',
    pipelineStep: 'Phone Interview',
  }],
  ja: [{
    companyName: 'Google',
    title: 'シニアソフトウェアエンジニア',
    channel: 'LinkedIn',
    location: 'ロンドン',
    nextDate: '2025-02-15',
    pipelineStep: 'Phone Interview',
  }],
  ko: [{
    companyName: 'Google',
    title: '시니어 소프트웨어 엔지니어',
    channel: 'LinkedIn',
    location: '런던',
    nextDate: '2025-02-15',
    pipelineStep: 'Phone Interview',
  }],
};

export default function ListFunnel({ lang }: { lang: Lang }) {
  const localizedSteps = PIPELINE_STEPS_LOCALIZED[lang];

  const renderCell = (
    row: ListFunnelRow,
    col: Column<ListFunnelRow>,
    onChange: (key: keyof ListFunnelRow & string, value: string) => void
  ): ReactNode | null => {
    if (col.key !== 'pipelineStep') return null;

    const options = PIPELINE_STEPS_EN.map((s) => ({ value: s, label: localizedSteps[s] || s }));

    return (
      <div className="space-y-2">
        <select
          value={String(row.pipelineStep ?? '')}
          onChange={(e) => onChange('pipelineStep', e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
        >
          <option value="">選択してください</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <PipelineIndicator step={row.pipelineStep} lang={lang} />
      </div>
    );
  };

  return (
    <InteractiveTable<ListFunnelRow>
      storageKey={`${STORAGE_KEY}-${lang}`}
      columns={getColumns(lang)}
      defaultRow={defaultRow}
      lang={lang}
      initialData={sampleRow[lang]}
      renderCell={renderCell}
    />
  );
}
