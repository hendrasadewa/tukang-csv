import { Select } from '@radix-ui/themes';
import { nanoid } from 'nanoid';

interface Props {
  perPage: number;
  onPerPageChanged(perPage: number): void;
}

const PERPAGE_SELECTION = [
  { id: nanoid(), value: '10' },
  { id: nanoid(), value: '25' },
  { id: nanoid(), value: '50' },
];

export function TablePerPage({ perPage, onPerPageChanged }: Props) {
  const handlePerPageChange = (value: string) => {
    onPerPageChanged(parseInt(value, 10));
  };

  return (
    <Select.Root defaultValue="10" onValueChange={handlePerPageChange} size="1">
      <Select.Trigger />
      <Select.Content position="popper">
        <Select.Group>
          {PERPAGE_SELECTION.map(({ id, value }) => (
            <Select.Item
              value={value}
              disabled={perPage.toString() === value}
              key={id}
            >
              {value} items
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
