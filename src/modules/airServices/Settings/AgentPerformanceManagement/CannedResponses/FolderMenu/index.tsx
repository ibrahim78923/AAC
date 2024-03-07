import { LockedIcon } from '@/assets/icons';
import { MoreHoriz } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { DeleteFolderModal } from '../DeleteFolderModal';
import { useFolderMenu } from './useFolderMenu';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const FolderMenu = (props: any) => {
  const {
    response,
    setOpenCreateNewFolderModal,
    handleActionClick,
    openAction,
    handleActionClose,
    actionPop,
  } = useFolderMenu(props);
  return (
    <>
      <Box display="flex" justifyContent="end">
        <IconButton
          disabled={!response?.isDeletedAble}
          onClick={handleActionClick}
        >
          {!response?.isDeletedAble ? (
            <LockedIcon />
          ) : (
            <MoreHoriz sx={{ color: 'secondary.lighter' }} fontSize="medium" />
          )}
        </IconButton>
        <Menu
          open={openAction}
          anchorEl={actionPop}
          onClose={handleActionClose}
          sx={{ '& .MuiPaper-root': { boxShadow: 2 } }}
          transformOrigin={{ vertical: 10, horizontal: 80 }}
        >
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_CUSTOM_FOLDERS,
            ]}
          >
            <MenuItem
              sx={{ pr: 5 }}
              onClick={() => {
                setOpenCreateNewFolderModal({
                  open: true,
                  editData: response,
                });
                handleActionClose();
              }}
            >
              Edit
            </MenuItem>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_CUSTOM_FOLDERS,
            ]}
          >
            <DeleteFolderModal
              id={response?._id}
              handleActionClose={handleActionClose}
            />
          </PermissionsGuard>
        </Menu>
      </Box>
    </>
  );
};
