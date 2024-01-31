import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import usePublishActionBtn from './usePublishActionBtn';

const PublishActionButton = () => {
  const {
    selectedValue,
    handleClose,
    handlePublishNowAction,
    handleSaveDrafAction,
    handleClick,
  } = usePublishActionBtn();

  return (
    <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ width: { sm: '112px', xs: '100%' } }}
      >
        Publish
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
            handlePublishNowAction();
          }}
        >
          Publish Now
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleSaveDrafAction();
          }}
        >
          Save as Draft
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PublishActionButton;
