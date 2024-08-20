import { Typography, Box, Skeleton } from '@mui/material';
import React from 'react';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_SERVICES } from '@/constants';
import { useHeader } from './useHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { truncateText } from '@/utils/avatarUtils';

export const Header = (props: any) => {
  const { dropdownOptions } = props;
  const { singleVendorName, router, isLoading, isFetching } = useHeader();
  if (isFetching || isLoading) return <Skeleton height={50} />;
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      flexWrap={'wrap'}
      gap={2}
      sx={{ cursor: 'pointer' }}
    >
      <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
        <ArrowBackIcon
          onClick={() => {
            router?.push({
              pathname: AIR_SERVICES?.VENDOR_SETTINGS,
            });
          }}
        />
        <Typography variant={'h5'} textTransform={'capitalize'}>
          {truncateText(singleVendorName, 35)}
        </Typography>
      </Box>
      <Box>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.SEARCH_IMPORT_EXPORT_VENDORS,
          ]}
        >
          <SingleDropdownButton dropdownOptions={dropdownOptions} />
        </PermissionsGuard>
      </Box>
    </Box>
  );
};
