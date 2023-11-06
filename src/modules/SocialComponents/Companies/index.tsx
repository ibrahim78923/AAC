import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { styles } from './Companies.style';

const SocialCompanies = () => {
  return (
    <>
      <Box sx={styles.mainCompanyBox}>
        <Grid container>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Typography>Companies</Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Button>1</Button>
            <Button>2</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SocialCompanies;
