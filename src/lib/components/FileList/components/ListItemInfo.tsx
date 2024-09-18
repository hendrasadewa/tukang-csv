interface Props {
  fileName: string;
  sizeInBytes: number;
  modifiedAt: number;
  fileType: string;
}

export function ListItemInfo({
  fileName = '',
  fileType,
  sizeInBytes,
  modifiedAt,
}: Props) {
  const displayDate = new Date(modifiedAt).toLocaleDateString();
  const displaySize = Math.round(sizeInBytes / 1_000);
  const displayFileName =
    fileName.length > 30 ? `${fileName.substring(0, 25)}...` : fileName;

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{displayFileName}</h3>
        <div className="flex items-center gap-2">
          <span>{fileType}</span>
          <span>{displaySize}KB</span>
          <span>{displayDate}</span>
        </div>
      </div>
    </div>
  );
}
