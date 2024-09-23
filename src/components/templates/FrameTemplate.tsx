import { Box, Flex } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface Props {
  header: ReactNode;
  children: ReactNode;
}

export function FrameTemplate({ header, children }: Props) {
  return (
    <Flex direction="column">
      <Box className="h-12 p-2 border-b" width="100%" asChild>
        <header>{header}</header>
      </Box>
      <Flex direction="column" flexGrow="1">
        {children}
      </Flex>
    </Flex>
  );
}
