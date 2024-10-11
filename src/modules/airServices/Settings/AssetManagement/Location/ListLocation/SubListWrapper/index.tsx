import { Box, Button } from '@mui/material';
import React from 'react';
import { AddBox } from '@mui/icons-material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { ILocationProps } from '../../Location.interface';

export const SubListWrapper = (props: ILocationProps) => {
  const { children, onAddClick } = props;

  return (
    <Box
      p={3}
      border={`1px solid`}
      borderColor={'grey.700'}
      boxShadow={2}
      borderRadius={2}
    >
      {children}
      <Box mt={1}>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_LOCATION,
          ]}
        >
          <Button
            variant="outlined"
            color="secondary"
            className="small"
            onClick={() => onAddClick?.()}
          >
            <AddBox />
          </Button>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
