import { Box, Flex } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface Props {
  header: ReactNode;
  children: ReactNode;
}

export default function FrameTemplate({ header, children }: Props) {
  return (
    <Box className="w-full relative">
      <Flex
        className="h-12 px-2 border-b"
        align="center"
        justify="between"
        width="100%"
        asChild
      >
        <header>{header}</header>
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
}
