import { nanoid } from 'nanoid';

import type { FileManagerState } from '../contracts';

export const createFileManagerSlice: FileManagerState = (set, get) => ({
  // states
  fileIds: [],
  fileRecord: {},
  // actions
  async loadFile(file) {
    try {
      if (!file) {
        throw new Error('file is required!');
      }

      const id = nanoid();

      set((draft) => {
        draft.fileIds.push(id);
        draft.fileRecord[id] = { id, file };
      });
    } catch (error) {
      get().onShowErrorToast(error);
    }
  },

  async loadFiles(files) {
    for (const file of files) {
      await get().loadFile(file);
    }
  },

  unloadFile(id) {
    set((draft) => {
      draft.fileIds.filter((i) => i !== id);
      delete draft.fileRecord[id];
    });
  },
});
