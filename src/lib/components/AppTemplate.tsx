import { Box } from '@radix-ui/themes';
import { Outlet } from 'react-router-dom';

export function AppTemplate() {
  return (
    <Box className="min-h-screen">
      <Outlet />
    </Box>
  );
}
