export function ValidateParamsId(id: any): boolean {
  return /^\d+$/.test(id);
}
