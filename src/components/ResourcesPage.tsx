import { useState } from 'react';
import type { Lang } from '../i18n/translations';
import { t } from '../i18n/translations';
import { trackEvent } from '../lib/analytics';

interface ColumnDef {
  key: string;
  label: string;
}

interface ExerciseInfo {
  storageKey: string;
  titleKey: 'visaMemo' | 'starTime' | 'starQuestions' | 'listDashboard' | 'listFunnel';
  getColumns: (lang: Lang) => ColumnDef[];
}

const exercises: ExerciseInfo[] = [
  {
    storageKey: 'exercise-visa-memo',
    titleKey: 'visaMemo',
    getColumns: (lang) => {
      const isZh = lang === 'zh-tw';
      return [
        { key: 'country', label: isZh ? '國家' : 'Country' },
        { key: 'visaType', label: isZh ? '簽證類型' : 'Visa Type' },
        { key: 'requirements', label: isZh ? '要求' : 'Requirements' },
        { key: 'duration', label: isZh ? '期限' : 'Duration' },
        { key: 'notes', label: isZh ? '備註' : 'Notes' },
      ];
    },
  },
  {
    storageKey: 'exercise-star-time',
    titleKey: 'starTime',
    getColumns: (lang) => {
      const isZh = lang === 'zh-tw';
      return [
        { key: 'timePeriod', label: isZh ? '時間 / 日期' : 'Time Period / Date' },
        { key: 'projectName', label: isZh ? '專案名稱' : 'Project Name' },
        { key: 'role', label: isZh ? '角色' : 'Role' },
        { key: 'storyType', label: isZh ? '故事類型' : 'Story Type' },
        { key: 'situation', label: isZh ? '情境' : 'Situation' },
        { key: 'task', label: isZh ? '任務' : 'Task' },
        { key: 'action', label: isZh ? '行動' : 'Action' },
        { key: 'result', label: isZh ? '結果' : 'Result' },
        { key: 'challenges', label: isZh ? '挑戰' : 'Challenges' },
        { key: 'learnings', label: isZh ? '學習' : 'Learnings' },
        { key: 'retro', label: isZh ? '回顧' : 'Retro' },
      ];
    },
  },
  {
    storageKey: 'exercise-star-questions',
    titleKey: 'starQuestions',
    getColumns: (lang) => {
      const isZh = lang === 'zh-tw';
      return [
        { key: 'question', label: isZh ? '行為面試問題' : 'Behavioral Question' },
        { key: 'relatedStory', label: isZh ? '相關故事' : 'Related Story' },
        { key: 'situation', label: isZh ? '情境' : 'Situation' },
        { key: 'task', label: isZh ? '任務' : 'Task' },
        { key: 'action', label: isZh ? '行動' : 'Action' },
        { key: 'result', label: isZh ? '結果' : 'Result' },
        { key: 'retro', label: isZh ? '回顧' : 'Retro' },
      ];
    },
  },
  {
    storageKey: 'exercise-list-dashboard',
    titleKey: 'listDashboard',
    getColumns: (lang) => {
      const isZh = lang === 'zh-tw';
      return [
        { key: 'week', label: isZh ? '週次' : 'Week' },
        { key: 'date', label: isZh ? '日期' : 'Date' },
        { key: 'location', label: isZh ? '地點' : 'Location' },
        { key: 'connections', label: isZh ? '人脈連結' : 'Connections' },
        { key: 'profileViews', label: isZh ? '檔案瀏覽' : 'Profile Views' },
        { key: 'searches', label: isZh ? '搜尋次數' : 'Searches' },
        { key: 'emailsSent', label: isZh ? '寄出郵件' : 'Emails Sent' },
        { key: 'inMailsSent', label: isZh ? 'InMail 寄出' : 'InMails Sent' },
        { key: 'phoneCalls', label: isZh ? '電話通話' : 'Phone Calls' },
        { key: 'keywords', label: isZh ? '關鍵字' : 'Keywords' },
        { key: 'notes', label: isZh ? '備註' : 'Notes' },
      ];
    },
  },
  {
    storageKey: 'exercise-list-funnel',
    titleKey: 'listFunnel',
    getColumns: (lang) => {
      const isZh = lang === 'zh-tw';
      return [
        { key: 'companyName', label: isZh ? '公司名稱' : 'Company Name' },
        { key: 'title', label: isZh ? '職稱' : 'Title' },
        { key: 'channel', label: isZh ? '管道' : 'Channel' },
        { key: 'location', label: isZh ? '地點' : 'Location' },
        { key: 'nextDate', label: isZh ? '下一個日期' : 'Next Date' },
        { key: 'pipelineStep', label: isZh ? '管道階段' : 'Pipeline Step' },
      ];
    },
  },
];

