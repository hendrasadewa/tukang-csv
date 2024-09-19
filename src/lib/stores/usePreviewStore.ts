import { toast } from 'sonner';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { useFileStore } from './useFileStore';

interface State {
  columns: Array<string>;
  data: Array<Record<string, string>>;
}

interface Actions {
  loadPreview(fileId: string): Promise<void>;
  unLoadPreview(): void;
}

type Store = State & Actions;

export const usePreviewStore = create<Store>()(
  immer((set) => ({
    columns: [],
    data: [],

    async loadPreview(fileId) {
      try {
        const { files } = useFileStore.getState();

        const fileIndex = files.findIndex((file) => file.id === fileId);
        if (fileIndex < 0) {
          throw new Error('file index is required!');
        }

        const file = files[fileIndex];
        if (!file) {
          throw new Error('failed to get file');
        }

        if (!file.parseResult) {
          throw new Error('failed to get parsed csv');
        }

        const { fields } = file.parseResult.meta;
        if (!fields) {
          throw new Error('failed to get fields !');
        }

        const data = file.parseResult.data.map((item) =>
          fields.reduce(
            (prev, current) => ({ ...prev, [current]: item[current] }),
            {}
          )
        );

        set((draft) => {
          draft.columns = fields;
          draft.data = data;
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    },

    unLoadPreview() {
      set((draft) => {
        draft.columns = [];
        draft.data = [];
      });
    },
  }))
);
