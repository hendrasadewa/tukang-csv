import { Button, Flex, Text } from '@radix-ui/themes';
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

export function TablePagination({
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
    <Flex align="center" gap="2">
      <Button
        disabled={isPrevDisabled}
        variant="ghost"
        onClick={handleFirstClick}
        size="1"
      >
        <ChevronsLeftIcon />
      </Button>
      <Button
        disabled={isPrevDisabled}
        variant="ghost"
        onClick={onPreviousClick}
        size="1"
      >
        <ChevronLeftIcon />
      </Button>
      <Text mx="3">{page}</Text>
      <Button
        disabled={isNextDisabled}
        variant="ghost"
        onClick={onNextClick}
        size="1"
      >
        <ChevronRightIcon />
      </Button>

      <Button
        disabled={isNextDisabled}
        variant="ghost"
        onClick={handleLastClick}
        size="1"
      >
        <ChevronsRightIcon />
      </Button>
    </Flex>
  );
}
