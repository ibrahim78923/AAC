import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import { useState } from 'react';
import UpsertLocations from './UpsertLocations';
import { Box } from '@mui/material';
import Search from '@/components/Search';
// import { NOTISTACK_VARIANTS } from '@/constants/strings';
// import { enqueueSnackbar } from 'notistack';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  // teamDropdown,
  locationsList,
  locationsListData,
} from './Locations.data';

export const Locations = () => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [searchValue, SetSearchValue] = useState<string>('');
  const [selectedLocationsList, setSelectedLocationsList] = useState<any>([]);
  // const [deleteModal, setDeleteModal] = useState<boolean>(false);

  // const submitDeleteModal = () => {
  //   enqueueSnackbar('Delete Successfully', {
  //     variant: NOTISTACK_VARIANTS?.SUCCESS,
  //   });
  //   setDeleteModal(false);
  // };
  // const teamDropdownOptions = teamDropdown(setDeleteModal);

  const LocationsListColumn = locationsList(
    selectedLocationsList,
    setSelectedLocationsList,
    locationsListData,
    setIsAddDrawerOpen,
    // setDeleteModal,
  );

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
    </>
  );
};
