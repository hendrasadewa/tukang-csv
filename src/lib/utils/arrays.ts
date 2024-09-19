export function chunkArray<T = unknown>(array: T[], chunkSize: number): T[][] {
  const chunkedArray: T[][] = [];
  let index = 0;

  while (index <= array.length) {
    chunkedArray.push(array.slice(index, index + chunkSize));
    index += chunkSize;
  }

  return chunkedArray;
}
