import { Button, Menu, MenuItem } from '@mui/material';
import { ThreeDotsIcon } from '@/assets/icons';
import { styles } from '../../Contacts.style';

const GroupActions = ({
  handleOpenModal,
  anchorEl,
  openActions,
  handleClickActions,
  handleCloseActions,
  handleDelete,
  groupData,
}: any) => {
  return (
    <>
      <Button onClick={handleClickActions} sx={styles?.btnRounded}>
        <ThreeDotsIcon color="black" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={openActions}
        onClose={handleCloseActions}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleOpenModal('View', groupData);
            handleCloseActions();
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenModal('Edit', groupData);
            handleCloseActions();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default GroupActions;
