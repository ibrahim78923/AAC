import { Box } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

import { allContactsColumns } from './AllContacts.data';
import useAddContactDrawer from '../useAddContactDrawer';

const AllContacts = () => {
  const {
    selectedRec,
    setSelectedRec,
    allContactsData,
    setPageLimit,
    setPage,
    theme,
    getContactsData,
  } = useAddContactDrawer();
  const columnsProps = {
    selectedRec,
    setSelectedRec,
    allContactsData,
  };

  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
        borderRadius: '8px',
        p: 1,
      }}
    >
      <TanstackTable
        columns={allContactsColumns(columnsProps)}
        data={allContactsData}
        totalRecords={getContactsData?.data?.meta?.total}
        onPageChange={(page: any) => setPage(page)}
        count={getContactsData?.data?.meta?.pages}
        pageLimit={getContactsData?.data?.meta?.limit}
        currentPage={getContactsData?.data?.meta?.page}
        setPageLimit={setPageLimit}
        setPage={setPage}
        isPagination
      />
    </Box>
  );
};

export default AllContacts;
