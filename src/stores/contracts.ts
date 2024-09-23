import { CSV } from '@/types/csv';
import { StoredFile } from '@/types/file';
import { StateCreator } from 'zustand';

export interface CSVSlice {
  isLoading: boolean;
  csvIds: string[];
  csvRecord: Record<string, CSV>;
  // actions
  loadCSV(id: string, text: string): void;
  unloadCSV(id: string): void;
  parseCSV(id: string): Promise<void>;
  unparseCSV(id: string): void;
}

export interface FileManagerSlice {
  // states
  fileIds: string[];
  fileRecord: Record<string, StoredFile>;
  // actions
  loadFile(file: File): Promise<void>;
  loadFiles(files: File[]): Promise<void>;
  unloadFile(id: string): void;
}

export interface DashboardSlice {
  // states
  isDashboardLoading: boolean;
  selectedFileId: string;
  // Actions
  onSelectFile(id: string): Promise<void>;
}

export interface ErrorSlice {
  // Actions
  onShowErrorToast(error: unknown): void;
}

// Combined Slices
export type AppSlice = CSVSlice &
  FileManagerSlice &
  DashboardSlice &
  ErrorSlice;

// Immer helper
export type ImmerStateCreator<T> = StateCreator<
  AppSlice,
  [['zustand/immer', never], never],
  [],
  T
>;

// Slice Definitions
export type CSVSliceState = ImmerStateCreator<CSVSlice>;
export type FileManagerState = ImmerStateCreator<FileManagerSlice>;
export type DashboardState = ImmerStateCreator<DashboardSlice>;
export type ErrorState = ImmerStateCreator<ErrorSlice>;
