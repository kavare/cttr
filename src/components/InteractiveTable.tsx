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
    if (stored !== null && stored.length > 0) {
      setRows(stored);
    } else if (initialData && initialData.length > 0) {
      setRows(initialData);
      save(initialData);
    }
  }, [load, save, initialData]);

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
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={addRow}
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-[#f7f5f0] hover:bg-primary-light transition-colors"
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
          columns={columns.map((col) => ({ key: col.key, label: col.label }))}
        />
      </div>

      {rows.length === 0 ? (
        <p className="text-center py-12 text-primary/30">{i.common.noData}</p>
      ) : (
        <>
          {/* Mobile card layout */}
          <div className="md:hidden space-y-4">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className="border border-primary/10 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary/40 uppercase tracking-wider">#{rowIdx + 1}</span>
                  <button
                    onClick={() => deleteRow(rowIdx)}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors px-2 py-1"
                    title={i.common.deleteRow}
                  >
                    ✕
                  </button>
                </div>
                {columns.map((col) => {
                  const customCell = renderCell?.(
                    row,
                    col,
                    (key, value) => updateCell(rowIdx, key, value)
                  );
                  return (
                    <div key={col.key} className="space-y-1">
                      <label className="block text-xs font-semibold text-primary/50 uppercase tracking-wider">
                        {col.label}
                      </label>
                      {customCell !== null && customCell !== undefined ? (
                        <div>{customCell}</div>
                      ) : col.type === 'select' ? (
                        <select
                          value={String(row[col.key] ?? '')}
                          onChange={(e) => updateCell(rowIdx, col.key, e.target.value)}
                          className="w-full text-sm border border-primary/10 px-3 py-2 focus:outline-none focus:border-primary/30 bg-transparent"
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
                          rows={3}
                          className="w-full text-sm border border-primary/10 px-3 py-2 focus:outline-none focus:border-primary/30 bg-transparent resize-y"
                        />
                      ) : (
                        <input
                          type="text"
                          value={String(row[col.key] ?? '')}
                          onChange={(e) => updateCell(rowIdx, col.key, e.target.value)}
                          placeholder={col.placeholder}
                          className="w-full text-sm border border-primary/10 px-3 py-2 focus:outline-none focus:border-primary/30 bg-transparent"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Desktop table layout */}
          <div className="hidden md:block overflow-x-auto border border-primary/10">
            <table className="min-w-full divide-y divide-primary/10">
              <thead className="bg-primary/[0.03]">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-primary/50 uppercase tracking-wider w-12">
                    #
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-3 py-3 text-left text-xs font-semibold text-primary/50 uppercase tracking-wider"
                      style={col.width ? { minWidth: col.width } : undefined}
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="px-3 py-3 w-16" />
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white hover:bg-white/80' : 'bg-white/50 hover:bg-white/70'}>
                    <td className="px-3 py-2 text-xs text-primary/30">{rowIdx + 1}</td>
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
                              className="w-full text-sm border border-primary/10 px-2 py-1.5 focus:outline-none focus:border-primary/30 bg-transparent"
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
                              className="w-full text-sm border border-primary/10 px-2 py-1.5 focus:outline-none focus:border-primary/30 bg-transparent resize-y"
                            />
                          ) : (
                            <input
                              type="text"
                              value={String(row[col.key] ?? '')}
                              onChange={(e) => updateCell(rowIdx, col.key, e.target.value)}
                              placeholder={col.placeholder}
                              className="w-full text-sm border border-primary/10 px-2 py-1.5 focus:outline-none focus:border-primary/30 bg-transparent"
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
        </>
      )}
    </div>
  );
}
