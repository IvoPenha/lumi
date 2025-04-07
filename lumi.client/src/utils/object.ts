export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isDefined(value: object | string): boolean {
  return value !== undefined && value !== null;
}
