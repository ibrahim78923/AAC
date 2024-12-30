import UsersTable from './UsersTable';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
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
import { LoadingButton } from '@mui/lab';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_SOFTWARE_PERMISSIONS } from '@/constants/permission-keys';
import { Close } from '@mui/icons-material';

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
        <Dialog
          open={
            actionModalOpen &&
            (selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.REMOVE ||
              ((selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE ||
                selectedActionTitle ===
                  SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE) &&
                usersData?.length <= 1))
          }
          onClose={userActionDropdownCloseHandler}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={1}
              flexWrap={'wrap'}
              mb={1.5}
            >
              <Typography variant="h4" color="slateBlue.main">
                {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE
                  ? SOFTWARE_USER_ACTIONS_CLICK?.DEALLOCATE_CONTRACT
                  : selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.REMOVE
                    ? SOFTWARE_USER_ACTIONS_CLICK?.REMOVE_CONTRACT
                    : SOFTWARE_USER_ACTIONS_CLICK?.ADD_DEVICE}
              </Typography>
              <IconButton onClick={userActionDropdownCloseHandler}>
                <Close color="secondary" />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent>
            {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE && (
              <UsersAllocate methods={methods} onSubmit={allocateSubmit} />
            )}
            {selectedActionTitle ===
              SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE && <UsersDeallocate />}
            {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.REMOVE && (
              <UsersRemove />
            )}
          </DialogContent>
          <DialogActions sx={{ paddingTop: `0rem !important` }}>
            <LoadingButton
              className="small"
              onClick={userActionDropdownCloseHandler}
              variant="outlined"
              color="secondary"
              disabled={deAllocateLoading || allocateLoading || removeLoading}
            >
              No
            </LoadingButton>
            <LoadingButton
              className="small"
              variant="contained"
              disabled={deAllocateLoading || allocateLoading || removeLoading}
              loading={deAllocateLoading || allocateLoading || removeLoading}
              onClick={
                selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE
                  ? handleSubmit(allocateSubmit)
                  : () => actionClickHandler(selectedActionTitle)
              }
            >
              Yes
            </LoadingButton>
          </DialogActions>
        </Dialog>
      )}

      <br />
      <UsersTable setUsersData={setUsersData} usersData={usersData} />
      <br />
    </PermissionsGuard>
  );
};
