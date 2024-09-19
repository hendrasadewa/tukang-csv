import { TextField } from '@radix-ui/themes';
import { SearchIcon } from 'lucide-react';

export default function TableSearch() {
  return (
    <TextField.Root placeholder="Search the docs…">
      <TextField.Slot>
        <SearchIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
}
