import { Grid, Box } from '@mui/material';
import { activityData } from './Activity.data';
import NoData from '@/components/NoData';
import { ActivityTimeline } from './ActivityTimeline';
import { ExportButton } from '@/components/ExportButton';
import { NoAssociationFoundImage } from '@/assets/images';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

export const Activity = () => {
  return (
    <>
      <br />
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={1.25}
        marginBottom={1.5}
      >
        <Box></Box>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.EXPORT_ACTIVITIES,
          ]}
        >
          <ExportButton />
        </PermissionsGuard>
      </Box>
      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.VIEW_ACTIVITIES,
        ]}
      >
        <Grid container>
          <Grid item xs={12} md={0.5}></Grid>
          <Grid item xs={12} md={10.5}>
            {!!activityData?.length ? (
              activityData?.map((singleActivity: any) => (
                <ActivityTimeline
                  activityData={singleActivity}
                  key={singleActivity?._id}
                />
              ))
            ) : (
              <NoData
                image={NoAssociationFoundImage}
                message={'There is no activity'}
              />
            )}
          </Grid>
          <Grid item xs={12} md={1}></Grid>
        </Grid>
      </PermissionsGuard>
    </>
  );
};
