import { ChangeEvent, useEffect, useRef, useState } from 'react';

export function useFileUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    setFileList(event.target.files);
  };

  useEffect(() => {
    if (fileList !== null || !fileInputRef.current) {
      return;
    }

    fileInputRef.current.value = '';
  }, [fileList]);

  return {
    fileInputRef,
    fileList,
    handleFileChange,
  };
}
