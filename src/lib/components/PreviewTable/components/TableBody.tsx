import { Table } from '@radix-ui/themes';

interface Props {
  columns: Array<string>;
  displayedData: Array<Record<string, string>>;
}

export default function TableBody({ columns, displayedData = [] }: Props) {
  return (
    <Table.Body>
      {displayedData.map((row, rowIndex) => (
        <Table.Row className="hover:bg-blue-50" key={`data-${rowIndex}`}>
          {columns.map((column, columnIndex) => (
            <Table.Cell
              style={{ whiteSpace: 'nowrap' }}
              key={`${column}-${rowIndex}-${columnIndex}`}
            >
              {row[column]}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  );
}
