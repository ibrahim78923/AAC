import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import useRoleAndRight from '../useRoleAndRight';

const ActionButton = (props?: any) => {
  const { checkedRows, setIsDraweropen } = props;
  const { selectedValue, handleClick, handleClose } = useRoleAndRight();

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
            setIsDraweropen({ isToggle: true, type: 'edit', id: checkedRows });
          }}
        >
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            setIsDraweropen({ isToggle: true, type: 'view', id: checkedRows });
          }}
        >
          View
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionButton;
