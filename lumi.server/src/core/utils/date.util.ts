function tryLocalizedDate(date?: string | Date): Date | null {
  if (!date || typeof date !== 'string') return null;
  const parts = date.split('/');
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Meses começam em 0
  const year = parseInt(parts[2], 10);

  const parsedDate = new Date(year, month, day);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
}

export const tryDate = (date?: string | Date): Date | null => {
  if (!date) return null;
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? tryLocalizedDate(date) : parsedDate;
};
