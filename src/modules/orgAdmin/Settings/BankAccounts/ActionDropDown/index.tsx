import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useBankAccounts from '../useBankAccounts';
import { AlertModals } from '@/components/AlertModals';

const ActionDropDown = (props: any) => {
  const { setIsOpenAddAccountDrawer } = props;
  const {
    selectedValue,
    handleClick,
    handleClose,
    isDeleteModal,
    setIsDeleteModal,
  } = useBankAccounts();

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        onClick={handleClick}
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
        <MenuItem
          onClick={() => {
            handleClose();
            setIsOpenAddAccountDrawer(true);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setIsDeleteModal(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {isDeleteModal && (
        <AlertModals
          type="delete"
          message="Are you sure you want to Delete this?"
          cancelBtnText="Cancel"
          submitBtnText="Delete"
          open={isDeleteModal}
          handleClose={() => setIsDeleteModal(false)}
          handleSubmit={() => setIsDeleteModal(false)}
        />
      )}
    </Box>
  );
};

export default ActionDropDown;
