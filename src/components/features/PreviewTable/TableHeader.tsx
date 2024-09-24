import { Table } from '@radix-ui/themes';

interface Props {
  columns: string[];
}

export function TableHeader({ columns }: Props) {
  return (
    <Table.Header className="sticky top-0 bg-white/35 backdrop-blur-sm">
      <Table.Row>
        {columns.map((column) => (
          <Table.ColumnHeaderCell key={column} style={{ whiteSpace: 'nowrap' }}>
            {column}
          </Table.ColumnHeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
}
