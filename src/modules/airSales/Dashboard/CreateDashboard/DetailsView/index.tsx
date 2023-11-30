import Image from 'next/image';

import { Card, Typography, Box, Grid } from '@mui/material';

import { styles } from './DetailsView.style';

import { NotSelectedItemImage } from '@/assets/images';
import DealsGraph from '../../DealsGraph';
import { isNullOrEmpty } from '@/utils';
import MeetingDetails from '../../MeetingDetails';
import TeamActivity from '../../TeamActivity';
import Widget from '../../Widget';

const DetailsView = ({ selectedDashoardWidget }: any) => {
  return (
    <Card sx={{ height: '80vh', overflow: 'auto' }}>
      <Typography variant="h5" mt={2} sx={{ textAlign: 'center' }} gutterBottom>
        Details View
      </Typography>
      <Box>
        <Grid container p={2}>
          {!isNullOrEmpty(selectedDashoardWidget) ? (
            <>
              {' '}
              {selectedDashoardWidget?.closedAndCreatedDeals && (
                <Grid item sm={12} mt={3}>
                  <DealsGraph />
                </Grid>
              )}
              {selectedDashoardWidget?.mettingDetails && (
                <Grid item sm={12} mt={3}>
                  <MeetingDetails />
                </Grid>
              )}
              {selectedDashoardWidget?.teamActivities && (
                <Grid item sm={12} mt={3}>
                  <TeamActivity />
                </Grid>
              )}
              {selectedDashoardWidget?.totalDeals && (
                <Grid item sm={12} mt={3}>
                  <Widget />
                </Grid>
              )}
            </>
          ) : (
            <Grid item sm={12} sx={styles?.defaultSelectedImage} mt={3}>
              <Image src={NotSelectedItemImage} alt="not-selected-Item"></Image>
            </Grid>
          )}
        </Grid>
      </Box>
    </Card>
  );
};
export default DetailsView;
