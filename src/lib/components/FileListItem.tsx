import { numberFormatter } from '@/lib/utils/formatter';
import { Badge, Card } from '@radix-ui/themes';
import { toast } from 'sonner';

interface Props {
  id: string;
  fileName: string;
  sizeInBytes: number;
  modifiedAt: number;
  fileType: string;
  onClick(id: string): void;
  isActive: boolean;
  isLoading: boolean;
}

export function FileListItem({
  id,
  fileName = '',
  fileType,
  sizeInBytes,
  modifiedAt,
  onClick,
  isActive,
  isLoading,
}: Props) {
  const displayDate = new Date(modifiedAt).toLocaleDateString();
  const displaySize = numberFormatter.format(Math.round(sizeInBytes / 1_000));
  const displayFileName =
    fileName.length > 40 ? `${fileName.substring(0, 25)}...` : fileName;
  const handleCardClick = () => {
    if (isLoading) {
      toast.info('Please wait until parsing completed');
      return;
    }
    onClick(id);
  };

  return (
    <Card
      onClick={handleCardClick}
      className={[
        'transition-shadow',
        isActive ? 'bg-blue-200 shadow-lg' : '',
      ].join(' ')}
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <h3 className="font-bold">{displayFileName}</h3>
          <div className="flex items-center gap-2">
            <Badge>{fileType}</Badge>
            <span></span>
            <span>{displaySize}KB</span>
            <span>{displayDate}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
