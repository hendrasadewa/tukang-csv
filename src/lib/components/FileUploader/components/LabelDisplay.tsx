import { Flex, Heading } from '@radix-ui/themes';
import { CloudUploadIcon } from 'lucide-react';

export function LabelDisplay() {
  return (
    <Flex direction="column" align="center" justify="center" className="h-full">
      <CloudUploadIcon className="animate-bounce" size={48} />
      <Heading align="center">Click here to upload</Heading>
      <p>Supported formats: CSV</p>
    </Flex>
  );
}
