import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { allContactsColumns } from './AllContacts.data';
import useAddContactDrawer from '../useAddContactDrawer';

const AllContacts = ({ setSelectedRec, selectedRec }: any) => {
  const {
    loadingAllContacts,
    allContactsData,
    getContactsData,
    setPageLimit,
    setPage,
    theme,
  } = useAddContactDrawer();

  const columnsProps = {
    allContactsData,
    setSelectedRec,
    selectedRec,
  };

  return (
    <>
      <Box sx={{ mb: '8px', color: 'slateBlue.main' }}>
        Selected contacts (
        {selectedRec?.length < 10
          ? `0${selectedRec?.length}`
          : `${selectedRec?.length}`}
        )
      </Box>
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
          isLoading={loadingAllContacts}
          setPageLimit={setPageLimit}
          setPage={setPage}
          isPagination
        />
      </Box>
    </>
  );
};

export default AllContacts;
