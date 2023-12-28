import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useCompanies from '../../useCompanies';

const ActionButton = (props?: any) => {
  const { checkedRows, setDeleteModal, setRestoreModal } = props;
  const { selectedValue, handleClick, handleClose } = useCompanies();

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        disabled={checkedRows === undefined ? true : false}
        sx={{ width: { sm: '112px', xs: '100%' } }}
      >
        Actions
        <ArrowDropDown />
      </Button>
      <Menu
        sx={{
          '.MuiPopover-paper': {
            minWidth: '115px',
          },
        }}
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setRestoreModal(true);
          }}
        >
          Restore
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setDeleteModal(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionButton;
