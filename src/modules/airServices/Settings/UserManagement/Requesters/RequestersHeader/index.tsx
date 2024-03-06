import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { CirclePlusIcon } from '@/assets/icons';
import UpsertRequesters from '../UpsertRequesters';
import { AgentConversionDelete } from '../AgentConversionDelete';
import { AgentConversionWarning } from '../AgentConversionWarning';
import { useRequestersHeader } from './useRequestersHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const RequestersHeader = (props: any) => {
  const { selectedRequestersList } = props;
  const {
    setSearchValue,
    searchValue,
    deleteModal,
    setDeleteModal,
    warningModal,
    setWarningModal,
    isDrawerOpen,
    setIsDrawerOpen,
    requestorsDropdownOptions,
    submitDeleteModal,
    handleSubmit,
    submit,
    methods,
    handleClose,
  } = useRequestersHeader(props);

  return (
    <Box>
      <Box
        mt={3}
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Box ml={{ md: 2, xs: 3 }}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.FILTERS_SEARCH,
            ]}
          >
            <Search
              label="Search Here"
              width={'16.25rem'}
              setSearchBy={setSearchValue}
              searchBy={searchValue}
            />
          </PermissionsGuard>
        </Box>
        <Box
          display={'flex'}
          gap={1}
          mt={{ xs: 3, md: 0, sm: 0 }}
          mr={{ md: 2, xs: 1 }}
          ml={{ xs: 0.8 }}
        >
          <PermissionsGuard
            permissions={
              Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT_REQUESTERS_ACTIONS
            }
          >
            <SingleDropdownButton
              dropdownName={'Actions'}
              dropdownOptions={requestorsDropdownOptions}
              disabled={!selectedRequestersList?.length}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_USER_MANAGEMENT_PERMISSIONS?.ADD_REQUESTER,
            ]}
          >
            <Button
              startIcon={<CirclePlusIcon />}
              variant="contained"
              onClick={() => setIsDrawerOpen(true)}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add Requestors
            </Button>
          </PermissionsGuard>
          <UpsertRequesters
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            title={'Add Requestor'}
            okText={'Submit'}
            submitHandler={handleSubmit(submit)}
            methods={methods}
            handleClose={handleClose}
          />
          <AgentConversionDelete
            open={deleteModal}
            handleClose={() => {
              setDeleteModal(false);
            }}
            submitDeleteModal={submitDeleteModal}
          />
          <AgentConversionWarning
            open={warningModal}
            handleClose={() => {
              setWarningModal(false);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
