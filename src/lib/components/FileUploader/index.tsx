import { Box } from '@radix-ui/themes';
import { Loader } from './components/Loader';
import { LabelDisplay } from './components/LabelDisplay';
import { useFileUploader } from './hooks/useFileUploader';
import { useEffect } from 'react';

interface Props {
  isLoading?: boolean;
  isFileEmpty?: boolean;
  onFileChange: (files: File[]) => Promise<void>;
}

export function FileUploader({
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
    <Box
      className="bg-slate-50/20 h-48 w-full border-4 border-dashed  border-slate-300 rounded-lg"
      p="2"
      asChild
    >
      <label htmlFor="file-uploader">
        {isLoading ? <Loader /> : <LabelDisplay />}
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
    </Box>
  );
}
