import { Box, Flex, Heading } from '@radix-ui/themes';
import { GlobeIcon } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export function AppTemplate() {
  return (
    <div className="bg-slate-200 min-h-screen">
      <Box className="max-w-screen-sm" m="auto" p="3">
        <Flex align="center" justify="between" gap="1" mb="4" asChild>
          <header>
            <Heading align="center">Tukang CSV</Heading>
            <Flex align="center" asChild>
              <Link to="https://hendrasadewa.com">
                <GlobeIcon />
              </Link>
            </Flex>
          </header>
        </Flex>
        <Box asChild>
          <main>
            <Outlet />
          </main>
        </Box>
      </Box>
    </div>
  );
}
