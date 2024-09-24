import { Box, Flex, Spinner, Table, Text } from '@radix-ui/themes';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';

import { useAppStore } from '@/stores/useAppStore';
import { useTableData } from '@/hooks/useTableData';

import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TableNavigation } from './TableNavigation';
import { TableFeatureMenu } from './TableFeatureMenu';
import { BoxIcon } from 'lucide-react';

export function PreviewTable() {
  const {
    dataSource = [],
    columns = [],
    isLoading = false,
  } = useAppStore(
    useShallow((s) => ({
      dataSource: s.csvRecord[s.selectedFileId]?.json,
      columns: s.csvRecord[s.selectedFileId]?.fields,
      isLoading: s.isParsing,
    }))
  );

  const selectedFileId = useAppStore((s) => s.selectedFileId);

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

  useEffect(() => {
    onChangePage(1);
  }, [onChangePage, selectedFileId]);

  return (
    <Flex direction="column" justify="center" className="h-full" px="2">
      <Flex className="h-12">
        <TableFeatureMenu />
      </Flex>
      <Flex className="border rounded-lg flex-1 overflow-y-scroll relative">
        {isLoading && (
          <Flex
            align="center"
            justify="center"
            height="100%"
            width="100%"
            className="bg-white/70 absolute top-0 left-0 backdrop-blur-sm z-10"
          >
            <Spinner size="3" />
            <Text ml="1">Loading Contents</Text>
          </Flex>
        )}
        {!isLoading && columns.length <= 0 && (
          <Flex
            align="center"
            justify="center"
            height="100%"
            width="100%"
            className="bg-white/70 absolute top-0 left-0 backdrop-blur-sm z-10"
          >
            <BoxIcon />
            <Text ml="1">Upload and select file to display</Text>
          </Flex>
        )}

        <Table.Root className="h-[100%] w-full" layout="auto">
          <TableHeader columns={columns} />
          <TableBody columns={columns} displayedData={displayed} />
        </Table.Root>
      </Flex>
      <Box>
        <TableNavigation
          page={page}
          perPage={perPage}
          totalItem={totalItem}
          totalPage={totalPage}
          onPerPageChanged={onPerPageChanged}
          onChangePage={onChangePage}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
        />
      </Box>
    </Flex>
  );
}
