import { Flex, Text } from '@radix-ui/themes';
import { FileTextIcon } from 'lucide-react';

import { CSVFileState } from '@/lib/dto/csv';

import { ListItemInfo } from './components/ListItemInfo';
import { ListItemLoadMenu } from './components/ListItemLoadMenu';

interface Props {
  files: CSVFileState[];
}

export function FileList({ files }: Props) {
  return (
    <Flex direction="column" gap="2">
      {files.length <= 0 && <Text>File is empty</Text>}
      {files.map(
        ({ fileName, sizeInBytes, modifiedAt, fileType, id, status }) => (
          <Flex direction="column" gap="1" key={id}>
            <Flex
              className="shadow hover:shadow-md transition-shadow rounded-lg bg-slate-100"
              direction="column"
            >
              <Flex justify="between" gap="2" p="2" pr="4">
                <Flex align="center" gap="2">
                  <FileTextIcon size={42} strokeWidth={1} className="w-11" />
                  <ListItemInfo
                    fileName={fileName}
                    sizeInBytes={sizeInBytes}
                    modifiedAt={modifiedAt}
                    fileType={fileType}
                  />
                </Flex>
                <ListItemLoadMenu id={id} isParsed={status === 'parsed'} />
              </Flex>
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  );
}
