import { Button, Flex } from '@radix-ui/themes';
import { FileJsonIcon, FilterIcon } from 'lucide-react';

export function TableFeatureMenu() {
  return (
    <Flex align="center" gap="2">
      <Button variant="ghost">
        <FileJsonIcon />
      </Button>
      <Button variant="ghost">
        <FilterIcon />
      </Button>
    </Flex>
  );
}
