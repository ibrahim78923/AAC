import { PlusSharedColorIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button, Typography } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import TanstackTable from '@/components/Table/TanstackTable';
import { rolesListData } from './RolesAndRightTable.data';
import { useRolesAndRightTable } from './useRolesAndRightTable';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import ErrorIcon from '@mui/icons-material/Error';
import CommonDrawer from '@/components/CommonDrawer';

const RolesAndRightTable = () => {
  const {
    selectedRolesList,
    RolesListsColumns,
    dropdownOptions,
    setSearchValue,
    searchValue,
    openDeleteModel,
    handleDeleteClose,
    handleDelete,
    handleCloseEditRole,
    isRolesModalOpen,

    handleAddRolesModal,
  } = useRolesAndRightTable();
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginTop={2}
      >
        <Typography variant="h3">Roles And Rights</Typography>
        <Button
          variant="contained"
          startIcon={<PlusSharedColorIcon />}
          onClick={() => handleAddRolesModal?.(true)}
        >
          Add new role
        </Button>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
        marginTop={2}
      >
        <Box>
          <Search
            value={searchValue}
            label="search"
            width="100%"
            setSearchBy={setSearchValue}
            onChange={(e: any) => setSearchValue(e?.target?.value)}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <SingleDropdownButton
            dropdownOptions={dropdownOptions}
            disabled={!!!selectedRolesList?.length}
          />
        </Box>
      </Box>
      <Box m={'0.5rem 0 0.5rem 0'} marginTop={2}>
        <TanstackTable
          data={rolesListData}
          columns={RolesListsColumns}
          isPagination
        />
      </Box>
      <Box>
        <CommonDrawer
          isDrawerOpen={isRolesModalOpen}
          onClose={handleCloseEditRole}
          title={'Add New Role'}
          okText={'Add'}
          isOk
          cancelText={'Cancel'}
          footer
          submitHandler={() => {}}
        >
          <Box></Box>
        </CommonDrawer>
        <AlertModals
          message="Are you sure you want to delete Role"
          type={ALERT_MODALS_TYPE?.WARNING}
          open={openDeleteModel}
          typeImage={<ErrorIcon sx={{ color: 'warning.main' }} />}
          handleClose={handleDeleteClose}
          handleSubmit={handleDelete}
        />
      </Box>
    </>
  );
};

export default RolesAndRightTable;
