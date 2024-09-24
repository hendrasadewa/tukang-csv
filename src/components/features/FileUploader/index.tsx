import { useEffect } from 'react';
import { FilePlusIcon } from 'lucide-react';
import { Flex, Spinner } from '@radix-ui/themes';

import { useFileUploader } from '@/hooks/useFileUploader';
import { useAppStore } from '@/stores/useAppStore';
import { useShallow } from 'zustand/react/shallow';

export function FileUploader() {
  const { onLoadFiles, isFileEmpty, isLoading } = useAppStore(
    useShallow((s) => ({
      onLoadFiles: s.loadFiles,
      isFileEmpty: s.fileIds.length <= 0,
      isLoading: s.isParsing,
    }))
  );
  const { fileInputRef, fileList, handleFileChange } = useFileUploader();

  useEffect(() => {
    if (fileList) {
      onLoadFiles([...fileList]);
      return;
    }
  }, [fileList, onLoadFiles]);

  useEffect(() => {
    if (!isFileEmpty || !fileInputRef.current) {
      return;
    }
    fileInputRef.current.value = '';
  }, [fileInputRef, isFileEmpty]);

  return (
    <label htmlFor="file-uploader">
      <Flex align="center" justify="center" className="h-full">
        {isLoading ? <Spinner /> : <FilePlusIcon strokeWidth="1" />}
      </Flex>
      <input
        id="file-uploader"
        className="hidden"
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        accept=".csv"
        multiple
      />
    </label>
  );
}
