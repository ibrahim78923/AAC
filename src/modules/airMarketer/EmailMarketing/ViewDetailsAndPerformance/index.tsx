import { ViewDetailsImage } from '@/assets/images';
import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import ClickPerformance from './ClickPerformance';
import Emailhealth from './Emailhealth';

const ViewDetailsAndPerformance = ({
  openViewDetails,
  handleCloseViewDetails,
}: any) => {
  const theme = useTheme();
  return (
    <CommonDrawer
      isDrawerOpen={openViewDetails}
      onClose={handleCloseViewDetails}
      title={'View Details & Performance'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleCloseViewDetails}
    >
      <Box mt={1}>
        <Grid container>
          <Grid item sm={12}>
            <Image
              src={ViewDetailsImage}
              alt="ViewDetailsImage"
              style={{
                display: 'block',
                margin: '0 auto',
                border: `1px solid ${theme?.palette?.primary?.main}`,
              }}
            />
          </Grid>
          <Grid item sm={12}>
            <Typography variant="body2" sx={{ fontWeight: '700' }} mt={2.4}>
              Sent To
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: '500' }}
              mt={0.8}
              mb={2.4}
            >
              Adil Khan(adil.khan@hycholic.co.uk)
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: '700' }}>
              Subject
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: '500' }}
              mt={0.8}
              mb={2.4}
            >
              E-Commerce website designed to create latest florist network in
              Australia
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: '700' }}>
              message
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: '500' }}
              mt={0.8}
              mb={2.4}
            >
              Migrating your business to the cloud is a major undertaking. Does
              your content system have the bandwidth? How long will it takes
              time? What kinds of challenges should you be prepared..........
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="body2" sx={{ fontWeight: '700' }} mt={2.4}>
              Send Date & Time
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="body2" sx={{ fontWeight: '700' }} mt={2.4}>
              Reschedule
            </Typography>
            <Typography variant="body2" mt={2.4}>
              Mar 26, 2023 03:05:15 PM
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <ClickPerformance />
          </Grid>
          <Grid item sm={12}>
            <Emailhealth />
          </Grid>
          <Grid item sm={12}>
            <Emailhealth />
          </Grid>
        </Grid>
      </Box>
    </CommonDrawer>
  );
};
export default ViewDetailsAndPerformance;
