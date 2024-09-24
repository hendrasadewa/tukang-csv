import { Box, Flex, Text } from '@radix-ui/themes';

import { FileListItem } from './FileListItem';
import { useAppStore } from '@/stores/useAppStore';
import { useShallow } from 'zustand/react/shallow';

export function FileList() {
  const { selectedFileId, fileList, onSelectFile, isLoading } = useAppStore(
    useShallow((s) => ({
      fileList: s.fileIds.map((id) => s.fileRecord[id]),
      selectedFileId: s.selectedFileId,
      isLoading: s.isParsing,
      onSelectFile: s.onSelectFile,
    }))
  );
  return (
    <Box px="2">
      {fileList.length <= 0 && <Text>File is empty</Text>}
      <Flex direction="column" gap="2">
        {fileList.map(({ file, id }) => (
          <FileListItem
            id={id}
            fileName={file.name}
            sizeInBytes={file.size}
            modifiedAt={file.lastModified}
            fileType={file.type}
            key={id}
            onClick={onSelectFile}
            isActive={id === selectedFileId}
            isLoading={isLoading}
          />
        ))}
      </Flex>
    </Box>
  );
}
