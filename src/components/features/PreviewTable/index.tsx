import { Badge, Flex, Spinner, Table, Text } from '@radix-ui/themes';

import { useTableData } from '@/hooks/useTableData';
import { numberFormatter } from '@/utils/formatter';

import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';
import { TablePerPage } from './TablePerPage';
import { useAppStore } from '@/stores/useAppStore';
import { useShallow } from 'zustand/react/shallow';

export function PreviewTable() {
  const {
    dataSource = [],
    columns = [],
    isLoading = false,
    isLoaded = false,
  } = useAppStore(
    useShallow((s) => ({
      dataSource: s.csvRecord[s.selectedFileId]?.json,
      columns: s.csvRecord[s.selectedFileId]?.fields,
      isLoaded: s.csvRecord[s.selectedFileId]?.status === 'parsed',
      isLoading: s.isDashboardLoading,
    }))
  );

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
