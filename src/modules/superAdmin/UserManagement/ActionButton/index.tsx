import { Box, Button, Menu, MenuItem } from '@mui/material';
import useUserManagement from '../useUserManagement';
import { ArrowDropDown } from '@mui/icons-material';
import AddUser from '../Users/AddUser';

const ActionButton = (props?: any) => {
  const { checkedRows, tabVal, setIsOpenAddUserDrawer } = props;
  const {
    selectedValue,
    handleClick,
    handleClose,
    handleUsersList,
    isOpenAddUserDrawer,
    useGetUsersByIdQuery,
  } = useUserManagement();
  const { data } = useGetUsersByIdQuery(checkedRows);

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        disabled={checkedRows === null ? true : false}
        sx={{ width: { sm: '112px', xs: '100%' } }}
      >
        Actions
        <ArrowDropDown />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleClose}
        sx={{
          '.MuiPopover-paper': {
            minWidth: '115px',
          },
        }}
      >
        {tabVal === 0 && (
          <MenuItem onClick={() => handleUsersList(data?.data)}>
            User List
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleClose();
            setIsOpenAddUserDrawer({
              ...isOpenAddUserDrawer,
              drawer: true,
              type: 'view',
              data: data,
            });
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setIsOpenAddUserDrawer({
              ...isOpenAddUserDrawer,
              drawer: true,
              type: 'edit',
              data: data,
            });
          }}
        >
          Edit
        </MenuItem>
      </Menu>
      {isOpenAddUserDrawer?.drawer && (
        <AddUser
          tabVal={tabVal}
          isOpenDrawer={isOpenAddUserDrawer?.drawer}
          onClose={() =>
            setIsOpenAddUserDrawer({
              ...isOpenAddUserDrawer,
              drawer: false,
            })
          }
        />
      )}
    </Box>
  );
};

export default ActionButton;
