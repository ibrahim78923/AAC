import { Grid, Card, Typography, Skeleton } from '@mui/material';
import { CompainDetailsCard } from './ViewCompaignDetails.data';
import useViewCampaignDetails from './useViewCampaignDetails';
import { v4 as uuidv4 } from 'uuid';

const ViewCompaignDetails = ({ CurrCampaignId }: any) => {
  const { isFetching, campaignDetails } =
    useViewCampaignDetails(CurrCampaignId);
  return (
    <Card sx={{ padding: '24px', margin: '15px' }}>
      <Grid container spacing={2}>
        {isFetching ? (
          <Grid item xs={12}>
            <Skeleton height={150} animation="wave" />
          </Grid>
        ) : (
          CompainDetailsCard(campaignDetails)?.map(
            (performance: { headingName: string; detail: string }) => {
              return (
                <Grid item md={1.71} key={uuidv4()}>
                  <Typography variant="body1" fontWeight={500}>
                    {performance?.headingName}
                  </Typography>
                  <Typography variant="body2" mt={1.5}>
                    {performance?.detail}
                  </Typography>
                </Grid>
              );
            },
          )
        )}
      </Grid>
    </Card>
  );
};
export default ViewCompaignDetails;
