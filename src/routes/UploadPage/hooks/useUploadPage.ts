import { useEffect, useRef } from 'react';

import { useCSVStore } from '@/lib/stores/useCSVStore';
import { useUploaderStore } from '@/lib/stores/useUploaderStore';

export default function useUploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const status = useUploaderStore((s) => s.status);
  const files = useUploaderStore((s) => s.files);
  const onFileChange = useUploaderStore((s) => s.onFileChange);
  const parseResult = useCSVStore((s) => s.parseResult);

  useEffect(() => {
    if (files.length > 0) {
      return;
    }

    if (!fileInputRef.current) {
      return;
    }

    fileInputRef.current.value = '';
  }, [files, parseResult]);

  return {
    status,
    files,
    onFileChange,
    parseResult,
    fileInputRef,
  };
}
