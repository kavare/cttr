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
  ja: ['リーダーシップ', '技術', '対立の解決', '失敗と学び', '成果', 'チームワーク'],
  ko: ['리더십', '기술', '갈등 해결', '실패와 교훈', '성과', '팀워크'],
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
    timePeriod: '時期',
    projectName: 'プロジェクト名',
    role: '自分の役割',
    storyType: 'カテゴリ',
    situation: '当時の状況',
    task: '求められたこと',
    action: '自分がやったこと',
    result: '得られた成果',
    challenges: 'ぶつかった壁',
    learnings: 'そこから学んだこと',
    retro: '今ふり返って思うこと',
  },
  ko: {
    timePeriod: '시기',
    projectName: '프로젝트명',
    role: '역할',
    storyType: '스토리 유형',
    situation: '당시 상황',
    task: '맡은 과제',
    action: '내가 한 일',
    result: '얻은 성과',
    challenges: '겪었던 어려움',
    learnings: '배운 점',
    retro: '돌아보며 느낀 점',
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
    timePeriod: '2023年 4〜6月',
    projectName: '基盤システム移行',
    role: 'テックリード',
    storyType: '技術',
    situation: '旧システムが原因で、オンコール対応の30%が発生していた',
    task: '3ヶ月以内に主要サービスを新基盤へ移行する',
    action: '段階的な移行計画を立て、カナリアリリースを導入。毎週関係者と進捗を共有した',
    result: '予定通りに完了し、オンコール対応が60%減少した',
    challenges: '旧システムに慣れたチームメンバーの抵抗があった',
    learnings: '大きな移行では、関係者の早い段階での合意形成が何より大切',
    retro: 'ドキュメント整備はもっと早く着手すべきだった',
  }],
  ko: [{
    timePeriod: '2023년 2분기',
    projectName: '플랫폼 마이그레이션',
    role: '테크리드',
    storyType: '기술',
    situation: '레거시 시스템 때문에 온콜 장애의 30%가 발생하고 있었다',
    task: '3개월 안에 핵심 서비스를 새로운 플랫폼으로 이전하기',
    action: '마이그레이션을 단계별로 나누고 카나리 배포를 도입했다. 매주 이해관계자와 진행 상황을 공유했다',
    result: '일정 내에 완료했고, 온콜 장애가 60% 줄었다',
    challenges: '기존 시스템에 익숙한 팀원들의 저항이 있었다',
    learnings: '대규모 마이그레이션에서는 초기에 이해관계자의 동의를 얻는 게 핵심이다',
    retro: '문서 작업을 더 일찍 시작했어야 했다',
  }],
};

export default function StarTimeSeries({ lang }: Props) {
  return (
    <InteractiveTable<StarTimeRow>
      storageKey={`${STORAGE_KEY}-${lang}`}
      columns={getColumns(lang)}
      defaultRow={defaultRow}
      lang={lang}
      initialData={sampleRow[lang]}
    />
  );
}
