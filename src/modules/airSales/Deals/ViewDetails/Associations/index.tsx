import { Box, Grid, Typography } from '@mui/material';

import { styles } from '../ViewDetails.style';
import Attachments from './Attachments';
import Companies from './Companies';
import Tickets from './Tickets';
import Contacts from './Contacts';
import Products from './Products';
import Quotes from './Quotes';
import useAssociations from './useAssociations';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Associations = () => {
  const sectionId = useSearchParams().get('section-id');
  const { assocaitionData } = useAssociations();
  const router = useRouter();
  useEffect(() => {
    if (sectionId) {
      router.push('/air-sales/deals/view-details?tab-value=2#companies');
    }
  }, [sectionId]);
  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Associations </Typography>
      <Box sx={styles?.horizontalTabsInnnerBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Contacts contactsData={assocaitionData?.contacts} />
          </Grid>
          <Grid item xs={12}>
            <Tickets />
          </Grid>
          <Grid item xs={12} id="companies">
            <Companies />
          </Grid>
          <Grid item xs={12}>
            <Products />
          </Grid>
          <Grid item xs={12}>
            <Quotes />
          </Grid>
          <Grid item xs={12}>
            <Attachments />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Associations;
