import UsersTable from './UsersTable';
import { Box } from '@mui/material';
import { UsersAdd } from './UsersAdd';
import { UsersFilter } from './UsersFilter';
import { userDropdown } from './Users.data';
import Search from '@/components/Search';
import { ExportButton } from '@/components/ExportButton';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import UsersRemove from './UsersRemove';
import UsersAllocate from './UsersAllocate';
import UsersDeallocate from './UsersDeallocate';
import useUsers from './useUsers';
import UserActionModal from './UserActionModal';
import { EXPORT_TYPE, SOFTWARE_USER_ACTIONS_TYPES } from '@/constants/strings';
import { LoadingButton } from '@mui/lab';

export const Users = () => {
  const {
    setActionModalOpen,
    getUserListDataExport,
    usersData,
    actionClickHandler,
    userActionClickHandler,
    actionModalOpen,
    userActionDropdownCloseHandler,
    selectedActionTitle,
    setSearch,
    search,
    setUsersData,
    methods,
    allocateSubmit,
    deAllocateLoading,
    allocateLoading,
    removeLoading,
  } = useUsers();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box>
          <Search label="Search" setSearchBy={setSearch} searchBy={search} />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <SingleDropdownButton
            dropdownOptions={userDropdown(
              setActionModalOpen,
              userActionClickHandler,
            )}
            disabled={!usersData?.length}
          />

          <UsersAdd />
          <ExportButton
            handleCsvExport={() => getUserListDataExport(EXPORT_TYPE?.CSV)}
            handleExcelExport={() => getUserListDataExport(EXPORT_TYPE?.XLS)}
          />
          <UsersFilter />
        </Box>
      </Box>
      {actionModalOpen && (
        <UserActionModal
          handleClose={userActionDropdownCloseHandler}
          open={
            actionModalOpen &&
            (selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.REMOVE ||
              ((selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE ||
                selectedActionTitle ===
                  SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE) &&
                usersData?.length <= 1))
          }
          selectedItem={
            selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE
              ? 'Add Device'
              : selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE
                ? 'Deallocate Contract '
                : selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.REMOVE
                  ? 'Remove Contract'
                  : 'Add Device'
          }
        >
          {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE && (
            <UsersAllocate methods={methods} onSubmit={allocateSubmit} />
          )}
          {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE && (
            <UsersDeallocate />
          )}
          {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.REMOVE && (
            <UsersRemove />
          )}

          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'center'}
            gap={2}
            marginTop={2}
          >
            <LoadingButton
              onClick={userActionDropdownCloseHandler}
              variant="outlined"
              color="secondary"
            >
              No
            </LoadingButton>
            <LoadingButton
              variant="contained"
              loading={deAllocateLoading || allocateLoading || removeLoading}
              onClick={
                selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE
                  ? methods?.handleSubmit(allocateSubmit)
                  : () => actionClickHandler(selectedActionTitle)
              }
            >
              Yes
            </LoadingButton>
          </Box>
        </UserActionModal>
      )}

      <br />
      <UsersTable setUsersData={setUsersData} usersData={usersData} />
      <br />
    </>
  );
};
