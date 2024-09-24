import { Flex } from '@radix-ui/themes';

import { TablePageInfo } from './TablePageInfo';
import { TablePerPage } from './TablePerPage';
import { TablePagination } from './TablePagination';

interface Props {
  page: number;
  perPage: number;
  totalItem: number;
  totalPage: number;
  onPerPageChanged(page: number): void;
  onChangePage(page: number): void;
  onPrevPage(): void;
  onNextPage(): void;
}

export function TableNavigation({
  page,
  perPage,
  totalItem,
  totalPage,
  onPerPageChanged,
  onChangePage,
  onPrevPage,
  onNextPage,
}: Props) {
  return (
    <Flex align="center" justify="between" className="h-12">
      <TablePageInfo page={page} perPage={perPage} totalItem={totalItem} />
      <Flex align="center" gap="2" px="2">
        <TablePerPage onPerPageChanged={onPerPageChanged} perPage={perPage} />
        <TablePagination
          page={page}
          totalPages={totalPage}
          onPageChanged={onChangePage}
          onPreviousClick={onPrevPage}
          onNextClick={onNextPage}
        />
      </Flex>
    </Flex>
  );
}
