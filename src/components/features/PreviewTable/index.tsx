import { Badge, Flex, Spinner, Table, Text } from '@radix-ui/themes';

import { useTableData } from '@/hooks/useTableData';
import { numberFormatter } from '@/utils/formatter';
import { RowData } from '@/types/csv';

import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';
import { TablePerPage } from './TablePerPage';

interface Props {
  dataSource: RowData[];
  columns: string[];
  isLoading: boolean;
  isLoaded: boolean;
}

export function PreviewTable({
  dataSource = [],
  columns = [],
  isLoading = false,
  isLoaded = false,
}: Props) {
  const {
    paginationActions: {
      onChangePage,
      onNextPage,
      onPerPageChanged,
      onPrevPage,
    },
    data: { displayed },
    pagination: { page, perPage, totalItem, totalPage },
  } = useTableData(dataSource);

  return (
    <>
      <Flex align="center" justify="between" px="3">
        <Badge variant="outline">
          {(page - 1) * perPage + 1} - {page * perPage} of &nbsp;
          {numberFormatter.format(totalItem)} data
        </Badge>
        {isLoaded && (
          <Flex align="center" gap="2" px="2">
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
      <div>
        {isLoading && (
          <Flex
            align="center"
            justify="center"
            gap="2"
            className="w-full h-full bg-white/90 z-10"
          >
            <Spinner />
            <Text>Loading Preview...</Text>
          </Flex>
        )}
        {isLoaded && (
          <Table.Root>
            <TableHeader columns={columns} />
            <TableBody columns={columns} displayedData={displayed} />
          </Table.Root>
        )}
      </div>
    </>
  );
}
