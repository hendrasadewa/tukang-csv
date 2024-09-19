import { Button, Flex } from '@radix-ui/themes';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

interface Props {
  page: number;
  totalPages: number;
  onPreviousClick(): void;
  onNextClick(): void;
  onPageChanged(page: number): void;
}

export default function TablePagination({
  totalPages,
  page,
  onPreviousClick,
  onNextClick,
  onPageChanged,
}: Props) {
  const isNextDisabled = page + 1 >= totalPages;
  const isPrevDisabled = page - 1 <= 0;

  const handleFirstClick = () => {
    onPageChanged(1);
  };

  const handleLastClick = () => {
    onPageChanged(totalPages - 1);
  };

  return (
    <Flex align="center" gap="2" p="2">
      <Button
        disabled={isPrevDisabled}
        variant="outline"
        onClick={handleFirstClick}
        size="1"
        color="gray"
      >
        <ChevronsLeftIcon />
      </Button>
      <Button
        disabled={isPrevDisabled}
        variant="outline"
        onClick={onPreviousClick}
        size="1"
        color="gray"
      >
        <ChevronLeftIcon />
      </Button>
      <Button variant="outline" size="1" color="gray" disabled>
        {page}
      </Button>
      <Button
        disabled={isNextDisabled}
        variant="outline"
        onClick={onNextClick}
        size="1"
        color="gray"
      >
        <ChevronRightIcon />
      </Button>

      <Button
        disabled={isNextDisabled}
        variant="outline"
        onClick={handleLastClick}
        size="1"
        color="gray"
      >
        <ChevronsRightIcon />
      </Button>
    </Flex>
  );
}
