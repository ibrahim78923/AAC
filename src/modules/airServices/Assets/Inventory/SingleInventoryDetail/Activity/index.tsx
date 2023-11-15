import { Grid, Box } from '@mui/material';
import { activityData } from './Activity.data';
import NoData from '@/components/NoData';
import { ActivityTimeline } from './ActivityTimeline';
import { v4 as uuidv4 } from 'uuid';
import { ExportButton } from '@/components/ExportButton';
import { NoAssociationFoundImage } from '@/assets/images';
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
        <ExportButton />
      </Box>
      <br />
      <Grid container>
        <Grid item xs={12} md={0.5}></Grid>
        <Grid item xs={12} md={10.5}>
          {!!activityData?.length ? (
            activityData?.map((singleActivity: any) => (
              <ActivityTimeline activityData={singleActivity} key={uuidv4()} />
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
    </>
  );
};
