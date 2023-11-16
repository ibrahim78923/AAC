import { Box, Button, Menu, MenuItem } from '@mui/material';
import useUserManagement from '../useUserManagement';
import { ArrowDropDown } from '@mui/icons-material';
import AddUser from '../Users/AddUser';

const ActionButton = (props: any) => {
  const { checkedRows } = props;
  const {
    theme,
    selectedValue,
    handleClick,
    handleClose,
    handleUsersList,
    isOpenAddUserDrawer,
    setIsOpenAddUserDrawer,
  } = useUserManagement();

  return (
    <Box>
      <Button
        onClick={handleClick}
        disabled={checkedRows === undefined ? true : false}
        sx={{
          border: `1px solid ${theme?.palette?.custom?.dark}`,
          color: theme?.palette?.custom?.main,
          width: '112px',
          height: '36px',
        }}
      >
        Actions
        <ArrowDropDown />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleUsersList(checkedRows)}>
          User List
        </MenuItem>
        <MenuItem onClick={handleClose}>View</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
      </Menu>

      {isOpenAddUserDrawer && (
        <AddUser
          isOpenDrawer={isOpenAddUserDrawer}
          onClose={() => setIsOpenAddUserDrawer(false)}
        />
      )}
    </Box>
  );
};

export default ActionButton;
