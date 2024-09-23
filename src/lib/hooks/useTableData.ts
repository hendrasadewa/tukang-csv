import { useMemo, useState } from 'react';

import { DataSource, Pagination, PagingActions } from '../types/table';
import { chunkArray } from '../utils/arrays';

interface ReturnValue<T = Record<string, string>> {
  paginationActions: PagingActions;
  data: DataSource<T>;
  pagination: Pagination;
}

export default function useTableData<T = Record<string, string>>(
  data: T[]
): ReturnValue<T> {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const pagedData = useMemo(
    () => chunkArray<T>(data, perPage),
    [data, perPage]
  );
  const displayed = useMemo(() => pagedData[page - 1], [pagedData, page]);
  const totalPage = useMemo(() => pagedData.length, [pagedData]);
  const totalItem = useMemo(() => data.length, [data]);
  const isPrevAvailable = useMemo(() => page - 1 > 0, [page]);
  const isNextAvailable = useMemo(
    () => page + 1 < totalPage,
    [page, totalPage]
  );

  const onChangePage = (page: number) => {
    if (page <= 0) {
      setPage(1);
      return;
    }

    if (page > totalPage) {
      setPage(totalPage);
      return;
    }

    setPage(page);
  };

  const onPerPageChanged = (perPage: number) => {
    setPerPage(perPage);
    setPage(1);
  };

  const onNextPage = () => {
    if (!isNextAvailable) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  const onPrevPage = () => {
    if (!isPrevAvailable) {
      return;
    }
    setPage((prev) => prev - 1);
  };

  return {
    paginationActions: {
      onChangePage,
      onNextPage,
      onPrevPage,
      onPerPageChanged,
    },
    data: {
      displayed,
      pagedData,
    },
    pagination: {
      isNextAvailable,
      isPrevAvailable,
      page,
      perPage,
      totalItem,
      totalPage,
    },
  };
}
