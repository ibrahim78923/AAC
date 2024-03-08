import { Box, Button, useTheme } from '@mui/material';
import React from 'react';
import { AddBox } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const SubListWrapper = ({ children, parentId, ChildId }: any) => {
  const theme: any = useTheme();
  const router = useRouter();

  return (
    <Box
      p={3}
      border={`.1rem solid ${theme?.palette?.grey[700]}`}
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
            onClick={() =>
              router?.push({
                pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                query: {
                  parentId: parentId,
                  ChildId: ChildId,
                },
              })
            }
          >
            <AddBox />
          </Button>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
