import { InteractiveTable, type Column } from '../InteractiveTable';
import type { Lang } from '../../i18n/translations';

interface VisaMemoRow {
  country: string;
  visaType: string;
  requirements: string;
  duration: string;
  notes: string;
}

const STORAGE_KEY = 'exercise-visa-memo';

const columnLabels: Record<Lang, Record<keyof VisaMemoRow, { label: string; placeholder: string }>> = {
  en: {
    country: { label: 'Country', placeholder: 'e.g. United States' },
    visaType: { label: 'Visa Type', placeholder: 'e.g. H-1B' },
    requirements: { label: 'Requirements', placeholder: 'Visa requirements and conditions' },
    duration: { label: 'Duration', placeholder: 'e.g. 3 years' },
    notes: { label: 'Notes', placeholder: 'Additional notes' },
  },
  'zh-tw': {
    country: { label: '國家', placeholder: '例如：美國' },
    visaType: { label: '簽證類型', placeholder: '例如：H-1B' },
    requirements: { label: '要求', placeholder: '簽證要求與條件' },
    duration: { label: '期限', placeholder: '例如：3 年' },
    notes: { label: '備註', placeholder: '額外備註' },
  },
  ja: {
    country: { label: '国', placeholder: '例：アメリカ' },
    visaType: { label: 'ビザ種類', placeholder: '例：H-1B' },
    requirements: { label: '要件', placeholder: 'ビザの要件と条件' },
    duration: { label: '期間', placeholder: '例：3年' },
    notes: { label: '備考', placeholder: '追加メモ' },
  },
};

function getColumns(lang: Lang): Column<VisaMemoRow>[] {
  const labels = columnLabels[lang];
  return [
    { key: 'country', label: labels.country.label, type: 'text', placeholder: labels.country.placeholder, width: '140px' },
    { key: 'visaType', label: labels.visaType.label, type: 'text', placeholder: labels.visaType.placeholder, width: '120px' },
    { key: 'requirements', label: labels.requirements.label, type: 'textarea', placeholder: labels.requirements.placeholder, width: '220px' },
    { key: 'duration', label: labels.duration.label, type: 'text', placeholder: labels.duration.placeholder, width: '100px' },
    { key: 'notes', label: labels.notes.label, type: 'textarea', placeholder: labels.notes.placeholder, width: '200px' },
  ];
}

function defaultRow(): VisaMemoRow {
  return {
    country: '',
    visaType: '',
    requirements: '',
    duration: '',
    notes: '',
  };
}

const sampleRow: Record<Lang, VisaMemoRow[]> = {
  en: [{
    country: 'United States',
    visaType: 'H-1B',
    requirements: 'Bachelor\'s degree or equivalent, employer sponsorship, specialty occupation',
    duration: '3 years (renewable to 6)',
    notes: 'Lottery-based, apply in March. Consider L-1 or O-1 as alternatives.',
  }],
  'zh-tw': [{
    country: '美國',
    visaType: 'H-1B',
    requirements: '學士學位或同等學歷、雇主擔保、專業職業',
    duration: '3 年（可續至 6 年）',
    notes: '抽籤制，三月申請。可考慮 L-1 或 O-1 作為替代方案。',
  }],
  ja: [{
    country: 'アメリカ',
    visaType: 'H-1B',
    requirements: '学士号または同等の学位、雇用主スポンサー、専門職',
    duration: '3年（最大6年まで更新可）',
    notes: '抽選制、3月に申請。L-1やO-1も代替として検討。',
  }],
};

export default function VisaMemo({ lang }: { lang: Lang }) {
  return (
    <InteractiveTable<VisaMemoRow>
      storageKey={STORAGE_KEY}
      columns={getColumns(lang)}
      defaultRow={defaultRow}
      lang={lang}
      initialData={sampleRow[lang]}
    />
  );
}
