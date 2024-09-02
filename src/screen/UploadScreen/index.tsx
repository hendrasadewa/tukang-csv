import { useEffect, useRef } from 'react';

import { useUploaderStore } from '../../lib/stores/useUploaderStore';
import { CloudUploadIcon, LoaderIcon } from 'lucide-react';
import { Heading } from '@radix-ui/themes';
import FileCard from '../../components/FileCard';

export default function UploadScreen() {
  const ref = useRef<HTMLInputElement>(null);
  const [status, files, onFileChange] = useUploaderStore((s) => [
    s.status,
    s.files,
    s.onFileChange,
  ]);

  useEffect(() => {
    if (files.length > 0) {
      return;
    }

    if (!ref.current) {
      return;
    }

    ref.current.value = '';
  }, [files]);

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
            type="file"
            className="hidden"
            onChange={onFileChange}
            ref={ref}
            multiple
          />
        </label>

        {status === 'loaded' && (
          <>
            <Heading>Loaded Files ({files.length})</Heading>
            {files.map((file, index) => (
              <FileCard file={file} key={file.name} index={index} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
