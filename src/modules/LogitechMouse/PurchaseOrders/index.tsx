import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { styles } from './PurchaseOrders.style';
import Image from 'next/image';
import { purchaseImage } from '@/assets/images';
const PurchaseOrders = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ mt: '182px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image src={purchaseImage} alt="Picture of the associations" />
        </Box>
        <Typography
          sx={{ ...styles.purchaseOrderitle, mt: '16px', mb: '300px' }}
        >
          No purchase orders associated
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PurchaseOrders;
