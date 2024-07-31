import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { allContactsColumns } from './AllContacts.data';
import useAddContactDrawer from '../useAddContactDrawer';
import { AllContactsProps } from '@/modules/airMarketer/SMSMarketing/SMSBroadcast/SMSBroadcast-interface';

const AllContacts = ({
  setSelectedRec,
  selectedRec,
  allContactsData,
  setPageLimit,
  setPage,
}: AllContactsProps) => {
  const { loadingAllContacts, getContactsData, theme } = useAddContactDrawer();

  const columnsProps = {
    allContactsData,
    setSelectedRec,
    selectedRec,
  };

  return (
    <>
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
