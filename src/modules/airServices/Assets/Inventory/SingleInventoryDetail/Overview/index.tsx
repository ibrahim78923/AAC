import { Box, Typography } from '@mui/material';
import { overviewData } from './Overview.data';
import { styles } from './Overview.style';
import { useOverview } from './useOverview';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const Overview = () => {
  const { theme, inventoryData, isLoading, isFetching, isError } =
    useOverview();

  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;

  return (
    <Box>
      <PermissionsGuard
        permissions={[AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.OVERVIEW]}
      >
        {overviewData(inventoryData)?.map((item: any) => (
          <Box key={item?._id}>
            <Typography variant="h5" py={'.5rem'}>
              {item?.heading}
            </Typography>
            <Box sx={styles?.mainContainerBox}>
              {item?.detailsData?.map((detail: any) => (
                <Box key={item?._id}>
                  <Box sx={styles?.childContainerBox}>
                    <Box width={{ sm: '20%', xs: '8.75rem' }}>
                      <Typography variant="body2" fontWeight={500}>
                        {detail?.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        color={theme.palette.grey[900]}
                      >
                        {detail?.detail}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={styles?.borderBox} />
          </Box>
        ))}
      </PermissionsGuard>
    </Box>
  );
};
