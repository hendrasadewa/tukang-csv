import { ParseResult } from 'papaparse';

export interface FieldItem {
  fieldName: string;
  isSelected: boolean;
  id: string;
}

export type PreviewData = Record<string, unknown>;

export interface ParseState<T> {
  file: File;
  csv: string;
  parseResult?: ParseResult<T>;
}
