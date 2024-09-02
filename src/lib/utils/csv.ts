import { parse, ParseResult } from 'papaparse';

export function parseCSV<T = Record<string, unknown>>(
  text: string,
  delimiter: string[] = [',', ';'],
  withHeader: boolean = true
) {
  const parsePromise = new Promise<ParseResult<T>>((resolve, rejects) => {
    parse<T>(text, {
      delimitersToGuess: delimiter,
      header: withHeader,
      complete(results) {
        resolve(results);
      },
      error(error: unknown) {
        rejects(error);
      },
    });
  });

  return parsePromise;
}
