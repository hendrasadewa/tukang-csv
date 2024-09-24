import { Button, Flex, Heading, Tooltip } from '@radix-ui/themes';

import { FileList } from '@/components/features/FileList';
import { PreviewTable } from '@/components/features/PreviewTable';
import { FileUploader } from '@/components/features/FileUploader';

export function DashboardPage() {
  return (
    <Flex className="min-h-screen">
      <div className="h-full w-1/4">
        <Flex align="center" justify="between" className="h-12" px="2">
          <Heading>Tukang CSV</Heading>
          <Tooltip content="Upload File">
            <Button variant="ghost">
              <FileUploader />
            </Button>
          </Tooltip>
        </Flex>
        <FileList />
      </div>
      <div className="h-screen border-l w-3/4">
        <PreviewTable />
      </div>
    </Flex>
  );
}
