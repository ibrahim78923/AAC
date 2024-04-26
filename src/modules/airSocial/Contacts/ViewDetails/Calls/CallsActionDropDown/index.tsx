import { Box, Button, Menu, MenuItem, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const CallsActionDropdown = (props: any) => {
  const theme = useTheme();
  const {
    isActionsDisabled,
    disabledMenuItem,
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    handleOpenDrawerEditCall,
    handleOpenModalDelete,
    handleOpenReschedule,
    handleOpenOutcome,
  } = props;

  return (
    <>
      <Box>
        <Button
          endIcon={<ArrowDropDown />}
          sx={{
            border: `1px solid ${theme?.palette?.custom?.dark}`,
            color: `${theme?.palette?.custom.main}`,
            minWidth: '0px',
            height: '35px',
          }}
          aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={actionMenuOpen ? 'true' : undefined}
          onClick={handleActionsMenuClick}
          disabled={isActionsDisabled}
        >
          Action
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={actionMenuOpen}
          onClose={handleActionsMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            disabled={!disabledMenuItem}
            onClick={() => handleOpenDrawerEditCall('View')}
          >
            View
          </MenuItem>
          <MenuItem
            disabled={!disabledMenuItem}
            onClick={() => handleOpenDrawerEditCall('Edit')}
          >
            Edit
          </MenuItem>
          <MenuItem disabled={!disabledMenuItem} onClick={handleOpenReschedule}>
            Reschedule
          </MenuItem>
          <MenuItem disabled={!disabledMenuItem} onClick={handleOpenOutcome}>
            Add outcomes
          </MenuItem>
          <MenuItem onClick={handleOpenModalDelete}>Delete</MenuItem>
        </Menu>
      </Box>
    </>
  );
};
export default CallsActionDropdown;
