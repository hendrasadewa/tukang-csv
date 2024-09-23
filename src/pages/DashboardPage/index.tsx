import { Flex, Heading, Tooltip } from '@radix-ui/themes';

import FileList from '@/lib/components/FileList';
import PreviewTable from '@/lib/components/PreviewTable';
import FrameTemplate from '@/lib/components/FrameTemplate';
import FileUploader from '@/lib/components/FileUploader';
import { useFileManagerStore } from '@/lib/stores/useFileManagerStore';
import { useDashboardStore } from '@/lib/stores/useDashboardStore';
import { useCSVStore } from '@/lib/stores/useCSVStore';

export function DashboardPage() {
  const handleLoadFiles = useFileManagerStore((s) => s.loadFiles);
  const csvFiles = useFileManagerStore((s) =>
    s.ids.map((id) => s.fileRecord[id])
  );
  const selected = useDashboardStore((s) => s.selected);
  const isLoading = useDashboardStore((s) => s.isLoading);
  const handlePreviewClick = useDashboardStore((s) => s.onSelectFile);
  const csv = useCSVStore((s) => s.csvList[selected]);

  return (
    <Flex className="min-h-screen">
      <div className="h-full w-1/3">
        <FrameTemplate
          header={
            <Flex align="center" justify="between">
              <Heading size="5">Tukang CSV</Heading>
              <Tooltip content="Upload File">
                <FileUploader onFileChange={handleLoadFiles} />
              </Tooltip>
            </Flex>
          }
        >
          <FileList
            selectedId={selected}
            files={csvFiles}
            onPreviewClick={handlePreviewClick}
            isLoading={isLoading}
          />
        </FrameTemplate>
      </div>
      <div className="h-screen border-l w-2/3">
        <FrameTemplate header={<></>}>
          <PreviewTable
            columns={csv?.fields}
            dataSource={csv?.json}
            isLoading={isLoading}
            isLoaded={csv?.status === 'parsed'}
          />
        </FrameTemplate>
      </div>
    </Flex>
  );
}
