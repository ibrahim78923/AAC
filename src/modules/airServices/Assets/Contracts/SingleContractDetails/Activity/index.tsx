import { Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { ActivityTimeline } from './ActivityTimeline';
import { NoAssociationFoundImage } from '@/assets/images';
import { useActivity } from './useActivity';

export const Activity = () => {
  const { activitiesData } = useActivity();

  return (
    <Grid container>
      <Grid item xs={12} md={0.5}></Grid>
      <Grid item xs={12} md={10.5}>
        {activitiesData && activitiesData?.length > 0 ? (
          activitiesData?.map((singleActivity: any) => (
            <ActivityTimeline
              activityData={singleActivity}
              key={singleActivity?._id}
            />
          ))
        ) : (
          <NoData
            image={NoAssociationFoundImage}
            message={activitiesData ? 'There is no activity' : 'Loading...'}
          />
        )}
      </Grid>
      <Grid item xs={12} md={1}></Grid>
    </Grid>
  );
};
