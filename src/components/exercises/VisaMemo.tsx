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

function getColumns(lang: Lang): Column<VisaMemoRow>[] {
  const isZh = lang === 'zh-tw';
  return [
    {
      key: 'country',
      label: isZh ? '國家' : 'Country',
      type: 'text',
      placeholder: isZh ? '例如：美國' : 'e.g. United States',
      width: '140px',
    },
    {
      key: 'visaType',
      label: isZh ? '簽證類型' : 'Visa Type',
      type: 'text',
      placeholder: isZh ? '例如：H-1B' : 'e.g. H-1B',
      width: '120px',
    },
    {
      key: 'requirements',
      label: isZh ? '要求' : 'Requirements',
      type: 'textarea',
      placeholder: isZh ? '簽證要求與條件' : 'Visa requirements and conditions',
      width: '220px',
    },
    {
      key: 'duration',
      label: isZh ? '期限' : 'Duration',
      type: 'text',
      placeholder: isZh ? '例如：3 年' : 'e.g. 3 years',
      width: '100px',
    },
    {
      key: 'notes',
      label: isZh ? '備註' : 'Notes',
      type: 'textarea',
      placeholder: isZh ? '額外備註' : 'Additional notes',
      width: '200px',
    },
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

export default function VisaMemo({ lang }: { lang: Lang }) {
  return (
    <InteractiveTable<VisaMemoRow>
      storageKey={STORAGE_KEY}
      columns={getColumns(lang)}
      defaultRow={defaultRow}
      lang={lang}
    />
  );
}
