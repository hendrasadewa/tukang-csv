import { parse, ParseResult } from 'papaparse';

export async function fetchFile(file: File) {
  const fileUrl = URL.createObjectURL(file);
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch the file');
  }

  return await response.text();
}

export async function loadFile(fileList: FileList) {
  const [file] = fileList;
  if (!file) {
    throw new Error('file is not exists');
  }
  return await fetchFile(file);
}

export function chunkArray<T = unknown>(arr: Array<T>, size: number) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export function parseCSV<T = unknown>(
  csvText: string,
  parserCallback: (results: ParseResult<T>) => Array<T>,
  delimiter = ','
) {
  return new Promise<Array<T>>((resolve) => {
    parse(csvText, {
      delimiter,
      skipEmptyLines: true,
      header: true,

      complete: (result: ParseResult<T>) => {
        const parsed = parserCallback(result);
        resolve(parsed);
      },
    });
  });
}
