export const nullSafe = (value: any, defaultValue?: string) => {
  return value !== undefined && value !== null ? value : defaultValue || ''
}
