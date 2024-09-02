import { create } from 'zustand';
import { nanoid } from 'nanoid';

import { CSVFileState } from '@/lib/dto/csv';
import { parseCSV } from '@/lib/utils/csv';
import { loadCSVFiletoString } from '@/lib/utils/file';

interface State {
  files: CSVFileState[];
}

interface Action {
  loadFiles(files: File[]): Promise<void>;
  loadFile(file: File | null): Promise<void>;
  removeFile(id: string): void;
  parseFile(id: string): void;
}

const initialState: State = {
  files: [],
};

export const useFileStore = create<State & Action>((set, get) => ({
  ...initialState,

  async loadFiles(files) {
    if (files.length <= 0) {
      return;
    }
    const { loadFile } = get();

    for (const file of files) {
      await loadFile(file);
    }
  },

  async loadFile(file) {
    if (!file) {
      return;
    }

    const csv = await loadCSVFiletoString(file);

    set((prev) => ({
      files: [
        ...prev.files,
        {
          id: nanoid(),
          fileBlob: new Blob([csv], { type: 'text/plain' }),
          fileName: file.name,
          fileType: file.type,
          modifiedAt: file.lastModified,
          sizeInBytes: file.size,
          status: 'loaded',
          csv,
        },
      ],
    }));
  },

  removeFile(id) {
    set((prev) => ({
      files: prev.files.filter((item) => item.id !== id),
    }));
  },

  async parseFile(id) {
    const { files } = get();
    const fileIndex = files.findIndex((item) => item.id === id);

    if (fileIndex < 0) {
      return;
    }
    const file = files[fileIndex];
    const parseResult = await parseCSV(file.csv);

    set((prev) => ({
      files: prev.files.map((file) =>
        file.id === id ? { ...file, parseResult, status: 'parsed' } : file
      ),
    }));
  },
}));
