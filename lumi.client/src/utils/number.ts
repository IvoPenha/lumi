export function tryNumber(value: string | number): number | null {
  if (typeof value === 'number') {
    return value;
  }

  const parsedValue = Number(value);

  if (isNaN(parsedValue)) {
    return null;
  }

  return parsedValue;
}
