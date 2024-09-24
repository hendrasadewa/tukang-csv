import { numberFormatter } from '@/utils/formatter';
import { Badge } from '@radix-ui/themes';

interface Props {
  page: number;
  perPage: number;
  totalItem: number;
}

export function TablePageInfo({ page, perPage, totalItem }: Props) {
  const fromPageCount = numberFormatter.format((page - 1) * perPage + 1);
  const toPageCount = numberFormatter.format(page * perPage);

  return (
    <Badge variant="outline">
      {fromPageCount} - {toPageCount} of &nbsp;
      {numberFormatter.format(totalItem)} data
    </Badge>
  );
}
