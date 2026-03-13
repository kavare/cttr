import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { useLocalStorage, DataPersistenceControls } from './DataPersistence';
import type { Lang } from '../i18n/translations';
import { t } from '../i18n/translations';

export interface Column<T> {
  key: keyof T & string;
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'status';
  options?: string[];
  placeholder?: string;
  width?: string;
}

interface InteractiveTableProps<T extends Record<string, unknown>> {
  storageKey: string;
  columns: Column<T>[];
  defaultRow: () => T;
  lang: Lang;
  initialData?: T[];
  renderCell?: (row: T, col: Column<T>, onChange: (key: keyof T & string, value: string) => void) => ReactNode | null;
}

export function InteractiveTable<T extends Record<string, unknown>>({
  storageKey,
  columns,
  defaultRow,
  lang,
  initialData,
  renderCell,
}: InteractiveTableProps<T>) {
  const i = t(lang);
  const { save, load } = useLocalStorage<T>(storageKey);
  const [rows, setRows] = useState<T[]>([]);
  const [saveStatus, setSaveStatus] = useState<string>('');

  useEffect(() => {
    const stored = load();
    if (stored && stored.length > 0) {
      setRows(stored);
    } else if (initialData && initialData.length > 0) {
      setRows(initialData);
    }
  }, [load, initialData]);

  const autoSave = useCallback(
    (newRows: T[]) => {
      setRows(newRows);
      setSaveStatus(i.common.saving);
      save(newRows);
      setTimeout(() => setSaveStatus(i.common.saved), 300);
      setTimeout(() => setSaveStatus(''), 2000);
    },
    [save, i]
  );

  const addRow = () => {
    autoSave([...rows, defaultRow()]);
  };

  const deleteRow = (index: number) => {
    autoSave(rows.filter((_, idx) => idx !== index));
  };

  const updateCell = (index: number, key: keyof T & string, value: string) => {
    const newRows = rows.map((row, idx) =>
      idx === index ? { ...row, [key]: value } : row
    );
    autoSave(newRows);
  };

  const handleImport = (imported: T[]) => {
    autoSave(imported);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={addRow}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            + {i.common.addRow}
          </button>
          {saveStatus && (
            <span className="text-xs text-gray-500">{saveStatus}</span>
          )}
        </div>
        <DataPersistenceControls
          storageKey={storageKey}
          data={rows}
          onImport={handleImport}
          lang={lang}
        />
      </div>

      {rows.length === 0 ? (
        <p className="text-center py-12 text-gray-400">{i.common.noData}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">
                  #
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    style={col.width ? { minWidth: col.width } : undefined}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-3 py-3 w-16" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50/50">
                  <td className="px-3 py-2 text-xs text-gray-400">{rowIdx + 1}</td>
                  {columns.map((col) => {
                    const customCell = renderCell?.(
                      row,
                      col,
                      (key, value) => updateCell(rowIdx, key, value)
                    );
                    if (customCell !== null && customCell !== undefined) {
                      return <td key={col.key} className="px-3 py-2">{customCell}</td>;
                    }

                    return (
                      <td key={col.key} className="px-3 py-2">
                        {col.type === 'select' ? (
                          <select
                            value={String(row[col.key] ?? '')}
                            onChange={(e) => updateCell(rowIdx, col.key, e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
                          >
                            <option value="">—</option>
                            {col.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : col.type === 'textarea' ? (
                          <textarea
                            value={String(row[col.key] ?? '')}
                            onChange={(e) => updateCell(rowIdx, col.key, e.target.value)}
                            placeholder={col.placeholder}
                            rows={2}
                            className="w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
                          />
                        ) : (
                          <input
                            type="text"
                            value={String(row[col.key] ?? '')}
                            onChange={(e) => updateCell(rowIdx, col.key, e.target.value)}
                            placeholder={col.placeholder}
                            className="w-full text-sm border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          />
                        )}
                      </td>
                    );
                  })}
                  <td className="px-3 py-2">
                    <button
                      onClick={() => deleteRow(rowIdx)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                      title={i.common.deleteRow}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
