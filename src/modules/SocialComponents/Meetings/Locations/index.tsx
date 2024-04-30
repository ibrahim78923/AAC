import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import UpsertLocations from './UpsertLocations';
import { Box } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { useLocations } from './useLocations';
import { LocationDeleteModal } from './LocationDeleteModal';

export const Locations = () => {
  const {
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    searchValue,
    SetSearchValue,
    deleteModal,
    setDeleteModal,
    locationsListData,
    LocationsListColumn,
  } = useLocations();
  return (
    <>
      <PageTitledHeader
        title={'Meeting Locations'}
        addTitle={'Add Locations'}
        createPermissionKey={[
          SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING,
        ]}
        handleAction={() => setIsAddDrawerOpen(true)}
      />
      <Box>
        <Search
          label="search"
          width="small"
          searchBy={searchValue}
          setSearchBy={SetSearchValue}
        />
      </Box>
      <br />
      <TanstackTable
        data={locationsListData}
        columns={LocationsListColumn}
        isPagination={true}
      />
      <UpsertLocations
        isDrawerOpen={isAddDrawerOpen}
        onClose={setIsAddDrawerOpen}
      />
      <LocationDeleteModal
        open={deleteModal}
        handleClose={() => {
          setDeleteModal(false);
        }}
      />
    </>
  );
};
