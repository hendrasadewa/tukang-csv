import { useEffect, useMemo, useState } from 'react';
import { Button } from '@radix-ui/themes';
import { ClipboardCopyIcon } from 'lucide-react';
import { toast } from 'sonner';

import { FieldItem } from '../../dto/csv';
import { useCSVStore } from '../../lib/stores/useCSVStore';
import PreviewTable from '../../components/PreviewTable';
import ColumnSelector from '../../components/ColumnSelector';

export default function PreviewScreen() {
  const parseResult = useCSVStore((s) => s.parseResult);
  const [availableField, setAvailableField] = useState<FieldItem[]>([]);
  const [isConvertToString, setConvertToString] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState<string>('');

  const onlySelected = useMemo(
    () => availableField.filter((item) => item.isSelected),
    [availableField]
  );

  const result = useMemo(
    () =>
      parseResult?.data.flatMap((data) =>
        isConvertToString ? `'${data[selectedField]}'` : data[selectedField]
      ),
    [isConvertToString, parseResult?.data, selectedField]
  );

  const handleClipboardClick = () => {
    if (!result) {
      return;
    }
    window.navigator.clipboard.writeText(result.join(','));
    toast.success('Value copied to the clipboard');
  };

  const handleParseToStringChecked = () => {
    setConvertToString((prev) => !prev);
  };

  const handleFieldChange = (id: string) => {
    setSelectedField(id);
  };

  useEffect(() => {
    if (!parseResult) {
      return;
    }

    if (!parseResult.meta || !parseResult.meta.fields) {
      return;
    }

    const { fields } = parseResult.meta;
    setAvailableField(
      fields.map((field) => ({
        fieldName: field,
        id: field.replace(' ', '_'),
        isSelected: true,
      }))
    );
  }, [parseResult]);

  return (
    <>
      <div className="flex items-center">
        {parseResult && (
          <>
            <ColumnSelector
              fields={availableField}
              selected={selectedField}
              onChange={handleFieldChange}
            />
            <Button onClick={handleClipboardClick}>
              <ClipboardCopyIcon />
              Copy To Clipboard
            </Button>
            <label htmlFor="convert-to-string">
              <input
                id="convert-to-string"
                checked={isConvertToString}
                onChange={handleParseToStringChecked}
                type="checkbox"
              />
              Convert To String
            </label>
          </>
        )}
      </div>

      {parseResult && (
        <PreviewTable data={parseResult.data} fields={onlySelected} />
      )}
    </>
  );
}
