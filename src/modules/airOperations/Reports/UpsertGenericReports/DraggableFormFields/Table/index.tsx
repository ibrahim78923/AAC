import TanstackTable from '@/components/Table/TanstackTable';
import { Box } from '@mui/material';
import { tableColumn } from './Table.data';
import { TableI } from './Table.interface';
import { useAppSelector } from '@/redux/store';
import { TruncateText } from '@/components/TruncateText';

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
          <TruncateText text={tableTitle} />
        </Box>
        <Box mt={2}>
          <TanstackTable data={{}} columns={tableColumn(columnsData)} />
        </Box>
      </Box>
    </>
  );
};
