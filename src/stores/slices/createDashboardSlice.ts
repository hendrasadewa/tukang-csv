import type { DashboardState } from '../contracts';

export const createDashboardSlice: DashboardState = (set, get) => ({
  // state
  isDashboardLoading: false,
  selectedFileId: '',
  // actions
  async onSelectFile(id) {
    if (!id) {
      throw new Error('id is required');
    }

    set((draft) => {
      draft.isDashboardLoading = true;
    });

    const { fileRecord, unloadCSV, loadCSV } = get();

    unloadCSV(id);

    if (id === get().selectedFileId) {
      set((draft) => {
        draft.selectedFileId = '';
        draft.isDashboardLoading = false;
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

    await get().parseCSV(id);

    set((draft) => {
      draft.selectedFileId = id;
      draft.isDashboardLoading = false;
    });
  },
});
