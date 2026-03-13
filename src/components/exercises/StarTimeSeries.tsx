import { InteractiveTable, type Column } from '../InteractiveTable';
import type { Lang } from '../../i18n/translations';

interface StarTimeRow {
  timePeriod: string;
  projectName: string;
  role: string;
  storyType: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  challenges: string;
  learnings: string;
  retro: string;
}

const STORAGE_KEY = 'exercise-star-time';

const storyTypeOptions: Record<Lang, string[]> = {
  en: ['Leadership', 'Technical', 'Conflict', 'Failure', 'Achievement', 'Teamwork'],
  'zh-tw': ['Leadership', 'Technical', 'Conflict', 'Failure', 'Achievement', 'Teamwork'],
};

const columnLabels: Record<Lang, Record<keyof StarTimeRow, string>> = {
  en: {
    timePeriod: 'Time Period / Date',
    projectName: 'Project Name',
    role: 'Role',
    storyType: 'Story Type',
    situation: 'Situation',
    task: 'Task',
    action: 'Action',
    result: 'Result',
    challenges: 'Challenges',
    learnings: 'Learnings',
    retro: 'Retro',
  },
  'zh-tw': {
    timePeriod: '時間 / 日期',
    projectName: '專案名稱',
    role: '角色',
    storyType: '故事類型',
    situation: '情境',
    task: '任務',
    action: '行動',
    result: '結果',
    challenges: '挑戰',
    learnings: '學習',
    retro: '回顧',
  },
};

function getColumns(lang: Lang): Column<StarTimeRow>[] {
  const labels = columnLabels[lang];
  return [
    { key: 'timePeriod', label: labels.timePeriod, type: 'text', width: '120px' },
    { key: 'projectName', label: labels.projectName, type: 'text', width: '140px' },
    { key: 'role', label: labels.role, type: 'text', width: '120px' },
    { key: 'storyType', label: labels.storyType, type: 'select', options: storyTypeOptions[lang], width: '130px' },
    { key: 'situation', label: labels.situation, type: 'textarea', width: '180px' },
    { key: 'task', label: labels.task, type: 'textarea', width: '180px' },
    { key: 'action', label: labels.action, type: 'textarea', width: '180px' },
    { key: 'result', label: labels.result, type: 'textarea', width: '180px' },
    { key: 'challenges', label: labels.challenges, type: 'textarea', width: '180px' },
    { key: 'learnings', label: labels.learnings, type: 'textarea', width: '180px' },
    { key: 'retro', label: labels.retro, type: 'textarea', width: '180px' },
  ];
}

function defaultRow(): StarTimeRow {
  return {
    timePeriod: '',
    projectName: '',
    role: '',
    storyType: '',
    situation: '',
    task: '',
    action: '',
    result: '',
    challenges: '',
    learnings: '',
    retro: '',
  };
}

interface Props {
  lang: Lang;
}

export default function StarTimeSeries({ lang }: Props) {
  return (
    <InteractiveTable<StarTimeRow>
      storageKey={STORAGE_KEY}
      columns={getColumns(lang)}
      defaultRow={defaultRow}
      lang={lang}
    />
  );
}
