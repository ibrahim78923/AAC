import { Grid } from '@mui/material';
import { activityData } from './Activity.data';
import NoData from '@/components/NoData';
import { ActivityTimeline } from './ActivityTimeline';
import { v4 as uuidv4 } from 'uuid';
import { NoAssociationFoundImage } from '@/assets/images';

export const Activity = () => {
  return (
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
  );
};
