import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import Attachments from './Attachments';
import Companies from './Companies';
import Tickets from './Tickets';
import Deal from './Deal';

import { styles } from '../ViewDetails.style';
import PlayBook from './Contacts';

const Associations = () => {
  return (
    <Box sx={styles.horizontalTabsBox}>
      <Typography variant="h4">Associations </Typography>
      <Box sx={styles.horizontalTabsInnnerBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tickets />
          </Grid>

          <Grid item xs={12}>
            <Deal />
          </Grid>
          <Grid item xs={12}>
            <Companies />
          </Grid>

          <Grid item xs={12}>
            <Attachments />
          </Grid>
          <Grid item xs={12}>
            <PlayBook />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Associations;
