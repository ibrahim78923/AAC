import { Box, Menu, MenuItem } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import useComments from '../useComments';

const ActionButton = () => {
  const { selectedValue, handleClick, handleClose, theme } = useComments();

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      <MoreHoriz
        sx={{
          color: theme?.palette?.custom?.steel_blue_alpha,
          cursor: 'pointer',
        }}
        onClick={handleClick}
      />

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
            // commented for future use
            // navigate?.push({
            //   pathname: ORG_ADMIN?.ADD_ROLE,
            //   query: { id: checkedRows, type: 'view' },
            // });
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          Mark as unresolved
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionButton;
