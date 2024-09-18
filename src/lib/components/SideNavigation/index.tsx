import { Box, Flex, Heading } from '@radix-ui/themes';

import { NavigationItem } from './components/NavigationItem';

export function SideNavigation() {
  return (
    <Box
      width="20%"
      height="100%"
      className="border-r min-h-screen"
      px="1"
      asChild
    >
      <aside>
        <Flex direction="column" gap="3" px="2" mb="2" asChild>
          <nav>
            <Flex align="center" gap="1">
              <Heading>Tukang CSV</Heading>
            </Flex>
          </nav>
        </Flex>

        <Flex direction="column" gap="3" px="2" asChild>
          <nav>
            <NavigationItem label="Home" to="/" />
            <NavigationItem label="Files" to="/files" />
          </nav>
        </Flex>
      </aside>
    </Box>
  );
}
