import { Button, Flex, Separator } from '@radix-ui/themes';
import { FileInputIcon, FileOutputIcon, Trash2Icon } from 'lucide-react';

import { useFileStore } from '@/lib/stores/useFileStore';

interface Props {
  id: string;
  isParsed: boolean;
}

export function ListItemLoadMenu({ id, isParsed }: Props) {
  const [onParseClick, onUnParseClick, onRemoveClick] = useFileStore((s) => [
    () => s.parseFile(id),
    () => s.unParseFile(id),
    () => s.removeFile(id),
  ]);

  return (
    <Flex align="center" gap="2">
      {isParsed ? (
        <Button variant="ghost" onClick={onUnParseClick}>
          <FileOutputIcon size={24} />
        </Button>
      ) : (
        <Button variant="ghost" onClick={onParseClick}>
          <FileInputIcon size={24} />
        </Button>
      )}
      <Separator orientation="vertical" />
      <Button color="red" variant="ghost" onClick={onRemoveClick}>
        <Trash2Icon size={24} />
      </Button>
    </Flex>
  );
}
