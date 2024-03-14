import { Box, Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { columnsUser } from './Users.data';
import useUserManagement from '../useUserManagement';
import useUsers from './useUsers';

const UserTable = (props: any) => {
  const { setIsAddUserDrawer, isAddUserDrawer } = props;
  const {
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    open,
    theme,
    handleClick,
    handleClose,
    checkedUser,
    setCheckedUser,
  } = useUsers();

  const {
    productsUsers,
    searchUser,
    setSearchUser,
    setPage,
    setPageLimit,
    isLoading,
    isSuccess,
  } = useUserManagement();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Search
          searchBy={searchUser}
          width="260px"
          label={'Search here'}
          setSearchBy={setSearchUser}
        />
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          disabled={checkedUser?.length > 0 ? false : true}
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            borderRadius: '4px',
            color: `${theme?.palette?.custom.main}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0.7rem',
            fontWeight: 500,
            marginY: { xs: '10px', sm: '0px' },
            width: { xs: '100%', sm: 'fit-content' },
          }}
        >
          Actions <ArrowDropDownIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() => {
              setIsAddUserDrawer({
                ...isAddUserDrawer,
                isToggle: true,
                type: 'edit',
              });
              handleClose();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsAddUserDrawer({
                ...isAddUserDrawer,
                isToggle: true,
                type: 'view',
              });
              handleClose();
            }}
          >
            View
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsOpenDelete(true);
              handleClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>
      <TanstackTable
        columns={columnsUser(checkedUser, setCheckedUser)}
        data={productsUsers?.data?.usercompanyaccounts}
        isPagination
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
        count={productsUsers?.data?.meta?.pages}
        pageLimit={productsUsers?.data?.meta?.limit}
        totalRecords={productsUsers?.data?.meta?.total}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <AlertModals
        message={'Are you sure you want to delete this role?'}
        type={'delete'}
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default UserTable;
