import { parse } from 'papaparse';

import { RowData } from '@/types/csv';
import type { CSVSliceState } from '../contracts';

export const createCSVSlice: CSVSliceState = (set, get) => ({
  // state
  isLoading: false,
  csvRecord: {},
  csvIds: [],
  // actions
  loadCSV(id, text) {
    set((draft) => {
      draft.csvRecord[id] = {
        fields: [],
        id,
        json: [],
        text,
        status: 'unparsed',
      };
    });
  },

  unloadCSV(id) {
    set((draft) => {
      draft.fileIds.filter((i) => i !== id);
      delete draft.csvRecord[id];
    });
  },

  async parseCSV(id) {
    try {
      set((draft) => {
        draft.isLoading = true;
      });

      const csv = get().csvRecord[id];
      if (!csv) {
        throw new Error('CSV file is not found');
      }

      parse(csv.text, {
        delimitersToGuess: [',', ';'],
        complete(results) {
          set((draft) => {
            if (results.meta.fields) {
              draft.csvRecord[id].fields = results.meta.fields;
            }
            draft.csvRecord[id].json = results.data as RowData[];
            draft.csvRecord[id].status = 'parsed';
            draft.isLoading = false;
          });
        },
        header: true,
        worker: true,
      });
    } catch (error) {
      get().onShowErrorToast(error);
    }
  },

  unparseCSV(id) {
    set((draft) => {
      draft.csvRecord[id].json = [];
      draft.csvRecord[id].fields = [];
      draft.csvRecord[id].status = 'unparsed';
    });
  },
});
