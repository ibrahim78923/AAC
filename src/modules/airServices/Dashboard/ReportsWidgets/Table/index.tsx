import TanstackTable from '@/components/Table/TanstackTable';
import { Box } from '@mui/material';
import { makeDynamicColumn } from './Table.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TruncateText } from '@/components/TruncateText';

export const Table = (props: any) => {
  const { tableColumns, title, data = [] } = props;
  const tableColumn = makeDynamicColumn(tableColumns);

  const tableData = data?.[title] ?? data ?? [];

  return (
    <Box
      borderRadius={3}
      border={`1px solid`}
      borderColor="custom.off_white"
      height="100%"
    >
      <Box
        borderBottom={'1px solid'}
        borderColor={'custom.off_white_three'}
        py={0.5}
        px={2}
      >
        <PageTitledHeader
          title={<TruncateText text={title} />}
          titleVariant="h5"
          outerMarginBottom={0}
        />
      </Box>
      <Box>
        <TanstackTable
          data={tableData?.slice?.(-5)?.reverse()}
          columns={tableColumn}
        />
      </Box>
    </Box>
  );
};
