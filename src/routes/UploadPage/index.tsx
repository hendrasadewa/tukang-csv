import { CloudUploadIcon, LoaderIcon } from 'lucide-react';
import { Heading } from '@radix-ui/themes';

import { FileCard } from '@/lib/components';

import useUploadPage from './hooks/useUploadPage';

export function UploadPage() {
  const { status, files, onFileChange, fileInputRef } = useUploadPage();
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
            ref={fileInputRef}
            accept=".csv"
            multiple
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
