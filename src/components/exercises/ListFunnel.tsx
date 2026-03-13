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

const STEP_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Submit':            { bg: 'bg-gray-100',    text: 'text-gray-700',    border: 'border-gray-300' },
  'Info Session':      { bg: 'bg-blue-100',    text: 'text-blue-700',    border: 'border-blue-300' },
  'Online Judge':      { bg: 'bg-indigo-100',  text: 'text-indigo-700',  border: 'border-indigo-300' },
  'Phone Interview':   { bg: 'bg-purple-100',  text: 'text-purple-700',  border: 'border-purple-300' },
  'Onsite':            { bg: 'bg-orange-100',  text: 'text-orange-700',  border: 'border-orange-300' },
  'Oral Offer':        { bg: 'bg-teal-100',    text: 'text-teal-700',    border: 'border-teal-300' },
  'Offer Negotiation': { bg: 'bg-green-100',   text: 'text-green-700',   border: 'border-green-300' },
};

function getColumns(lang: Lang): Column<ListFunnelRow>[] {
  const isZh = lang === 'zh-tw';
  return [
    {
      key: 'companyName',
      label: isZh ? '公司名稱' : 'Company Name',
      type: 'text',
      placeholder: isZh ? '例如：Google' : 'e.g. Google',
      width: '140px',
    },
    {
      key: 'title',
      label: isZh ? '職稱' : 'Title',
      type: 'text',
      placeholder: isZh ? '例如：軟體工程師' : 'e.g. Software Engineer',
      width: '150px',
    },
    {
      key: 'channel',
      label: isZh ? '管道' : 'Channel',
      type: 'text',
      placeholder: isZh ? '例如：LinkedIn' : 'e.g. LinkedIn',
      width: '120px',
    },
    {
      key: 'location',
      label: isZh ? '地點' : 'Location',
      type: 'text',
      placeholder: isZh ? '例如：舊金山' : 'e.g. San Francisco',
      width: '120px',
    },
    {
      key: 'nextDate',
      label: isZh ? '下一個日期' : 'Next Date',
      type: 'text',
      placeholder: isZh ? '例如：2025-02-15' : 'e.g. 2025-02-15',
      width: '120px',
    },
    {
      key: 'pipelineStep',
      label: isZh ? '管道階段' : 'Pipeline Step',
      type: 'select',
      options: PIPELINE_STEPS_EN,
      width: '280px',
    },
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

function PipelineIndicator({ step, lang }: { step: string; lang: Lang }) {
  if (!step) return null;

  const isZh = lang === 'zh-tw';
  const currentIndex = PIPELINE_STEPS_EN.indexOf(step);
  if (currentIndex === -1) return null;

  const colors = STEP_COLORS[step] || STEP_COLORS['Submit'];
  const displayLabel = isZh ? PIPELINE_STEPS_ZH[step] || step : step;

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
              title={isZh ? PIPELINE_STEPS_ZH[s] : s}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function ListFunnel({ lang }: { lang: Lang }) {
  const isZh = lang === 'zh-tw';

  const renderCell = (
    row: ListFunnelRow,
    col: Column<ListFunnelRow>,
    onChange: (key: keyof ListFunnelRow & string, value: string) => void
  ): ReactNode | null => {
    if (col.key !== 'pipelineStep') return null;

    const options = isZh
      ? PIPELINE_STEPS_EN.map((s) => ({ value: s, label: PIPELINE_STEPS_ZH[s] || s }))
      : PIPELINE_STEPS_EN.map((s) => ({ value: s, label: s }));

    return (
      <div className="space-y-2">
        <select
          value={String(row.pipelineStep ?? '')}
          onChange={(e) => onChange('pipelineStep', e.target.value)}
          className="w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
        >
          <option value="">—</option>
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
      storageKey={STORAGE_KEY}
      columns={getColumns(lang)}
      defaultRow={defaultRow}
      lang={lang}
      renderCell={renderCell}
    />
  );
}
