import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { parse } from 'papaparse';

import { CSV, RowData } from '@/types/csv';
import { commonErrorHandler } from '@/utils/errorHandler';

interface State {
  isLoading: boolean;
  ids: string[];
  csvList: Record<string, CSV>;
}

interface Actions {
  loadCSV(id: string, text: string): void;
  unloadCSV(id: string): void;
  parseCSV(id: string): Promise<void>;
  unparseCSV(id: string): void;
}

export const useCSVStore = create<State & Actions>()(
  immer((set, get) => ({
    // state
    isLoading: false,
    csvList: {},
    ids: [],

    // actions
    loadCSV(id, text) {
      set((draft) => {
        draft.csvList[id] = {
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
        draft.ids.filter((i) => i !== id);
        delete draft.csvList[id];
      });
    },

    async parseCSV(id) {
      try {
        set((draft) => {
          draft.isLoading = true;
        });

        const csv = get().csvList[id];
        if (!csv) {
          throw new Error('CSV file is not found');
        }

        parse(csv.text, {
          delimitersToGuess: [',', ';'],
          complete(results) {
            set((draft) => {
              if (results.meta.fields) {
                draft.csvList[id].fields = results.meta.fields;
              }
              draft.csvList[id].json = results.data as RowData[];
              draft.csvList[id].status = 'parsed';
              draft.isLoading = false;
            });
          },
          header: true,
          worker: true,
        });
      } catch (error) {
        commonErrorHandler(error);
      }
    },

    unparseCSV(id) {
      set((draft) => {
        draft.csvList[id].json = [];
        draft.csvList[id].fields = [];
        draft.csvList[id].status = 'unparsed';
      });
    },
  }))
);
