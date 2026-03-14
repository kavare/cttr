import { InteractiveTable, type Column } from '../InteractiveTable';
import type { Lang } from '../../i18n/translations';

interface StarQuestionsRow {
  question: string;
  relatedStory: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  retro: string;
}

const STORAGE_KEY = 'exercise-star-questions';

const columnLabels: Record<Lang, Record<keyof StarQuestionsRow, string>> = {
  en: {
    question: 'Behavioral Question',
    relatedStory: 'Related Story',
    situation: 'Situation',
    task: 'Task',
    action: 'Action',
    result: 'Result',
    retro: 'Retro',
  },
  'zh-tw': {
    question: '行為面試問題',
    relatedStory: '相關故事',
    situation: '情境',
    task: '任務',
    action: '行動',
    result: '結果',
    retro: '回顧',
  },
  ja: {
    question: '行動面接の質問',
    relatedStory: '関連ストーリー',
    situation: '状況',
    task: '課題',
    action: '行動',
    result: '結果',
    retro: '振り返り',
  },
};

function getColumns(lang: Lang): Column<StarQuestionsRow>[] {
  const labels = columnLabels[lang];
  return [
    { key: 'question', label: labels.question, type: 'text', width: '220px' },
    { key: 'relatedStory', label: labels.relatedStory, type: 'text', width: '160px' },
    { key: 'situation', label: labels.situation, type: 'textarea', width: '180px' },
    { key: 'task', label: labels.task, type: 'textarea', width: '180px' },
    { key: 'action', label: labels.action, type: 'textarea', width: '180px' },
    { key: 'result', label: labels.result, type: 'textarea', width: '180px' },
    { key: 'retro', label: labels.retro, type: 'textarea', width: '180px' },
  ];
}

function defaultRow(): StarQuestionsRow {
  return {
    question: '',
    relatedStory: '',
    situation: '',
    task: '',
    action: '',
    result: '',
    retro: '',
  };
}

const initialQuestions: Record<Lang, string[]> = {
  en: [
    'Tell me about a time you led a team through a difficult project',
    'Describe a situation where you had to resolve a conflict',
    'Give an example of a time you failed and what you learned',
    'Tell me about a time you had to make a decision with incomplete information',
    'Describe a situation where you went above and beyond',
    'Tell me about a time you disagreed with your manager',
    'Give an example of how you handled a tight deadline',
    'Describe a time you had to influence others without authority',
    'Tell me about your most challenging technical problem',
    'Describe a situation where you had to adapt to change quickly',
    'Give an example of how you prioritized competing demands',
    'Tell me about a time you mentored someone',
  ],
  'zh-tw': [
    '請告訴我一次你帶領團隊完成困難專案的經歷',
    '描述一個你必須解決衝突的情境',
    '舉一個你失敗並從中學到教訓的例子',
    '告訴我一次你在資訊不完整的情況下做決策的經歷',
    '描述一個你超越期望、做出額外貢獻的情境',
    '告訴我一次你與主管意見不同的經歷',
    '舉一個你如何應對緊迫期限的例子',
    '描述一次你在沒有直接權力的情況下影響他人的經歷',
    '告訴我你遇過最具挑戰性的技術問題',
    '描述一個你必須快速適應變化的情境',
    '舉一個你如何排定多個競爭需求優先順序的例子',
    '告訴我一次你指導他人的經歷',
  ],
  ja: [
    '困難なプロジェクトでチームをリードした経験を教えてください',
    '対立を解決しなければならなかった状況を説明してください',
    '失敗してそこから学んだ経験の例を挙げてください',
    '不完全な情報で意思決定をしなければならなかった経験を教えてください',
    '期待以上の成果を出した状況を説明してください',
    '上司と意見が合わなかった経験を教えてください',
    '厳しい締め切りにどう対処したか、例を挙げてください',
    '権限なしに他者に影響を与えなければならなかった経験を説明してください',
    '最も困難だった技術的問題について教えてください',
    '変化に素早く適応しなければならなかった状況を説明してください',
    '競合する要求の優先順位をどう決めたか、例を挙げてください',
    '誰かをメンタリングした経験を教えてください',
  ],
};

function getInitialData(lang: Lang): StarQuestionsRow[] {
  return initialQuestions[lang].map((question) => ({
    ...defaultRow(),
    question,
  }));
}

interface Props {
  lang: Lang;
}

export default function StarQuestions({ lang }: Props) {
  return (
    <InteractiveTable<StarQuestionsRow>
      storageKey={STORAGE_KEY}
      columns={getColumns(lang)}
      defaultRow={defaultRow}
      lang={lang}
      initialData={getInitialData(lang)}
    />
  );
}
