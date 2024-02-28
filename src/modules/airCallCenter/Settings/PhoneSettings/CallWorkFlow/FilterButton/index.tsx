import { Box, Button, Menu, MenuItem } from '@mui/material';
import useCallWorkflow from '../useCallWorkflow';
import { FilterIcon } from '@/assets/icons';

const FilterButton = () => {
  const { selectedValue, handleClick, handleClose } = useCallWorkflow();

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      <Button
        className="small"
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        startIcon={<FilterIcon />}
        sx={{ width: { sm: '112px', xs: '100%' } }}
      >
        Filter
      </Button>
      <Menu
        // sx={{
        //   '.MuiPopover-paper': {
        //     minWidth: '115px',
        //   },
        // }}
        id="simple-menu"
        anchorEl={selectedValue}
        open={Boolean(selectedValue)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          Call Queue
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            // commented for future use
            // navigate?.push({
            //   pathname: ORG_ADMIN?.ADD_ROLE,
            //   query: { id: checkedRows, type: 'edit' },
            // });
          }}
        >
          Basic IVR
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          Agent Extension Flow
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          All
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default FilterButton;
