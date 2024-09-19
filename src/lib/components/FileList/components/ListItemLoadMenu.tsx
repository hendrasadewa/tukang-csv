import { Button, Flex, Separator } from '@radix-ui/themes';
import { EyeIcon, EyeOffIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useFileStore } from '@/lib/stores/useFileStore';
import { usePreviewStore } from '@/lib/stores/usePreviewStore';

interface Props {
  id: string;
  isParsed: boolean;
}

export function ListItemLoadMenu({ id }: Props) {
  const [parseFile, unParseFile, onRemoveClick] = useFileStore((s) => [
    () => s.parseFile(id),
    () => s.unParseFile(id),
    () => s.removeFile(id),
  ]);
  const [columns, loadPreview, unLoadPreview] = usePreviewStore((s) => [
    s.columns,
    () => s.loadPreview(id),
    () => s.unLoadPreview(),
  ]);
  const [isLoading, setLoading] = useState(false);

  const handlePreviewClick = async () => {
    try {
      setLoading(true);
      if (isPreviewLoaded) {
        unLoadPreview();
        unParseFile();
        return;
      }
      await parseFile();
      await loadPreview();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const isPreviewLoaded = columns.length > 0;

  return (
    <Flex align="center" gap="2">
      <Button variant="ghost" onClick={handlePreviewClick} loading={isLoading}>
        {isPreviewLoaded ? <EyeOffIcon /> : <EyeIcon />}
      </Button>
      <Separator orientation="vertical" />
      <Button color="red" variant="ghost" onClick={onRemoveClick}>
        <Trash2Icon size={24} />
      </Button>
    </Flex>
  );
}
