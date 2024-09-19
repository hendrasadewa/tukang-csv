import { Box, Heading } from '@radix-ui/themes';

import { FileList } from '@/lib/components/FileList';
import { FileUploader } from '@/lib/components/FileUploader';
import { useFileStore } from '@/lib/stores/useFileStore';
import PreviewTable from '@/lib/components/PreviewTable';
import { usePreviewStore } from '@/lib/stores/usePreviewStore';

export function FilesPage() {
  const [handleFileChange, files] = useFileStore((s) => [s.loadFiles, s.files]);
  const isPreviewEmpty = usePreviewStore((s) => s.columns.length <= 0);
  const isFileEmpty = files.length === 0;

  return (
    <Box className="space-y-1">
      <Box>
        <FileUploader
          onFileChange={handleFileChange}
          isFileEmpty={isFileEmpty}
        />
      </Box>
      <Box asChild>
        <section>
          <Heading mb="2">Files</Heading>
          <FileList files={files} />
        </section>
      </Box>
      {!isPreviewEmpty && (
        <Box asChild>
          <section>
            <PreviewTable />
          </section>
        </Box>
      )}
    </Box>
  );
}
