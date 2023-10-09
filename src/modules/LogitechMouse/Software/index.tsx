import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { styles } from './Software.style';
import Image from 'next/image';
import { expenseImage } from '@/assets/images';

const Software = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ mt: '182px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image src={expenseImage} alt="Picture of the associations" />
        </Box>
        <Typography sx={{ ...styles.softwareTitle, mt: '16px', mb: '300px' }}>
          No Record Available
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Software;
