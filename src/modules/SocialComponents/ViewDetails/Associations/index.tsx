import { Box, Grid, Typography } from '@mui/material';

import { styles } from '../ViewDetails.style';
import Attachments from './Attachments';
import Tickets from './Tickets';
import Contacts from './Contacts';
import Deals from './Deals';

const Associations = () => {
  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Associations </Typography>
      <Box sx={styles?.horizontalTabsInnnerBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Contacts />
          </Grid>
          <Grid item xs={12}>
            <Tickets />
          </Grid>
          <Grid item xs={12}>
            <Deals />
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
