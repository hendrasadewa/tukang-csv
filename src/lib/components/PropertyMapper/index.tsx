import { Button, Card, Flex, Text } from '@radix-ui/themes';
import { DownloadIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { copyOrDownloadFile } from '@/lib/utils/file';

import { ColumnLabel } from './components/ColumnLabel';

interface Props {
  columns: string[];
  data: string[][];
}

interface FormSchema {
  selectedColumn: string[];
}

export default function PropertyMapper({ columns, data = [] }: Props) {
  const { register, handleSubmit } = useForm<FormSchema>({
    defaultValues: {
      selectedColumn: [],
    },
  });

  const handleOnSubmitValid = ({ selectedColumn }: FormSchema) => {
    if (selectedColumn.length <= 0) {
      toast.error('Please select one of field before download');
      return;
    }
    if (!data) {
      toast.error('File does not exists');
      return;
    }

    copyOrDownloadFile(JSON.stringify(data.flat()), 1);
    toast.success('Download success!');
  };

  return (
    <Card>
      <Flex direction="column" gap="2" asChild>
        <form onSubmit={handleSubmit(handleOnSubmitValid)}>
          <Text weight="bold">Extract</Text>
          {columns.map((column) => (
            <Flex justify="between" align="center" gap="2" key={column} asChild>
              <label>
                <input
                  {...register('selectedColumn')}
                  value={column}
                  type="checkbox"
                />
                <ColumnLabel name={column} />
              </label>
            </Flex>
          ))}

          <Button type="submit">
            <DownloadIcon size={16} />
            Download as JSON
          </Button>
        </form>
      </Flex>
    </Card>
  );
}
