import { RowData } from './csv';

export interface Pagination {
  page: number;
  perPage: number;
  totalPage: number;
  totalItem: number;
  isPrevAvailable: boolean;
  isNextAvailable: boolean;
}

export interface PagingActions {
  onChangePage(page: number): void;
  onNextPage(): void;
  onPrevPage(): void;
  onPerPageChanged(perPage: number): void;
}

export interface DataSource<T = RowData> {
  displayed: Array<T>;
  pagedData: Array<T[]>;
}
