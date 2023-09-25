export function isNullOrEmpty(
  value: string | null | undefined | unknown[] | Record<string, unknown>,
): boolean {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  return false;
}
