import { Flex } from '@radix-ui/themes';

import { ListItemInfo } from './ListItemInfo';
import { ListItemLoadMenu } from './ListItemLoadMenu';
import { ListItemParsedMenu } from './ListItemParsedMenu';
import { FileTextIcon } from 'lucide-react';

interface Props {
  id: string;
  fileName: string;
  fileType: string;
  sizeInBytes: number;
  modifiedAt: number;
  isParsed: boolean;
  onRemove(id: string): void;
  onParse(id: string): void;
}

export function ListItem({
  id,
  fileName,
  fileType,
  sizeInBytes,
  modifiedAt,
  isParsed,
  onParse,
  onRemove,
}: Props) {
  return (
    <Flex className="shadow border bg-white" direction="column">
      <Flex justify="between" gap="2" p="2" pr="4">
        <Flex align="center" gap="2">
          <FileTextIcon size={42} strokeWidth={1} className="w-11" />
          <ListItemInfo
            fileName={fileName}
            sizeInBytes={sizeInBytes}
            modifiedAt={modifiedAt}
            fileType={fileType}
          />
        </Flex>
        {!isParsed && (
          <ListItemLoadMenu id={id} onParse={onParse} onRemove={onRemove} />
        )}
      </Flex>
      {isParsed && <ListItemParsedMenu id={id} onRemove={onRemove} />}
    </Flex>
  );
}
