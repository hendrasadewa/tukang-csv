import {
  Button,
  Checkbox,
  Flex,
  Select,
  Separator,
  Text,
} from '@radix-ui/themes';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  FileInputIcon,
  FileTextIcon,
  SaveIcon,
  Trash2Icon,
} from 'lucide-react';

import { useUploaderStore } from '@/lib/stores/useUploaderStore';
import { useCSVStore } from '@/lib/stores/useCSVStore';
import { copyOrDownloadFile } from '@/lib/utils/file';

interface Props {
  file: File;
  index: number;
}

export function FileCard({ file }: Props) {
  const { lastModified, name, size, type } = file;
  const [selectedField, setSelectedField] = useState<string>('');
  const [convertToString, setConvertToString] = useState<boolean>();

  const isLoading = useCSVStore((s) => s.status === 'loading');
  const parseResult = useCSVStore((s) => s.parseResult);
  const unloadCSV = useCSVStore((s) => s.unLoadCSV);
  const loadCSV = useCSVStore((s) => async () => {
    await s.loadCSV(file);
    toast.success('File load success!');
    await s.parseCSV();
    toast.success('File parse success!');
  });

  const onRemoveClick = useUploaderStore((s) => () => {
    unloadCSV();
    s.onClearFile();
  });

  const onFieldChange = (field: string) => {
    setSelectedField(field);
  };

  const onCopyClick = () => {
    if (!parseResult) {
      toast.error('There is nothing to copy', {
        description: 'Upload and choose the field first',
      });
      return;
    }

    const values = parseResult.data.map((item) => `'${item[selectedField]}'`);
    copyOrDownloadFile(values.join(',\n'));
  };

  return (
    <div className="border rounded-lg p-2 bg-slate-50 shadow-sm">
      <div className="flex items-center gap-2">
        <FileTextIcon size={42} strokeWidth={1} />
        <div className="flex flex-col justify-between w-full gap-2">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">
                {name.length > 30 ? `${name.substring(0, 25)}...` : name}
              </h3>
              <div className="flex items-center gap-2">
                <span>{type}</span>
                <span>{new Date(lastModified).toLocaleDateString()}</span>
                <span>{Math.round(size / 1000)} KB</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {parseResult && parseResult.meta.fields ? (
              <>
                <Select.Root
                  defaultValue={parseResult.meta.fields[0]}
                  onValueChange={onFieldChange}
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      {parseResult.meta.fields.map((field) => (
                        <Select.Item value={field}>{field}</Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
                <Separator orientation="vertical" />
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Checkbox
                      checked={convertToString}
                      onCheckedChange={(e) => {
                        if (e === 'indeterminate') {
                          return;
                        }
                        setConvertToString(e);
                      }}
                    />
                    Convert to string
                  </Flex>
                </Text>
                <Separator orientation="vertical" />
                <Button color="blue" onClick={onCopyClick} loading={isLoading}>
                  <SaveIcon size={16} />
                </Button>
                <Separator orientation="vertical" />
                <Button color="red" onClick={onRemoveClick}>
                  <Trash2Icon size={16} />
                </Button>
              </>
            ) : (
              <>
                <Button color="jade" onClick={loadCSV} loading={isLoading}>
                  <FileInputIcon size={16} /> Open
                </Button>
                <Separator orientation="vertical" />
                <Button color="red" onClick={onRemoveClick}>
                  <Trash2Icon size={16} /> Remove
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
