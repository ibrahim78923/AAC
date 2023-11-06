import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { styles } from '../ViewDetails.style';
import Attachments from './Attachments';
import Companies from './Companies';
import Tickets from './Tickets';
import Contacts from './Contacts';
import Products from './Products';
import Quotes from './Quotes';

const Associations = () => {
  return (
    <Box sx={styles.horizontalTabsBox}>
      <Typography variant="h4">Associations </Typography>
      <Box sx={styles.horizontalTabsInnnerBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Contacts />
          </Grid>
          <Grid item xs={12}>
            <Tickets />
          </Grid>
          <Grid item xs={12}>
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
