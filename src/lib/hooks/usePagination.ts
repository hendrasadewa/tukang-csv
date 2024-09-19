import { useMemo, useState } from 'react';

import { chunkArray } from '@/lib/utils/arrays';

interface ReturnValue<T = Record<string, string | number>> {
  page: number;
  perPage: number;
  pageData: T[][];
  displayedData: T[];
  totalPages: number;
  totalItem: number;
  pageIndexes: number[];
  isNextPageAvailable: boolean;
  isPrevPageAvailable: boolean;
  onPageChanged(page: number): void;
  onPerPageChanged(perPage: number): void;
  onNextPage(): void;
  onPrevPage(): void;
}

export default function usePagination<T = Record<string, string | number>>(
  data: T[] = []
): ReturnValue<T> {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // memoized values
  const pageData = useMemo(() => chunkArray(data, perPage), [data, perPage]);
  const totalPages = useMemo(() => pageData.length, [pageData]);
  const pageIndexes = useMemo(
    () => [...new Array(totalPages)].map((_, idx) => idx + 1),
    [totalPages]
  );
  const isNextPageAvailable = useMemo(
    () => page + 1 < totalPages,
    [page, totalPages]
  );
  const isPrevPageAvailable = useMemo(() => page - 1 > 0, [page]);
  const displayedData = useMemo(() => pageData[page - 1], [pageData, page]);

  const onPageChanged = (page: number) => {
    setPage(page);
  };

  const onPerPageChanged = (perPage: number) => {
    setPerPage(perPage);
    setPage(1);
  };

  const onNextPage = () => {
    if (!isNextPageAvailable) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  const onPrevPage = () => {
    if (!isPrevPageAvailable) {
      return;
    }
    setPage((prev) => prev - 1);
  };

  return {
    page,
    perPage,
    pageData,
    displayedData,
    totalPages,
    totalItem: data.length,
    pageIndexes,
    isNextPageAvailable,
    isPrevPageAvailable,
    onPageChanged,
    onPerPageChanged,
    onNextPage,
    onPrevPage,
  };
}
