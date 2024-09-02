import { ParseResult } from 'papaparse';

export interface CSVFileState<T = Record<string, unknown>> {
  id: string;
  fileBlob: Blob;
  fileName: string;
  fileType: string;
  sizeInBytes: number;
  csv: string;
  modifiedAt: number;
  parseResult?: ParseResult<T>;
  status: 'loaded' | 'parsed';
}
