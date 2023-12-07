import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Typography, useTheme } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { campaignDetailsData } from './CampaignDetails.data';
const CampaignDetails = ({ open, onClose }: any) => {
  const theme: any = useTheme();
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={() => onClose(false)}
      title={'Campaign Details'}
      okText={'See performance'}
      isOk
      footer
    >
      <Box mt={1}>
        <Grid container>
          {campaignDetailsData?.map((campaign) => {
            return (
              <Grid
                key={uuidv4()}
                container
                style={{
                  padding: '24px',
                  paddingBottom: campaign?.paddingBottom,
                  background: theme?.palette?.primary?.lighter,
                }}
              >
                <Grid item md={5}>
                  <Typography variant="body1">
                    {campaign?.deatilsName}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  -
                </Grid>
                <Grid item md={5}>
                  <Typography variant="body1">
                    {campaign?.detailsDes}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </CommonDrawer>
  );
};
export default CampaignDetails;
