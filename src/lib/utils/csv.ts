import { parse, ParseConfig, ParseResult } from 'papaparse';
import { RowData } from '../dto/csv';

const defaultConfig: ParseConfig = {
  delimitersToGuess: [',', ';'],
  header: true,
};

export function parseCSV<T = RowData>(
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
