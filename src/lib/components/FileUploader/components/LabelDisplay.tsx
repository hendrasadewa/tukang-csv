import { Flex, Text } from '@radix-ui/themes';
import { FilePlusIcon } from 'lucide-react';

export function LabelDisplay() {
  return (
    <Flex direction="column" align="center" justify="center" className="h-full">
      <Text>Add File</Text>
      <FilePlusIcon strokeWidth="1" />
    </Flex>
  );
}
