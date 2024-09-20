import { ParseResult } from 'papaparse';

export type RowData = Record<string, string>;

export interface CSVFileState<T = RowData> {
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
