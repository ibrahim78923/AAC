import TanstackTable from '@/components/Table/TanstackTable';
import { Box } from '@mui/material';
import { makeDynamicColumn } from './Table.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const Table = (props: any) => {
  const { tableColumns, title, data = [] } = props;
  const tableColumn = makeDynamicColumn(tableColumns);
  return (
    <Box
      borderRadius={3}
      p={2}
      border={`1px solid`}
      borderColor="custom.off_white"
      height="100%"
    >
      <PageTitledHeader title={title} />
      <Box maxHeight={'40vh'} overflow={'auto'}>
        <TanstackTable data={data} columns={tableColumn} />
      </Box>
    </Box>
  );
};
