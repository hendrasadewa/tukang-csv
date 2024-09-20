import { Box, Flex, Text } from '@radix-ui/themes';

import { CSVFileState } from '@/lib/dto/csv';

import { ListItemInfo } from './components/ListItemInfo';

interface Props {
  selectedId: string;
  files: CSVFileState<Record<string, unknown>>[];
  onLoadFile(files: File[]): Promise<void>;
  onPreviewClick(id: string): Promise<void>;
  isLoading: boolean;
}

export default function FileList({
  selectedId,
  files,
  onPreviewClick,
  isLoading,
}: Props) {
  return (
    <Box p="2">
      {files.length <= 0 && <Text>File is empty</Text>}
      <Flex direction="column" gap="2">
        {files.map(({ fileName, sizeInBytes, modifiedAt, fileType, id }) => (
          <ListItemInfo
            id={id}
            fileName={fileName}
            sizeInBytes={sizeInBytes}
            modifiedAt={modifiedAt}
            fileType={fileType}
            key={id}
            onClick={onPreviewClick}
            isActive={id === selectedId}
            isLoading={isLoading}
          />
        ))}
      </Flex>
    </Box>
  );
}
