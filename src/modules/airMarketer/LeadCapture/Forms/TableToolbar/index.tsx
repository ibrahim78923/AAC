import React from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { RestoreIcon, DownIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS } from '@/constants/permission-keys';
import Search from '@/components/Search';
import { styles } from './TableToolbar.style';
import useTableToolbar from './useTableToolbar';
import { ToolbarI } from './TableToolbar.interface';
import { formStatus } from '@/constants/form-builder';

const TableToolbar: React.FC<ToolbarI> = (props) => {
  const {
    status,
    setSearchBy,
    disabledActions,
    disabledMenuItem,
    onClickViewDetails,
    onClickEdit,
    onClickDelete,
    onClickExport,
    onClickSendEmail,
    onClickRestore,
  } = props;
  const {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
  } = useTableToolbar();

  return (
    <Box sx={styles?.toolbarCont}>
      <Box sx={styles?.toolbarSearch}>
        <PermissionsGuard
          permissions={[AIR_MARKETER_LEAD_CAPTURE_FORM_PERMISSIONS?.SEARCH]}
        >
          <Search setSearchBy={setSearchBy} label="Search Here" size="small" />
        </PermissionsGuard>
      </Box>
      <Box sx={styles?.toolbarActions}>
        <Box sx={styles?.actions}>
          <Button
            variant="outlined"
            className="small"
            color="inherit"
            onClick={handleActionsMenuClick}
            classes={{ outlined: 'outlined_btn' }}
            disabled={disabledActions}
          >
            Actions &nbsp; <DownIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={actionMenuOpen}
            onClose={handleActionsMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              disabled={disabledMenuItem}
              onClick={() => {
                handleActionsMenuClose();
                onClickViewDetails();
              }}
            >
              View Details
            </MenuItem>
            <MenuItem
              disabled={disabledMenuItem || status === formStatus?.published}
              onClick={() => {
                handleActionsMenuClose();
                onClickEdit();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleActionsMenuClose();
                onClickDelete();
              }}
            >
              Delete
            </MenuItem>
            <MenuItem
              disabled={disabledMenuItem}
              onClick={() => {
                handleActionsMenuClose();
                onClickExport();
              }}
            >
              Export PDF
            </MenuItem>
            <MenuItem
              disabled={disabledMenuItem}
              onClick={() => {
                handleActionsMenuClose();
                onClickSendEmail();
              }}
            >
              Send Email
            </MenuItem>
          </Menu>
        </Box>
        <Button
          variant="outlined"
          className="small"
          color="inherit"
          sx={styles?.restoreBtn}
          startIcon={<RestoreIcon />}
          onClick={onClickRestore}
        >
          Restore
        </Button>
      </Box>
    </Box>
  );
};

export default TableToolbar;
