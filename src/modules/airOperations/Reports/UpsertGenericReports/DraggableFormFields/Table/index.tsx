import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Typography } from '@mui/material';
import { tableColumn } from './Table.data';
import { TableI } from './Table.interface';
import { useAppSelector } from '@/redux/store';

export const Table = (props: TableI) => {
  const { watch } = props;
  const tableTitle = watch('tableTitle');
  const columnsData = useAppSelector(
    (state) => state?.genericReport?.columnsData,
  );

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
