import React from 'react';
import { Box, Typography } from '@mui/material';

const InvoicingCard = () => {
  return (
    <>
      <Box
        sx={{
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          background: '#ffff',
          padding: '1rem',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body2" sx={{ color: '#1F2937', fontWeight: 600 }}>
          Invoicing
        </Typography>

        <Box>{/* <MyChartComponent /> */}</Box>
      </Box>
    </>
  );
};

export default InvoicingCard;
