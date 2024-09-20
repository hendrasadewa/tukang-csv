import { Button, Flex, Heading, Separator, Tooltip } from '@radix-ui/themes';
import { useState } from 'react';
import { toast } from 'sonner';
import { FileJsonIcon, TrashIcon } from 'lucide-react';

import { useFileStore } from '@/lib/stores/useFileStore';
import { usePreviewStore } from '@/lib/stores/usePreviewStore';
import FileList from '@/lib/components/FileList';
import PreviewTable from '@/lib/components/PreviewTable';
import FrameTemplate from '@/lib/components/FrameTemplate';
import FileUploader from '@/lib/components/FileUploader';

export function DashboardPage() {
  const [files, loadFiles, parseFile, unParseFile] = useFileStore((s) => [
    s.files,
    s.loadFiles,
    s.parseFile,
    s.unParseFile,
    s.removeFile,
  ]);
  const [loadPreview, unLoadPreview] = usePreviewStore((s) => [
    s.loadPreview,
    s.unLoadPreview,
  ]);
  const [selected, setSelected] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handlePreviewClick = async (id: string) => {
    try {
      setLoading(true);
      if (id === selected) {
        unLoadPreview();
        unParseFile(id);
        setSelected('');
        return;
      }
      setSelected(id);
      await parseFile(id);
      await loadPreview(id);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex className="min-h-screen">
      <div className="h-full border-r-0 w-1/3">
        <FrameTemplate
          header={
            <>
              <Heading>Files</Heading>
              <Tooltip content="Upload File">
                <FileUploader onFileChange={loadFiles} />
              </Tooltip>
            </>
          }
        >
          <FileList
            selectedId={selected}
            files={files}
            onLoadFile={loadFiles}
            onPreviewClick={handlePreviewClick}
            isLoading={isLoading}
          />
        </FrameTemplate>
      </div>
      <div className="h-screen border-l w-2/3">
        <FrameTemplate
          header={
            <Flex align="center" px="2" gap="2">
              <Tooltip content="Export to JSON">
                <Button variant="ghost">
                  <FileJsonIcon strokeWidth="1" color="gray" />
                </Button>
              </Tooltip>
              <Separator orientation="vertical" size="1" />
              <Tooltip content="Remove File">
                <Button variant="ghost">
                  <TrashIcon strokeWidth="1" color="gray" />
                </Button>
              </Tooltip>
            </Flex>
          }
        >
          <PreviewTable isLoading={isLoading} />
        </FrameTemplate>
      </div>
    </Flex>
  );
}
