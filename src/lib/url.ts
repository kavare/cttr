export function joinBasePath(base: string, path: string): string {
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

