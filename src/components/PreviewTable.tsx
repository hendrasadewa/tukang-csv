import { Table } from '@radix-ui/themes';
import { FieldItem, PreviewData } from '../dto/csv';

interface Props {
  fields: FieldItem[];
  data: Array<PreviewData>;
}

export default function PreviewTable({ fields = [], data = [] }: Props) {
  const headers = fields.filter((field) => field.isSelected);

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {headers.map((field) => (
            <Table.ColumnHeaderCell key={field.id}>
              {field.fieldName}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item, index) => (
          <Table.Row key={`table-row-${index}`}>
            {headers.map((field) => (
              <Table.Cell key={`table-cell-${field.fieldName}-${index}`}>{`${
                item[field.fieldName]
              }`}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
