import { Heading } from '@radix-ui/themes';
import { CloudUploadIcon, LoaderIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { useUploaderStore } from '../../lib/stores/useUploaderStore';
import FileCard from '../../components/FileCard';
import { useCSVStore } from '../../lib/stores/useCSVStore';

export default function UploadScreen() {
  const ref = useRef<HTMLInputElement>(null);

  const status = useUploaderStore((s) => s.status);
  const files = useUploaderStore((s) => s.files);
  const onFileChange = useUploaderStore((s) => s.onFileChange);
  const parseResult = useCSVStore((s) => s.parseResult);

  useEffect(() => {
    if (files.length > 0) {
      return;
    }

    if (!ref.current) {
      return;
    }

    ref.current.value = '';
  }, [files, parseResult]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <label
          className="h-48 p-2 border-4 border-dashed rounded-lg w-full"
          htmlFor="upload-file-input"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <CloudUploadIcon className="animate-bounce" size={48} />
            <Heading>Click here to upload</Heading>
            <p>Supported formats: CSV</p>

            {status === 'loading' && (
              <>
                <LoaderIcon className="animate-spin" size={48} />
                <h2 className="">Click here to upload</h2>
              </>
            )}
          </div>

          <input
            id="upload-file-input"
            className="hidden"
            type="file"
            onChange={onFileChange}
            ref={ref}
            accept=".csv"
          />
        </label>

        {status === 'loaded' && (
          <>
            <Heading>Loaded File</Heading>
            {files.map((file, index) => (
              <FileCard file={file} key={file.name} index={index} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
