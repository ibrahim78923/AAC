import { Avatar, Box, Typography } from '@mui/material';
import { useOverview } from './useOverview';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { isValidElement } from 'react';
import { DYNAMIC_FORM_FIELDS_TYPES, isValidDate } from '@/utils/dynamic-forms';
import { getImageByType } from '@/utils/avatarUtils';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const Overview = () => {
  const { isLoading, isFetching, isError, overviewData, refetch } =
    useOverview();

  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.OVERVIEW]}
    >
      <Typography variant="h5" py={'0.625rem'}>
        Inventory Details
      </Typography>

      <Box bgcolor={'primary.lighter'} borderRadius={2}>
        {Object?.entries(overviewData)?.map(([key, value]: any) => (
          <Box key={key} display={'flex'}>
            <Typography
              variant={'body2'}
              fontWeight={500}
              p={2}
              color={'grey.600'}
              minWidth={'25%'}
            >
              {key}:
            </Typography>
            <Typography
              variant={'body2'}
              p={2}
              color={'grey.900'}
              fontWeight={500}
            >
              {isValidElement(value) ? (
                value
              ) : typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
                value !== null &&
                DYNAMIC_FORM_FIELDS_TYPES?.LABEL in value ? (
                value?.label
              ) : typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
                value !== null &&
                DYNAMIC_FORM_FIELDS_TYPES?.FILE_URL in value ? (
                <Avatar
                  src={getImageByType(value?.fileType, value?.fileUrl)}
                  alt="file-preview"
                  sx={{ width: 45, height: 45 }}
                  variant={'rounded'}
                />
              ) : isValidDate(value) ? (
                dayjs(value)?.format(DATE_FORMAT?.UI)
              ) : (
                value?.toString()
              )}
            </Typography>
          </Box>
        ))}
      </Box>
    </PermissionsGuard>
  );
};
