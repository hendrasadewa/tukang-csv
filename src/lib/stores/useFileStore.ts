import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { CSVFileState } from '@/lib/dto/csv';
import { parseCSV } from '@/lib/utils/csv';

interface State {
  files: CSVFileState[];
  isLoading: boolean;
}

interface Action {
  loadFiles(files: File[]): Promise<void>;
  loadFile(file: File | null): Promise<void>;
  removeFile(id: string): void;
  parseFile(id: string): Promise<void>;
  unParseFile(id: string): void;
}

const initialState: State = {
  files: [],
  isLoading: false,
};

type Store = State & Action;

export const useFileStore = create<Store>()(
  immer((set, get) => ({
    ...initialState,

    async loadFile(file) {
      if (!file) {
        return;
      }
      const fileUrl = URL.createObjectURL(file);
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch the file');
      }

      const csv = await response.text();

      set((draft) => {
        draft.files.push({
          id: nanoid(),
          fileBlob: new Blob([csv], { type: 'text/plain' }),
          fileName: file.name,
          fileType: file.type,
          modifiedAt: file.lastModified,
          sizeInBytes: file.size,
          status: 'loaded',
          csv,
        });
      });
    },

    async loadFiles(files) {
      set((draft) => {
        draft.isLoading = true;
      });

      if (files.length <= 0) {
        return;
      }

      for (const file of files) {
        await get().loadFile(file);
      }

      set((draft) => {
        draft.isLoading = false;
      });
    },

    removeFile(id) {
      set((draft) => {
        const fileIndex = draft.files.findIndex((file) => file.id === id);
        if (fileIndex < 0) {
          return;
        }

        draft.files.splice(fileIndex, 1);
      });
    },

    async parseFile(id) {
      set((draft) => {
        draft.isLoading = true;
      });

      const { files } = get();

      const fileIndex = files.findIndex((item) => item.id === id);
      if (fileIndex < 0) {
        return;
      }

      const file = files[fileIndex];
      const parseResult = await parseCSV(file.csv);

      set((draft) => {
        draft.files[fileIndex].status = 'parsed';
        draft.files[fileIndex].parseResult = parseResult;
        draft.isLoading = false;
      });
    },

    async unParseFile(id) {
      set((draft) => {
        draft.isLoading = true;
      });

      set((draft) => {
        const fileIndex = draft.files.findIndex((item) => item.id === id);
        if (fileIndex < 0) {
          return;
        }

        draft.files[fileIndex].status = 'loaded';
        draft.files[fileIndex].parseResult = undefined;
        draft.isLoading = false;
      });
    },
  }))
);
