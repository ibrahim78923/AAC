import { Box } from '@mui/material';
import { ReceiveHeader } from './ReceiveHeader';
import TanstackTable from '@/components/Table/TanstackTable';
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
