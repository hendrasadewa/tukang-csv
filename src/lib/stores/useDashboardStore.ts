import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { useCSVStore } from '@/lib/stores/useCSVStore';
import { useFileManagerStore } from '@/lib/stores/useFileManagerStore';

interface State {
  isLoading: boolean;
  selected: string;
}

interface Actions {
  onSelectFile(id: string): Promise<void>;
}

export const useDashboardStore = create<State & Actions>()(
  immer((set, get) => ({
    // state
    isLoading: false,
    selected: '',

    // actions
    async onSelectFile(id) {
      if (!id) {
        throw new Error('id is required');
      }

      set((draft) => {
        draft.isLoading = true;
      });

      const { fileRecord } = useFileManagerStore.getState();
      const { unloadCSV, loadCSV } = useCSVStore.getState();

      unloadCSV(id);

      if (id === get().selected) {
        set((draft) => {
          draft.selected = '';
          draft.isLoading = false;
        });
        return;
      }

      const { file } = fileRecord[id];

      const fileUrl = URL.createObjectURL(file);
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch the file');
      }

      const text = await response.text();

      loadCSV(id, text);

      await useCSVStore.getState().parseCSV(id);

      set((draft) => {
        draft.selected = id;
        draft.isLoading = false;
      });
    },
  }))
);
