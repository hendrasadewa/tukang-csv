import { Flex } from '@radix-ui/themes';
import { CSVFileState } from '@/lib/dto/csv';

import { ListItem } from './components/ListItem';

interface Props {
  files: CSVFileState[];
  onRemove(id: string): void;
  onParse(id: string): void;
}

export function FileList({ files, onRemove, onParse }: Props) {
  return (
    <Flex direction="column" gap="2">
      {files.map((file) => (
        <ListItem
          id={file.id}
          key={file.id}
          fileName={file.fileName}
          sizeInBytes={file.sizeInBytes}
          modifiedAt={file.modifiedAt}
          fileType={file.fileType}
          isParsed={file.status === 'parsed'}
          onRemove={onRemove}
          onParse={onParse}
        />
      ))}
    </Flex>
  );
}
