export const repeat = (n: number, fn: (index: number) => unknown) => {
  return [...Array(n)].map((_value, index) => fn(index))
}