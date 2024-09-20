import { useEffect } from 'react';
import { FilePlusIcon } from 'lucide-react';
import { Flex, Spinner } from '@radix-ui/themes';

import { useFileUploader } from '../hooks/useFileUploader';

interface Props {
  isLoading?: boolean;
  isFileEmpty?: boolean;
  onFileChange: (files: File[]) => Promise<void>;
}

export default function FileUploader({
  isLoading = false,
  isFileEmpty = true,
  onFileChange,
}: Props) {
  const { fileInputRef, fileList, handleFileChange } = useFileUploader();

  useEffect(() => {
    if (fileList) {
      onFileChange([...fileList]);
      return;
    }
  }, [fileList, onFileChange]);

  useEffect(() => {
    if (!isFileEmpty || !fileInputRef.current) {
      return;
    }
    fileInputRef.current.value = '';
  }, [fileInputRef, isFileEmpty]);

  return (
    <label htmlFor="file-uploader">
      {isLoading && <Spinner />}
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
