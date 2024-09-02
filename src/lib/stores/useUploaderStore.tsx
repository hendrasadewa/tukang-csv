import { ChangeEvent } from 'react';
import { toast } from 'sonner';
import { create } from 'zustand';

interface State {
  status: 'empty' | 'loading' | 'loaded' | 'error';
  fileList: FileList | null;
  files: File[];
}

interface Action {
  onFileChange(event: ChangeEvent<HTMLInputElement>): void;
  onRemoveFile(index: number): void;
  onClearFile(): void;
}

export const useUploaderStore = create<State & Action>((set, get) => ({
  status: 'empty',
  fileList: null,
  files: [],

  onFileChange(event) {
    set({ status: 'loading' });
    if (!event.target.files) {
      toast.error('File is not exist');
      set({ status: 'empty' });
      return;
    }

    const files = [...event.target.files];
    set({
      files,
      status: 'loaded',
    });
    toast.success('File Load success!', {
      description: `Successfully loaded ${files.length} files`,
    });
  },

  onRemoveFile(index) {
    set({ status: 'loading' });
    const files = get().files;
    const removed = files.splice(index, 1);

    if (!removed || removed.length <= 0) {
      toast.error('Failed to remove file', {
        description: 'Cannot find the removed file',
      });
      return;
    }

    set({
      files,
      status: files.length > 0 ? 'loaded' : 'empty',
    });
    toast.success(`Delete success`, {
      description: `${removed[0].name} has been removed`,
    });
  },
  onClearFile() {
    set({ fileList: null, files: [], status: 'empty' });
  },
}));
