import Image from 'next/image';

import { Card, Typography, Box, Grid } from '@mui/material';

import { styles } from './DetailsView.style';

import { NotSelectedItemImage } from '@/assets/images';

import { isNullOrEmpty } from '@/utils';
import CtaViews from '../../CtaViews';
import TotalMarketingEmail from '../../TotalMarketingEmail';
import FormsTable from '../../FormsTable';
import ContactCustomerGraph from '../../ContactCustomerGraph';

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
                  <ContactCustomerGraph />
                </Grid>
              )}
              {selectedDashoardWidget?.mettingDetails && (
                <Grid item sm={12} mt={3}>
                  <CtaViews />
                </Grid>
              )}
              {selectedDashoardWidget?.teamActivities && (
                <Grid item sm={12} mt={3}>
                  <TotalMarketingEmail />
                </Grid>
              )}
              {selectedDashoardWidget?.totalDeals && (
                <Grid item sm={12} mt={3}>
                  <FormsTable />
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
