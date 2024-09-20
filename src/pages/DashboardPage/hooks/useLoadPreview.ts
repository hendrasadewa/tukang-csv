import { useFileStore } from '@/lib/stores/useFileStore';
import { usePreviewStore } from '@/lib/stores/usePreviewStore';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useLoadPreview() {
  const [parseFile, unParseFile] = useFileStore((s) => [
    s.parseFile,
    s.unParseFile,
  ]);
  const [loadPreview, unLoadPreview] = usePreviewStore((s) => [
    s.loadPreview,
    s.unLoadPreview,
  ]);
  const [selected, setSelected] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleLoadPreview = async (id: string) => {
    try {
      setLoading(true);
      if (id === selected) {
        unLoadPreview();
        unParseFile(id);
        setSelected('');
        return;
      }
      setSelected(id);
      await parseFile(id);
      await loadPreview(id);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
}
