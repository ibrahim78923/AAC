import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useFolderMenu } from './useFolderMenu';
import { DeleteBusinessHour } from '../DeleteBusinessHour';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const FolderMenu = (props: any) => {
  const {
    handleActionClick,
    openAction,
    handleActionClose,
    actionPop,
    businessHourId,
  } = useFolderMenu(props);
  return (
    <>
      <Box display="flex" justifyContent="end">
        <IconButton onClick={handleActionClick}>
          <MoreVert sx={{ color: 'secondary.lighter' }} fontSize="medium" />
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
              AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_BUSINESS_HOUR,
            ]}
          >
            <MenuItem
              sx={{ pr: 5 }}
              component={Link}
              href={`${AIR_SERVICES?.UPSERT_BUSINESS_HOUR}?id=${businessHourId}`}
            >
              Edit
            </MenuItem>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.EDIT_DELETE_BUSINESS_HOUR,
            ]}
          >
            <DeleteBusinessHour
              id={businessHourId}
              handleActionClose={handleActionClose}
            />
          </PermissionsGuard>
        </Menu>
      </Box>
    </>
  );
};
