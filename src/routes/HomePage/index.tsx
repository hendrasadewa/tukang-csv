import { FileList } from '@/lib/components/FileList';
import { FileUploader } from '@/lib/components/FileUploader';
import { useFileStore } from '@/lib/stores/useFileStore';
import { Flex, Heading } from '@radix-ui/themes';

export function HomePage() {
  const handleFileChange = useFileStore((s) => s.loadFiles);
  const files = useFileStore((s) => s.files);
  const onParse = useFileStore((s) => s.parseFile);
  const onRemove = useFileStore((s) => s.removeFile);

  return (
    <Flex direction="column" gap="2">
      <FileUploader
        onFileChange={handleFileChange}
        isFileEmpty={files.length === 0}
      />
      <Heading>Uploaded Files</Heading>
      <FileList files={files} onParse={onParse} onRemove={onRemove} />
    </Flex>
  );
}
