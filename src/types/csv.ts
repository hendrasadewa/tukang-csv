import { ParseResult } from 'papaparse';

export type RowData = Record<string, string>;

export interface CSV {
  id: string;
  text: string;
  json: Array<RowData>;
  fields: string[];
  status: 'unparsed' | 'parsed';
}

export interface CSVFileState<T = RowData> {
  id: string;
  fileBlob: Blob;
  fileName: string;
  fileType: string;
  sizeInBytes: number;
  csv: string;
  modifiedAt: number;
  parseResult?: ParseResult<T>;
  status: 'initial' | 'loaded' | 'parsed';
}
