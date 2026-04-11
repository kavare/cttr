import { useCallback, useRef, type ChangeEvent } from 'react';
import type { Lang } from '../i18n/translations';
import { t } from '../i18n/translations';
import { trackEvent } from '../lib/analytics';

interface DataPersistenceProps<T> {
  storageKey: string;
  data: T[];
  onImport: (data: T[]) => void;
  lang: Lang;
  columns: { key: string; label: string }[];
}

export function useLocalStorage<T>(key: string) {
  const save = useCallback(
    (data: T[]) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch {
        console.error('Failed to save to localStorage');
      }
    },
    [key]
  );

  const load = useCallback((): T[] | null => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, [key]);

  return { save, load };
}

function escapeCsvField(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    return '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
}

function parseCsvRow(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        current += char;
        i++;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        i++;
      } else if (char === ',') {
        fields.push(current);
        current = '';
        i++;
      } else {
        current += char;
        i++;
      }
    }
  }
  fields.push(current);
  return fields;
}

function parseCsvText(text: string): string[][] {
  const rows: string[][] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      current += char;
      if (char === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          current += text[i + 1];
          i++;
        } else {
          inQuotes = false;
        }
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        current += char;
      } else if (char === '\n') {
        rows.push(parseCsvRow(current.replace(/\r$/, '')));
        current = '';
      } else {
        current += char;
      }
    }
  }

  if (current.trim().length > 0) {
    rows.push(parseCsvRow(current.replace(/\r$/, '')));
  }

  return rows;
}

export function DataPersistenceControls<T>({
  storageKey,
  data,
  onImport,
  lang,
  columns,
}: DataPersistenceProps<T>) {
  const i = t(lang);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportCsv = () => {
    trackEvent('exercise_csv_export', { exercise: storageKey, locale: lang });
    const headerRow = columns.map((col) => escapeCsvField(col.label)).join(',');
    const dataRows = data.map((row) =>
      columns
        .map((col) => escapeCsvField(String((row as Record<string, unknown>)[col.key] ?? '')))
        .join(',')
    );
    const csv = [headerRow, ...dataRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${storageKey}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCsv = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    trackEvent('exercise_csv_import', { exercise: storageKey, locale: lang });

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const rows = parseCsvText(text);
        if (rows.length < 2) {
          alert(i.common.importError);
          return;
        }

        // Skip header row, map remaining rows to objects using column keys
        const dataRows = rows.slice(1);
        const imported = dataRows.map((fields) => {
          const obj: Record<string, string> = {};
          columns.forEach((col, idx) => {
            obj[col.key] = idx < fields.length ? fields[idx] : '';
          });
          return obj as unknown as T;
        });

        onImport(imported);
        alert(i.common.importSuccess);
      } catch {
        alert(i.common.importError);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownloadPdf = async () => {
    trackEvent('exercise_pdf_download', { exercise: storageKey, locale: lang });
    const html2pdf = (await import('html2pdf.js')).default;

    const tableHtml = `
      <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:12px;">
        <thead>
          <tr>
            ${columns.map((col) => `<th style="border:1px solid #ccc;padding:6px 8px;background:#f5f5f0;text-align:left;font-size:11px;">${col.label}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map((row) => `<tr>${columns.map((col) => `<td style="border:1px solid #ccc;padding:6px 8px;vertical-align:top;">${String((row as Record<string, unknown>)[col.key] ?? '')}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;

    const container = document.createElement('div');
    container.innerHTML = tableHtml;
    container.style.padding = '16px';

    html2pdf()
      .set({
        margin: 10,
        filename: `${storageKey}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' },
      })
      .from(container)
      .save();
  };

  const btnClass =
    'inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium border border-primary/15 bg-transparent text-primary/60 hover:text-primary hover:border-primary/30 transition-colors';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={handleExportCsv} className={btnClass}>
        {i.common.exportCsv}
      </button>
      <label className={`${btnClass} cursor-pointer`}>
        {i.common.importCsv}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleImportCsv}
          className="hidden"
        />
      </label>
      <button onClick={handleDownloadPdf} className={btnClass}>
        {i.common.downloadPdf}
      </button>
      <span className="relative group">
        <span
          className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold border border-primary/20 rounded-full text-primary/40 cursor-help"
          aria-label={i.common.dataTooltip}
        >
          ?
        </span>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 px-3 py-2 text-xs text-primary/80 bg-[#f7f5f0] border border-primary/15 rounded shadow-sm z-10 whitespace-normal">
          {i.common.dataTooltip}
        </span>
      </span>
    </div>
  );
}
