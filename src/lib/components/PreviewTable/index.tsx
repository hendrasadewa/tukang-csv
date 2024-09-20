import { Badge, Flex, Spinner, Table, Text } from '@radix-ui/themes';

import { usePreviewStore } from '@/lib/stores/usePreviewStore';
import useTableData from '@/lib/hooks/useTableData';
import { numberFormatter } from '@/lib/utils/formatter';

import TableBody from './components/TableBody';
import TableHeader from './components/TableHeader';
import TablePagination from './components/TablePagination';
import TablePerPage from './components/TablePerPage';

interface Props {
  isLoading: boolean;
}

export default function PreviewTable({ isLoading }: Props) {
  const columns = usePreviewStore((s) => s.columns);
  const data = usePreviewStore((s) => s.data);

  const {
    action: { onChangePage, onNextPage, onPerPageChanged, onPrevPage },
    data: { displayed },
    pagination: { page, perPage, totalItem, totalPage },
  } = useTableData(data);

  const isTableLoaded = columns.length > 0;

  return (
    <>
      <Flex align="center" justify="between">
        <div />
        {isTableLoaded && (
          <Flex align="center" gap="2" px="2" justify="between">
            <Badge variant="outline">
              {(page - 1) * perPage + 1} - {page * perPage} of &nbsp;
              {numberFormatter.format(totalItem)} data
            </Badge>
            <TablePerPage
              onPerPageChanged={onPerPageChanged}
              perPage={perPage}
            />
            <TablePagination
              page={page}
              totalPages={totalPage}
              onPageChanged={onChangePage}
              onPreviousClick={onPrevPage}
              onNextClick={onNextPage}
            />
          </Flex>
        )}
      </Flex>
      <div className="relative">
        {isLoading && (
          <Flex
            align="center"
            justify="center"
            gap="2"
            className="w-full h-full absolute bg-white/90 z-10"
          >
            <Spinner />
            <Text>Loading Preview...</Text>
          </Flex>
        )}
        {isTableLoaded && (
          <Table.Root>
            <TableHeader columns={columns} />
            <TableBody columns={columns} displayedData={displayed} />
          </Table.Root>
        )}
      </div>
    </>
  );
}
