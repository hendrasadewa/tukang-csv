import { Box, Flex, Text } from '@radix-ui/themes';

import { StoredFile } from '../types/file';
import { FileListItem } from './FileListItem';

interface Props {
  selectedId: string;
  files: StoredFile[];
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
        {files.map(({ file, id }) => (
          <FileListItem
            id={id}
            fileName={file.name}
            sizeInBytes={file.size}
            modifiedAt={file.lastModified}
            fileType={file.type}
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
