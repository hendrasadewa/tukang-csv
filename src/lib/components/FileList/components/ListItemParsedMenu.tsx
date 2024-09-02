import { Button, Flex } from '@radix-ui/themes';
import { Trash2Icon } from 'lucide-react';

interface Props {
  id: string;
  onRemove(id: string): void;
}

export function ListItemParsedMenu({ id, onRemove }: Props) {
  const onRemoveClick = () => onRemove(id);

  return (
    <Flex align="center" gap="1">
      <Button color="red" variant="ghost" onClick={onRemoveClick}>
        <Trash2Icon size={24} />
      </Button>
    </Flex>
  );
}
