import { Typography, Box, Skeleton } from '@mui/material';

import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useRouter } from 'next/router';
import { ViewDetailBackArrowIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import { Permissions } from '@/constants/permissions';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
export const Header = (props: any) => {
  const { dropdownOptions, inventoryData, isFetching, isLoading } = props;
  const router = useRouter();
  if (isLoading || isFetching) return <Skeleton />;
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <Box
            display={'flex'}
            alignItems={'center'}
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              router?.push({
                pathname: AIR_SERVICES?.ASSETS_INVENTORY,
              })
            }
          >
            <ViewDetailBackArrowIcon />
          </Box>
          <Typography variant="h5">{inventoryData?.displayName}</Typography>
        </Box>
        <Box>
          <PermissionsGuard
            permissions={Permissions?.AIR_SERVICES_ASSETS_INVENTORY_ACTION}
          >
            <SingleDropdownButton dropdownOptions={dropdownOptions} />
          </PermissionsGuard>
        </Box>
      </Box>
    </>
  );
};
