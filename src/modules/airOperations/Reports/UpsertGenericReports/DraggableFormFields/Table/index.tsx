import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Typography } from '@mui/material';
import { tableColumn } from './Table.data';

export const Table = (props: any) => {
  const { columnsData, watch } = props;
  const tableTitle = watch('tableTitle');
  return (
    <>
      <Box boxShadow={2} p={2} borderRadius={2}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h6">{tableTitle}</Typography>
        </Box>
        <Box mt={2}>
          <TanstackTable data={{}} columns={tableColumn(columnsData)} />
        </Box>
      </Box>
    </>
  );
};
