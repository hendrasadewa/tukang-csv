import { parse, ParseResult } from 'papaparse';
import { create } from 'zustand';

interface State<T = Record<string, unknown>> {
  status: 'idle' | 'loading' | 'loaded' | 'parsed' | 'error';
  csv: string;
  parseResult?: ParseResult<T>;
}

interface Action {
  loadCSV(file: File): Promise<void>;
  parseCSV(): Promise<void>;
  unLoadCSV(): void;
}

export const useCSVStore = create<State & Action>((set, get) => ({
  status: 'idle',
  csv: '',
  parseResult: undefined,

  async loadCSV(file) {
    set({ status: 'loading' });
    const fileUrl = URL.createObjectURL(file);
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch the file');
    }

    const csv = await response.text();
    set({ csv, status: 'loaded' });
  },

  async parseCSV() {
    set({ status: 'loading' });
    const { csv } = get();
    const result = await new Promise<ParseResult<Record<string, unknown>>>(
      (resolve) => {
        parse<Record<string, unknown>>(csv, {
          delimitersToGuess: [',', ';'],
          complete(results) {
            resolve(results);
          },
          header: true,
        });
      }
    );
    set({ status: 'parsed', parseResult: result });
  },

  unLoadCSV() {
    set({ csv: '', parseResult: undefined, status: 'idle' });
  },
}));
