import UsersTable from './UsersTable';
import { Box, Button, Divider } from '@mui/material';
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

export const Users = () => {
  const {
    setActionModalOpen,
    userActionClickHandler,
    csvExportHandler,
    excelExportHandler,
    usersData,
    actionModalOpen,
    userActionDropdownCloseHandler,
    selectedActionTitle,
    actionClickHandler,
    handleExportTypeClick,
    setSearch,
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
          <Search label="Search" setSearchBy={setSearch} />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <SingleDropdownButton
            dropdownOptions={userDropdown(
              setActionModalOpen,
              userActionClickHandler,
            )}
            disabled={usersData?.length === 0}
          />

          <UsersAdd />
          <ExportButton
            handleCsvExport={() => {
              handleExportTypeClick(EXPORT_TYPE?.CSV);
              csvExportHandler();
            }}
            handleExcelExport={() => {
              handleExportTypeClick(EXPORT_TYPE?.XLS);
              excelExportHandler();
            }}
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
            <UsersAllocate />
          )}
          {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.DEALLOCATE && (
            <UsersDeallocate />
          )}
          {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.REMOVE && (
            <UsersRemove />
          )}
          {selectedActionTitle === SOFTWARE_USER_ACTIONS_TYPES?.ALLOCATE && (
            <Box sx={{ mt: 2 }}>
              <Divider />
            </Box>
          )}
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'center'}
            gap={2}
            marginTop={2}
          >
            <Button
              onClick={userActionDropdownCloseHandler}
              variant="outlined"
              color="secondary"
            >
              No
            </Button>
            <Button
              variant="contained"
              onClick={() => actionClickHandler(selectedActionTitle)}
            >
              Yes
            </Button>
          </Box>
        </UserActionModal>
      )}

      <br />
      <UsersTable />
      <br />
    </>
  );
};
