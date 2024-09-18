import { Flex, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

interface Props {
  label: string;
  to: string;
}

export function NavigationItem({ label = '', to = '/' }: Props) {
  return (
    <Link to={to}>
      <Flex align="center" gap="1">
        <Text weight="medium">{label}</Text>
      </Flex>
    </Link>
  );
}