function loadExerciseData(storageKey: string): Record<string, unknown>[] | null {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

function buildHtmlForExercise(
  title: string,
  columns: ColumnDef[],
  data: Record<string, unknown>[]
): string {
  const headerCells = columns
    .map(
      (col) =>
        `<th style="padding:8px 10px;border:1px solid #ccc;text-align:left;background:#e8ecf1;font-size:11px;color:#1e3a5f;">${col.label}</th>`
    )
    .join('');

  const rows = data
    .map(
      (row, idx) =>
        `<tr style="background:${idx % 2 === 0 ? '#ffffff' : '#f9fafb'};">
          <td style="padding:6px 10px;border:1px solid #ddd;text-align:center;font-size:11px;color:#6b7280;">${idx + 1}</td>
          ${columns
            .map(
              (col) =>
                `<td style="padding:6px 10px;border:1px solid #ddd;white-space:pre-wrap;font-size:11px;">${String(row[col.key] ?? '')}</td>`
            )
            .join('')}
        </tr>`
    )
    .join('');

  return `
    <div style="font-family:'Noto Sans TC',Inter,sans-serif;padding:20px;">
      <h2 style="font-size:16px;margin-bottom:12px;color:#1e3a5f;">${title}</h2>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="padding:8px 10px;border:1px solid #ccc;text-align:center;background:#e8ecf1;font-size:11px;color:#1e3a5f;width:36px;">#</th>
            ${headerCells}
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

async function generatePdf(htmlContent: string, filename: string) {
  const html2pdf = (await import('html2pdf.js')).default;
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  document.body.appendChild(container);
  try {
    await html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      })
      .from(container)
      .save();
  } finally {
    document.body.removeChild(container);
  }
}

interface Props {
  lang: Lang;
}

export default function ResourcesPage({ lang }: Props) {
  const i = t(lang);
  const [downloading, setDownloading] = useState<string | null>(null);

  const noDataLabel =
    lang === 'en'
      ? 'No data saved yet for this exercise. Complete the exercise first.'
      : '此練習尚無已儲存的資料。請先完成練習。';

  const noDataAllLabel =
    lang === 'en'
      ? 'No data saved for any exercise yet. Complete at least one exercise first.'
      : '尚無任何練習的已儲存資料。請先完成至少一項練習。';

  const handleDownload = async (exercise: ExerciseInfo) => {
    const title = i.exercises[exercise.titleKey].title;
    const data = loadExerciseData(`${exercise.storageKey}-${lang}`);
    if (!data) {
      alert(noDataLabel);
      return;
    }
    trackEvent('resources_download_single', { exercise: exercise.titleKey, locale: lang });
    setDownloading(exercise.storageKey);
    try {
      const columns = exercise.getColumns(lang);
      const html = buildHtmlForExercise(title, columns, data);
      await generatePdf(html, `${exercise.storageKey}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert(lang === 'en' ? 'Failed to generate PDF. Please try again.' : 'PDF 產生失敗，請重試。');
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    trackEvent('resources_download_all', { locale: lang });
    setDownloading('all');
    try {
      let combinedHtml = '';
      let hasAny = false;
      for (const exercise of exercises) {
        const title = i.exercises[exercise.titleKey].title;
        const data = loadExerciseData(`${exercise.storageKey}-${lang}`);
        if (data) {
          hasAny = true;
          const columns = exercise.getColumns(lang);
          combinedHtml += buildHtmlForExercise(title, columns, data);
          combinedHtml += '<div style="page-break-after:always;"></div>';
        }
      }
      if (!hasAny) {
        alert(noDataAllLabel);
        return;
      }
      await generatePdf(combinedHtml, 'all-exercises.pdf');
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert(lang === 'en' ? 'Failed to generate PDF. Please try again.' : 'PDF 產生失敗，請重試。');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-3">
        {i.resources.title}
      </h1>
      <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-4"></div>
      <p className="text-lg text-gray-600 text-center mb-10">
        {i.resources.description}
      </p>

      <div className="flex justify-center mb-10">
        <button
          onClick={handleDownloadAll}
          disabled={downloading !== null}
          className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-full bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {downloading === 'all' ? (
            <span className="inline-block w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          )}
          {i.resources.downloadAll}
        </button>
      </div>

      <div className="space-y-4">
        {exercises.map((exercise) => {
          const info = i.exercises[exercise.titleKey];
          const isDownloading = downloading === exercise.storageKey;
          return (
            <div
              key={exercise.storageKey}
              className="bg-surface-dark/40 border border-primary/10 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-primary/30 transition-all"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {info.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{info.description}</p>
              </div>
              <button
                onClick={() => handleDownload(exercise)}
                disabled={downloading !== null}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-primary/20 bg-transparent text-primary/70 hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isDownloading ? (
                  <span className="inline-block w-4 h-4 mr-2 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    className="w-4 h-4 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                )}
                {i.resources.downloadPdf}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
