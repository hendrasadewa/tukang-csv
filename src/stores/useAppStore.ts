import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createCSVSlice } from './slices/createCSVSlice';
import { createFileManagerSlice } from './slices/createFileManagerSlice';
import { createDashboardSlice } from './slices/createDashboardSlice';
import { createErrorSlice } from './slices/createErrorSlice';

import { AppSlice } from './contracts';

export const useAppStore = create<AppSlice>()(
  immer((...args) => ({
    ...createCSVSlice(...args),
    ...createFileManagerSlice(...args),
    ...createDashboardSlice(...args),
    ...createErrorSlice(...args),
  }))
);
