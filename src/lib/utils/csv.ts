import { parse, ParseConfig, ParseResult } from 'papaparse';

const defaultConfig: ParseConfig = {
  delimitersToGuess: [',', ';'],
  header: true,
};

export function parseCSV<T = Record<string, unknown>>(
  text: string,
  delimiter: string[] = [',', ';'],
  withHeader: boolean = true
) {
  const parsePromise = new Promise<ParseResult<T>>((resolve, rejects) => {
    parse<T>(text, {
      ...defaultConfig,
      delimitersToGuess: delimiter,
      header: withHeader,
      complete(results) {
        resolve(results);
      },
      error(error: unknown) {
        rejects(error);
      },
      worker: true,
    });
  });

  return parsePromise;
}
