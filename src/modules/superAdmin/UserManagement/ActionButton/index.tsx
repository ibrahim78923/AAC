import { Box, Button, Menu, MenuItem } from '@mui/material';
import useUserManagement from '../useUserManagement';
import { ArrowDropDown } from '@mui/icons-material';
import AddUser from '../Users/AddUser';

const ActionButton = (props?: any) => {
  const { checkedRows, tabVal, setIsOpenAddUserDrawer } = props;
  const {
    theme,
    selectedValue,
    handleClick,
    handleClose,
    handleUsersList,
    isOpenAddUserDrawer,
    useGetUsersByIdQuery,
  } = useUserManagement();
  const { data } = useGetUsersByIdQuery(checkedRows);

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
