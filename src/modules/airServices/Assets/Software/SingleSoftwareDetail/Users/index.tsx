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
import {
  EXPORT_TYPE,
  SOFTWARE_USER_ACTIONS_CLICK,
  SOFTWARE_USER_ACTIONS_TYPES,
} from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
    handleSearch,
    setUsersData,
    methods,
    allocateSubmit,
    deAllocateLoading,
    allocateLoading,
    removeLoading,
    setFilterValues,
    filterValues,
    handleSubmit,
  } = useUsers();

  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS?.USERS]}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box ml={0.5}>
          <Search label="Search Here" setSearchBy={handleSearch} />
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
          <UsersFilter
            setFilterValues={setFilterValues}
            filterValues={filterValues}
          />
        </Box>
      </Box>
      {actionModalOpen && (
        <CustomCommonDialog
          isPortalOpen={
            actionModalOpen &&
            (selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.REMOVE ||
              ((selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE ||
                selectedActionTitle ===
                  SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE) &&
                usersData?.length <= 1))
          }
          closePortal={userActionDropdownCloseHandler}
          dialogTitle={
            selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE
              ? SOFTWARE_USER_ACTIONS_CLICK?.DEALLOCATE_CONTRACT
              : selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.REMOVE
                ? SOFTWARE_USER_ACTIONS_CLICK?.REMOVE_CONTRACT
                : SOFTWARE_USER_ACTIONS_CLICK?.ADD_DEVICE
          }
          submitButtonText="Yes"
          cancelButtonText="No"
          showSubmitLoader={
            deAllocateLoading || allocateLoading || removeLoading
          }
          disabledCancelButton={
            deAllocateLoading || allocateLoading || removeLoading
          }
          handleSubmitButton={
            selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE
              ? handleSubmit(allocateSubmit)
              : () => actionClickHandler(selectedActionTitle)
          }
        >
          {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE && (
            <UsersAllocate
              methods={methods}
              onSubmit={allocateSubmit}
              handleSubmit={handleSubmit}
            />
          )}
          {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE && (
            <UsersDeallocate />
          )}
          {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.REMOVE && (
            <UsersRemove />
          )}
        </CustomCommonDialog>
      )}

      <br />
      <UsersTable setUsersData={setUsersData} usersData={usersData} />
      <br />
    </PermissionsGuard>
  );
};
