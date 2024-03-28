import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const LocationHeader = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={2}
      >
        <PageTitledHeader
          title={'Location'}
          canMovedBack
          moveBack={() => {
            router?.push({
              pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
            });
          }}
        />
        <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsDrawerOpen(true)}
          >
            Import
          </Button>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_LOCATION,
            ]}
          >
            <Button
              variant="contained"
              onClick={() =>
                router?.push({
                  pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                  query: {
                    type: 'parent',
                  },
                })
              }
            >
              New Location
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
    </>
  );
};
