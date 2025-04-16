export interface EnumUtils<T extends Record<string, any>> {
  values(): Array<T[keyof T]>
  value(key: keyof T): T[keyof T]
  keys(): Array<keyof T>
  key(value: T[keyof T]): keyof T | undefined
}

/**
 * @template T
 * @param enumData O objeto enum.
 * @returns O objeto enum extendido com os métodos utilitários.
 */
export function Enum<T extends Record<string, any>>(
  enumData: T,
): T & EnumUtils<T> {
  return {
    ...enumData,
    values: () => Object.values(enumData) as Array<T[keyof T]>,
    value: (key: keyof T) => enumData[key],
    keys: () => Object.keys(enumData) as Array<keyof T>,
    key: (value: T[keyof T]) =>
      Object.keys(enumData).find((key) => enumData[key] === value),
  }
}
