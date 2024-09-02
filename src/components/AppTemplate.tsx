import { Box, Flex, Heading } from '@radix-ui/themes';
import { FileIcon } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export default function AppTemplate() {
  return (
    <Box className="max-w-screen-sm m-auto">
      <Flex align="center" justify="center" p="2" gap="1" mb="4" asChild>
        <header>
          <FileIcon />
          <Heading align="center">Tukang CSV</Heading>
        </header>
      </Flex>
      <Box asChild>
        <main>
          <Outlet />
        </main>
      </Box>
    </Box>
  );
}
