import { Flex, Heading, Tooltip } from '@radix-ui/themes';

import { FileList } from '@/components/features/FileList';
import { PreviewTable } from '@/components/features/PreviewTable';
import { FileUploader } from '@/components/features/FileUploader';
import { FrameTemplate } from '@/components/templates/FrameTemplate';

export function DashboardPage() {
  return (
    <Flex className="min-h-screen">
      <div className="h-full w-1/3">
        <FrameTemplate
          header={
            <Flex align="center" justify="between">
              <Heading size="5">Tukang CSV</Heading>
              <Tooltip content="Upload File">
                <FileUploader />
              </Tooltip>
            </Flex>
          }
        >
          <FileList />
        </FrameTemplate>
      </div>
      <div className="h-screen border-l w-2/3">
        <FrameTemplate header={<></>}>
          <PreviewTable />
        </FrameTemplate>
      </div>
    </Flex>
  );
}
