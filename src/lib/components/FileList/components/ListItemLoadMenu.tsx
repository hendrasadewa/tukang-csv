import { Button, Flex, Separator } from '@radix-ui/themes';
import { FileInputIcon, Trash2Icon } from 'lucide-react';

interface Props {
  id: string;
  onRemove(id: string): void;
  onParse(id: string): void;
}

export function ListItemLoadMenu({ id, onRemove, onParse }: Props) {
  const onParseClick = () => onParse(id);
  const onRemoveClick = () => onRemove(id);

  return (
    <Flex align="center" gap="2">
      <Button color="jade" variant="ghost" onClick={onParseClick}>
        <FileInputIcon size={24} />
      </Button>
      <Separator orientation="vertical" />
      <Button color="red" variant="ghost" onClick={onRemoveClick}>
        <Trash2Icon size={24} />
      </Button>
    </Flex>
  );
}
