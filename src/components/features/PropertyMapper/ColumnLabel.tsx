import { Flex, Text } from '@radix-ui/themes';

interface Props {
  name: string;
}

export function ColumnLabel({ name }: Props) {
  return (
    <Flex align="center" px="1" py="2" gap="2" width="100%">
      <Text>{name}</Text>
    </Flex>
  );
}
