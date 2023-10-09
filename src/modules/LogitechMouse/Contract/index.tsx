import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { contractImage } from '@/assets/images';
import { styles } from './Contract.style';

const Contract = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ mt: '182px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image src={contractImage} alt="Picture of the associations" />
        </Box>
        <Typography sx={{ ...styles.contractTitle, mt: '16px', mb: '300px' }}>
          There are no active contracts available.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Contract;
