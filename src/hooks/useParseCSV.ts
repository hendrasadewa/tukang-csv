import { ChangeEvent, useState } from 'react';
import { parse, ParseResult } from 'papaparse';

import { loadFile } from '../lib/utils/file';

export default function useParseCSV<T = unknown>() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [parseResult, setParseResult] = useState<ParseResult<T> | undefined>(
    undefined
  );

  const onReadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const { files } = event.target;

      if (!files) {
        throw new Error('file is Required');
      }

      const text = await loadFile(files);

      const result = await new Promise<ParseResult<T>>((resolve) => {
        parse<T>(text, {
          delimiter: ',',
          complete(results) {
            resolve(results);
          },
          header: true,
        });
      });

      setParseResult(result);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        return;
      }
      setErrorMessage('unknown error');
      setLoading(false);
    }
  };

  return {
    onReadFile,
    isLoading,
    parseResult,
    errorMessage,
  };
}
