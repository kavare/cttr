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
    question: '面接でよく聞かれる質問',
    relatedStory: '使えるエピソード',
    situation: '当時の状況',
    task: '求められたこと',
    action: '自分がやったこと',
    result: '得られた成果',
    retro: 'ふり返り',
  },
  ko: {
    question: '행동 면접 질문',
    relatedStory: '관련 스토리',
    situation: '당시 상황',
    task: '맡은 과제',
    action: '내가 한 일',
    result: '얻은 성과',
    retro: '돌아보기',
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
    '難しいプロジェクトでチームを引っ張った経験を教えてください',
    'メンバー同士の対立をどう解決しましたか？',
    '仕事で失敗した経験と、そこから何を学びましたか？',
    '情報が不十分な中で判断を下した経験を教えてください',
    '期待を超える成果を出した経験を聞かせてください',
    '上司と意見が食い違ったとき、どう対応しましたか？',
    'タイトな締め切りをどう乗り越えましたか？',
    '直接の権限がない相手をどう動かしましたか？',
    'これまでで一番難しかった技術的な課題は何ですか？',
    '急な変化にどう対応しましたか？',
    '複数のタスクが重なったとき、どう優先順位をつけましたか？',
    '後輩やメンバーを育てた経験を教えてください',
  ],
  ko: [
    '어려운 프로젝트에서 팀을 이끌었던 경험을 말씀해 주세요',
    '갈등 상황을 어떻게 해결했는지 설명해 주세요',
    '실패했던 경험과 거기서 배운 점을 이야기해 주세요',
    '정보가 부족한 상황에서 의사결정을 내려야 했던 적이 있나요',
    '기대 이상의 성과를 냈던 경험을 들려주세요',
    '상사와 의견이 달랐을 때 어떻게 대처했나요',
    '촉박한 마감 기한을 어떻게 맞췄는지 이야기해 주세요',
    '직접적인 권한 없이 다른 사람을 설득해야 했던 경험이 있나요',
    '가장 어려웠던 기술적 문제는 무엇이었나요',
    '갑작스러운 변화에 어떻게 적응했는지 설명해 주세요',
    '여러 업무가 동시에 몰렸을 때 우선순위를 어떻게 정했나요',
    '후배나 팀원을 성장시켰던 경험을 말씀해 주세요',
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
