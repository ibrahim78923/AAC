import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { groupsColumns } from './GroupsContacts.data';
import useAddContactDrawer from '../useAddContactsDrawer';

const GroupContacts = ({ setSelectedRec, selectedRec }: any) => {
  const {
    contactGroupsLoading,
    contactsGroupData,
    getGroupsData,
    setPageLimit,
    setPage,
    theme,
  } = useAddContactDrawer();

  const columnsProps = {
    contactsGroupData,
    setSelectedRec,
    selectedRec,
  };

  return (
    <>
      <Box sx={{ mb: '8px', color: 'slateBlue.main' }}>
        Selected groups (
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
          columns={groupsColumns(columnsProps)}
          data={contactsGroupData}
          totalRecords={getGroupsData?.data?.meta?.total}
          onPageChange={(page: any) => setPage(page)}
          count={getGroupsData?.data?.meta?.pages}
          pageLimit={getGroupsData?.data?.meta?.limit}
          currentPage={getGroupsData?.data?.meta?.page}
          isLoading={contactGroupsLoading}
          setPageLimit={setPageLimit}
          setPage={setPage}
          isPagination
        />
        {/* <TanstackTable columns={groupsColumns} data={groupsData} /> */}
      </Box>
    </>
  );
};

export default GroupContacts;
