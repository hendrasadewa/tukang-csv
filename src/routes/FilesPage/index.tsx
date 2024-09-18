import { Box, Heading } from '@radix-ui/themes';

import { FileList } from '@/lib/components/FileList';
import { FileUploader } from '@/lib/components/FileUploader';
import { useFileStore } from '@/lib/stores/useFileStore';

export function FilesPage() {
  const [handleFileChange, files] = useFileStore((s) => [s.loadFiles, s.files]);
  const isFileEmpty = files.length === 0;

  return (
    <Box className="space-y-4">
      <FileUploader onFileChange={handleFileChange} isFileEmpty={isFileEmpty} />
      <Box asChild>
        <section>
          <Heading mb="2">Files</Heading>
          <FileList files={files} />
        </section>
      </Box>
    </Box>
  );
}
