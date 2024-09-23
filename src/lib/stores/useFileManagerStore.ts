import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';

import { StoredFile } from '../types/file';
import { asyncErrorHandler } from '../utils/errorHandler';

interface State {
  ids: string[];
  fileRecord: Record<string, StoredFile>;
}

interface Actions {
  loadFile(file: File): Promise<void>;
  loadFiles(files: File[]): Promise<void>;
  unloadFile(id: string): void;
}

export const useFileManagerStore = create<State & Actions>()(
  immer((set, get) => ({
    // states
    ids: [],
    fileRecord: {},
    // actions
    async loadFile(file) {
      try {
        if (!file) {
          throw new Error('file is required!');
        }

        const id = nanoid();

        set((draft) => {
          draft.ids.push(id);
          draft.fileRecord[id] = { id, file };
        });
      } catch (error) {
        asyncErrorHandler(error);
      }
    },

    async loadFiles(files) {
      for (const file of files) {
        await get().loadFile(file);
      }
    },

    unloadFile(id) {
      set((draft) => {
        draft.ids.filter((i) => i !== id);
        delete draft.fileRecord[id];
      });
    },
  }))
);
