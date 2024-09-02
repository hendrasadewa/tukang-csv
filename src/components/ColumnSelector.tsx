import { Select } from '@radix-ui/themes';
import { FieldItem } from '../dto/csv';

interface Props {
  fields: FieldItem[];
  onChange(selected: string): void;
  selected?: string;
}

export default function ColumnSelector({
  fields = [],
  onChange,
  selected,
}: Props) {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select.Root defaultValue={selected} onValueChange={handleChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {fields.map((field) => (
            <Select.Item value={field.id}>{field.fieldName}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
