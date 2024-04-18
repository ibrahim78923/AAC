import { CirclePlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import UpsertUser from '../UpsertUser';
import { AgentConversionDelete } from '../../AgentConversionDelete';
import { useUserHeader } from './useUserHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS } from '@/constants/permission-keys';

export const UserHeader = (props: any) => {
  const {
    selectedUserList,
    patchProductUsersStatus,
    addUsersListStatus,
    submit,
    handleSubmit,
    methods,
  } = props;
  const {
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    deleteModal,
    setDeleteModal,
    userDropdownOptions,
    submitDeleteModal,
    search,
    setSearch,
    deleteStatus,
  } = useUserHeader(props);

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      alignItems={'center'}
    >
      <Box>
        <Search
          label="Search Here"
          width={'16.25rem'}
          setSearchBy={setSearch}
          searchBy={search}
        />
      </Box>
      <Box display={'flex'} gap={1} mt={{ xs: 2, sm: 0 }}>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_USERS_PERMISSIONS?.ACTIVE_INACTIVE_USER,
          ]}
        >
          <SingleDropdownButton
            dropdownName={'Actions'}
            dropdownOptions={userDropdownOptions}
            disabled={!selectedUserList?.length}
          />
        </PermissionsGuard>
        <Button
          startIcon={<CirclePlusIcon />}
          variant="contained"
          onClick={() => setIsAddDrawerOpen(true)}
        >
          Add User
        </Button>
        <UpsertUser
          isDrawerOpen={isAddDrawerOpen}
          setIsDrawerOpen={setIsAddDrawerOpen}
          title={'Add User'}
          okText={'Add'}
          methods={methods}
          handleSubmit={handleSubmit}
          submit={submit}
          patchProductUsersStatus={patchProductUsersStatus}
          addUsersListStatus={addUsersListStatus}
        />
        {deleteModal && (
          <AgentConversionDelete
            message={'Are you sure you want to delete this User?'}
            open={deleteModal}
            handleClose={() => {
              setDeleteModal(false);
            }}
            submitDeleteModal={submitDeleteModal}
            deleteStatus={deleteStatus}
          />
        )}
      </Box>
    </Box>
  );
};
