import { Flex, Heading } from '@radix-ui/themes';
import { LoaderIcon } from 'lucide-react';

export function Loader() {
  return (
    <Flex direction="column" align="center" justify="center" className="h-full">
      <LoaderIcon className="animate-spin" size={48} />
      <Heading align="center">Uploading File...</Heading>
    </Flex>
  );
}
