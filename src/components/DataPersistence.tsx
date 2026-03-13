import { useCallback, useRef, type ChangeEvent } from 'react';
import type { Lang } from '../i18n/translations';
import { t } from '../i18n/translations';

interface DataPersistenceProps<T> {
  storageKey: string;
  data: T[];
  onImport: (data: T[]) => void;
  lang: Lang;
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

export function DataPersistenceControls<T>({
  storageKey,
  data,
  onImport,
  lang,
}: DataPersistenceProps<T>) {
  const i = t(lang);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${storageKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          onImport(imported);
          alert(i.common.importSuccess);
        } else {
          alert(i.common.importError);
        }
      } catch {
        alert(i.common.importError);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleExport}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {i.common.exportJson}
      </button>
      <label className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
        {i.common.importJson}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}
