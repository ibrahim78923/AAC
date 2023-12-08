import { Box } from '@mui/material';
import { RequestersHeader } from './RequestersHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { requestorListData } from './Requestors.data';
import { useRequestors } from './useRequestors';

export const Requesters = () => {
  const { selectedRequestorsList, requestorsListColumn } = useRequestors();
  return (
    <>
      <Box>
        <RequestersHeader selectedRequestorsList={selectedRequestorsList} />
      </Box>
      <Box mt={3}>
        <TanstackTable
          data={requestorListData}
          columns={requestorsListColumn}
          isPagination={true}
        />
      </Box>
    </>
  );
};
