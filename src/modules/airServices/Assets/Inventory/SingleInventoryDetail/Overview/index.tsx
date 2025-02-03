import { Box, Typography } from '@mui/material';
import { useOverview } from './useOverview';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { DynamicFormDataDisplay } from '@/components/DynamicForm/DynamicFormDataDisplay';

export const Overview = () => {
  const { isLoading, isFetching, isError, overviewData, refetch } =
    useOverview();

  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.OVERVIEW]}
    >
      <Typography variant="h5" py={'0.625rem'}>
        Inventory Details
      </Typography>
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
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
                textTransform={'capitalize'}
              >
                <DynamicFormDataDisplay value={value} />
              </Typography>
            </Box>
          ))}
        </Box>
      </ApiRequestFlow>
    </PermissionsGuard>
  );
};
