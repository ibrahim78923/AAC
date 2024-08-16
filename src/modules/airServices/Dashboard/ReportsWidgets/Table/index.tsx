import TanstackTable from '@/components/Table/TanstackTable';
import { Box } from '@mui/material';
import { makeDynamicColumn } from './Table.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const Table = (props: any) => {
  const { tableColumns, title, data = [] } = props;
  const tableColumn = makeDynamicColumn(tableColumns);

  const tableData = Array.isArray(data)
    ? data?.slice?.(-10)
    : !!!data
      ? []
      : [data];

  return (
    <Box
      borderRadius={3}
      p={2}
      border={`1px solid`}
      borderColor="custom.off_white"
      height="100%"
    >
      <PageTitledHeader title={title} />
      <Box>
        <TanstackTable data={tableData} columns={tableColumn} />
      </Box>
    </Box>
  );
};
