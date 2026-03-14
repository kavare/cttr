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
  ja: ['Leadership', 'Technical', 'Conflict', 'Failure', 'Achievement', 'Teamwork'],
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
  ja: {
    timePeriod: '期間 / 日付',
    projectName: 'プロジェクト名',
    role: '役割',
    storyType: 'ストーリータイプ',
    situation: '状況',
    task: '課題',
    action: '行動',
    result: '結果',
    challenges: '困難',
    learnings: '学び',
    retro: '振り返り',
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

const sampleRow: Record<Lang, StarTimeRow[]> = {
  en: [{
    timePeriod: '2023 Q2',
    projectName: 'Platform Migration',
    role: 'Tech Lead',
    storyType: 'Technical',
    situation: 'Legacy system was causing 30% of on-call incidents',
    task: 'Lead migration of core services to new platform within 3 months',
    action: 'Broke migration into phases, set up canary deployments, ran weekly syncs with stakeholders',
    result: 'Completed on time, on-call incidents dropped by 60%',
    challenges: 'Resistance from teams comfortable with old system',
    learnings: 'Early stakeholder buy-in is critical for large migrations',
    retro: 'Should have started documentation earlier',
  }],
  'zh-tw': [{
    timePeriod: '2023 Q2',
    projectName: '平台遷移',
    role: '技術主管',
    storyType: 'Technical',
    situation: '舊系統導致 30% 的 on-call 事故',
    task: '在 3 個月內主導核心服務遷移到新平台',
    action: '分階段遷移、設置灰度部署、每週與利害關係人同步進度',
    result: '準時完成，on-call 事故減少 60%',
    challenges: '部分團隊對舊系統有依賴感，抗拒改變',
    learnings: '大型遷移需要提早取得利害關係人的支持',
    retro: '文件應該更早開始撰寫',
  }],
  ja: [{
    timePeriod: '2023 Q2',
    projectName: 'プラットフォーム移行',
    role: 'テックリード',
    storyType: 'Technical',
    situation: 'レガシーシステムがオンコールインシデントの30%を引き起こしていた',
    task: '3ヶ月以内にコアサービスを新プラットフォームに移行',
    action: '段階的に移行、カナリアデプロイ設定、週次でステークホルダーと同期',
    result: '予定通り完了、オンコールインシデント60%減少',
    challenges: '旧システムに慣れたチームからの抵抗',
    learnings: '大規模移行にはステークホルダーの早期合意が重要',
    retro: 'ドキュメントはもっと早く始めるべきだった',
  }],
};

export default function StarTimeSeries({ lang }: Props) {
  return (
    <InteractiveTable<StarTimeRow>
      storageKey={STORAGE_KEY}
      columns={getColumns(lang)}
      defaultRow={defaultRow}
      lang={lang}
      initialData={sampleRow[lang]}
    />
  );
}
