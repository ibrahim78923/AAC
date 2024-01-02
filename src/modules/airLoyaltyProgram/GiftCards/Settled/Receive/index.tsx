import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { ReceiveHeader } from './ReceiveHeader';
import { ReceiveTableData, singleReceiveDetailsColumns } from './Receive.data';

export const Receive = () => {
  return (
    <Box border={'1px solid lightgrey'} borderRadius={3} p={2}>
      <ReceiveHeader />
      <Box mt={1}>
        <TanstackTable
          data={ReceiveTableData}
          columns={singleReceiveDetailsColumns}
        />
      </Box>
    </Box>
  );
};
