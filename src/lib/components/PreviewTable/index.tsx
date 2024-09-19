import { usePreviewStore } from '@/lib/stores/usePreviewStore';
import { Box, Card, Flex, Heading, Separator, Table } from '@radix-ui/themes';

import TableBody from './components/TableBody';
import TableHeader from './components/TableHeader';
import TablePagination from './components/TablePagination';
import TablePerPage from './components/TablePerPage';
import TableSearch from './components/TableSearch';
import useTableData from '@/lib/hooks/useTableData';

export default function PreviewTable() {
  const columns = usePreviewStore((s) => s.columns);
  const data = usePreviewStore((s) => s.data);

  const {
    action: { onChangePage, onNextPage, onPerPageChanged, onPrevPage },
    data: { displayed },
    pagination: { page, perPage, totalItem, totalPage },
  } = useTableData(data);

  return (
    <Card>
      <Box px="2" py="1">
        <Heading>Browse</Heading>
        <Flex align="center" justify="between" mb="2">
          <TableSearch />
          <Flex align="center" gap="2">
            <Flex>
              Showing {displayed.length} of {totalItem} data
            </Flex>
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
        </Flex>
        <Separator size="4" />
        <Table.Root>
          <TableHeader columns={columns} />
          <TableBody columns={columns} displayedData={displayed} />
        </Table.Root>
      </Box>
    </Card>
  );
}
