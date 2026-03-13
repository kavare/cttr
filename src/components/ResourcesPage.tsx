import { useState } from 'react';
import type { Lang } from '../i18n/translations';
import { t } from '../i18n/translations';

interface ExerciseInfo {
  storageKey: string;
  titleKey: 'visaMemo' | 'starTime' | 'starQuestions' | 'listDashboard' | 'listFunnel';
}

const exercises: ExerciseInfo[] = [
  { storageKey: 'exercise-visa-memo', titleKey: 'visaMemo' },
  { storageKey: 'exercise-star-time', titleKey: 'starTime' },
  { storageKey: 'exercise-star-questions', titleKey: 'starQuestions' },
  { storageKey: 'exercise-list-dashboard', titleKey: 'listDashboard' },
  { storageKey: 'exercise-list-funnel', titleKey: 'listFunnel' },
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
  data: Record<string, unknown>[]
): string {
  const keys = Object.keys(data[0] || {});
  const rows = data
    .map(
      (row, idx) =>
        `<tr>
          <td style="padding:6px 10px;border:1px solid #ddd;text-align:center;">${idx + 1}</td>
          ${keys
            .map(
              (k) =>
                `<td style="padding:6px 10px;border:1px solid #ddd;white-space:pre-wrap;">${String(row[k] ?? '')}</td>`
            )
            .join('')}
        </tr>`
    )
    .join('');

  return `
    <div style="font-family:Inter,sans-serif;padding:20px;">
      <h2 style="font-size:18px;margin-bottom:12px;color:#1e3a5f;">${title}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:12px;">
        <thead>
          <tr style="background:#f3f4f6;">
            <th style="padding:6px 10px;border:1px solid #ddd;text-align:left;">#</th>
            ${keys
              .map(
                (k) =>
                  `<th style="padding:6px 10px;border:1px solid #ddd;text-align:left;">${k}</th>`
              )
              .join('')}
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
  await html2pdf()
    .set({
      margin: [10, 10, 10, 10],
      filename,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    })
    .from(container)
    .save();
  document.body.removeChild(container);
}

interface Props {
  lang: Lang;
}

export default function ResourcesPage({ lang }: Props) {
  const i = t(lang);
  const [downloading, setDownloading] = useState<string | null>(null);

  const noDataLabel = lang === 'en' ? 'No data saved yet' : '尚無已儲存的資料';

  const handleDownload = async (exercise: ExerciseInfo) => {
    const title = i.exercises[exercise.titleKey].title;
    const data = loadExerciseData(exercise.storageKey);
    if (!data) {
      alert(noDataLabel);
      return;
    }
    setDownloading(exercise.storageKey);
    try {
      const html = buildHtmlForExercise(title, data);
      await generatePdf(html, `${exercise.storageKey}.pdf`);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    setDownloading('all');
    try {
      let combinedHtml = '';
      let hasAny = false;
      for (const exercise of exercises) {
        const title = i.exercises[exercise.titleKey].title;
        const data = loadExerciseData(exercise.storageKey);
        if (data) {
          hasAny = true;
          combinedHtml += buildHtmlForExercise(title, data);
          combinedHtml += '<div style="page-break-after:always;"></div>';
        }
      }
      if (!hasAny) {
        alert(noDataLabel);
        return;
      }
      await generatePdf(combinedHtml, 'all-exercises.pdf');
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
              className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
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
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
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
